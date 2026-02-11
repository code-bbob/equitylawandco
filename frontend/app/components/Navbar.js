'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePracticeAreas } from '../hooks/usePracticeAreas';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

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
    <nav className="sticky top-0 z-50 bg-orange-100/90 backdrop-blur-md border-b border-amber-200">
      <div className="mx-auto px-4 sm:px-6 py-2 lg:px-24">
        <div className="flex justify-between items-center h-24 md:h-20">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="flex items-center space-x-4 group transition-all duration-300"
          >
            <div className="relative">
              <Image 
                src="/images/image.svg" 
                alt="Equity Law & Co Logo" 
                width={60} 
                height={60}
                className="object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-snug">
              <span className="text-lg sm:text-xl font-semibold text-slate-900 tracking-wide uppercase">Equity Law & Co.</span>
              <span className="text-xs text-slate-500 ml-2 tracking-[0.2em] uppercase">Attorneys at Law</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 text-slate-700">
            {/* Navigation Links */}
            <Link 
              href="/" 
              className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link 
              href="/about" 
              className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900"
            >
              <span className="relative z-10">About</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link 
              href="/attorneys" 
              className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900"
            >
              <span className="relative z-10">Attorneys</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* Practice Areas Dropdown */}
            <div className="relative px-2" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900 flex items-center gap-2"
              >
                <span className="relative z-10">Practice Areas</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-all duration-500 ${
                    isDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-500 group-hover:text-slate-900'
                  }`} 
                />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-2 mt-4 w-72 bg-orange-100 rounded-xl shadow-xl border border-slate-200 py-2 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  
                  {loading ? (
                    <div className="px-6 py-4 text-slate-500 text-center text-sm font-medium">Loading...</div>
                  ) : error ? (
                    <div className="px-6 py-4 text-red-500 text-center text-sm font-medium">Error loading areas</div>
                  ) : practiceAreas.length === 0 ? (
                    <div className="px-6 py-4 text-slate-500 text-center text-sm">No practice areas available</div>
                  ) : (
                    practiceAreas.map((area) => (
                      <Link
                        key={area.id}
                        href={`/practice-areas/${area.slug}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-slate-50"
                      >
                        {area.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <Link 
              href="/blogs" 
              className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900"
            >
              <span className="relative z-10">Insights</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link 
              href="/#contact" 
              className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* CTA Button */}
            <Link href="/appointments" className="ml-6 pl-6 border-l border-slate-200">
              <button className="relative group px-6 py-4 bg-blue-500 rounded-md font-semibold text-xs tracking-[0.18em] uppercase text-white transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md bg-slate-900 hover:bg-slate-800">
                <span className="relative z-10">Book Appointments</span>
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-colors duration-300 p-2 text-slate-800 hover:text-slate-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 space-y-1 border-t border-slate-200 bg-white animate-in slide-in-from-top-2 duration-200">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              Home
            </Link>

            <Link 
              href="/about" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              About
            </Link>

            <Link 
              href="/attorneys" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              Attorneys
            </Link>

            {/* Mobile Practice Areas */}
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="w-full text-left px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg flex items-center justify-between text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              <span>Practice Areas</span>
              <ChevronDown
                className={`w-4 h-4 transition-all duration-500 ${
                  isMobileDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-500'
                }`}
              />
            </button>

            {isMobileDropdownOpen && (
              <div className="bg-slate-50 rounded-lg py-2 mx-3 border border-slate-200">
                {loading ? (
                  <div className="px-6 py-4 text-slate-500 text-center text-sm font-medium">Loading...</div>
                ) : error ? (
                  <div className="px-6 py-4 text-red-500 text-center text-sm font-medium">Error loading areas</div>
                ) : practiceAreas.length === 0 ? (
                  <div className="px-6 py-4 text-slate-500 text-center text-sm">No practice areas available</div>
                ) : (
                  practiceAreas.map((area) => (
                    <Link
                      key={area.id}
                      href={`/practice-areas/${area.slug}`}
                      onClick={() => {
                        setIsMobileDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-white"
                    >
                      {area.name}
                    </Link>
                  ))
                )}
              </div>
            )}

            <Link 
              href="/blogs" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              Insights
            </Link>

            <Link 
              href="/#contact" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              Contact
            </Link>

            <Link href="/appointments">
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-full relative group px-6 py-4 mt-4 mx-3 rounded-full font-semibold text-xs tracking-[0.18em] uppercase text-white transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md bg-slate-900 hover:bg-slate-800"
              >
                <span className="relative z-10">Get Consultation</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
