'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Share2, ExternalLink, Copy, Check, Clock, Shield, Globe } from 'lucide-react'
import Link from 'next/link'
import { clientShare } from '@/lib/client-share'
import { toast } from 'sonner'

export default function TestJWTSharePage() {
  const [copied, setCopied] = useState(false)
  
  // Create a sample share token for testing
  const sampleCalculationData = {
    title: '$500,000 Home - 20% Down - 30yr @ 6.5%',
    description: 'Monthly payment: $3,044, Total interest: $695,905',
    inputs: {
      homePrice: 500000,
      downPaymentAmount: 100000,
      downPaymentPercent: 20,
      loanTerm: 30,
      interestRate: 6.5,
      startMonth: new Date().getMonth() + 1,
      startYear: new Date().getFullYear(),
      propertyTaxesAmount: 5000,
      propertyTaxesPercent: 1,
      homeInsurance: 1200,
      pmi: 0,
      hoaFee: 0,
      otherCosts: 0,
      extraMonthlyPayment: 0,
      extraMonthlyStartMonth: new Date().getMonth() + 1,
      extraMonthlyStartYear: new Date().getFullYear(),
      oneTimeExtraPayment: 0,
      oneTimeExtraMonth: new Date().getMonth() + 1,
      oneTimeExtraYear: new Date().getFullYear(),
      annualExtraPayment: 0,
      annualExtraStartYear: new Date().getFullYear() + 1,
    },
    mortgageOutput: {
      monthlyPI: 2527.51,
      monthlyEscrow: 516.67,
      totalMonthlyPayment: 3044.18,
      loanAmount: 400000,
      totalMortgagePayments: 1095904.80,
      totalInterest: 695904.80,
      payoffDate: new Date(new Date().getFullYear() + 30, new Date().getMonth(), 1).toISOString()
    },
    createdAt: new Date().toISOString()
  }

  const sampleShareUrl = clientShare.generateShareUrl(sampleCalculationData)
  const sampleToken = clientShare.extractTokenFromUrl(sampleShareUrl)!
  const tokenInfo = clientShare.getTokenInfo(sampleToken)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Client-Side Sharing Test</h1>
          <p className="text-xl text-slate-600">
            Test the new client-side sharing system that works globally
          </p>
        </div>

        {/* Sharing Benefits */}
        <Card className="border-2 border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Shield className="h-5 w-5" />
              Client-Side Sharing Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Global Sharing</h4>
                    <p className="text-sm text-slate-600">Works across all browsers, devices, and incognito modes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Secure Tokens</h4>
                    <p className="text-sm text-slate-600">Data is encoded in base64 tokens, not stored on servers</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Automatic Expiration</h4>
                    <p className="text-sm text-slate-600">Links expire after 1 year for security</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Share2 className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">No Database Required</h4>
                    <p className="text-sm text-slate-600">All data is contained within the URL token</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Shared Calculation */}
        <Card className="border-2 border-blue-100 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-blue-200">
            <CardTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <Share2 className="h-6 w-6" />
              Sample Client-Side Shared Calculation
            </CardTitle>
            <CardDescription className="text-blue-700 text-lg">
              This calculation is encoded in a base64 token and works globally
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Calculation Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Home Price:</span>
                    <span className="font-semibold">$500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Down Payment:</span>
                    <span className="font-semibold">20% ($100,000)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Loan Term:</span>
                    <span className="font-semibold">30 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Interest Rate:</span>
                    <span className="font-semibold">6.5%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly Payment:</span>
                    <span className="font-semibold text-green-600">$3,044</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Interest:</span>
                    <span className="font-semibold text-amber-600">$695,905</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Loan Amount:</span>
                    <span className="font-semibold">$400,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Client-Side Share Link</h4>
              <div className="flex items-center space-x-2">
                <input
                  value={sampleShareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-md bg-white font-mono text-xs"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(sampleShareUrl)}
                  className="flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <div className="mt-2 text-xs text-blue-600">
                Token expires: {tokenInfo.expiresAt?.toLocaleDateString()}
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <Link href={sampleShareUrl}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Test Client-Side Shared Link
                </Button>
              </Link>
              
              <Link href="/mortgage-calculator">
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Create Your Own
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Test Client-Side Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Copy the Share Link</h4>
              <p className="text-slate-600">Click the "Copy" button above to copy the client-side share link to your clipboard.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">2. Test in Different Contexts</h4>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Open the link in an incognito/private browser window</li>
                <li>Try the link on a different device or browser</li>
                <li>Share the link with someone else via email or messaging</li>
                <li>Test on mobile devices</li>
                <li>Test after clearing browser cache and cookies</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">3. Expected Behavior</h4>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>The shared calculation should load properly in ALL contexts</li>
                <li>All calculation details should be preserved exactly</li>
                <li>The interactive calculator should work with the shared data</li>
                <li>Users can modify the calculation and create their own</li>
                <li>No database or server storage required</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center space-x-4">
          <Button asChild>
            <a href="/mortgage-calculator">Go to Calculator</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/test-share">Old Sharing Test</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
