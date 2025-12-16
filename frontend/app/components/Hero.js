'use client';

export default function Hero() {
  return (
    <section className="bg-[var(--brand)] text-amber-900 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Leading the Legal Industry
        </h1>
        <p className="text-xl md:text-2xl text-amber-800 mb-8 max-w-3xl mx-auto">
          Equity Law & Co delivers exceptional legal solutions with integrity, expertise, and unwavering commitment to our clients' success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors">
            Schedule Consultation
          </button>
          <button className="border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
