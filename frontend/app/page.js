import Hero from './components/Hero';
import PracticeAreasPreview from './components/PracticeAreasPreview';
import ContactForm from './components/ContactForm';
import AttorneyFilterHome from './components/AttorneyFilterHome';
import { fetchAttorneys } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {
  const attorneys = await fetchAttorneys();

  // Get unique practice areas from attorneys - split comma-separated strings
  const practiceAreas = ['ALL PRACTICE AREAS', ...new Set(
    attorneys.flatMap(attorney => 
      attorney.specializations 
        ? attorney.specializations.split(',').map(s => s.trim())
        : []
    ).filter(Boolean)
  )];

  return (
    <>
      <Hero />
      <PracticeAreasPreview />

      {/* Hear from Our Attorneys Section */}
      <section className="py-12 sm:py-20 md:py-18 bg-gray-100">
        <div className="mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-amber-700 tracking-[0.2em] uppercase border border-amber-200 px-4 py-2 rounded mb-6">
              Our Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              Meet the Minds Behind<br />
              <span className="text-amber-700">Our Success</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A collective of seasoned legal professionals dedicated to upholding the principles of fairness, diligence, and equity. Each attorney brings a unique perspective and deep specialization to the firm.
            </p>
          </div>

          {attorneys.length > 0 ? (
            <AttorneyFilterHome attorneys={attorneys} practiceAreas={practiceAreas} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-700 text-lg">No attorneys found.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 md:py-48 bg-white">
        <div className=" mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">About Equity Law & Co.</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-6 md:mb-8 leading-tight">A Legacy Rooted in<br/><span className="text-amber-700">Principles of Equity</span></h2>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Roots in Sahara Law Chamber, established in 1998 A.D.</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Evolved into Equity Law Chamber in 2014, restructured as Equity Law & Co. in 2025</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Core pillars: Fairness, Diligence, Responsiveness & Equity</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Practical, reliable, and result-oriented legal solutions</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Expertise in IP, Real Estate, Arbitration & Corporate Law</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Committed to highest standards of professional ethics</span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-700 h-64 md:h-96 rounded-lg shadow-md flex items-center justify-center text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div></div>
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-bold mb-3">27+</div>
                <div className="text-lg font-normal">Years of Legal Practice</div>
                <div className="text-sm text-amber-100 mt-4">Since Sahara Law Chamber, 1998</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-12 sm:py-24 bg-amber-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full opacity-5 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100 rounded-full opacity-5 -ml-40 -mb-40"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-20">
            <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about your legal needs? Our experienced team is standing by to provide expert guidance and support tailored to your situation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info - Horizontal Layout */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-start space-x-4 pb-4 border-b border-amber-100">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                  <span className="text-lg">✉</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm">Email</h3>
                  <p className="text-slate-600 text-sm mt-0.5">contact@equitylaw.com</p>
                  <p className="text-xs text-amber-700 mt-1">Response within 24h</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 pb-4 border-b border-amber-100">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                  <span className="text-lg">📞</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm">Phone</h3>
                  <p className="text-slate-600 text-sm mt-0.5">+977 9841052926</p>
                  <p className="text-xs text-amber-700 mt-1">9 AM - 6 PM NPT</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                  <span className="text-lg">📍</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm">Office</h3>
                  <p className="text-slate-600 text-sm mt-0.5">Thapagaun, Kathmandu-10, Nepal</p>
                  <p className="text-xs text-amber-700 mt-1">Walk-ins welcome</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-lg border border-amber-200 shadow-sm">
              <div className="mb-8 pb-8 border-b border-amber-100">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Send us a Message</h3>
                <p className="text-slate-600 text-sm">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
