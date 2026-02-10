'use client';

export default function Footer() {
  return (
    <footer className="bg-orange-100 py-16 border-t-1 border-amber-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className=" border-amber-700 pl-6">
            <h3 className="text-amber-900 font-bold text-xl mb-3">Equity Law & Co</h3>
            <p className="text-amber-800 text-sm leading-relaxed">Leading the legal industry with integrity, expertise, and excellence for over 20 years.</p>
          </div>

          {/* Quick Links */}
          <div className="border-l-2 border-amber-600 pl-6">
            <h4 className="text-amber-900 font-bold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-amber-800 hover:text-amber-900 hover:underline font-medium transition-colors">Home</a></li>
              <li><a href="/#about" className="text-amber-800 hover:text-amber-900 hover:underline font-medium transition-colors">About</a></li>
              <li><a href="/#contact" className="text-amber-800 hover:text-amber-900 hover:underline font-medium transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="border-l-2 border-amber-500 pl-6">
            <h4 className="text-amber-900 font-bold text-lg mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="text-amber-700 font-semibold">Email:</span> <a href="mailto:info@equitylaw.com" className="text-amber-800 hover:text-amber-900 hover:underline font-medium transition-colors">info@equitylaw.com</a></li>
              <li><span className="text-amber-700 font-semibold">Phone:</span> <a href="tel:+15551234567" className="text-amber-800 hover:text-amber-900 hover:underline font-medium transition-colors">(555) 123-4567</a></li>
              <li><span className="text-amber-700 font-semibold">Address:</span> <span className="text-amber-800 font-medium">123 Legal Ave, Suite 100</span></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="border-l-2 border-amber-400 pl-6">
            <h4 className="text-amber-900 font-bold text-lg mb-5">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="#" className="h-10 w-10 rounded-lg bg-amber-700 hover:bg-amber-800 transition-colors flex items-center justify-center text-sm text-white font-bold border border-amber-600">in</a>
              <a href="#" className="h-10 w-10 rounded-lg bg-amber-700 hover:bg-amber-800 transition-colors flex items-center justify-center text-sm text-white font-bold border border-amber-600">𝕏</a>
              <a href="#" className="h-10 w-10 rounded-lg bg-amber-700 hover:bg-amber-800 transition-colors flex items-center justify-center text-sm text-white font-bold border border-amber-600">f</a>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-amber-200 pt-8 text-center text-sm text-amber-700">
          <p><span className="font-semibold">&copy; 2025 Equity Law & Co.</span> All rights reserved. <span className="mx-2">•</span> <a href="#" className="hover:text-amber-900 hover:underline font-medium transition-colors">Privacy Policy</a> <span className="mx-2">•</span> <a href="#" className="hover:text-amber-900 hover:underline font-medium transition-colors">Terms</a></p>
        </div>
      </div>
    </footer>
  );
}
