'use client';

import Link from 'next/link';
import { usePracticeAreas } from '../hooks/usePracticeAreas';

export default function PracticeAreasPreview() {
  const { practiceAreas, loading, error } = usePracticeAreas();

  return (
    <section className="py-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Our Practice Areas</h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            We provide comprehensive legal services across diverse practice areas
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-amber-800">Loading practice areas...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-700">Error loading practice areas</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area) => (
              <Link key={area.id} href={`/practice-areas/${area.id}`}>
                <div className="bg-amber-50 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full p-6 cursor-pointer hover:border-amber-700 border-2 border-amber-200">
                  <h3 className="text-xl font-bold text-amber-900 mb-3">{area.name}</h3>
                  <div
                    className="text-amber-800 text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: area.description
                        .replace(/src="\/media\//g, 'src="http://localhost:8000/media/')
                        .substring(0, 150) + '...',
                    }}
                  />
                  <div className="mt-4 inline-block text-amber-700 font-semibold hover:text-amber-900">
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
