import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculator.net - Free Online Calculators',
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
  authors: [{ name: 'Calculator.net' }],
  creator: 'Calculator.net',
  publisher: 'Calculator.net',
  metadataBase: new URL('https://calculator.net'),
  openGraph: {
    title: 'Calculator.net - Free Online Calculators',
    description: 'Free online calculators for mortgage, loan, investment, and financial planning.',
    url: 'https://calculator.net',
    siteName: 'Calculator.net',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculator.net - Free Online Calculators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator.net - Free Online Calculators',
    description: 'Free online calculators for mortgage, loan, investment, and financial planning.',
    images: ['/og-image.jpg'],
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
}

// Structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculator.net',
      description: 'Free online calculators for mortgage, loan, investment, and financial planning',
      url: 'https://calculator.net',
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
            text: 'Yes, all calculators on Calculator.net are completely free to use with no registration required.'
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
      name: 'Calculator.net',
      url: 'https://calculator.net',
      logo: 'https://calculator.net/logo.png',
      sameAs: [
        'https://twitter.com/calculator_net',
        'https://facebook.com/calculator.net'
      ]
    },
    {
      '@type': 'WebSite',
      name: 'Calculator.net',
      url: 'https://calculator.net',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://calculator.net/search?q={search_term_string}',
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
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
} 