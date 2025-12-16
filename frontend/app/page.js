import Hero from './components/Hero';
import PracticeAreasPreview from './components/PracticeAreasPreview';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <PracticeAreasPreview />

      {/* About Section */}
      <section id="about" className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">Why Choose Us</h2>
              <ul className="space-y-4 text-amber-800">
                <li className="flex items-start">
                  <span className="text-amber-800 font-bold mr-4">✓</span>
                  <span>Over 20 years of legal excellence and industry leadership</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-800 font-bold mr-4">✓</span>
                  <span>Team of experienced and dedicated legal professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-800 font-bold mr-4">✓</span>
                  <span>Client-focused approach with personalized solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-800 font-bold mr-4">✓</span>
                  <span>Proven track record of successful cases and satisfied clients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-800 font-bold mr-4">✓</span>
                  <span>24/7 availability for urgent legal matters</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-amber-700 to-amber-900 h-80 rounded-lg shadow-lg flex items-center justify-center text-white text-center">
              <div>
                <div className="text-5xl font-bold mb-2">20+</div>
                <div className="text-lg">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-amber-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Contact Us</h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              Have a question or need legal assistance? Fill out the form below and our team will get back to you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-amber-50 p-6 rounded-lg shadow-md border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-2 text-lg">Email</h3>
                <p className="text-amber-800">info@equitylaw.com</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg shadow-md border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-2 text-lg">Phone</h3>
                <p className="text-amber-800">(555) 123-4567</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg shadow-md border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-2 text-lg">Office</h3>
                <p className="text-amber-800">123 Legal Ave, Suite 100</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg border border-amber-300">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
