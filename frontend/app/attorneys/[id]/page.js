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
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/attorneys" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            ← Back to Attorneys
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading attorney details...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-red-50 border border-red-200 p-6 rounded">
            <h3 className="text-red-900 font-semibold mb-2">Unable to Load Attorney</h3>
            <p className="text-red-800 text-sm mb-4">{error}</p>
            <Link href="/attorneys" className="text-red-700 hover:text-red-900 text-sm font-medium">
              Return to Team
            </Link>
          </div>
        </div>
      )}

      {/* Attorney Details */}
      {!loading && !error && attorney && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Left Column - Photo */}
            <div className="md:col-span-1">
              <div className="sticky top-20">
                {attorney.photo_url ? (
                  <img
                    src={attorney.photo_url}
                    alt={attorney.full_name}
                    className="w-full rounded aspect-square object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-5xl text-gray-400">👤</span>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="mt-8 space-y-3">
                  {attorney.email && (
                    <a
                      href={`mailto:${attorney.email}`}
                      className="block w-full bg-gray-900 text-white text-center font-semibold py-3 rounded hover:bg-gray-800 transition-colors text-sm"
                    >
                      Send Email
                    </a>
                  )}
                  {attorney.phone && (
                    <a
                      href={`tel:${attorney.phone}`}
                      className="block w-full border border-gray-300 text-gray-900 text-center font-semibold py-3 rounded hover:border-gray-900 transition-colors text-sm"
                    >
                      Call {attorney.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2">
              {/* Name and Title */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {attorney.full_name}
                </h1>
                <p className="text-lg text-gray-600">
                  {attorney.job_title}
                </p>
              </div>

              {/* Specializations */}
              {attorney.specializations && (
                <div className="mb-12">
                  <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Areas of Practice</h2>
                  <div className="flex flex-wrap gap-2">
                    {attorney.specializations.split(',').map((spec, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-900 text-sm px-3 py-1 rounded"
                      >
                        {spec.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Biography */}
              {attorney.bio && (
                <div className="mb-12">
                  <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Professional Background</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                    {attorney.bio}
                  </p>
                </div>
              )}

              {/* Contact Details */}
              <div className="border-t border-gray-200 pt-12">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Contact Information</h2>
                <div className="space-y-4">
                  {attorney.email && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                      <a
                        href={`mailto:${attorney.email}`}
                        className="text-gray-900 hover:text-gray-600 font-medium text-base break-all"
                      >
                        {attorney.email}
                      </a>
                    </div>
                  )}
                  {attorney.phone && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                      <a
                        href={`tel:${attorney.phone}`}
                        className="text-gray-900 hover:text-gray-600 font-medium text-base"
                      >
                        {attorney.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Back to Team */}
          <div className="mt-16 border-t border-gray-200 pt-12 text-center">
            <Link
              href="/attorneys"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              ← Back to Full Team
            </Link>
          </div>
        </div>
      )}

      {/* Not Found State */}
      {!loading && !error && !attorney && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Attorney Not Found</h3>
          <p className="text-gray-600 mb-8">The attorney you're looking for could not be found.</p>
          <Link
            href="/attorneys"
            className="inline-block bg-gray-900 text-white font-semibold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
          >
            Return to Team
          </Link>
        </div>
      )}
    </main>
  );
}
