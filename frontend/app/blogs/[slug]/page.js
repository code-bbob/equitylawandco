import Link from 'next/link';
import { fetchBlogs, fetchBlog } from '@/lib/api';
import { generateBlogSchema, generateBreadcrumbSchema, baseUrl } from '@/lib/seo';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';

// Generate static pages for all blogs at build time
export async function generateStaticParams() {
  const blogs = await fetchBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Dynamic metadata for each blog post
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt || `Read ${blog.title} by ${blog.author} on Equity Law & Co.'s legal insights blog.`,
    keywords: `${blog.title}, ${blog.category || ''}, legal blog, law article, ${blog.author}`,
    openGraph: {
      title: `${blog.title} | Equity Law & Co.`,
      description: blog.excerpt || blog.title,
      url: `${baseUrl}/blogs/${blog.slug}`,
      type: 'article',
      publishedTime: blog.published_date,
      modifiedTime: blog.updated_date,
      authors: [blog.author],
      images: blog.featured_image ? [{ url: blog.featured_image, alt: blog.title }] : [],
    },
    alternates: {
      canonical: `${baseUrl}/blogs/${blog.slug}`,
    },
  };
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    notFound();
  }

  const blogSchema = generateBlogSchema(blog);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '/blogs' },
    { name: blog.title, url: `/blogs/${blog.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-amber-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm sm:text-md text-amber-700 overflow-hidden">
            <Link href="/" className="hover:text-amber-900 transition-colors flex-shrink-0">
              Home
            </Link>
            <ChevronRight size={16} className="flex-shrink-0" />
            <Link href="/blogs" className="hover:text-amber-900 transition-colors flex-shrink-0">
              Blogs
            </Link>
            <ChevronRight size={16} className="flex-shrink-0" />
            <span className="text-amber-900 font-semibold truncate">Article: {blog.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {blog.featured_image && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-48 sm:h-72 md:h-96 object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              {blog.category && (
                <span className="inline-block bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold opacity-0">
                  {blog.category}
                </span>
              )}
              <div className="flex items-center space-x-6 text-sm text-amber-700">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{formatDate(blog.published_date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{blog.author}</span>
                </div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            <p className="text-base text-amber-800 leading-relaxed mb-8 italic border-l-4 border-amber-600 pl-4">
              {blog.excerpt}
            </p>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8 md:p-12 prose prose-amber max-w-none">
            <div
              className="text-amber-900 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          </div>

          {/* Author Info Card */}
          <div className="mt-8 sm:mt-12 bg-orange-100 rounded-lg p-5 sm:p-8 border border-amber-200 shadow-md">
            <h3 className="text-lg font-bold text-amber-900 mb-3">About the Author</h3>
            <p className="text-amber-800 leading-relaxed">
              <span className='font-bold'>{blog.author}</span> is a legal professional with expertise in various areas of law. This article reflects their professional insights and analysis.
            </p>
          </div>

          {/* Related Articles Section */}
          <div className="mt-10 sm:mt-16 pt-8 sm:pt-12 border-t-2 border-amber-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-900">Explore More Articles</h2>
              <p className="text-amber-800 mt-2">Discover more legal insights and news</p>
            </div>

            <Link href="/blogs">
              <button className="mx-auto block px-8 py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors">
                View All Blogs
              </button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
