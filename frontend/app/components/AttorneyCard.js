'use client';

import Link from 'next/link';

export default function AttorneyCard({ attorney }) {
  const { slug, full_name, job_title, photo_url } = attorney;
  
  // Pastel color rotation for card backgrounds
  const colors = [
    // 'bg-yellow-100',
    // 'bg-pink-100',
    'bg-lime-100',
    'bg-purple-100',
    'bg-amber-100',
    'bg-stone-200',
    'bg-zinc-200'
  ];
  
  // Use attorney id to select a consistent color
  const colorIndex = (attorney.id % colors.length);
  const bgColor = colors[colorIndex];

  return (
    <Link href={`/attorneys/${slug}`}>
      <div className="group cursor-pointer py-10 text-center">
        {/* Circular Photo */}
        <div className="mb-6 flex justify-center relative z-10">
          <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow">
            {photo_url ? (
              <img
                src={photo_url}
                alt={full_name}
                className="w-full h-full object-cover object-[50%_10%] rounded-lg shadow-xl group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                <span className="text-4xl text-slate-400">👤</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Colored Card Background */}
        <div className={`${bgColor} rounded-md shadow-md hover:shadow-lg transition-all group-hover:scale-105 -mt-16 sm:-mt-20 pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 md:h-48`}>
          <h3 className="text-lg font-semibold text-slate-900">
            {full_name}
          </h3>
          <p className="text-sm text-slate-700 mt-1">
            {job_title}
          </p>
        </div>
      </div>
    </Link>
  );
}
