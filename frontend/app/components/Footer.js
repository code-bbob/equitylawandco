'use client';

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Equity Law & Co</h3>
            <p className="text-sm">Leading the legal industry with integrity, expertise, and excellence.</p>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-amber-300">Home</a></li>
              <li><a href="/#about" className="hover:text-amber-300">About</a></li>
              <li><a href="/#contact" className="hover:text-amber-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@equitylaw.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Legal Ave, Suite 100</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-300">LinkedIn</a>
              <a href="#" className="hover:text-amber-300">Twitter</a>
              <a href="#" className="hover:text-amber-300">Facebook</a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-8 text-center text-sm">
          <p>&copy; 2025 Equity Law & Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
