'use client';

export default function Hero() {
  return (
    <section className="bg-amber-50 text-slate-900 py-32 md:py-40 relative overflow-hidden">
      {/* Subtle decorative accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-48 -mt-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-6">
          <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">Excellence in Legal Services</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-slate-900 tracking-tight">
          Your Trusted Legal <span className="text-amber-700">Partner</span>
        </h1>
        <p className="text-base md:text-lg text-slate-700 mb-10 max-w-3xl mx-auto leading-relaxed font-normal">
          Strategic legal solutions with integrity, expertise, and unwavering commitment to your success. Trusted by industry leaders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold text-base transition-all hover:shadow-lg">
            Schedule Consultation
          </button>
          <button className="border-2 border-amber-600 text-amber-700 hover:bg-amber-100 hover:border-amber-700 px-8 py-3 rounded-lg font-semibold text-base transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
