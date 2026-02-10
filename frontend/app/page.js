'use client';

import Hero from './components/Hero';
import PracticeAreasPreview from './components/PracticeAreasPreview';
import ContactForm from './components/ContactForm';
import Navvbar from './components/Navbar';
import { useAttorneys } from './hooks/useAttorneys';
import { useState } from 'react';

export default function Home() {
  const { attorneys, loading, error } = useAttorneys();
  const [selectedFilter, setSelectedFilter] = useState('ALL PRACTICE AREAS');

  // Get unique practice areas from attorneys - split comma-separated strings
  const practiceAreas = ['ALL PRACTICE AREAS', ...new Set(
    attorneys.flatMap(attorney => 
      attorney.specializations 
        ? attorney.specializations.split(',').map(s => s.trim())
        : []
    ).filter(Boolean)
  )];

  // Filter attorneys based on selected practice area
  const filteredAttorneys = selectedFilter === 'ALL PRACTICE AREAS' 
    ? attorneys 
    : attorneys.filter(attorney => 
        attorney.specializations?.split(',').map(s => s.trim()).includes(selectedFilter)
      );

  return (
    <>
    
      {/* <Navvbar /> */}
      <Hero />
      <PracticeAreasPreview />

      {/* Hear from Our Attorneys Section */}
      <section className="py-20 md:py-18 bg-gray-100">
        <div className="mx-auto px-8 lg:px-16 xl:px-24">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-amber-700 tracking-[0.2em] uppercase border border-amber-200 px-4 py-2 rounded mb-6">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              Meet the Minds Behind<br />
              <span className="text-amber-700">Our Success</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A collective of seasoned legal professionals dedicated to upholding the principles of fairness, diligence, and equity. Each attorney brings a unique perspective and deep specialization to the firm.
            </p>
          </div>

          {/* Filter Tabs */}
          {!loading && !error && practiceAreas.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {practiceAreas.slice(0, 6).map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedFilter(area)}
                  className={`px-6 py-3 rounded font-medium text-sm transition-all duration-300 ${
                    selectedFilter === area
                      ? 'bg-amber-700 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  {area.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
              <p className="text-gray-700 mt-4">Loading attorneys...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">Error loading attorneys</p>
            </div>
          )}

          {!loading && !error && filteredAttorneys.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredAttorneys.map((attorney) => (
                  <a
                    key={attorney.id}
                    href={`/attorneys/${attorney.id}`}
                    className="group block bg-white rounded overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative h-[40vh] bg-gray-100 overflow-hidden">
                      {attorney.photo_url ? (
                        <img 
                          src={attorney.photo_url} 
                          alt={attorney.full_name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-8xl text-gray-300">👤</span>
                        </div>
                      )}
                      
                      {/* Overlay Label */}
                      <div className="absolute text-center bottom-0 left-0 right-0 p-6 bg-transparent bg-black/20 bg-opacity-80">
                        <p className="text-xs  font-semibold text-amber-400 tracking-wider uppercase mb-2">
                          {attorney.job_title || 'Attorney at Law'}
                        </p>
                        <h3 className="text-2xl font-serif font-bold text-white">
                          {attorney.full_name}
                        </h3>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <a
                  href="/attorneys"
                  className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800 hover:gap-3 transition-all group"
                >
                  <span className="text-sm tracking-wide">VIEW ALL ATTORNEYS</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </>
          )}

          {!loading && !error && filteredAttorneys.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-700 text-lg">No attorneys found for this practice area.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-48 bg-white">
        <div className=" mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">About Equity Law & Co.</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-8 leading-tight">Founded on<br/><span className="text-amber-700">Principles of Equity</span></h2>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Established in 2014 A.D., restructured in 2025 A.D.</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Core pillars: Fairness, Diligence, Responsiveness & Equity</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Practical, reliable, and result-oriented solutions</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Expertise in IP, Real Estate, Arbitration & Corporate Law</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Committed to highest standards of professional ethics</span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-700 h-96 rounded-lg shadow-md flex items-center justify-center text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div></div>
              <div className="relative z-10">
                <div className="text-6xl font-bold mb-3">10+</div>
                <div className="text-lg font-normal">Years of Service</div>
                <div className="text-sm text-amber-100 mt-4">Established 2014, Leading Since 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-amber-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full opacity-5 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100 rounded-full opacity-5 -ml-40 -mb-40"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about your legal needs? Our experienced team is standing by to provide expert guidance and support tailored to your situation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info - Horizontal Layout */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-start space-x-4 pb-4 border-b border-amber-100">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                  <span className="text-lg">✉</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm">Email</h3>
                  <p className="text-slate-600 text-sm mt-0.5">contact@equitylaw.com</p>
                  <p className="text-xs text-amber-700 mt-1">Response within 24h</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 pb-4 border-b border-amber-100">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                  <span className="text-lg">📞</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm">Phone</h3>
                  <p className="text-slate-600 text-sm mt-0.5">+977 9841052926</p>
                  <p className="text-xs text-amber-700 mt-1">9 AM - 6 PM NPT</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                  <span className="text-lg">📍</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm">Office</h3>
                  <p className="text-slate-600 text-sm mt-0.5">Thapagaun, Kathmandu-10, Nepal</p>
                  <p className="text-xs text-amber-700 mt-1">Walk-ins welcome</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-lg border border-amber-200 shadow-sm">
              <div className="mb-8 pb-8 border-b border-amber-100">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Send us a Message</h3>
                <p className="text-slate-600 text-sm">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
