'use client';

import { useAttorney } from '../../hooks/useAttorney';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AttorneyDetailsPage() {
  const params = useParams();
  const { attorney, loading, error } = useAttorney(params?.id);

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/attorneys" className="text-slate-600 hover:text-amber-700 text-sm font-semibold transition-colors">
            ← Back to Our Team
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-slate-600 text-lg font-medium">Loading attorney details...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg">
            <h3 className="text-red-800 font-semibold text-lg mb-2">Unable to Load Attorney</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <Link href="/attorneys" className="text-red-700 hover:text-red-900 font-semibold transition-colors">
              Return to Team
            </Link>
          </div>
        </div>
      )}

      {/* Attorney Details */}
      {!loading && !error && attorney && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-slate-50 via-white to-amber-50 relative overflow-hidden pb-20">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -ml-40"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 items-start">
                  {/* Photo Column */}
                <div className="md:col-span-2">
                  <div className="sticky top-24">
                    {attorney.photo_url ? (
                      <div className="relative group">
                        <img
                          src={attorney.photo_url}
                          alt={attorney.full_name}
                          className="w-full rounded-xl h-86 object-cover shadow-lg"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex items-center justify-center shadow-lg border-2 border-amber-200/30">
                        <span className="text-7xl text-slate-300">👤</span>
                      </div>
                    )}                    {/* Contact CTA - Refined */}
                    <div className="mt-10 space-y-4">
                      {attorney.email && (
                        <a
                          href={`mailto:${attorney.email}`}
                          className="block w-full bg-gradient-to-r from-amber-700 to-amber-800 text-white text-center font-semibold py-4 rounded-lg hover:from-amber-800 hover:to-amber-900 transition-all hover:shadow-lg text-base"
                        >
                          Send Email
                        </a>
                      )}
                      {attorney.phone && (
                        <a
                          href={`tel:${attorney.phone}`}
                          className="block w-full border-2 border-amber-700 text-amber-700 text-center font-semibold py-4 rounded-lg hover:bg-amber-50 transition-all text-base"
                        >
                          {attorney.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="md:col-span-3">
                  {/* Name and Title */}
                  <div className="mb-8">
                    <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">Legal Professional</span>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mt-3 mb-4">
                      {attorney.full_name}
                    </h1>
                    <p className="text-2xl text-slate-700 font-medium">
                      {attorney.job_title}
                    </p>
                  </div>

                  {/* Specializations */}
                  {attorney.specializations && (
                    <div className="mb-12 pt-8 border-t border-slate-200">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Areas of Practice</p>
                      <div className="flex flex-wrap gap-3">
                        {attorney.specializations.split(',').map((spec, index) => (
                          <span
                            key={index}
                            className="bg-amber-50 text-amber-900 text-sm px-4 py-2 rounded-full font-medium border border-amber-200"
                          >
                            {spec.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Short Bio / Author Statement */}
                  {attorney.short_bio && (
                    <div className="mb-8 bg-amber-50/40 border-l-4 border-amber-400 pl-6 py-4 rounded-r-lg italic text-slate-700 leading-relaxed">
                      "{attorney.short_bio}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Biography */}
                  {attorney.professional_background && (
                    <div className="mb-16">
                      <div className="mb-8">
                        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Professional Background</h2>
                        <div className="w-12 h-1 bg-gradient-to-r from-amber-700 to-amber-500 rounded"></div>
                      </div>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                        {attorney.professional_background}
                      </p>
                    </div>
                  )}
                </div>

                {/* Sidebar - Contact Details */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-gradient-to-br from-slate-50 to-amber-50 p-8 rounded-xl border border-slate-200">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">Quick Contact</h3>
                    
                    <div className="space-y-8">
                      {attorney.email && (
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-3">Email</p>
                          <a
                            href={`mailto:${attorney.email}`}
                            className="text-amber-700 hover:text-amber-900 font-semibold text-sm break-all transition-colors"
                          >
                            {attorney.email}
                          </a>
                        </div>
                      )}
                      {attorney.phone && (
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-3">Phone</p>
                          <a
                            href={`tel:${attorney.phone}`}
                            className="text-amber-700 hover:text-amber-900 font-semibold text-sm transition-colors"
                          >
                            {attorney.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <a
                        href="/appointments"
                        className="block w-full bg-amber-700 hover:bg-amber-800 text-white text-center font-semibold py-3 rounded-lg transition-all text-sm"
                      >
                        Schedule Consultation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-28 bg-gradient-to-r from-amber-700 to-amber-800 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-lg text-amber-50 mb-10 leading-relaxed max-w-2xl mx-auto">
                Get in touch with {attorney.full_name} to discuss how we can help with your legal needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/appointments"
                  className="inline-block bg-white hover:bg-amber-50 text-amber-700 font-semibold py-4 px-8 rounded-lg transition-all hover:shadow-lg text-base"
                >
                  Schedule a Consultation
                </a>
                <Link
                  href="/attorneys"
                  className="inline-block border-2 border-white hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg transition-all text-base"
                >
                  View Full Team
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Not Found State */}
      {!loading && !error && !attorney && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-40 text-center">
          <div className="text-6xl mb-6">⚖️</div>
          <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">Attorney Not Found</h3>
          <p className="text-lg text-slate-600 mb-10">The attorney you're looking for could not be found.</p>
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
