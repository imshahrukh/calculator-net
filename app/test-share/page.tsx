'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Share2, ExternalLink, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function TestSharePage() {
  const [copied, setCopied] = useState(false)
  
  const sampleShareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://calculator.net'}/mortgage-calculator/shared/sample_share_123`

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
          <h1 className="text-4xl font-bold text-slate-900">Shareable Link Test</h1>
          <p className="text-xl text-slate-600">
            Test the global sharing functionality with this sample calculation
          </p>
        </div>

        {/* Sample Shared Calculation */}
        <Card className="border-2 border-blue-100 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-blue-200">
            <CardTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <Share2 className="h-6 w-6" />
              Sample Shared Calculation
            </CardTitle>
            <CardDescription className="text-blue-700 text-lg">
              $500,000 Home - 20% Down - 30yr @ 6.5%
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
              <h4 className="font-semibold text-blue-900 mb-2">Shareable Link</h4>
              <div className="flex items-center space-x-2">
                <input
                  value={sampleShareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-md bg-white font-mono text-sm"
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
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <Link href={sampleShareUrl}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Shared Calculation
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

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Test Global Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Copy the Share Link</h4>
              <p className="text-slate-600">Click the &quot;Copy&quot; button above to copy the sample share link to your clipboard.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">2. Test in Different Contexts</h4>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Open the link in an incognito/private browser window</li>
                <li>Try the link on a different device or browser</li>
                <li>Share the link with someone else via email or messaging</li>
                <li>Test on mobile devices</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">3. Expected Behavior</h4>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>The shared calculation should load properly in all contexts</li>
                <li>All calculation details should be preserved</li>
                <li>The interactive calculator should work with the shared data</li>
                <li>Users can modify the calculation and create their own</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Back to Calculator */}
        <div className="text-center">
          <Link href="/mortgage-calculator">
            <Button variant="outline" size="lg">
              ← Back to Mortgage Calculator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
