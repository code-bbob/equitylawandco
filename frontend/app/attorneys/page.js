import { fetchAttorneys } from '@/lib/api';
import { baseUrl } from '@/lib/seo';
import AttorneyFilterPage from '../components/AttorneyFilterPage';
import FadeIn from '../components/FadeIn';

export const metadata = {
  title: 'Our Attorneys - Meet Our Legal Team',
  description: 'Meet the experienced attorneys at Equity Law & Co. Our team of legal professionals specializes in Intellectual Property, Real Estate, Corporate Law, Arbitration, and more.',
  keywords: 'attorneys Nepal, lawyers Kathmandu, legal team, Equity Law attorneys, IP lawyer Nepal, corporate lawyer Nepal',
  openGraph: {
    title: 'Our Attorneys | Equity Law & Co.',
    description: 'Meet the experienced attorneys at Equity Law & Co. Our team of legal professionals specializes in Intellectual Property, Real Estate, Corporate Law, and more.',
    url: `${baseUrl}/attorneys`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/attorneys`,
  },
};

export default async function AttorneysPage() {
  const attorneys = await fetchAttorneys();

  // Get unique practice areas from attorneys
  const practiceAreas = ['ALL PRACTICE AREAS', ...new Set(
    attorneys.flatMap(attorney => 
      attorney.specializations 
        ? attorney.specializations.split(',').map(s => s.trim())
        : []
    ).filter(Boolean)
  )];

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header Section with Brand Design */}
      <section className="bg-amber-50 via-white to-amber-50 py-10 sm:py-16 md:py-14 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -ml-40"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn delay={100} duration={700}>
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold text-amber-700 tracking-[0.2em] uppercase border border-amber-200 px-4 py-2 rounded mb-6">
                Our Team
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4 mb-6">
                Meet the Minds Behind<br />
                <span className="text-amber-700">Our Success</span>
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                A collective of seasoned legal professionals dedicated to upholding the principles of fairness, diligence, and equity. Each attorney brings a unique perspective and deep specialization to the firm.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {attorneys.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Attorneys Found</h3>
              <p className="text-slate-600">
                Our team information is being updated. Please check back soon.
              </p>
            </div>
          ) : (
            <AttorneyFilterPage attorneys={attorneys} practiceAreas={practiceAreas} />
          )}
        </div>
      </section>

      <div className='border border-gray-300 border-t'></div>

      
    </main>
  );
}
