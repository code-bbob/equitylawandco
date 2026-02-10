"use client";

import { useAttorney } from "../../hooks/useAttorney";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function AttorneyDetailsPage() {
  const params = useParams();
  const { attorney, loading, error } = useAttorney(params?.id);

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-slate-600 text-lg font-medium">
              Loading attorney details...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mx-auto px-8 lg:px-16 xl:px-24 py-20">
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg">
            <h3 className="text-red-800 font-semibold text-lg mb-2">
              Unable to Load Attorney
            </h3>
            <p className="text-red-700 mb-6">{error}</p>
            <Link
              href="/attorneys"
              className="text-red-700 hover:text-red-900 font-semibold transition-colors"
            >
              Return to Team
            </Link>
          </div>
        </div>
      )}

      {/* Attorney Details */}
      {!loading && !error && attorney && (
        <>
          {/* Small Dark Breadcrumb Section */}
          <section className=" pt-16">
            <div className="mx-auto px-8 lg:px-16 xl:px-24">
              <div className="text-xl text-slate-900">
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/attorneys" className="hover:text-cyan-400 transition-colors">Attorneys</Link>
                <span className="mx-2">›</span>
                <span className="text-black">{attorney.full_name}</span>
              </div>
            </div>
          </section>

          {/* Main White Content Section */}
          <section className="bg-white py-16">
            <div className="mx-auto px-8 lg:px-16 xl:px-24">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Left - Small Square Image */}
                <div className="flex-shrink-0">
                  {attorney.photo_url ? (
                    <div className="relative">
                      <Image
                        src={attorney.photo_url}
                        alt={attorney.full_name}
                        width={320}
                        height={320}
                        unoptimized
                        className="w-72 h-72 lg:w-96 lg:h-96 object-cover rounded-lg shadow-xl"
                      />
                    </div>
                  ) : (
                    <div className="w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg flex items-center justify-center shadow-xl">
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
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-3 leading-tight">
                    {attorney.full_name}
                  </h1>
                  <p className="text-xl text-slate-600 font-light mb-8">
                    {attorney.job_title}
                  </p>

                  {/* Short Bio Quote */}
                  {attorney.short_bio && (
                    <div className="relative mb-8 pl-6 py-4 border-l-4 border-amber-600">
                      <p className="text-lg text-slate-700 italic leading-relaxed">
                        "{attorney.short_bio}"
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
            <section className="bg-white pb-16 border-t border-slate-100">
              <div className="mx-auto px-8 lg:px-16 xl:px-24">
                <div className="max-w-4xl">
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">
                    Professional Background
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {attorney.professional_background}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-20 bg-amber-700 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            ></div>

            <div className="mx-auto px-8 lg:px-16 xl:px-24 text-center relative z-10">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
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
        </>
      )}

      {/* Not Found State */}
      {!loading && !error && !attorney && (
        <div className="mx-auto px-8 lg:px-16 xl:px-24 py-40 text-center">
          <div className="text-6xl mb-6">⚖️</div>
          <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">
            Attorney Not Found
          </h3>
          <p className="text-lg text-slate-600 mb-10">
            The attorney you're looking for could not be found.
          </p>
          <Link
            href="/attorneys"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-8 rounded-lg transition-all hover:shadow-lg"
          >
            Return to Team
          </Link>
        </div>
      )}
    </main>
  );
}
