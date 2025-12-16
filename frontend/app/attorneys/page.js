'use client';

import { useAttorneys } from '../hooks/useAttorneys';
import AttorneyCard from '../components/AttorneyCard';

export default function AttorneysPage() {
  const { attorneys, loading, error } = useAttorneys();

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Attorneys
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Meet our experienced team of legal professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-gray-600 text-lg">Loading our team...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h3 className="text-red-800 font-semibold mb-2">Unable to Load Team</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Attorneys Grid */}
          {!loading && !error && attorneys.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {attorneys.map((attorney) => (
                <AttorneyCard key={attorney.id} attorney={attorney} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && attorneys.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Attorneys Found</h3>
              <p className="text-gray-600">
                Our team information is being updated. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!loading && attorneys.length > 0 && (
        <section className="border-t border-gray-200 py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Schedule a Consultation
            </h2>
            <p className="text-gray-600 mb-6">
              Contact one of our attorneys to discuss your legal needs.
            </p>
            <a
              href="/appointments"
              className="inline-block bg-gray-900 text-white font-semibold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
            >
              Book an Appointment
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
