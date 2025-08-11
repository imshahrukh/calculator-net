import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Free Online Home Loan Estimator',
  description: 'Calculate monthly mortgage payments, amortization schedules, and extra payment impacts with our advanced tool. Free and accurate mortgage calculator with charts and detailed breakdowns.',
  keywords: [
    'mortgage calculator',
    'home loan calculator', 
    'amortization schedule',
    'extra payments mortgage',
    'mortgage payment calculator',
    'home loan estimator',
    'mortgage amortization',
    'monthly payment calculator',
    'refinance calculator',
    'real estate calculator'
  ].join(', '),
  authors: [{ name: 'Mortgage Calculator' }],
  creator: 'Mortgage Calculator',
  publisher: 'Mortgage Calculator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mortgage-calculator.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mortgage Calculator - Free Online Home Loan Estimator',
    description: 'Calculate monthly mortgage payments, amortization schedules, and extra payment impacts with our advanced tool.',
    url: 'https://mortgage-calculator.example.com',
    siteName: 'Mortgage Calculator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mortgage Calculator - Calculate your home loan payments',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator - Free Online Home Loan Estimator',
    description: 'Calculate monthly mortgage payments, amortization schedules, and extra payment impacts with our advanced tool.',
    images: ['/og-image.jpg'],
    creator: '@mortgagecalc',
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
        '@id': 'https://mortgage-calculator.example.com/#webapp',
        'name': 'Mortgage Calculator',
        'description': 'Free online mortgage calculator to estimate monthly payments, view amortization schedules, and analyze extra payment scenarios.',
        'url': 'https://mortgage-calculator.example.com',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web Browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Monthly payment calculation',
          'Amortization schedule',
          'Extra payment analysis',
          'PMI calculation',
          'Property tax estimation',
          'Interactive charts and graphs'
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://mortgage-calculator.example.com/#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How is the monthly mortgage payment calculated?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'The monthly mortgage payment is calculated using the standard mortgage formula: M = P[r(1+r)^n]/[(1+r)^n-1], where M is the monthly payment, P is the principal loan amount, r is the monthly interest rate, and n is the number of payments.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What is included in the total monthly payment?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'The total monthly payment includes principal and interest (P&I), property taxes, homeowners insurance, private mortgage insurance (PMI) if applicable, HOA fees, and any other monthly costs.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How do extra payments affect my mortgage?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Extra payments reduce the principal balance faster, which decreases the total interest paid over the life of the loan and can significantly shorten the loan term.'
            }
          }
        ]
      },
      {
        '@type': 'Organization',
        '@id': 'https://mortgage-calculator.example.com/#organization',
        'name': 'Mortgage Calculator',
        'url': 'https://mortgage-calculator.example.com',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://mortgage-calculator.example.com/logo.png'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://mortgage-calculator.example.com/#website',
        'url': 'https://mortgage-calculator.example.com',
        'name': 'Mortgage Calculator',
        'description': 'Free online mortgage calculator with amortization schedules and extra payment analysis.',
        'publisher': {
          '@id': 'https://mortgage-calculator.example.com/#organization'
        },
        'potentialAction': [
          {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://mortgage-calculator.example.com/search?q={search_term_string}'
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
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-primary">
                Mortgage Calculator
              </h1>
              <p className="text-muted-foreground text-sm">
                Free online home loan payment estimator
              </p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-sm text-muted-foreground">
                <p>© 2024 Mortgage Calculator. Free online mortgage payment calculator.</p>
                <p className="mt-2">
                  Calculate monthly payments, view amortization schedules, and analyze extra payment scenarios.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 