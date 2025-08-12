'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  DollarSign, 
  Home, 
  TrendingUp, 
  Calendar, 
  Percent, 
  Zap,
  Target,
  Clock,
  Calculator,
  PiggyBank,
  Shield,
  Building,
  Plus
} from 'lucide-react'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { format } from 'date-fns'

interface EnhancedRightPanelProps {
  mortgageOutput: any
  inputs: any
  setInputs: (inputs: any) => void
  updateDownPayment: (amount: number) => void
  updateDownPaymentPercent: (percent: number) => void
}

export function EnhancedRightPanel({
  mortgageOutput,
  inputs,
  setInputs,
  updateDownPayment
}: EnhancedRightPanelProps) {
  return (
    <div className="space-y-6">
      {/* Enhanced Payment Breakdown */}
      <Card className="border-2 border-blue-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
          <CardTitle className="flex items-center gap-3 text-blue-900">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            Monthly Payment Breakdown
          </CardTitle>
          <CardDescription className="text-blue-700">
            Detailed breakdown of your monthly payment
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-emerald-100 rounded">
                  <Home className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-emerald-800">Principal & Interest</span>
              </div>
              <span className="font-mono font-semibold text-emerald-700">
                {formatCurrency(mortgageOutput.monthlyPI)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-amber-100 rounded">
                  <Target className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-sm font-medium text-amber-800">Property Taxes</span>
              </div>
              <span className="font-mono font-semibold text-amber-700">
                {formatCurrency(inputs.propertyTaxesAmount / 12)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-blue-100 rounded">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-800">Home Insurance</span>
              </div>
              <span className="font-mono font-semibold text-blue-700">
                {formatCurrency(inputs.homeInsurance / 12)}
              </span>
            </div>
            
            {inputs.downPaymentPercent < 20 && (
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-purple-100 rounded">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-purple-800">PMI</span>
                </div>
                <span className="font-mono font-semibold text-purple-700">
                  {formatCurrency(inputs.pmi / 100 * mortgageOutput.loanAmount / 12)}
                </span>
              </div>
            )}
            
            {inputs.hoaFee > 0 && (
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-indigo-100 rounded">
                    <Building className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-indigo-800">HOA Fee</span>
                </div>
                <span className="font-mono font-semibold text-indigo-700">
                  {formatCurrency(inputs.hoaFee)}
                </span>
              </div>
            )}
            
            {inputs.otherCosts > 0 && (
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-slate-100 rounded">
                    <Plus className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-800">Other Costs</span>
                </div>
                <span className="font-mono font-semibold text-slate-700">
                  {formatCurrency(inputs.otherCosts)}
                </span>
              </div>
            )}
            
            <Separator className="my-4" />
            
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-lg font-bold text-blue-900">Total Monthly Payment</span>
              </div>
              <span className="font-mono text-xl font-bold text-blue-700">
                {formatCurrency(mortgageOutput.totalMonthlyPayment)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Loan Summary */}
      <Card className="border-2 border-emerald-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200">
          <CardTitle className="flex items-center gap-3 text-emerald-900">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            Loan Summary
          </CardTitle>
          <CardDescription className="text-emerald-700">
            Key details about your mortgage
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Home className="h-4 w-4 text-slate-600" />
                  <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">House Price</span>
                </div>
                <div className="font-mono font-semibold text-slate-900">
                  {formatCurrency(inputs.homePrice)}
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Loan Amount</span>
                </div>
                <div className="font-mono font-semibold text-blue-900">
                  {formatCurrency(mortgageOutput.loanAmount)}
                </div>
              </div>
              
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <PiggyBank className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Down Payment</span>
                </div>
                <div className="font-mono font-semibold text-emerald-900">
                  {formatCurrency(inputs.downPaymentAmount)}
                </div>
                <div className="text-xs text-emerald-600">
                  {formatPercent(inputs.downPaymentPercent)}
                </div>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-1">
                  <Percent className="h-4 w-4 text-amber-600" />
                  <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Interest Rate</span>
                </div>
                <div className="font-mono font-semibold text-amber-900">
                  {formatPercent(inputs.interestRate)}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-indigo-100 rounded">
                    <DollarSign className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-indigo-800">Total of Payments</span>
                </div>
                <span className="font-mono font-semibold text-indigo-700">
                  {formatCurrency(mortgageOutput.totalMortgagePayments)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-red-100 rounded">
                    <TrendingUp className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-red-800">Total Interest</span>
                </div>
                <span className="font-mono font-semibold text-red-700">
                  {formatCurrency(mortgageOutput.totalInterest)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-100 rounded">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-green-800">Payoff Date</span>
                </div>
                <span className="font-mono font-semibold text-green-700">
                  {format(mortgageOutput.payoffDate, 'MMM yyyy')}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Actions */}
      <Card className="border-2 border-purple-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200">
          <CardTitle className="flex items-center gap-3 text-purple-900">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            Quick Scenarios
          </CardTitle>
          <CardDescription className="text-purple-700">
            Try different payment scenarios instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start h-12 border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
              onClick={() => setInputs((prev: any) => ({ ...prev, extraMonthlyPayment: 100 }))}
            >
              <div className="flex items-center gap-3">
                <div className="p-1 bg-emerald-100 rounded">
                  <Plus className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-emerald-800">Add $100/month extra</div>
                  <div className="text-xs text-emerald-600">Pay off faster</div>
                </div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start h-12 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
              onClick={() => setInputs((prev: any) => ({ ...prev, extraMonthlyPayment: 200 }))}
            >
              <div className="flex items-center gap-3">
                <div className="p-1 bg-blue-100 rounded">
                  <Plus className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-blue-800">Add $200/month extra</div>
                  <div className="text-xs text-blue-600">Maximum savings</div>
                </div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start h-12 border-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50"
              onClick={() => setInputs((prev: any) => ({ ...prev, loanTerm: 15 }))}
            >
              <div className="flex items-center gap-3">
                <div className="p-1 bg-amber-100 rounded">
                  <Calendar className="h-4 w-4 text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-amber-800">15-year loan</div>
                  <div className="text-xs text-amber-600">Lower interest rate</div>
                </div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start h-12 border-2 border-green-200 hover:border-green-300 hover:bg-green-50"
              onClick={() => { 
                setInputs((prev: any) => ({ ...prev, downPaymentPercent: 20 })); 
                updateDownPayment((20 / 100) * inputs.homePrice); 
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-1 bg-green-100 rounded">
                  <Percent className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-green-800">20% down payment</div>
                  <div className="text-xs text-green-600">Avoid PMI</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
