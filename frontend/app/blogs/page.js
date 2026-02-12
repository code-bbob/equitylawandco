import Link from 'next/link';
import { fetchBlogs } from '@/lib/api';
import { baseUrl } from '@/lib/seo';
import { Calendar, User, ChevronRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ScrollFadeIn from '../components/ScrollFadeIn';

export const metadata = {
  title: 'Legal Insights & News - Blog',
  description: 'Stay informed with the latest legal insights, articles, and news from Equity Law & Co. Expert analysis on Intellectual Property, Corporate Law, Real Estate, and more.',
  keywords: 'legal blog Nepal, law articles, legal insights, IP law blog, corporate law news, Equity Law blog',
  openGraph: {
    title: 'Legal Insights & News | Equity Law & Co.',
    description: 'Stay informed with the latest legal insights, articles, and news from Equity Law & Co.',
    url: `${baseUrl}/blogs`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/blogs`,
  },
};

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header Section */}
      <section className="bg-[url('/images/banner4.jpg')] bg-cover bg-[50%_60%] text-white py-10 sm:py-16">
        <div className=" mx-auto px-4 sm:px-6 lg:px-44">
          <FadeIn delay={100} duration={700} slideDistance={30}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Legal Insights & News</h1>
          </FadeIn>
          <FadeIn delay={250} duration={700}>
            <p className="text-base sm:text-lg text-amber-100 max-w-2xl">
              Stay informed with our latest articles on legal matters, industry insights, and updates that matter to you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Blogs List Section */}
      <section className="py-10 sm:py-16">
        <div className="px-4 sm:px-6 lg:px-44 mx-auto ">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-amber-800">No blogs available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {blogs.map((blog, index) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                <ScrollFadeIn duration={900} threshold={0.1} slideDistance={70}>
                  <article
                    className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100 hover-lift will-animate hover-slide"
                  >
                  {/* Featured Image */}
                  {blog.featured_image && (
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200">
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                      {blog.category && (
                        <div className="absolute top-4 right-4 bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold opacity-0">
                          {blog.category}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 relative">
                    <div className="text-sm font-bold text-amber-900 mb-3 line-clamp-2 hover:text-amber-700 transition-colors duration-300">
                      {blog.title}
                    </div>

                    <p className="text-amber-800 mb-4 line-clamp-3 text-xs">
                      {blog.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-amber-700 mb-4 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{formatDate(blog.published_date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{blog.author}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                      <button className="inline-flex items-center text-amber-700 hover:text-amber-900 font-semibold group transition-all duration-300">
                        Read More
                        <ChevronRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </button>
                  </div>
                  </article>
                </ScrollFadeIn>
                    </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
