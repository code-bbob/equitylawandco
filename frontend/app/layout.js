import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Equity Law & Co - Leading Legal Services',
  description: 'Professional legal services for all your business and personal needs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <Navbar />
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
