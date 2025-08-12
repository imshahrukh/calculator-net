import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculator.net - Advanced Financial Calculators for Smart Decisions',
  description: 'Free online financial calculators including mortgage calculator, investment calculator, and budget planner. Get detailed analysis, interactive charts, and expert insights to make informed financial decisions.',
  keywords: [
    'financial calculator',
    'mortgage calculator',
    'investment calculator',
    'budget planner',
    'loan calculator',
    'amortization schedule',
    'extra payments calculator',
    'mortgage payment calculator',
    'home loan estimator',
    'financial planning tools',
    'free calculator',
    'online calculator'
  ].join(', '),
  authors: [{ name: 'Calculator.net' }],
  creator: 'Calculator.net',
  publisher: 'Calculator.net',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://calculator.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Calculator.net - Advanced Financial Calculators for Smart Decisions',
    description: 'Free online financial calculators including mortgage calculator, investment calculator, and budget planner. Get detailed analysis, interactive charts, and expert insights.',
    url: 'https://calculator.net',
    siteName: 'Calculator.net',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculator.net - Advanced Financial Calculators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator.net - Advanced Financial Calculators for Smart Decisions',
    description: 'Free online financial calculators including mortgage calculator, investment calculator, and budget planner.',
    images: ['/og-image.jpg'],
    creator: '@calculatornet',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://calculator.net/#webapp',
        'name': 'Calculator.net',
        'description': 'Free online financial calculators to help you make informed decisions about mortgages, investments, and budgeting.',
        'url': 'https://calculator.net',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web Browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Mortgage payment calculation',
          'Amortization schedule',
          'Extra payment analysis',
          'Investment calculator',
          'Budget planning tools',
          'Interactive charts and graphs',
          'Scenario planning',
          'Privacy-first calculations'
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://calculator.net/#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Are the calculators free to use?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, all our calculators are completely free to use. No registration or payment required.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Is my data secure when using the calculators?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Absolutely. All calculations are performed locally in your browser. No data is stored or transmitted to our servers.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What calculators are available?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We currently offer a comprehensive mortgage calculator with more calculators coming soon including investment calculator, loan comparison tool, and budget planner.'
            }
          }
        ]
      },
      {
        '@type': 'Organization',
        '@id': 'https://calculator.net/#organization',
        'name': 'Calculator.net',
        'url': 'https://calculator.net',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://calculator.net/logo.png'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://calculator.net/#website',
        'url': 'https://calculator.net',
        'name': 'Calculator.net',
        'description': 'Free online financial calculators with detailed analysis and interactive charts.',
        'publisher': {
          '@id': 'https://calculator.net/#organization'
        },
        'potentialAction': [
          {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://calculator.net/search?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          }
        ]
      }
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 