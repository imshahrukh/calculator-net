import React from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, ArrowLeft, Home, ChevronRight, BookOpen, BarChart3, Settings, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MortgageCalculatorEnhanced from '@/components/MortgageCalculatorEnhanced'
import ShareModalWrapper from '@/components/ShareModalWrapper'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

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
      {/* Enhanced Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-1 px-1 sm:px-6 lg:px-1">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Breadcrumb */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <Logo variant="compact" size={28} />
              </Link>
              
              {/* Breadcrumb Navigation */}
              <nav className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
                <Link href="/" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Calculators
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 font-medium">Mortgage Calculator</span>
              </nav>
            </div>

            {/* Right side - Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <a href="#calculator" className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  <Calculator className="h-4 w-4" />
                  <span>Calculator</span>
                </a>
                <a href="#guide" className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  <BookOpen className="h-4 w-4" />
                  <span>Guide</span>
                </a>
                <a href="#charts" className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  <BarChart3 className="h-4 w-4" />
                  <span>Charts</span>
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                <ShareModalWrapper />
              </div>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Settings className="h-6 w-6 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Page Header */}
      <section className="relative py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Calculator className="h-4 w-4" />
              <span>Professional Mortgage Calculator</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Calculate Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Dream Home</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Get instant mortgage payment estimates with detailed breakdowns, amortization schedules, and interactive charts. 
              Plan your home purchase with confidence using our comprehensive calculator.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="h-12 w-12 bg-green-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Calculator className="h-6 w-6 text-green-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Calculations</h3>
                <p className="text-blue-100 text-sm">Instant updates as you adjust your inputs</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="h-12 w-12 bg-blue-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <BarChart3 className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Interactive Charts</h3>
                <p className="text-blue-100 text-sm">Visualize your payment breakdown and loan progress</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="h-12 w-12 bg-purple-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="h-6 w-6 text-purple-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
                <p className="text-blue-100 text-sm">Complete amortization schedules and extra payment analysis</p>
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-blue-200">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <span>100% Free</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                <span>No Registration</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="h-2 w-2 bg-purple-400 rounded-full"></div>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <section id="calculator" className="py-4">
        <div className="max-w-full mx-2 px-2 sm:px-2 lg:px-2">
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
                <CardTitle className="text-lg">What&apos;s included in the monthly payment estimate?</CardTitle>
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
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
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