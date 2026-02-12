// Server-side API utility for static generation and ISR
import { cacheAttorneyImages, cacheBlogImages, cachePracticeAreaImages } from './image-cache';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchAttorneys() {
  try {
    const res = await fetch(`${BASE_URL}/attorneys/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch attorneys:', res.status);
      return [];
    }

    const data = await res.json();
    const attorneys = data.results || data;
    // Download and cache all attorney images at build ti
    return Promise.all(attorneys.map(cacheAttorneyImages));
  } catch (error) {
    console.warn('Error fetching attorneys from API:', error instanceof Error ? error.message : error);
    return [];
  }
}

export async function fetchAttorney(slug) {
  try {
    const res = await fetch(`${BASE_URL}/attorneys/${slug}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const attorney = await res.json();
    return cacheAttorneyImages(attorney);
  } catch (error) {
    console.warn('Error fetching attorney:', error instanceof Error ? error.message : error);
    return null;
  }
}

export async function fetchBlogs() {
  try {
    const res = await fetch(`${BASE_URL}/blogs/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch blogs:', res.status);
      return [];
    }

    const data = await res.json();
    const blogs = data.results || data;
    // Download and cache all blog images at build time
    return Promise.all(blogs.map(cacheBlogImages));
  } catch (error) {
    console.warn('Error fetching blogs from API:', error instanceof Error ? error.message : error);
    return [];
  }
}

export async function fetchBlog(slug) {
  try {
    console.log("API BASE_URL:", BASE_URL);

    const res = await fetch(`${BASE_URL}/blogs/${slug}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const blog = await res.json();
    return cacheBlogImages(blog);
  } catch (error) {
    console.warn('Error fetching blog:', error instanceof Error ? error.message : error);
    return null;
  }
}

export async function fetchPracticeAreas() {
  try {
    const res = await fetch(`${BASE_URL}/practice-areas/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch practice areas:', res.status);
      return [];
    }

    const data = await res.json();
    const areas = data.results || data;
    // Download and cache all practice area images at build time
    return Promise.all(areas.map(cachePracticeAreaImages));
  } catch (error) {
    console.warn('Error fetching practice areas from API:', error instanceof Error ? error.message : error);
    return [];
  }
}

export async function fetchPracticeArea(slug) {
  try {
    const res = await fetch(`${BASE_URL}/practice-areas/${slug}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const area = await res.json();
    return cachePracticeAreaImages(area);
  } catch (error) {
    console.warn('Error fetching practice area:', error instanceof Error ? error.message : error);
    return null;
  }
}
