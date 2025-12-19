import Hero from './components/Hero';
import PracticeAreasPreview from './components/PracticeAreasPreview';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <PracticeAreasPreview />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">Why We Stand Out</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-8 leading-tight">Trusted Expertise<br/><span className="text-amber-700">You Deserve</span></h2>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Over 20 years of proven legal excellence</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Dedicated team of seasoned professionals</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Personalized approach to every client</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Track record of winning outcomes</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-base leading-relaxed">Round-the-clock support for urgent matters</span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-700 h-96 rounded-lg shadow-md flex items-center justify-center text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div></div>
              <div className="relative z-10">
                <div className="text-6xl font-bold mb-3">20+</div>
                <div className="text-lg font-normal">Years of Excellence</div>
                <div className="text-sm text-amber-100 mt-4">Serving clients with distinction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full opacity-5 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100 rounded-full opacity-5 -ml-40 -mb-40"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
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
                  <p className="text-slate-600 text-sm mt-0.5">info@equitylaw.com</p>
                  <p className="text-xs text-amber-700 mt-1">Response within 24h</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 pb-4 border-b border-amber-100">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                  <span className="text-lg">📞</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm">Phone</h3>
                  <p className="text-slate-600 text-sm mt-0.5">(555) 123-4567</p>
                  <p className="text-xs text-amber-700 mt-1">9 AM - 6 PM EST</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                  <span className="text-lg">📍</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm">Office</h3>
                  <p className="text-slate-600 text-sm mt-0.5">123 Legal Ave, Suite 100</p>
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
