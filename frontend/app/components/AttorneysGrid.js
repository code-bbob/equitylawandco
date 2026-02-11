import Link from 'next/link';
import { generateAttorneySchema } from '@/lib/seo';

export default function AttorneysGrid({ attorneys }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {attorneys.map((attorney) => (
          <article key={attorney.id} className="group">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAttorneySchema(attorney)) }}
              suppressHydrationWarning
            />
            <Link
              href={`/attorneys/${attorney.slug}`}
              className="block bg-white rounded overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-[40vh] bg-gray-100 overflow-hidden">
                {attorney.photo_url ? (
                  <img
                    src={attorney.photo_url}
                    alt={attorney.full_name}
                    className="w-full h-full object-cover object-[50%_10%] transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl text-gray-300">👤</span>
                  </div>
                )}

                {/* Overlay Label */}
                <div className="absolute hover:backdrop-blur-sm text-center bottom-0 left-0 right-0 p-6 bg-transparent bg-black/20 bg-opacity-80">
                  <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
                    {attorney.job_title || 'Attorney at Law'}
                  </p>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {attorney.full_name}
                  </h3>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
