'use client';

import { useAttorneys } from '../hooks/useAttorneys';
import AttorneyCard from '../components/AttorneyCard';

export default function AttorneysPage() {
  const { attorneys, loading, error } = useAttorneys();

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section with Brand Design */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50 py-16 md:py- relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -ml-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">Our Team</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4 mb-6">
              Meet Our Legal Experts
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed">
              Experienced legal professionals dedicated to providing exceptional counsel and strategic solutions. Each member brings specialized expertise and a commitment to your success.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py- bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-slate-600 text-lg font-medium">Loading our team...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <h3 className="text-red-800 font-semibold mb-2">Unable to Load Team</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Attorneys Grid */}
          {!loading && !error && attorneys.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {attorneys.map((attorney, idx) => (
                <div key={attorney.id} style={{transitionDelay: `${idx * 50}ms`}} className="animate-fade-in">
                  <AttorneyCard attorney={attorney} />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && attorneys.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Attorneys Found</h3>
              <p className="text-slate-600">
                Our team information is being updated. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {!loading && attorneys.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">{attorneys.length}+</div>
                <p className="text-slate-600 font-medium">Legal Professionals</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">20+</div>
                <p className="text-slate-600 font-medium">Years Combined Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">100%</div>
                <p className="text-slate-600 font-medium">Client Dedication</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!loading && attorneys.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-800 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Ready to Get Expert Legal Advice?
            </h2>
            <p className="text-lg text-amber-50 mb-8 leading-relaxed max-w-2xl mx-auto">
              Schedule a consultation with one of our attorneys to discuss your legal needs and explore how we can help.
            </p>
            <a
              href="/appointments"
              className="inline-block bg-white hover:bg-amber-50 text-amber-700 font-semibold py-3 px-8 rounded-lg transition-all hover:shadow-lg"
            >
              Schedule a Consultation
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
