import React from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MortgageCalculatorEnhanced from '@/components/MortgageCalculatorEnhanced'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Calculate Monthly Payments & Amortization',
  description: 'Free mortgage calculator to estimate monthly payments, view amortization schedules, analyze extra payments, and compare loan scenarios. Get detailed payment breakdowns with taxes, insurance, and PMI.',
  keywords: [
    'mortgage calculator',
    'home loan calculator',
    'monthly payment calculator',
    'amortization schedule',
    'extra payment calculator',
    'PMI calculator',
    'mortgage payment estimator',
    'home loan payment',
    'refinance calculator'
  ],
  openGraph: {
    title: 'Mortgage Calculator - Calculate Monthly Payments & Amortization',
    description: 'Free mortgage calculator with detailed payment breakdowns, amortization schedules, and extra payment analysis.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator - Calculate Monthly Payments & Amortization',
    description: 'Free mortgage calculator with detailed payment breakdowns, amortization schedules, and extra payment analysis.',
  },
}

export default function MortgageCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <Calculator className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-slate-900">Mortgage Calculator</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#calculator" className="text-slate-600 hover:text-blue-600 transition-colors">Calculator</a>
              <a href="#guide" className="text-slate-600 hover:text-blue-600 transition-colors">Guide</a>
              <Button variant="outline" size="sm">
                Save Results
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Mortgage Calculator
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Calculate your monthly mortgage payments, explore different scenarios, and understand your home loan with our comprehensive calculator featuring amortization schedules, extra payment analysis, and detailed cost breakdowns.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Real-time calculations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span>Interactive charts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              <span>Detailed amortization</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <section id="calculator" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MortgageCalculatorEnhanced />
        </div>
      </section>

      {/* Educational Guide Section */}
      <section id="guide" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Understanding Your Mortgage
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Learn about mortgage components, payment strategies, and how to make informed decisions about your home loan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mortgage Basics */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">Mortgage Payment Components</CardTitle>
                <CardDescription>Understanding what makes up your monthly payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">Principal & Interest (P&I)</h4>
                    <p className="text-sm text-slate-600">The core payment that reduces your loan balance and covers the cost of borrowing.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Property Taxes</h4>
                    <p className="text-sm text-slate-600">Annual taxes collected monthly and held in escrow by your lender.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Homeowners Insurance</h4>
                    <p className="text-sm text-slate-600">Required coverage to protect your property against damage.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">PMI (Private Mortgage Insurance)</h4>
                    <p className="text-sm text-slate-600">Required when down payment is less than 20% of home value.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extra Payments */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">Extra Payment Strategies</CardTitle>
                <CardDescription>How additional payments can save you money</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">Monthly Extra Payments</h4>
                    <p className="text-sm text-slate-600">Add a fixed amount to each payment to reduce principal faster.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Annual Lump Sum</h4>
                    <p className="text-sm text-slate-600">Use tax refunds or bonuses for one large payment per year.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Bi-weekly Payments</h4>
                    <p className="text-sm text-slate-600">Pay half your monthly payment every two weeks (26 payments = 13 months).</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">💡 Tip: Extra payments early in the loan term have the greatest impact on interest savings.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Terms */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">Choosing Your Loan Term</CardTitle>
                <CardDescription>Comparing 15-year vs 30-year mortgages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">30-Year Mortgage</h4>
                    <ul className="text-sm text-slate-600 space-y-1 ml-4">
                      <li>• Lower monthly payments</li>
                      <li>• More interest paid over time</li>
                      <li>• Better cash flow flexibility</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">15-Year Mortgage</h4>
                    <ul className="text-sm text-slate-600 space-y-1 ml-4">
                      <li>• Higher monthly payments</li>
                      <li>• Significant interest savings</li>
                      <li>• Build equity faster</li>
                      <li>• Lower interest rates</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Down Payment */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">Down Payment Considerations</CardTitle>
                <CardDescription>How your down payment affects your mortgage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">20% Down Payment</h4>
                    <ul className="text-sm text-slate-600 space-y-1 ml-4">
                      <li>• Avoid PMI payments</li>
                      <li>• Lower monthly payments</li>
                      <li>• Better loan terms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Less than 20% Down</h4>
                    <ul className="text-sm text-slate-600 space-y-1 ml-4">
                      <li>• PMI required</li>
                      <li>• Higher monthly payments</li>
                      <li>• Get into home sooner</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">📊 Use our calculator to see how different down payment amounts affect your total costs.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Common questions about mortgage calculations and home loans
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How accurate are the mortgage calculations?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our mortgage calculator uses industry-standard formulas and provides highly accurate estimates. However, actual payments may vary slightly due to lender-specific fees, rounding practices, and local tax variations. Always consult with your lender for final payment amounts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">When should I consider making extra payments?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Consider extra payments after you have an emergency fund, are maximizing employer 401(k) matching, and have paid off higher-interest debt. Extra payments are most effective early in the loan term and when you have stable finances.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in the monthly payment estimate?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our calculator includes principal and interest (P&I), property taxes, homeowners insurance, private mortgage insurance (PMI) when applicable, HOA fees, and other monthly costs you specify. This gives you a comprehensive view of your total housing payment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I know when PMI will be removed?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  PMI is typically removed when you reach 20% equity in your home (80% loan-to-value ratio). Our calculator shows when this occurs based on your payment schedule and any extra payments. You may need to request PMI removal from your lender.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">Calculator.net</span>
              </div>
              <p className="text-slate-400 text-sm">
                Free, accurate mortgage calculator with comprehensive payment analysis and amortization schedules.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Tools</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/mortgage-calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">All Calculators</Link></li>
                <li><a href="#guide" className="hover:text-white transition-colors">Mortgage Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 Calculator.net. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 