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
import { Plus, Trash2, Calculator, TrendingUp, PieChart, BarChart3 } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'

// Dynamically import chart components for better performance
const PaymentChart = dynamic(() => import('./PaymentChart'), { 
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-slate-500">Loading charts...</div>
    </div>
  )
})

const AmortizationTableEnhanced = dynamic(() => import('./AmortizationTableEnhanced'), {
  ssr: false,
  loading: () => (
    <div className="h-32 bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-slate-500">Loading amortization table...</div>
    </div>
  )
})

interface ExtraPayment {
  amount: number
  month: number
  year: number
}

const MortgageCalculatorEnhanced: React.FC = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  // Main form state
  const [inputs, setInputs] = useState<MortgageInputs>({
    homePrice: 300000,
    downPaymentAmount: 60000,
    downPaymentPercent: 20,
    loanTerm: 30,
    interestRate: 7.0,
    startMonth: currentMonth,
    startYear: currentYear,
    propertyTaxesAmount: 3600,
    propertyTaxesPercent: 1.2,
    homeInsurance: 1000,
    pmi: 0.5,
    hoaFee: 0,
    otherCosts: 0,
    extraMonthlyPayment: 0,
    extraMonthlyStartMonth: currentMonth,
    extraMonthlyStartYear: currentYear,
    oneTimeExtraPayment: 0,
    oneTimeExtraMonth: currentMonth,
    oneTimeExtraYear: currentYear,
    annualExtraPayment: 0,
    annualExtraStartYear: currentYear,
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
    { amount: 0, month: currentMonth, year: currentYear }
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

  const years = Array.from({ length: 50 }, (_, i) => currentYear + i)

  // Calculate mortgage details with optimized memoization
  const mortgageOutput: MortgageOutput = useMemo(() => {
    return calculateMortgage(inputs)
  }, [
    inputs.homePrice,
    inputs.downPaymentAmount,
    inputs.loanTerm,
    inputs.interestRate,
    inputs.startMonth,
    inputs.startYear,
    inputs.propertyTaxesAmount,
    inputs.homeInsurance,
    inputs.pmi,
    inputs.hoaFee,
    inputs.otherCosts,
    inputs.extraMonthlyPayment,
    inputs.extraMonthlyStartMonth,
    inputs.extraMonthlyStartYear,
    inputs.oneTimeExtraPayment,
    inputs.oneTimeExtraMonth,
    inputs.oneTimeExtraYear,
    inputs.annualExtraPayment,
    inputs.annualExtraStartYear
  ])

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
    setExtraPayments(prev => [...prev, { amount: 0, month: currentMonth, year: currentYear }])
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
    <div className="max-w-7xl mx-auto p-6 space-y-8" role="main" aria-label="Mortgage Calculator">
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
        {/* Left Panel - Calculator Form */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Basic Loan Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Loan Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Home Price */}
                <div>
                  <Label htmlFor="homePrice">Home Price</Label>
                  <Input
                    id="homePrice"
                    type="number"
                    value={inputs.homePrice}
                    onChange={(e) => updateHomePrice(Number(e.target.value))}
                    className="text-right font-mono"
                    aria-describedby="homePrice-desc"
                    aria-label="Enter the total purchase price of the home in dollars"
                  />
                  <div id="homePrice-desc" className="sr-only">
                    Enter the total purchase price of the home in dollars. This will be used to calculate your loan amount.
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <Select 
                    value={inputs.loanTerm.toString()} 
                    onValueChange={(value) => setInputs(prev => ({ ...prev, loanTerm: Number(value) }))}
                  >
                    <SelectTrigger id="loanTerm" aria-describedby="loanTerm-desc" aria-label="Select loan term in years">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 years</SelectItem>
                      <SelectItem value="20">20 years</SelectItem>
                      <SelectItem value="25">25 years</SelectItem>
                      <SelectItem value="30">30 years</SelectItem>
                    </SelectContent>
                  </Select>
                  <div id="loanTerm-desc" className="sr-only">
                    Select the number of years to repay the loan. Shorter terms mean higher monthly payments but less total interest.
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <Label htmlFor="interestRate">Interest Rate (% annual)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.001"
                    value={inputs.interestRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                    className="text-right font-mono"
                    aria-describedby="interestRate-desc"
                    aria-label="Enter the annual interest rate as a percentage"
                  />
                  <div id="interestRate-desc" className="sr-only">
                    Enter the annual interest rate as a percentage. For example, enter 7 for 7% interest rate.
                  </div>
                </div>

                {/* Payment Frequency */}
                <div>
                  <Label>Payment Frequency</Label>
                  <Select value={paymentFrequency} onValueChange={(value: 'monthly' | 'biweekly') => setPaymentFrequency(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <Label>Down Payment</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      type="number"
                      placeholder="Amount ($)"
                      value={inputs.downPaymentAmount}
                      onChange={(e) => updateDownPayment(Number(e.target.value))}
                      className="text-right font-mono"
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Percent (%)"
                      step="0.1"
                      value={inputs.downPaymentPercent}
                      onChange={(e) => updateDownPaymentPercent(Number(e.target.value))}
                      className="text-right font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <Label>Start Date</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={inputs.startMonth.toString()} onValueChange={(value) => setInputs(prev => ({ ...prev, startMonth: Number(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index + 1} value={(index + 1).toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={inputs.startYear.toString()} onValueChange={(value) => setInputs(prev => ({ ...prev, startYear: Number(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Costs & Insurance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Property Taxes */}
              <div>
                <Label>Property Taxes (annual)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Amount ($)"
                    value={inputs.propertyTaxesAmount}
                    onChange={(e) => updatePropertyTaxes(Number(e.target.value))}
                    className="text-right font-mono"
                  />
                  <Input
                    type="number"
                    placeholder="Percent (%)"
                    step="0.01"
                    value={inputs.propertyTaxesPercent}
                    onChange={(e) => updatePropertyTaxesPercent(Number(e.target.value))}
                    className="text-right font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Home Insurance */}
                <div>
                  <Label htmlFor="homeInsurance">Home Insurance (annual)</Label>
                  <Input
                    id="homeInsurance"
                    type="number"
                    value={inputs.homeInsurance}
                    onChange={(e) => setInputs(prev => ({ ...prev, homeInsurance: Number(e.target.value) }))}
                    className="text-right font-mono"
                  />
                </div>

                {/* PMI */}
                <div>
                  <Label htmlFor="pmi">PMI (annual % of loan)</Label>
                  <Input
                    id="pmi"
                    type="number"
                    step="0.01"
                    value={inputs.pmi}
                    onChange={(e) => setInputs(prev => ({ ...prev, pmi: Number(e.target.value) }))}
                    className="text-right font-mono"
                    disabled={inputs.downPaymentPercent >= 20}
                  />
                  {inputs.downPaymentPercent >= 20 && (
                    <p className="text-xs text-muted-foreground mt-1">PMI not required (down payment ≥ 20%)</p>
                  )}
                </div>

                {/* HOA Fee */}
                <div>
                  <Label htmlFor="hoaFee">HOA Fee (monthly)</Label>
                  <Input
                    id="hoaFee"
                    type="number"
                    value={inputs.hoaFee}
                    onChange={(e) => setInputs(prev => ({ ...prev, hoaFee: Number(e.target.value) }))}
                    className="text-right font-mono"
                  />
                </div>

                {/* Other Costs */}
                <div>
                  <Label htmlFor="otherCosts">Other Costs (monthly)</Label>
                  <Input
                    id="otherCosts"
                    type="number"
                    value={inputs.otherCosts}
                    onChange={(e) => setInputs(prev => ({ ...prev, otherCosts: Number(e.target.value) }))}
                    className="text-right font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Annual Tax & Cost Increase */}
          <Card>
            <CardHeader>
              <CardTitle>Annual Tax & Cost Increase</CardTitle>
              <CardDescription>Account for yearly increases in taxes and insurance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Property Taxes Increase</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      value={annualIncreases.propertyTaxIncrease}
                      onChange={(e) => setAnnualIncreases(prev => ({...prev, propertyTaxIncrease: Number(e.target.value)}))}
                      className="text-right font-mono"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>

                <div>
                  <Label>Home Insurance Increase</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      value={annualIncreases.homeInsuranceIncrease}
                      onChange={(e) => setAnnualIncreases(prev => ({...prev, homeInsuranceIncrease: Number(e.target.value)}))}
                      className="text-right font-mono"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>

                <div>
                  <Label>HOA Fee Increase</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      value={annualIncreases.hoaFeeIncrease}
                      onChange={(e) => setAnnualIncreases(prev => ({...prev, hoaFeeIncrease: Number(e.target.value)}))}
                      className="text-right font-mono"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>

                <div>
                  <Label>Other Costs Increase</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      value={annualIncreases.otherCostsIncrease}
                      onChange={(e) => setAnnualIncreases(prev => ({...prev, otherCostsIncrease: Number(e.target.value)}))}
                      className="text-right font-mono"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extra Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Extra Payments</CardTitle>
              <CardDescription>Add extra payments to pay off your loan faster</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Extra Monthly Payment */}
              <div>
                <Label>Extra Monthly Payment</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    placeholder="Amount ($)"
                    value={inputs.extraMonthlyPayment}
                    onChange={(e) => setInputs(prev => ({ ...prev, extraMonthlyPayment: Number(e.target.value) }))}
                    className="text-right font-mono"
                  />
                  <Select value={inputs.extraMonthlyStartMonth.toString()} onValueChange={(value) => setInputs(prev => ({ ...prev, extraMonthlyStartMonth: Number(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index + 1} value={(index + 1).toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={inputs.extraMonthlyStartYear.toString()} onValueChange={(value) => setInputs(prev => ({ ...prev, extraMonthlyStartYear: Number(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Extra Yearly Payment */}
              <div>
                <Label>Extra Yearly Payment</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    placeholder="Amount ($)"
                    value={inputs.annualExtraPayment}
                    onChange={(e) => setInputs(prev => ({ ...prev, annualExtraPayment: Number(e.target.value) }))}
                    className="text-right font-mono"
                  />
                  <Select value={inputs.startMonth.toString()} onValueChange={(value) => setInputs(prev => ({ ...prev, startMonth: Number(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index + 1} value={(index + 1).toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={inputs.annualExtraStartYear.toString()} onValueChange={(value) => setInputs(prev => ({ ...prev, annualExtraStartYear: Number(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Extra One-time Payments */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Extra One-time Payments</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addExtraPayment}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Payment
                  </Button>
                </div>
                
                {extraPayments.map((payment, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 items-end">
                    <Input
                      type="number"
                      placeholder="Amount ($)"
                      value={payment.amount}
                      onChange={(e) => updateExtraPayment(index, 'amount', Number(e.target.value))}
                      className="text-right font-mono"
                    />
                    <Select value={payment.month.toString()} onValueChange={(value) => updateExtraPayment(index, 'month', Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, idx) => (
                          <SelectItem key={idx + 1} value={(idx + 1).toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={payment.year.toString()} onValueChange={(value) => updateExtraPayment(index, 'year', Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeExtraPayment(index)}
                      disabled={extraPayments.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showSchedule" 
                    checked={showSchedule}
                    onCheckedChange={(checked) => setShowSchedule(checked as boolean)}
                  />
                  <Label htmlFor="showSchedule" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Show Monthly & Yearly Payment Schedule
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showBiweekly" 
                    checked={showBiweekly}
                    onCheckedChange={(checked) => setShowBiweekly(checked as boolean)}
                  />
                  <Label htmlFor="showBiweekly">Show Biweekly Payback Results</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Detailed Breakdown */}
        <div className="space-y-6">
          {/* Detailed Payment Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Principal & Interest:</span>
                  <span className="font-mono">{formatCurrency(mortgageOutput.monthlyPI)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Property Taxes:</span>
                  <span className="font-mono">{formatCurrency(inputs.propertyTaxesAmount / 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Home Insurance:</span>
                  <span className="font-mono">{formatCurrency(inputs.homeInsurance / 12)}</span>
                </div>
                {inputs.downPaymentPercent < 20 && (
                  <div className="flex justify-between">
                    <span className="text-sm">PMI:</span>
                    <span className="font-mono">{formatCurrency(inputs.pmi / 100 * mortgageOutput.loanAmount / 12)}</span>
                  </div>
                )}
                {inputs.hoaFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm">HOA Fee:</span>
                    <span className="font-mono">{formatCurrency(inputs.hoaFee)}</span>
                  </div>
                )}
                {inputs.otherCosts > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm">Other Costs:</span>
                    <span className="font-mono">{formatCurrency(inputs.otherCosts)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>Total Monthly:</span>
                  <span className="font-mono text-primary">{formatCurrency(mortgageOutput.totalMonthlyPayment)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>House Price:</span>
                  <span className="font-mono">{formatCurrency(inputs.homePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-mono">{formatCurrency(mortgageOutput.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment:</span>
                  <span className="font-mono">{formatCurrency(inputs.downPaymentAmount)} ({formatPercent(inputs.downPaymentPercent)})</span>
                </div>
                <div className="flex justify-between">
                  <span>Total of Payments:</span>
                  <span className="font-mono">{formatCurrency(mortgageOutput.totalMortgagePayments)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest:</span>
                  <span className="font-mono">{formatCurrency(mortgageOutput.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payoff Date:</span>
                  <span className="font-mono">{format(mortgageOutput.payoffDate, 'MMM yyyy')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setInputs(prev => ({ ...prev, extraMonthlyPayment: 100 }))}
              >
                Add $100/month extra
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setInputs(prev => ({ ...prev, extraMonthlyPayment: 200 }))}
              >
                Add $200/month extra
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setInputs(prev => ({ ...prev, loanTerm: 15 }))}
              >
                15-year loan
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => { setInputs(prev => ({ ...prev, downPaymentPercent: 20 })); updateDownPayment(20); }}
              >
                20% down payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <ErrorBoundary componentName="Payment Charts">
        <PaymentChart mortgageOutput={mortgageOutput} />
      </ErrorBoundary>

      {/* Amortization Schedule */}
      {showSchedule && (
        <ErrorBoundary componentName="Amortization Table">
          <AmortizationTableEnhanced 
            annualSummary={mortgageOutput.annualSummary}
            monthlyPayments={mortgageOutput.monthlyPayments}
          />
        </ErrorBoundary>
      )}

      {/* Biweekly Information */}
      {showBiweekly && (
        <Card>
          <CardHeader>
            <CardTitle>Biweekly Payment Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">With Biweekly Payments</h4>
                <div className="space-y-1 text-sm">
                  <div>Payment: {formatCurrency(mortgageOutput.monthlyPI / 2)} every 2 weeks</div>
                  <div>Total yearly payments: 26 (equivalent to 13 monthly)</div>
                  <div>Estimated payoff: ~4-6 years earlier</div>
                  <div>Interest savings: ~{formatCurrency(mortgageOutput.totalInterest * 0.25)}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How It Works</h4>
                <p className="text-sm text-muted-foreground">
                  By making 26 biweekly payments instead of 12 monthly payments, 
                  you effectively make one extra monthly payment per year, 
                  significantly reducing your loan term and total interest paid.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default MortgageCalculatorEnhanced 