import { fetchAttorneys, fetchAttorney } from '@/lib/api';
import { generateAttorneySchema, generateBreadcrumbSchema, baseUrl } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Generate static pages for all attorneys at build time
export async function generateStaticParams() {
  const attorneys = await fetchAttorneys();
  return attorneys.map((attorney) => ({
    id: attorney.slug,
  }));
}

// Dynamic metadata for each attorney
export async function generateMetadata({ params }) {
  const { id } = await params;
  const attorney = await fetchAttorney(id);
  
  if (!attorney) {
    return {
      title: 'Attorney Not Found',
    };
  }

  return {
    title: `${attorney.full_name} - ${attorney.job_title}`,
    description: attorney.short_bio || attorney.professional_background?.substring(0, 160) || `${attorney.full_name} is a ${attorney.job_title} at Equity Law & Co., a leading law firm in Nepal.`,
    keywords: `${attorney.full_name}, ${attorney.job_title}, attorney Nepal, lawyer Kathmandu, ${attorney.specializations || ''}`,
    openGraph: {
      title: `${attorney.full_name} - ${attorney.job_title} | Equity Law & Co.`,
      description: attorney.short_bio || `${attorney.full_name} is a ${attorney.job_title} at Equity Law & Co.`,
      url: `${baseUrl}/attorneys/${attorney.slug}`,
      type: 'profile',
      images: attorney.photo_url ? [{ url: attorney.photo_url, alt: attorney.full_name }] : [],
    },
    alternates: {
      canonical: `${baseUrl}/attorneys/${attorney.slug}`,
    },
  };
}

export default async function AttorneyDetailsPage({ params }) {
  const { id } = await params;
  const attorney = await fetchAttorney(id);

  if (!attorney) {
    notFound();
  }

  const attorneySchema = generateAttorneySchema(attorney);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Attorneys', url: '/attorneys' },
    { name: attorney.full_name, url: `/attorneys/${attorney.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Small Dark Breadcrumb Section */}
      <section className=" pt-8 sm:pt-16">
        <div className="mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-sm sm:text-xl text-slate-900">
            <Link href="/" className="hover:text-blue-700 text-gray-600 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/attorneys" className="hover:text-blue-700 text-gray-600 transition-colors">Attorneys</Link>
            <span className="mx-2">›</span>
            <span className="text-black font-semibold">{attorney.full_name}</span>
          </div>
        </div>
      </section>

      {/* Main White Content Section */}
      <section className=" py-8 sm:py-16">
        <div className="mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-start">
            {/* Left - Small Square Image */}
            <div className="flex-shrink-0">
              {attorney.photo_url ? (
                <div className="relative w-full sm:w-72 h-72 lg:w-96 lg:h-96">
                  <Image
                    src={attorney.photo_url}
                    alt={attorney.full_name}
                    fill
                    className="object-cover object-[50%_10%] rounded-lg shadow-xl"
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 288px, 384px"
                  />
                </div>
              ) : (
                <div className="w-full sm:w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg flex items-center justify-center shadow-xl">
                  <span className="text-8xl text-slate-300">👤</span>
                </div>
              )}
            </div>

            {/* Right - Content */}
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                <span className="text-xs font-semibold text-amber-900 tracking-widest uppercase">Senior Partner</span>
              </div>

              {/* Name and Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-3 leading-tight">
                {attorney.full_name}
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-light mb-6 sm:mb-8">
                {attorney.job_title}
              </p>

              {/* Short Bio Quote */}
              {attorney.short_bio && (
                <div className="relative mb-8 pl-6 py-4 border-l-4 border-amber-600">
                  <p className="text-lg text-slate-700 italic leading-relaxed">
                    &ldquo;{attorney.short_bio}&rdquo;
                  </p>
                </div>
              )}

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3">
                {attorney.email && (
                  <a
                    href={`mailto:${attorney.email}`}
                    className="inline-flex items-center gap-2 bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-800 transition-all shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Send Email</span>
                  </a>
                )}
                {attorney.phone && (
                  <a
                    href={`tel:${attorney.phone}`}
                    className="inline-flex items-center gap-2 bg-white border-2 border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-lg hover:border-amber-600 hover:bg-amber-50 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{attorney.phone}</span>
                  </a>
                )}
                <a
                  href="/appointments"
                  className="inline-flex items-center gap-2 bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-900 transition-all shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Book Consultation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Background Section */}
      {attorney.professional_background && (
          <div className="mx-auto px-4 sm:px-8 pb-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">
                Professional Background
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 leading-relaxed text-justify ">
                  {attorney.professional_background}
                </p>
              </div>
            </div>
          </div>
        
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-amber-700 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        <div className="mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              Get in touch with {attorney.full_name} to discuss how we can
              help with your legal needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/appointments"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-4 px-10 rounded-lg transition-all shadow-xl"
              >
                <span>Schedule a Consultation</span>
              </a>
              <Link
                href="/attorneys"
                className="inline-flex items-center justify-center gap-3 border-2 border-white/30 hover:border-white text-white font-semibold py-4 px-10 rounded-lg transition-all hover:bg-white/10"
              >
                <span>View Full Team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
