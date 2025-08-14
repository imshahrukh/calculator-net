import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fastcalculator.co'
  
  // Canonical URL Strategy:
  // - Homepage: https://fastcalculator.co (canonical)
  // - Mortgage Calculator: https://fastcalculator.co/mortgage-calculator (canonical)
  // - Shared Calculations: Each has its own canonical URL based on the share ID
  // - Section pages (#features, #calculators, etc.) are not separate pages, just anchors
  
  return [
    // Main Pages
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
    
    // Homepage Sections
    {
      url: `${baseUrl}/#features`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Mortgage Calculator Page Sections
    {
      url: `${baseUrl}/mortgage-calculator#calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mortgage-calculator#guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mortgage-calculator#faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    
    // Shared Calculation Pages
    {
      url: `${baseUrl}/mortgage-calculator/shared/sample_share_123`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mortgage-calculator/shared/first_time_buyer_456`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mortgage-calculator/shared/refinance_789`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    
    // API Endpoints (for search engines to discover)
    // Note: API endpoints are excluded from sitemap as they shouldn't be indexed
    // {
    //   url: `${baseUrl}/api/og`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.3,
    // },
    
    // Important Static Content
    {
      url: `${baseUrl}/robots.txt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.1,
    },
    
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