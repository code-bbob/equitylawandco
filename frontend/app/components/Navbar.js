'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePracticeAreas } from '../hooks/usePracticeAreas';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { practiceAreas, loading, error } = usePracticeAreas();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-orange-100 text-slate-800 shadow-sm sticky top-0 z-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/images/image.svg" 
              alt="Equity Law & Co Logo" 
              width={60} 
              height={60}
              className="object-contain"
            />
            <span className="hidden sm:inline text-amber-900 text-xl font-semibold text-base tracking-tight">Equity Law & Co.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center text-lg space-x-8">
            <Link href="/" className="text-slate-700 hover:text-slate-900 hover:scale-105 transition-colors  font-medium">
              Home
            </Link>

            <Link href="/about" className="text-slate-700 hover:text-slate-900 hover:scale-105 transition-colors font-medium">
              About
            </Link>
            <Link href="/attorneys" className="text-slate-700 hover:text-slate-900 hover:scale-105 transition-colors font-medium">
              Our Attorneys
            </Link>



            {/* Practice Areas Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 transition-colors py-2 font-medium"
              >
                <span>Practice Areas</span>
                <ChevronDown className={`w-4 h-4 transition-transform hover:scale-105 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-md border border-slate-200 py-1 z-10">
                  {loading ? (
                    <div className="px-4 py-2 text-slate-500 text-center text-sm">Loading...</div>
                  ) : error ? (
                    <div className="px-4 py-2 text-red-500 text-center text-sm">Error loading areas</div>
                  ) : practiceAreas.length === 0 ? (
                    <div className="px-4 py-2 text-slate-500 text-center text-sm">No practice areas available</div>
                  ) : (
                    practiceAreas.map((area) => (
                      <Link
                        key={area.id}
                        href={`/practice-areas/${area.id}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-slate-50 text-slate-700 transition-colors text-sm"
                      >
                        <div className="font-medium">{area.name}</div>
                        {/* <div className="text-xs text-gray-400 line-clamp-1">
                          {area.description.replace(/<[^>]*>/g, '')}
                        </div> */}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
            <Link href="/#contact" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              Contact
            </Link>

            <Link href="/blogs" className="text-slate-700 hover:text-slate-900 transition-colors  font-medium">
              Blogs
            </Link>
            <Link href="/appointments">
            <button className="bg-amber-700 hover:bg-amber-800 px-6 py-2 rounded-lg ml-6 text-white transition-all hover:shadow-md font-medium text-sm">
              Get Consultation
            </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-slate-100">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-slate-50 rounded-md text-slate-700 text-sm">
              Home
            </Link>
            <Link href="/attorneys" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-slate-50 rounded-md text-slate-700 text-sm">
              Our Attorneys
            </Link>

            {/* Mobile Practice Areas */}
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-md flex items-center justify-between text-slate-700 text-sm"
            >
              <span>Practice Areas</span>
              <svg
                className={`w-4 h-4 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {isMobileDropdownOpen && (
              <div className="bg-slate-50 rounded-md py-2 ml-4">
                {loading ? (
                  <div className="px-4 py-2 text-slate-500 text-center text-sm">Loading...</div>
                ) : error ? (
                  <div className="px-4 py-2 text-red-500 text-center text-sm">Error loading areas</div>
                ) : practiceAreas.length === 0 ? (
                  <div className="px-4 py-2 text-slate-500 text-center text-sm">No practice areas available</div>
                ) : (
                  practiceAreas.map((area) => (
                    <Link
                      key={area.id}
                      href={`/practice-areas/${area.id}`}
                      onClick={() => {
                        setIsMobileDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-slate-100 rounded transition-colors text-slate-700 text-sm"
                    >
                      <div className="font-medium">{area.name}</div>
                    </Link>
                  ))
                )}
              </div>
            )}

            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-slate-50 rounded-md text-slate-700 text-sm">
              About
            </Link>
            <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-slate-50 rounded-md text-slate-700 text-sm">
              Blogs
            </Link>
            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-slate-50 rounded-md text-slate-700 text-sm">
              Contact
            </Link>
            <Link href="/appointments">
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-slate-800 hover:bg-slate-900 px-4 py-2 rounded-md transition-colors font-medium mt-2 text-white text-sm">
                Get Consultation
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
