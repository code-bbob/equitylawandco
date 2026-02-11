import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LenisScroll from './components/LenisScroll';
import './globals.css';
import { Noto_Sans, Parisienne } from 'next/font/google';
import { fetchPracticeAreas } from '@/lib/api';
import { generateOrganizationSchema, siteMetadata, baseUrl } from '@/lib/seo';

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
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Equity Law & Co. - Leading Law Firm in Nepal',
    template: '%s | Equity Law & Co.',
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: 'Equity Law & Co.' }],
  creator: 'Equity Law & Co.',
  publisher: 'Equity Law & Co.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Equity Law & Co.',
    title: 'Equity Law & Co. - Leading Law Firm in Nepal',
    description: siteMetadata.description,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Equity Law & Co. - Attorneys at Law',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equity Law & Co. - Leading Law Firm in Nepal',
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Add your Google Search Console verification here
    // google: 'your-verification-code',
  },
};

export default async function RootLayout({ children }) {
  const practiceAreas = await fetchPracticeAreas();

  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={parisienne.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={notoSans.className}>
        <LenisScroll />
        <div className="relative">
          <Navbar practiceAreas={practiceAreas} />
          <main className="min-h-screen">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
