"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-end justify-center overflow-hidden py-20">
      {/* Background Image - scrolls normally with page */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/equitycover.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "top 30% center",
        }}
      >
                {/* <div className="absolute inset-0 bg-amber-100/0 mix-blend-multiply"></div> */}
      
        {/* Sophisticated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      </div>

      {/* Content positioned at bottom to avoid faces */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pb-24">
        {/* Refined Badge */}
        <div className="mb-6 inline-block">
          <span className="text-xs font-semibold text-amber-400 tracking-[0.15em] uppercase bg-black/30 py-2 px-4 rounded-lg backdrop-blur-md border border-amber-500/30 transition-all duration-300">
            Excellence in Legal Services
          </span>
        </div>

        {/* Professional Headline */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight text-white tracking-tight drop-shadow-lg max-w-4xl mx-auto">
          Your Trusted Legal <span className="text-amber-400">Partner</span>
        </h1>

        {/* Description - Clean and Professional */}
        <p className="text-base md:text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
          Practical, reliable, and result-oriented legal solutions founded on
          the principles of fairness, diligence, responsiveness, and equity.
        </p>

        {/* Simplified CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/appointments">
            <button className="px-8 py-3 rounded-lg font-semibold text-base text-white bg-amber-600 hover:bg-amber-700 transition-all duration-300 hover:shadow-lg active:scale-95 backdrop-blur-sm">
              Schedule Consultation
            </button>
          </Link>

          <button className="px-8 py-3 rounded-lg font-semibold text-base text-white border border-white/40 hover:border-amber-400/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll Indicator - Enhanced */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-70 hover:opacity-100 transition-opacity flex flex-col items-center gap-2 cursor-pointer">
        <span className="text-xs text-amber-200 font-semibold tracking-widest uppercase">Scroll to explore</span>
        <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
