import { fetchAttorneys, fetchBlogs, fetchPracticeAreas } from '@/lib/api';
import { baseUrl } from '@/lib/seo';

export default async function sitemap() {
  const attorneys = await fetchAttorneys();
  const blogs = await fetchBlogs();
  const practiceAreas = await fetchPracticeAreas();

  const baseUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/attorneys`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/appointments`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const attorneyUrls = (attorneys || []).map((attorney) => ({
    url: `${baseUrl}/attorneys/${attorney.slug}`,
    lastModified: attorney.updated_at || new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogUrls = (blogs || []).map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updated_at || new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const practiceAreaUrls = (practiceAreas || []).map((area) => ({
    url: `${baseUrl}/practice-areas/${area.slug}`,
    lastModified: area.updated_at || new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...baseUrls, ...attorneyUrls, ...blogUrls, ...practiceAreaUrls];
}
