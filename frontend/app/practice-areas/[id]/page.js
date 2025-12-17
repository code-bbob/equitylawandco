'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function PracticeAreaDetail({ params }) {
  const { id } = use(params);
  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPracticeArea = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/practice-areas/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch practice area');
        }
        const data = await response.json();
        setArea(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching practice area:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPracticeArea();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Error loading practice area</p>
          <Link href="/" className="text-amber-600 hover:text-amber-800 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Practice area not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <style>{`
        figure {
          margin: 1rem 0;
        }
        figure.image {
          display: inline-block;
        }
        figure.image-style-side {
          float: right;
          margin: 0 0 1rem 1.5rem;
        }
        figure.image-style-align-left {
          float: left;
          margin: 0 1.5rem 1rem 0;
        }
        figure.image-style-align-right {
          float: right;
          margin: 0 0 1rem 1.5rem;
        }
        figure.image-style-align-center {
          display: block;
          margin: 1.5rem auto;
          text-align: center;
        }
        figure.image-style-full {
          display: block;
          width: 100%;
          margin: 1.5rem 0;
        }
        figure img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          display: block;
        }
        figcaption {
          text-align: center;
          font-size: 0.875rem;
          color: #92400e;
          margin-top: 0.5rem;
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="bg-amber-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-amber-800 hover:text-amber-900 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section with Featured Image */}
      {area.featured_image_url && (
        <div className="relative h-96 bg-amber-900 overflow-hidden">
          <img
            src={area.featured_image_url}
            alt={area.name}
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{area.name}</h1>
              <p className="text-xl text-amber-100">Premium Legal Services</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <article className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${area.featured_image_url ? 'py-12' : 'py-16'}`}>
        {!area.featured_image_url && (
          <header className="mb-12">
            <h1 className="text-5xl font-bold text-amber-900 mb-4">{area.name}</h1>
            <div className="flex items-center space-x-4 text-amber-800">
              <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold">
                Practice Area
              </span>
            </div>
          </header>
        )}

        {/* Two Column Layout: Description + Images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Main Description - 2 columns */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none prose-img:rounded-lg prose-img:shadow-md">
              <div
                className="text-amber-900 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{
                  __html: area.description.replace(/src="\/media\//g, 'src="http://localhost:8000/media/'),
                }}
              />
            </div>
          </div>

          {/* Side Gallery */}
          {area.featured_image_url && (
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-6 rounded-lg border-2 border-amber-300">
                  <h3 className="text-lg font-bold text-amber-900 mb-4">Key Information</h3>
                  <img
                    src={area.featured_image_url}
                    alt={area.name}
                    className="w-full h-auto rounded-lg shadow-md mb-4"
                  />
                  <ul className="space-y-3 text-sm text-amber-900">
                    <li className="flex items-start">
                      <span className="text-amber-800 mr-3 mt-1">✓</span>
                      <span>Expert legal consultation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-800 mr-3 mt-1">✓</span>
                      <span>Years of industry experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-800 mr-3 mt-1">✓</span>
                      <span>Personalized strategy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-800 mr-3 mt-1">✓</span>
                      <span>Proven track record</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-900 rounded-xl p-8 md:p-12 mb-16 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Discuss Your Case?</h2>
              <p className="text-lg text-amber-50 mb-6">
                Our experienced team specializes in {area.name.toLowerCase()} and is ready to help you achieve the best possible outcome.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-amber-50 text-amber-900 hover:bg-white px-8 py-3 rounded-lg font-bold transition-colors">
                  Schedule Consultation
                </button>
                <button className="border-2 border-amber-100 text-amber-50 hover:bg-amber-700 px-8 py-3 rounded-lg font-bold transition-colors">
                  Call Us Now
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-amber-700/40 rounded-lg p-8 backdrop-blur">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">24/7</div>
                  <div className="text-xl">Available for Emergencies</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-900 mb-8">Why Choose Our {area.name} Team?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-100 p-6 rounded-lg border border-amber-300 hover:border-amber-700 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-amber-900 mb-3">✓ Expertise</h3>
              <p className="text-amber-800">Deep knowledge and extensive experience in {area.name}</p>
            </div>
            <div className="bg-amber-100 p-6 rounded-lg border border-amber-300 hover:border-amber-700 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-amber-900 mb-3">✓ Dedication</h3>
              <p className="text-amber-800">Committed to achieving the best results for our clients</p>
            </div>
            <div className="bg-amber-100 p-6 rounded-lg border border-amber-300 hover:border-amber-700 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-amber-900 mb-3">✓ Innovation</h3>
              <p className="text-amber-800">Using cutting-edge strategies and legal approaches</p>
            </div>
            <div className="bg-amber-100 p-6 rounded-lg border border-amber-300 hover:border-amber-700 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-amber-900 mb-3">✓ Results</h3>
              <p className="text-amber-800">Track record of successful cases and satisfied clients</p>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        {area.gallery_images && area.gallery_images.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-8">Our Work & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {area.gallery_images.map((image, idx) => (
                <div key={image.id || idx} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <img
                    src={image.image_url}
                    alt={image.title || `Gallery image ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {image.title && (
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-white font-bold">{image.title}</h3>
                        {image.description && (
                          <p className="text-amber-100 text-sm">{image.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-900 mb-8">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['Consultation', 'Analysis', 'Strategy', 'Resolution'].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-amber-800 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-amber-900 mb-2">{step}</h3>
                <p className="text-sm text-amber-800">Professional {step.toLowerCase()} and planning</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-amber-800 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Contact Section */}
      <section className="bg-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Expert Legal Help Today</h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            Don't handle legal matters alone. Contact our expert {area.name} team for professional guidance and representation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointments" className="bg-amber-100 text-amber-900 hover:bg-white px-8 py-3 rounded-lg font-bold transition-colors">
              Schedule Consultation
            </Link>
            <Link href="/contact" className="border-2 border-amber-200 text-amber-100 hover:bg-amber-800 px-8 py-3 rounded-lg font-bold transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
