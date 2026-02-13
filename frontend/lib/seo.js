// SEO Utilities for structured data and metadata

export const baseUrl = 'https://www.equitylawandco.com';

export const siteMetadata = {
  title: 'Equity Law & Co.',
  titleTemplate: '%s | Equity Law & Co.',
  description: 'Equity Law & Co. is a full-service law firm in Kathmandu, Nepal providing practical, reliable, and result-oriented legal solutions in Intellectual Property, Real Estate, Arbitration, Corporate Law, and more.',
  keywords: 'law firm Nepal, legal services Kathmandu, attorneys Nepal, corporate law, intellectual property law, real estate law, arbitration, Equity Law, equity law and co, equity law chamber',
  ogImage: `${baseUrl}/images/equitycover.jpg`,
};

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${baseUrl}/#organization`,
    name: 'Equity Law & Co.',
    alternateName: 'Equity Law Chamber',
    description: 'A full-service law firm in Nepal dedicated to delivering practical, reliable, and result-oriented legal solutions rooted in fairness and equity. Established in 2014 A.D., restructured in 2025 A.D.',
    url: baseUrl,
    logo: `${baseUrl}/images/image.svg`,
    image: `${baseUrl}/images/equitycover.jpg`,
    sameAs: [
      'https://www.facebook.com/equitylawandco',
      'https://www.linkedin.com/company/equitylawandco',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Thapagaun',
      addressLocality: 'Kathmandu',
      addressRegion: 'Bagmati',
      postalCode: '44600',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.6933',
      longitude: '85.3486',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+977-9841052926',
      contactType: 'Legal Services',
      availableLanguage: ['English', 'Nepali'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Nepal',
    },
    priceRange: '$$',
    foundingDate: '2014',
    knowsAbout: [
      'Intellectual Property Law',
      'Real Estate Law',
      'Arbitration',
      'Corporate Law',
      'Family Law',
      'Foreign Direct Investment',
    ],
    openingHours: 'Mo-Fr 09:00-18:00',
  };
}

export function generateAttorneySchema(attorney) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: attorney.full_name,
    jobTitle: attorney.job_title || 'Attorney at Law',
    image: attorney.photo_url,
    description: attorney.short_bio || attorney.professional_background || `${attorney.full_name} is an attorney at Equity Law & Co.`,
    url: `${baseUrl}/attorneys/${attorney.slug}`,
    knowsAbout: attorney.specializations?.split(',').map(s => s.trim()) || [],
    worksFor: {
      '@type': 'LegalService',
      name: 'Equity Law & Co.',
      url: baseUrl,
    },
    workLocation: {
      '@type': 'Place',
      name: 'Equity Law & Co.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
    },
    ...(attorney.email && { email: attorney.email }),
    ...(attorney.phone && { telephone: attorney.phone }),
  };
}

export function generateBlogSchema(blog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featured_image,
    datePublished: blog.published_date || blog.created_at,
    dateModified: blog.updated_date || blog.published_date || blog.created_at,
    author: {
      '@type': 'Person',
      name: blog.author || 'Equity Law & Co.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Equity Law & Co.',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/image.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/${blog.slug}`,
    },
    url: `${baseUrl}/blogs/${blog.slug}`,
  };
}

export function generatePracticeAreaSchema(area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: area.name,
    description: area.description?.replace(/<[^>]*>/g, '').substring(0, 300) || `${area.name} legal services at Equity Law & Co.`,
    provider: {
      '@type': 'LegalService',
      name: 'Equity Law & Co.',
      url: baseUrl,
    },
    url: `${baseUrl}/practice-areas/${area.slug}`,
    areaServed: {
      '@type': 'Country',
      name: 'Nepal',
    },
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url === '/' ? baseUrl : `${baseUrl}${item.url}`,
    })),
  };
}
