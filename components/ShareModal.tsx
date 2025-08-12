'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Share2, Copy, Check, ExternalLink, Calendar, DollarSign, Home, Users, Clock } from 'lucide-react'
import { type MortgageInputs } from '@/lib/utils'
import { clientShare } from '@/lib/client-share'
import { toast } from 'sonner'

interface ShareModalProps {
  inputs: MortgageInputs
  mortgageOutput: any
  children: React.ReactNode
}

interface SharedCalculation {
  shareUrl: string
  token: string
  expiresAt: Date
}

const ShareModal: React.FC<ShareModalProps> = ({ inputs, mortgageOutput, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sharedCalculation, setSharedCalculation] = useState<SharedCalculation | null>(null)
  const [copied, setCopied] = useState(false)

  const generateDefaultTitle = () => {
    const homePrice = inputs.homePrice.toLocaleString()
    const downPayment = inputs.downPaymentPercent
    const term = inputs.loanTerm
    const rate = inputs.interestRate
    
    return `$${homePrice} Home - ${downPayment}% Down - ${term}yr @ ${rate}%`
  }

  const generateDefaultDescription = () => {
    const monthlyPayment = mortgageOutput.monthlyPI + mortgageOutput.monthlyEscrow
    const totalInterest = mortgageOutput.totalInterest
    
    return `Monthly payment: $${monthlyPayment.toLocaleString()}, Total interest: $${totalInterest.toLocaleString()}`
  }

  const handleShare = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your calculation')
      return
    }

    setIsLoading(true)
    
    try {
      const calculationData = {
        title: title.trim(),
        description: description.trim() || generateDefaultDescription(),
        inputs,
        mortgageOutput: {
          monthlyPI: mortgageOutput.monthlyPI,
          monthlyEscrow: mortgageOutput.monthlyEscrow,
          totalMonthlyPayment: mortgageOutput.totalMonthlyPayment,
          loanAmount: mortgageOutput.loanAmount,
          totalMortgagePayments: mortgageOutput.totalMortgagePayments,
          totalInterest: mortgageOutput.totalInterest,
          payoffDate: mortgageOutput.payoffDate.toISOString()
        },
        createdAt: new Date().toISOString()
      }

      // Generate client-side share URL
      const shareUrl = clientShare.generateShareUrl(calculationData)
      const token = clientShare.extractTokenFromUrl(shareUrl)!
      const tokenInfo = clientShare.getTokenInfo(token)
      
      const sharedCalc: SharedCalculation = {
        shareUrl,
        token,
        expiresAt: tokenInfo.expiresAt!
      }
      
      setSharedCalculation(sharedCalc)
      toast.success('Calculation shared successfully!')
      
    } catch (error) {
      console.error('Error sharing calculation:', error)
      toast.error('Failed to share calculation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

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

  const openShareUrl = () => {
    if (sharedCalculation) {
      window.open(sharedCalculation.shareUrl, '_blank')
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
    setTitle(generateDefaultTitle())
    setDescription(generateDefaultDescription())
    setSharedCalculation(null)
    setCopied(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={handleOpen}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Share2 className="h-5 w-5 text-blue-600" />
            Share Your Mortgage Calculation
          </DialogTitle>
          <DialogDescription>
            Create a shareable link that others can use to view your exact mortgage calculation
          </DialogDescription>
        </DialogHeader>

        {!sharedCalculation ? (
          <div className="space-y-6">
            {/* Calculation Preview */}
            <Card className="border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Home className="h-5 w-5" />
                  Calculation Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Home Price:</span>
                      <span className="font-semibold">${inputs.homePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Down Payment:</span>
                      <span className="font-semibold">{inputs.downPaymentPercent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Loan Term:</span>
                      <span className="font-semibold">{inputs.loanTerm} years</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Interest Rate:</span>
                      <span className="font-semibold">{inputs.interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Monthly Payment:</span>
                      <span className="font-semibold text-green-600">
                        ${(mortgageOutput.monthlyPI + mortgageOutput.monthlyEscrow).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Interest:</span>
                      <span className="font-semibold text-amber-600">
                        ${mortgageOutput.totalInterest.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Details Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold">
                  Calculation Title *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title for your calculation"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-semibold">
                  Description (Optional)
                </Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add notes or context about this calculation"
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleShare}
                disabled={isLoading || !title.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Creating Share Link...' : 'Create Share Link'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success Message */}
            <Card className="border-2 border-green-100 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <Check className="h-5 w-5" />
                  <span className="font-semibold">Share link created successfully!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Anyone with this link can view your exact mortgage calculation
                </p>
              </CardContent>
            </Card>

            {/* Share Link */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-blue-600" />
                  Share Link
                </CardTitle>
                <CardDescription>
                  Copy and share this link with others
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    value={sharedCalculation.shareUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(sharedCalculation.shareUrl)}
                    className="flex items-center gap-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Expires: {sharedCalculation.expiresAt.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="h-4 w-4" />
                  <span>Works globally - no account required</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={openShareUrl}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Shared Link
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ShareModal
