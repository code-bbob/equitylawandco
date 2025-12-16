'use client';

import Link from 'next/link';

export default function AttorneyCard({ attorney }) {
  const { slug, full_name, job_title, photo_url } = attorney;

  return (
    <Link href={`/attorneys/${slug}`}>
      <div className="bg-transparent hover:opacity-80 transition-opacity cursor-pointer text-center">
        {/* Photo Container */}
        <div className="mb-6 flex justify-center">
          <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-200">
            {photo_url ? (
              <img
                src={photo_url}
                alt={full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl text-gray-400">👤</span>
            )}
          </div>
        </div>
        {/* Info */}
        <h3 className="text-lg font-semibold text-gray-900">
          {full_name}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {job_title}
        </p>
      </div>
    </Link>
  );
}
