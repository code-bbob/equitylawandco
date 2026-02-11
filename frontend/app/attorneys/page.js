'use client';

import { useAttorneys } from '../hooks/useAttorneys';
import AttorneyCard from '../components/AttorneyCard';
import { useState } from 'react';

export default function AttorneysPage() {
  const { attorneys, loading, error } = useAttorneys();
  const [selectedFilter, setSelectedFilter] = useState('ALL PRACTICE AREAS');

  // Get unique practice areas from attorneys - split comma-separated strings
  const practiceAreas = ['ALL PRACTICE AREAS', ...new Set(
    attorneys.flatMap(attorney => 
      attorney.specializations 
        ? attorney.specializations.split(',').map(s => s.trim())
        : []
    ).filter(Boolean)
  )];

  // Filter attorneys based on selected practice area
  const filteredAttorneys = selectedFilter === 'ALL PRACTICE AREAS' 
    ? attorneys 
    : attorneys.filter(attorney => 
        attorney.specializations?.split(',').map(s => s.trim()).includes(selectedFilter)
      );

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header Section with Brand Design */}
      <section className="bg-amber-50 via-white to-amber-50 py-16 md:py-14 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -ml-40"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold text-amber-700 tracking-[0.2em] uppercase border border-amber-200 px-4 py-2 rounded mb-6">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4 mb-6">
              Meet the Minds Behind<br />
              <span className="text-amber-700">Our Success</span>
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed">
              A collective of seasoned legal professionals dedicated to upholding the principles of fairness, diligence, and equity. Each attorney brings a unique perspective and deep specialization to the firm.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-14">
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

          {/* Filter Tabs */}
          {!loading && !error && practiceAreas.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {practiceAreas.slice(0, 8).map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedFilter(area)}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
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
          {!loading && !error && filteredAttorneys.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredAttorneys.map((attorney, idx) => (
                <div key={attorney.id} style={{transitionDelay: `${idx * 50}ms`}} className="animate-fade-in">
                  <AttorneyCard attorney={attorney} />
                </div>
              ))}
            </div>
          )}

          {/* Empty State for No Attorneys */}
          {!loading && !error && attorneys.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Attorneys Found</h3>
              <p className="text-slate-600">
                Our team information is being updated. Please check back soon.
              </p>
            </div>
          )}

          {/* Empty State for Filter */}
          {!loading && !error && attorneys.length > 0 && filteredAttorneys.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-700 text-lg">No attorneys found for <span className="font-semibold">{selectedFilter}</span>.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {!loading && filteredAttorneys.length > 0 && (
        <section className="py-16 border border-t border-gray-300 bg-gray-100 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">{filteredAttorneys.length}+</div>
                <p className="text-black font-medium">Expert Attorneys</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">20+</div>
                <p className="text-black font-medium">Years Combined Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">100%</div>
                <p className="text-black font-medium">Client Dedication</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className='border border-gray-300 border-t'></div>

      
    </main>
  );
}
