import Link from 'next/link'
import { Calculator, Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Error Display */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h1>
          <p className="text-lg text-slate-600 mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="flex items-center space-x-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              <span>Go Home</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex items-center space-x-2">
            <Link href="/mortgage-calculator">
              <Calculator className="h-5 w-5" />
              <span>Mortgage Calculator</span>
            </Link>
          </Button>
        </div>

        {/* Popular Calculators */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Popular Calculators</span>
            </CardTitle>
            <CardDescription>
              Try one of our most popular tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                href="/mortgage-calculator"
                className="block p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Calculator className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Mortgage Calculator
                    </h3>
                    <p className="text-sm text-slate-600">
                      Calculate monthly payments & amortization
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/"
                className="block p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Search className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                      Browse All Tools
                    </h3>
                    <p className="text-sm text-slate-600">
                      Explore our complete calculator collection
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Helpful Information */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Here are some ways to find what you&apos;re looking for
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-left space-y-3">
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Check the URL</h4>
                  <p className="text-sm text-slate-600">
                    Make sure the web address is spelled correctly and doesn&apos;t contain typos.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Use Navigation</h4>
                  <p className="text-sm text-slate-600">
                    Use the navigation menu or go back to the homepage to find what you need.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Contact Support</h4>
                  <p className="text-sm text-slate-600">
                    If you believe this is an error, please contact our support team.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
