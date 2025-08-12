'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Share2, Calendar, DollarSign, Calculator, Copy, Check, Clock, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import MortgageCalculatorEnhanced from '@/components/MortgageCalculatorEnhanced'
import { type MortgageInputs } from '@/lib/utils'
import { clientShare } from '@/lib/client-share'
import { toast } from 'sonner'

interface SharedCalculationData {
  title: string
  description: string
  inputs: MortgageInputs
  mortgageOutput: {
    monthlyPI: number
    monthlyEscrow: number
    totalMonthlyPayment: number
    loanAmount: number
    totalMortgagePayments: number
    totalInterest: number
    payoffDate: string
  }
  createdAt: string
  expiresAt?: string
}

export default function SharedCalculationPage() {
  const params = useParams()
  const token = params.id as string
  
  const [sharedCalculation, setSharedCalculation] = useState<SharedCalculationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [tokenInfo, setTokenInfo] = useState<{ isValid: boolean; expiresAt?: Date; createdAt?: Date } | null>(null)

  const loadSharedCalculation = useCallback(async () => {
    try {
      // Get token info first
      const info = clientShare.getTokenInfo(token)
      setTokenInfo(info)
      
      if (!info.isValid) {
        setError('Invalid share link. Please check the URL and try again.')
        return
      }

      // Decode the share token
      const calculation = clientShare.decodeShareToken(token)
      
      if (calculation) {
        setSharedCalculation(calculation)
      } else {
        setError('Failed to decode share link. The link may be corrupted.')
      }
    } catch (error: any) {
      console.error('Error loading shared calculation:', error)
      setError(error.message || 'Failed to load shared calculation. Please check the link and try again.')
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    loadSharedCalculation()
  }, [loadSharedCalculation])

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

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href
    }
    return ''
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading shared calculation...</p>
        </div>
      </div>
    )
  }

  if (error || !sharedCalculation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <Logo variant="compact" size={28} />
              </Link>
              
              <Link href="/mortgage-calculator">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Calculator
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <Card className="border-2 border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-200">
              <CardTitle className="flex items-center gap-2 text-red-900">
                <AlertTriangle className="h-5 w-5" />
                {tokenInfo?.isValid ? 'Calculation Not Found' : 'Invalid Share Link'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-red-600 text-lg font-semibold">
                  {error || 'The shared calculation could not be found'}
                </div>
                <p className="text-slate-600">
                  {tokenInfo?.isValid 
                    ? 'The calculation may have been deleted or the link is invalid. Please check the link or contact the person who shared it with you.'
                    : 'This share link appears to be invalid or has expired. Please check the URL or request a new link.'
                  }
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/mortgage-calculator">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Calculator className="h-4 w-4 mr-2" />
                      Use Calculator
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline">
                      <Home className="h-4 w-4 mr-2" />
                      Go Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Logo variant="compact" size={28} />
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(getShareUrl())}
                className="flex items-center gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
              
              <Link href="/mortgage-calculator">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Calculator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Shared Calculation Header */}
        <Card className="border-2 border-blue-100 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-blue-200">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                  <Share2 className="h-6 w-6" />
                  {sharedCalculation.title}
                </CardTitle>
                <CardDescription className="text-blue-700 text-base">
                  {sharedCalculation.description}
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-blue-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Shared: {new Date(sharedCalculation.createdAt).toLocaleDateString()}</span>
                </div>
                {tokenInfo?.expiresAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Expires: {tokenInfo.expiresAt.toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Home className="h-4 w-4 text-blue-600" />
                  Property Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Home Price:</span>
                    <span className="font-semibold">${sharedCalculation.inputs.homePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Down Payment:</span>
                    <span className="font-semibold">{sharedCalculation.inputs.downPaymentPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Loan Term:</span>
                    <span className="font-semibold">{sharedCalculation.inputs.loanTerm} years</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  Payment Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly Payment:</span>
                    <span className="font-semibold text-green-600">
                      ${(sharedCalculation.mortgageOutput.monthlyPI + sharedCalculation.mortgageOutput.monthlyEscrow).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Interest Rate:</span>
                    <span className="font-semibold">{sharedCalculation.inputs.interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Interest:</span>
                    <span className="font-semibold text-amber-600">
                      ${sharedCalculation.mortgageOutput.totalInterest.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-purple-600" />
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <Link href="/mortgage-calculator">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Calculator className="h-4 w-4 mr-2" />
                      Create Your Own
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => copyToClipboard(getShareUrl())}
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Link Copied!' : 'Copy Link'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mortgage Calculator with Shared Data */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              Interactive Mortgage Calculator
            </h2>
            <p className="text-slate-600 mt-1">
              View the detailed breakdown and modify the calculation to see how changes affect your payments
            </p>
          </div>
          
          <div className="p-6">
            <MortgageCalculatorEnhanced 
              initialInputs={sharedCalculation.inputs}
              isSharedView={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
