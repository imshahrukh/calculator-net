import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: 'Shared Mortgage Calculation',
    description: 'View this shared mortgage calculation with detailed payment breakdowns and amortization schedules.',
    alternates: {
      canonical: `https://fastcalculator.co/mortgage-calculator/shared/${params.id}`,
    },
    openGraph: {
      title: 'Shared Mortgage Calculation',
      description: 'View this shared mortgage calculation with payment breakdowns and amortization schedules.',
      url: `https://fastcalculator.co/mortgage-calculator/shared/${params.id}`,
      type: 'website',
      images: [
        {
          url: `https://fastcalculator.co/api/og?title=Shared Mortgage Calculation&description=View this shared calculation`,
          width: 1200,
          height: 630,
          alt: 'Shared Mortgage Calculation',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shared Mortgage Calculation',
      description: 'View this shared mortgage calculation with payment breakdowns and amortization schedules.',
      images: [`https://fastcalculator.co/api/og?title=Shared Mortgage Calculation&description=View this shared calculation`],
    },
  }
}

export default function SharedCalculationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
