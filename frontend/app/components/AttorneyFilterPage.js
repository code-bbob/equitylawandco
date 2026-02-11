'use client';

import { useState } from 'react';
import AttorneyCard from './AttorneyCard';

export default function AttorneyFilterPage({ attorneys, practiceAreas }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL PRACTICE AREAS');

  // Filter attorneys based on selected practice area
  const filteredAttorneys = selectedFilter === 'ALL PRACTICE AREAS' 
    ? attorneys 
    : attorneys.filter(attorney => 
        attorney.specializations?.split(',').map(s => s.trim()).includes(selectedFilter)
      );

  return (
    <>
      {/* Filter Tabs */}
      {practiceAreas.length > 1 && (
        <div className="flex overflow-x-auto pb-2 sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {practiceAreas.slice(0, 8).map((area) => (
            <button
              key={area}
              onClick={() => setSelectedFilter(area)}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 ${
                selectedFilter === area
                  ? 'bg-amber-700 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              {area.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Attorneys Grid */}
      {filteredAttorneys.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {filteredAttorneys.map((attorney, idx) => (
            <div key={attorney.id} style={{transitionDelay: `${idx * 50}ms`}} className="animate-fade-in">
              <AttorneyCard attorney={attorney} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State for Filter */}
      {attorneys.length > 0 && filteredAttorneys.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-700 text-lg">No attorneys found for <span className="font-semibold">{selectedFilter}</span>.</p>
        </div>
      )}

      {/* Stats Section */}
      {filteredAttorneys.length > 0 && (
        <section className="py-10 sm:py-16 border border-t border-gray-300 bg-gray-100 relative overflow-hidden mt-8 sm:mt-14">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-amber-700 mb-2">{filteredAttorneys.length}+</div>
                <p className="text-xs sm:text-base text-black font-medium">Expert Attorneys</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-amber-700 mb-2">20+</div>
                <p className="text-xs sm:text-base text-black font-medium">Years Combined Experience</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-amber-700 mb-2">100%</div>
                <p className="text-xs sm:text-base text-black font-medium">Client Dedication</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
