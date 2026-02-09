import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LenisScroll from './components/LenisScroll';
import './globals.css';
import { Noto_Sans, Parisienne } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-parisienne',
});

export const metadata = {
  title: 'Equity Law & Co - Leading Legal Services',
  description: 'Professional legal services for all your business and personal needs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={parisienne.variable}>
      <body className={notoSans.className}>
        <LenisScroll />
        <div className="relative">
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
