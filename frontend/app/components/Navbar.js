'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePracticeAreas } from '../hooks/usePracticeAreas';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    <nav className="bg-white text-amber-900 shadow-lg sticky top-0 z-50 border-b-4 border-amber-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between font-semibold items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <Image 
              src="/images/image.svg" 
              alt="Equity Law & Co Logo" 
              width={70} 
              height={70}
              className="object-contain"
            />
            <span className="hidden sm:inline text-amber-900 font-bold">Equity Law & Co</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-900 transition-colors">
              Home
            </Link>
            <Link href="/attorneys" className="hover:text-blue-900 transition-colors">
              Our Attorneys
            </Link>



            {/* Practice Areas Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 hover:text-blue-900 transition-colors py-2"
              >
                <span>Practice Areas</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-amber-50 rounded-lg shadow-xl border border-amber-300 py-2 z-10">
                  {loading ? (
                    <div className="px-4 py-2 text-amber-600 text-center">Loading...</div>
                  ) : error ? (
                    <div className="px-4 py-2 text-red-600 text-center">Error loading areas</div>
                  ) : practiceAreas.length === 0 ? (
                    <div className="px-4 py-2 text-amber-600 text-center">No practice areas available</div>
                  ) : (
                    practiceAreas.map((area) => (
                      <Link
                        key={area.id}
                        href={`/practice-areas/${area.id}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-amber-200 hover:text-amber-900 transition-colors text-amber-900"
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

            <Link href="/#about" className="hover:text-blue-900 transition-colors">
              About
            </Link>
            <Link href="/#contact" className="hover:text-blue-900 transition-colors">
              Contact
            </Link>
             <Link href="/" className="hover:text-blue-900 transition-colors">
              Blogs
            </Link>


            <button className="bg-amber-800 hover:bg-amber-900 px-6 py-2 rounded-lg ml-4 text-white transition-colors font-medium">
              Get Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 hover:bg-slate-700 rounded-lg">
              Home
            </Link>
            <Link href="/attorneys" className="block px-4 py-2 hover:bg-slate-700 rounded-lg">
              Our Attorneys
            </Link>

            {/* Mobile Practice Areas */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg flex items-center justify-between"
            >
              <span>Practice Areas</span>
              <svg
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="bg-slate-700 rounded-lg py-2 ml-4">
                {practiceAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/practice-areas/${area.id}`}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block px-4 py-2 hover:bg-slate-600 rounded transition-colors"
                  >
                    <div className="font-medium text-sm">{area.name}</div>
                  </Link>
                ))}
              </div>
            )}

            <Link href="/#about" className="block px-4 py-2 hover:bg-slate-700 rounded-lg">
              About
            </Link>
            <Link href="/#contact" className="block px-4 py-2 hover:bg-slate-700 rounded-lg">
              Contact
            </Link>
            <button className="w-full bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg transition-colors font-medium mt-2">
              Get Consultation
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
