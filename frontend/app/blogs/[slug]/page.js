'use client';

import Link from 'next/link';
import { useBlog } from '../../hooks/useBlog';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const { blog, loading, error } = useBlog(slug);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!slug) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-amber-800 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
            <p className="mt-4 text-amber-800 text-lg">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/blogs">
            <button className="inline-flex items-center text-amber-700 hover:text-amber-900 font-semibold mb-8">
              <ArrowLeft size={18} className="mr-2" />
              Back to Blogs
            </button>
          </Link>

          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700 text-lg">
              Sorry, the blog you are looking for could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Back Link */}
      <div className="bg-white border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blogs">
            <button className="inline-flex items-center text-amber-700 hover:text-amber-900 font-semibold transition-colors">
              <ArrowLeft size={18} className="mr-2" />
              Back to Blogs
            </button>
          </Link>
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
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              {blog.category && (
                <span className="inline-block bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
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

            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            <p className="text-lg text-amber-800 leading-relaxed mb-8 italic border-l-4 border-amber-600 pl-4">
              {blog.excerpt}
            </p>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 prose prose-amber max-w-none">
            <div
              className="text-amber-900 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          </div>

          {/* Author Info Card */}
          <div className="mt-12 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-6 border border-amber-200">
            <h3 className="text-xl font-bold text-amber-900 mb-2">About the Author</h3>
            <p className="text-amber-800">
              {blog.author} is a legal professional with expertise in various areas of law. This article reflects their professional insights and analysis.
            </p>
          </div>

          {/* Related Articles Section */}
          <div className="mt-16 pt-12 border-t-2 border-amber-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-900">Explore More Articles</h2>
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
