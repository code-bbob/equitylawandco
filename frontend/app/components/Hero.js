"use client";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-60">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/equitycover.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* The "Magic" Overlay: Darkens the image so text is legible */}
        <div className="absolute inset-0 bg-amber-900/20 mix-blend-multiply"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/60"></div> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-6">
          <span className="text-xs font-bold text-amber-500 tracking-[0.2em] uppercase bg-amber-900/30 py-1 px-3 rounded-full backdrop-blur-sm">
            Excellence in Legal Services
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight text-white tracking-tight">
          Your Trusted Legal <span className="text-amber-500">Partner</span>
        </h1>

        {/* Changed text-slate-700 to text-slate-200 for better contrast on dark overlay */}
        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-sm">
          Practical, reliable, and result-oriented legal solutions founded on
          the principles of fairness, diligence, responsiveness, and equity.
          Trusted legal partner for businesses and individuals across Nepal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-md font-bold text-base transition-all shadow-xl active:scale-95">
            Schedule Consultation
          </button>
          <button className="backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-md font-bold text-base transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
