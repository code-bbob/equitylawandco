'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePracticeAreas } from '../hooks/usePracticeAreas';
import { ChevronDown } from 'lucide-react';

export default function PracticeAreasPreview() {
  const { practiceAreas, loading, error } = usePracticeAreas();
  const [showMore, setShowMore] = useState(false);
  
  const initialDisplay = 6;
  const displayedAreas = showMore ? practiceAreas : practiceAreas.slice(0, initialDisplay);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase letter-spacing-1">Our Areas of Practice</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mt-5 mb-6"><span className='mx-4'>⚖</span> Practice Areas <span className='mx-4'>⚖</span></h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Comprehensive legal expertise across diverse practice areas designed to meet your specific needs
          </p>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            <p className="text-slate-600 mt-4 font-light">Loading practice areas...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg font-medium">Error loading practice areas</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedAreas.map((area) => (
                <Link key={area.id} href={`/practice-areas/${area.id}`}>
                  <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full p-8 cursor-pointer border border-amber-100 hover:border-amber-300 group hover:scale-105 hover:-translate-y-2 overflow-hidden">
                    {/* Subtle background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
                    
                    {/* Accent line */}
                    <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-amber-700 to-amber-500 transition-all duration-300"></div>
                    
                    {/* Content wrapper */}
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 mb-8 group-hover:from-amber-700 group-hover:to-amber-600 transition-all duration-300 flex items-center justify-center text-amber-700 group-hover:text-white transform group-hover:scale-110 shadow-sm group-hover:shadow-md">
                        <span className="text-3xl">⚖</span>
                      </div>
                      
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-amber-800 transition-colors duration-200 leading-tight">{area.name}</h3>
                      
                      <p className="text-slate-600 text-base leading-relaxed mb-8 flex-grow font-light">
                        Expert legal services in {area.name.toLowerCase()}. Click to learn more about our comprehensive approach and experience.
                      </p>
                      
                      {/* Divider line */}
                      <div className="w-12 h-0.5 bg-gradient-to-r from-amber-700 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4"></div>
                      
                      <div className="inline-flex items-center text-amber-700 font-semibold group-hover:text-amber-800 text-base transition-colors duration-200">
                        <span>Learn More</span>
                        <span className="ml-3 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {practiceAreas.length > initialDisplay && (
              <div className="flex justify-center pt-12">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-800 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 group text-base letter-spacing-0.5"
                >
                  <span>{showMore ? 'Show Less' : `Show More (${practiceAreas.length - initialDisplay} more)`}</span>
                  <ChevronDown size={20} className={`transform transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
