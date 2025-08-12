'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, RefreshCw, Eye, Copy, Check } from 'lucide-react'
import { shareAPI } from '@/lib/share-api'
import { toast } from 'sonner'

interface SharedCalculation {
  id: string
  title: string
  description: string
  inputs: any
  mortgageOutput: any
  createdAt: string
  shareUrl: string
}

export default function DebugSharePage() {
  const [calculations, setCalculations] = useState<SharedCalculation[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  const loadCalculations = async () => {
    setLoading(true)
    try {
      const allCalculations = await shareAPI.getAllCalculations()
      setCalculations(allCalculations)
      console.log('Loaded calculations:', allCalculations)
    } catch (error) {
      console.error('Error loading calculations:', error)
      toast.error('Failed to load calculations')
    } finally {
      setLoading(false)
    }
  }

  const clearAllCalculations = async () => {
    try {
      await shareAPI.clearAllCalculations()
      await loadCalculations()
      toast.success('All calculations cleared')
    } catch (error) {
      console.error('Error clearing calculations:', error)
      toast.error('Failed to clear calculations')
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const viewCalculation = (shareUrl: string) => {
    window.open(shareUrl, '_blank')
  }

  useEffect(() => {
    loadCalculations()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Share Debug Page</h1>
          <p className="text-xl text-slate-600">
            Debug and manage shared calculations
          </p>
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Actions</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadCalculations}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllCalculations}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-900">Total Calculations</div>
                <div className="text-2xl font-bold text-blue-700">{calculations.length}</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-900">Storage Status</div>
                <div className="text-2xl font-bold text-green-700">
                  {typeof window !== 'undefined' ? 'Active' : 'SSR'}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-semibold text-purple-900">Storage Key</div>
                <div className="text-sm font-mono text-purple-700">shared_calculations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calculations List */}
        <Card>
          <CardHeader>
            <CardTitle>Shared Calculations</CardTitle>
            <CardDescription>
              All calculations currently stored in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading calculations...</p>
              </div>
            ) : calculations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-600">No shared calculations found</p>
                <p className="text-sm text-slate-500 mt-2">
                  Create a calculation and share it to see it here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {calculations.map((calc) => (
                  <div
                    key={calc.id}
                    className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{calc.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{calc.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>ID: {calc.id}</span>
                          <span>Created: {new Date(calc.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="mt-2 text-xs text-slate-600">
                          <div className="flex gap-4">
                            <span>Home Price: ${calc.inputs.homePrice?.toLocaleString()}</span>
                            <span>Down Payment: {calc.inputs.downPaymentPercent}%</span>
                            <span>Interest Rate: {calc.inputs.interestRate}%</span>
                            <span>Term: {calc.inputs.loanTerm} years</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewCalculation(calc.shareUrl)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(calc.shareUrl, calc.id)}
                          className="flex items-center gap-1"
                        >
                          {copied === calc.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === calc.id ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-2 bg-slate-100 rounded text-xs font-mono break-all">
                      {calc.shareUrl}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Debug Info */}
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">localStorage Content:</h4>
                <pre className="bg-slate-100 p-3 rounded text-xs overflow-auto max-h-40">
                  {typeof window !== 'undefined' 
                    ? JSON.stringify(JSON.parse(localStorage.getItem('shared_calculations') || '{}'), null, 2)
                    : 'Not available during SSR'
                  }
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Browser Info:</h4>
                <div className="text-sm space-y-1">
                  <div>User Agent: {typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR'}</div>
                  <div>localStorage Available: {typeof window !== 'undefined' ? 'Yes' : 'No'}</div>
                  <div>Current URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center space-x-4">
          <Button asChild>
            <a href="/mortgage-calculator">Go to Calculator</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/test-share">Test Share Page</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
