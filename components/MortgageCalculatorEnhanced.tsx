'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { calculateMortgage, formatCurrency, formatCurrencyWithCents, formatPercent, type MortgageInputs, type MortgageOutput } from '@/lib/utils'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { Plus, Trash2, Calculator, TrendingUp, PieChart, BarChart3, Settings, Eye, EyeOff, Calendar } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import { EnhancedMortgageForm } from './EnhancedMortgageForm'
import { EnhancedRightPanel } from './EnhancedRightPanel'

// Dynamically import chart components for better performance
const EnhancedPaymentChart = dynamic(() => import('./EnhancedPaymentChart'), { 
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-slate-500">Loading enhanced charts...</div>
    </div>
  )
})

const EnhancedAmortizationTable = dynamic(() => import('./EnhancedAmortizationTable'), {
  ssr: false,
  loading: () => (
    <div className="h-32 bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-slate-500">Loading enhanced amortization table...</div>
    </div>
  )
})

interface ExtraPayment {
  amount: number
  month: number
  year: number
}

interface MortgageCalculatorEnhancedProps {
  initialInputs?: MortgageInputs
  isSharedView?: boolean
}

const MortgageCalculatorEnhanced: React.FC<MortgageCalculatorEnhancedProps> = ({ 
  initialInputs,
  isSharedView = false
}) => {
  // Initialize inputs with default values or provided initial inputs
  const [inputs, setInputs] = useState<MortgageInputs>(() => {
    if (initialInputs) {
      return initialInputs
    }
    
    return {
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
    }
  })

  // UI state
  const [showSchedule, setShowSchedule] = useState(false)
  const [showBiweekly, setShowBiweekly] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Annual increase rates
  const [annualIncreases, setAnnualIncreases] = useState({
    propertyTaxIncrease: 0,
    homeInsuranceIncrease: 0,
    hoaFeeIncrease: 0,
    otherCostsIncrease: 0,
  })

  // Multiple extra payments
  const [extraPayments, setExtraPayments] = useState<ExtraPayment[]>([
    { amount: 0, month: new Date().getMonth() + 1, year: new Date().getFullYear() }
  ])

  // Payment frequency
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'biweekly'>('monthly')
  
  // Accessibility: Live region for announcements
  const [liveMessage, setLiveMessage] = useState('')

  // Generate month/year options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + i)

  // Calculate mortgage details with optimized memoization
  const mortgageOutput: MortgageOutput = useMemo(() => {
    return calculateMortgage(inputs)
  }, [inputs])

  // Announce calculation updates to screen readers
  useEffect(() => {
    const totalPayment = mortgageOutput.totalMonthlyPayment
    const totalInterest = mortgageOutput.totalInterest
    const payoffDate = mortgageOutput.payoffDate
    
    const announcement = `Mortgage calculation updated. Monthly payment: ${formatCurrency(totalPayment)}. Total interest: ${formatCurrency(totalInterest)}. Payoff date: ${payoffDate ? format(payoffDate, 'MMMM yyyy') : 'Unknown'}.`
    
    setLiveMessage(announcement)
    
    // Clear the message after a short delay to allow for re-announcements
    const timer = setTimeout(() => setLiveMessage(''), 1000)
    return () => clearTimeout(timer)
  }, [mortgageOutput.totalMonthlyPayment, mortgageOutput.totalInterest, mortgageOutput.payoffDate])

  // Emit calculator update events for sharing functionality
  useEffect(() => {
    const event = new CustomEvent('calculator-update', {
      detail: {
        type: 'calculator-update',
        inputs,
        mortgageOutput
      }
    })
    window.dispatchEvent(event)
  }, [inputs, mortgageOutput])

  // Helper functions
  const updateDownPayment = useCallback((amount: number) => {
    const percent = (amount / inputs.homePrice) * 100
    setInputs(prev => ({
      ...prev,
      downPaymentAmount: amount,
      downPaymentPercent: percent
    }))
  }, [inputs.homePrice])

  const updateDownPaymentPercent = useCallback((percent: number) => {
    const amount = (percent / 100) * inputs.homePrice
    setInputs(prev => ({
      ...prev,
      downPaymentAmount: amount,
      downPaymentPercent: percent
    }))
  }, [inputs.homePrice])

  const updatePropertyTaxes = useCallback((amount: number) => {
    const percent = (amount / inputs.homePrice) * 100
    setInputs(prev => ({
      ...prev,
      propertyTaxesAmount: amount,
      propertyTaxesPercent: percent
    }))
  }, [inputs.homePrice])

  const updatePropertyTaxesPercent = useCallback((percent: number) => {
    const amount = (percent / 100) * inputs.homePrice
    setInputs(prev => ({
      ...prev,
      propertyTaxesAmount: amount,
      propertyTaxesPercent: percent
    }))
  }, [inputs.homePrice])

  const updateHomePrice = useCallback((price: number) => {
    setInputs(prev => {
      const downAmount = (prev.downPaymentPercent / 100) * price
      const taxAmount = (prev.propertyTaxesPercent / 100) * price
      return {
        ...prev,
        homePrice: price,
        downPaymentAmount: downAmount,
        propertyTaxesAmount: taxAmount
      }
    })
  }, [])

  const addExtraPayment = () => {
    setExtraPayments(prev => [...prev, { amount: 0, month: new Date().getMonth() + 1, year: new Date().getFullYear() }])
  }

  const removeExtraPayment = (index: number) => {
    setExtraPayments(prev => prev.filter((_, i) => i !== index))
  }

  const updateExtraPayment = (index: number, field: keyof ExtraPayment, value: number) => {
    setExtraPayments(prev => prev.map((payment, i) => 
      i === index ? { ...payment, [field]: value } : payment
    ))
  }

  return (
    <div className="max-w-full mx-auto p-6 space-y-8" role="main" aria-label="Mortgage Calculator">
      {/* Live region for screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        role="status"
        aria-label="Calculation updates"
      >
        {liveMessage}
      </div>

      {/* Payment Summary Banner */}
      <Card className="bg-gradient-to-r from-blue-50 via-white to-emerald-50 border-2 border-blue-200">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Monthly Payment Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100" tabIndex={0} role="group" aria-label="Total monthly payment">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatCurrency(mortgageOutput.totalMonthlyPayment)}
                </div>
                <div className="text-sm text-slate-600 uppercase tracking-wide">Total Monthly Payment</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-emerald-100" tabIndex={0} role="group" aria-label="Principal and interest">
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  {formatCurrency(mortgageOutput.monthlyPI)}
                </div>
                <div className="text-sm text-slate-600 uppercase tracking-wide">Principal & Interest</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-amber-100" tabIndex={0} role="group" aria-label="Escrow payment">
                <div className="text-2xl font-bold text-amber-600 mb-2">
                  {formatCurrency(mortgageOutput.monthlyEscrow)}
                </div>
                <div className="text-sm text-slate-600 uppercase tracking-wide">Escrow</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-indigo-100" tabIndex={0} role="group" aria-label="Total interest">
                <div className="text-2xl font-bold text-indigo-600 mb-2">
                  {formatCurrency(mortgageOutput.totalInterest)}
                </div>
                <div className="text-sm text-slate-600 uppercase tracking-wide">Total Interest</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Panel - Enhanced Calculator Form */}
        <div className="xl:col-span-3 space-y-6">
          <EnhancedMortgageForm
            inputs={inputs}
            setInputs={setInputs}
            updateHomePrice={updateHomePrice}
            updateDownPayment={updateDownPayment}
            updateDownPaymentPercent={updateDownPaymentPercent}
            updatePropertyTaxes={updatePropertyTaxes}
            updatePropertyTaxesPercent={updatePropertyTaxesPercent}
            showAdvanced={showAdvanced}
            setShowAdvanced={setShowAdvanced}
            showBiweekly={showBiweekly}
            setShowBiweekly={setShowBiweekly}
            paymentFrequency={paymentFrequency}
            setPaymentFrequency={setPaymentFrequency}
            annualIncreases={annualIncreases}
            setAnnualIncreases={setAnnualIncreases}
            extraPayments={extraPayments}
            setExtraPayments={setExtraPayments}
            addExtraPayment={addExtraPayment}
            removeExtraPayment={removeExtraPayment}
            updateExtraPayment={updateExtraPayment}
            months={months}
            years={years}
            currentMonth={new Date().getMonth() + 1}
            currentYear={new Date().getFullYear()}
          />

          {/* Enhanced Options */}
          <Card className="border-2 border-indigo-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-200">
              <CardTitle className="flex items-center gap-3 text-indigo-900">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Settings className="h-5 w-5 text-indigo-600" />
                </div>
                Display Options
              </CardTitle>
              <CardDescription className="text-indigo-700">
                Choose what additional information to display
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors">
                  <Checkbox 
                    id="showSchedule" 
                    checked={showSchedule}
                    onCheckedChange={(checked) => setShowSchedule(checked as boolean)}
                    className="text-indigo-600"
                  />
                  <Label htmlFor="showSchedule" className="flex items-center gap-2 cursor-pointer">
                    <div className="p-1 bg-indigo-100 rounded">
                      <BarChart3 className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-indigo-900">Show Monthly & Yearly Payment Schedule</div>
                      <div className="text-sm text-indigo-600">Detailed amortization table with payment breakdown</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors">
                  <Checkbox 
                    id="showBiweekly" 
                    checked={showBiweekly}
                    onCheckedChange={(checked) => setShowBiweekly(checked as boolean)}
                    className="text-indigo-600"
                  />
                  <Label htmlFor="showBiweekly" className="flex items-center gap-2 cursor-pointer">
                    <div className="p-1 bg-indigo-100 rounded">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-indigo-900">Show Biweekly Payback Results</div>
                      <div className="text-sm text-indigo-600">Compare biweekly vs monthly payment benefits</div>
                    </div>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Enhanced Detailed Breakdown */}
        <div className="space-y-6">
          <EnhancedRightPanel
            mortgageOutput={mortgageOutput}
            inputs={inputs}
            setInputs={setInputs}
            updateDownPayment={updateDownPayment}
            updateDownPaymentPercent={updateDownPaymentPercent}
          />
        </div>
      </div>

      {/* Charts */}
      <ErrorBoundary componentName="Payment Charts">
        <EnhancedPaymentChart mortgageOutput={mortgageOutput} />
      </ErrorBoundary>

      {/* Amortization Schedule */}
      {showSchedule && (
        <ErrorBoundary componentName="Amortization Table">
          <EnhancedAmortizationTable 
            annualSummary={mortgageOutput.annualSummary}
            monthlyPayments={mortgageOutput.monthlyPayments}
          />
        </ErrorBoundary>
      )}

      {/* Enhanced Biweekly Information */}
      {showBiweekly && (
        <Card className="border-2 border-green-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
            <CardTitle className="flex items-center gap-3 text-green-900">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              Biweekly Payment Benefits
            </CardTitle>
            <CardDescription className="text-green-700">
              Accelerate your loan payoff with biweekly payments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-900 flex items-center gap-2">
                  <div className="p-1 bg-green-100 rounded">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  With Biweekly Payments
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm font-medium text-green-800">Payment Amount:</span>
                    <span className="font-mono font-semibold text-green-700">
                      {formatCurrency(mortgageOutput.monthlyPI / 2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-sm font-medium text-blue-800">Payment Frequency:</span>
                    <span className="font-semibold text-blue-700">Every 2 weeks</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <span className="text-sm font-medium text-amber-800">Total Yearly Payments:</span>
                    <span className="font-semibold text-amber-700">26 (13 months worth)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <span className="text-sm font-medium text-purple-800">Estimated Payoff:</span>
                    <span className="font-semibold text-purple-700">~4-6 years earlier</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-sm font-medium text-red-800">Interest Savings:</span>
                    <span className="font-mono font-semibold text-red-700">
                      ~{formatCurrency(mortgageOutput.totalInterest * 0.25)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-green-900 flex items-center gap-2">
                  <div className="p-1 bg-green-100 rounded">
                    <Calculator className="h-4 w-4 text-green-600" />
                  </div>
                  How It Works
                </h4>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 leading-relaxed">
                    By making 26 biweekly payments instead of 12 monthly payments, 
                    you effectively make one extra monthly payment per year. This 
                    significantly reduces your loan term and total interest paid.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h5>
                  <p className="text-sm text-blue-800">
                    Many lenders offer biweekly payment programs, or you can set up 
                    automatic transfers to make this process seamless.
                  </p>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h5 className="font-semibold text-amber-900 mb-2">📊 Impact</h5>
                  <p className="text-sm text-amber-800">
                    On a 30-year mortgage, biweekly payments can save you tens of 
                    thousands in interest and pay off your loan 4-6 years early.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default MortgageCalculatorEnhanced 