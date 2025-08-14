import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fastcalculator.co'
  
  // Canonical URL Strategy:
  // - Homepage: https://fastcalculator.co (canonical) - INCLUDED in sitemap
  // - Mortgage Calculator: https://fastcalculator.co/mortgage-calculator (canonical) - INCLUDED in sitemap
  // - Shared Calculations: Each has its own canonical URL but EXCLUDED from sitemap (dynamic content)
  // - Section pages (#features, #calculators, etc.) are anchor links, not separate pages - EXCLUDED from sitemap
  // - Static files (robots.txt, sitemap.xml) are not pages - EXCLUDED from sitemap
  
  return [
    // Canonical Pages Only
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/mortgage-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    // Note: Section pages (#features, #calculators, #guide, #faq) are anchor links
    // within existing pages, not separate pages, so they are not included in sitemap.
    // Users can access these sections by navigating within the main pages.
    
    // Note: Shared calculation pages are dynamic and should only be included
    // if they have unique, valuable content that should be indexed.
    // For now, they are excluded to avoid potential duplicate content issues.
    
    // Note: Static files (robots.txt, sitemap.xml) are not pages and should not be in sitemap.
    
    // Future Important Pages (commented out until created)
    // {
    //   url: `${baseUrl}/privacy-policy`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.5,
    // },
    // {
    //   url: `${baseUrl}/terms-of-service`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.5,
    // },
    // {
    //   url: `${baseUrl}/help`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },
  ]
} 