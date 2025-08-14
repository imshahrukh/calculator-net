import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FastCalculator.co - Free Online Calculators',
  description: 'Free online calculators for mortgage, loan, investment, and financial planning. Get accurate calculations with detailed breakdowns and professional tools.',
  keywords: [
    'calculator',
    'mortgage calculator',
    'loan calculator',
    'investment calculator',
    'financial calculator',
    'free calculator',
    'online calculator',
    'math calculator',
    'scientific calculator'
  ],
  authors: [{ name: 'FastCalculator.co' }],
  creator: 'FastCalculator.co',
  publisher: 'FastCalculator.co',
  metadataBase: new URL('https://fastcalculator.co'),
  openGraph: {
    title: 'FastCalculator.co - Free Online Calculators',
    description: 'Free online calculators for mortgage, loan, investment, and financial planning.',
    url: 'https://fastcalculator.co',
    siteName: 'FastCalculator.co',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://fastcalculator.co/api/og?title=FastCalculator.co&description=Free Online Calculators',
        width: 1200,
        height: 630,
        alt: 'FastCalculator.co - Free Online Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FastCalculator.co - Free Online Calculators',
    description: 'Free online calculators for mortgage, loan, investment, and financial planning.',
    images: ['https://fastcalculator.co/api/og?title=FastCalculator.co&description=Free Online Calculators'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'ahrefs-site-verification': 'c63996cc7c089a3f5bb7b1dc5e5a9552d0b8f19864912acc49c3b221de5f4d46',
  },
}

// Structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'FastCalculator.co',
      description: 'Free online calculators for mortgage, loan, investment, and financial planning',
      url: 'https://fastcalculator.co',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are the calculators free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, all calculators on FastCalculator.co are completely free to use with no registration required.'
          }
        },
        {
          '@type': 'Question',
          name: 'How accurate are the calculations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our calculators use industry-standard formulas and provide accurate results for financial planning and decision-making.'
          }
        }
      ]
    },
    {
      '@type': 'Organization',
      name: 'FastCalculator.co',
      url: 'https://fastcalculator.co',
      sameAs: [
        'https://www.facebook.com/fastcalculator.co'
      ]
    },
    {
      '@type': 'WebSite',
      name: 'FastCalculator.co',
      url: 'https://fastcalculator.co',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://fastcalculator.co/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script 
          src="https://analytics.ahrefs.com/analytics.js" 
          data-key="+ottKCvT0gv/5xH5OZwhVw" 
          async
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
} 