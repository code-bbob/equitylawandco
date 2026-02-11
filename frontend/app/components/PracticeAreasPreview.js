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
    <section className="py-20 md:py-28 bg-amber-50">
      <div className="mx-auto px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center justify-between">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-amber-700 tracking-[0.2em] uppercase">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4 mb-5 leading-tight">
                Comprehensive Legal Representation<br />for Modern Challenges
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We provide sophisticated legal solutions tailored to your unique needs, combining decades of experience with innovative approaches to deliver exceptional results.
              </p>
            </div>
            {!loading && !error && practiceAreas.length > 0 && (
              <Link 
                href="/practice-areas" 
                className="hidden lg:flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all group whitespace-nowrap ml-8"
              >
                <span className="text-sm tracking-wide">VIEW ALL SERVICES</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            <p className="text-slate-600 mt-4">Loading practice areas...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg font-medium">Error loading practice areas</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedAreas.map((area) => (
                <Link key={area.id} href={`/practice-areas/${area.slug}`}>
                  <div className="group bg-white hover:bg-gradient-to-br hover:from-amber-50/40 hover:to-white rounded-xl p-8 transition-all duration-500 cursor-pointer border border-slate-100 hover:border-amber-200/50 h-full flex flex-col relative overflow-hidden">
                    {/* Subtle top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 group-hover:from-amber-600 group-hover:to-amber-700 transition-all duration-500 flex items-center justify-center shadow-sm group-hover:shadow-md">
                        <svg className="w-8 h-8 text-amber-700 group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 leading-tight group-hover:text-amber-800 transition-colors duration-300">
                      {area.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                      Navigating complex legal challenges with strategic insight and unwavering dedication to protect your interests and achieve optimal outcomes.
                    </p>
                    
                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm group-hover:text-amber-800 group-hover:gap-3 transition-all duration-300">
                      <span className="tracking-wide">LEARN MORE</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Show More Button */}
            {practiceAreas.length > initialDisplay && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="group flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all duration-300"
                >
                  <span>{showMore ? 'Show Less' : `View ${practiceAreas.length - initialDisplay} More Services`}</span>
                  <ChevronDown size={20} className={`transform transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}

            {/* Mobile View All Services Link */}
            <div className="lg:hidden text-center mt-10">
              <Link 
                href="/practice-areas" 
                className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800 hover:gap-3 transition-all"
              >
                <span className="text-sm tracking-wide">VIEW ALL SERVICES</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
