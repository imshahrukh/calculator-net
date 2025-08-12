'use client'

import React, { useState, useMemo, useCallback } from 'react'
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

// Dynamically import chart components for better performance
const PaymentChart = dynamic(() => import('./PaymentChart'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" />
})

const AmortizationTable = dynamic(() => import('./AmortizationTable'), {
  ssr: false,
  loading: () => <div className="h-32 bg-muted animate-pulse rounded-lg" />
})

const MortgageCalculator: React.FC = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  // Form state
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
  const [extraPayments, setExtraPayments] = useState([
    { amount: 0, month: currentMonth, year: currentYear }
  ])

  // Generate month/year options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const years = Array.from({ length: 50 }, (_, i) => currentYear + i)

  // Calculate mortgage details
  const mortgageOutput: MortgageOutput = useMemo(() => {
    return calculateMortgage(inputs)
  }, [inputs])

  // Helper functions to update linked fields
  const updateDownPayment = useCallback((field: 'amount' | 'percent', value: number) => {
    setInputs(prev => {
      if (field === 'amount') {
        const percent = (value / prev.homePrice) * 100
        return {
          ...prev,
          downPaymentAmount: value,
          downPaymentPercent: Math.round(percent * 100) / 100
        }
      } else {
        const amount = (value / 100) * prev.homePrice
        return {
          ...prev,
          downPaymentAmount: Math.round(amount),
          downPaymentPercent: value
        }
      }
    })
  }, [])

  const updatePropertyTaxes = useCallback((field: 'amount' | 'percent', value: number) => {
    setInputs(prev => {
      if (field === 'amount') {
        const percent = (value / prev.homePrice) * 100
        return {
          ...prev,
          propertyTaxesAmount: value,
          propertyTaxesPercent: Math.round(percent * 100) / 100
        }
      } else {
        const amount = (value / 100) * prev.homePrice
        return {
          ...prev,
          propertyTaxesAmount: Math.round(amount),
          propertyTaxesPercent: value
        }
      }
    })
  }, [])

  const updateHomePrice = useCallback((value: number) => {
    setInputs(prev => {
      const downPaymentAmount = (prev.downPaymentPercent / 100) * value
      const propertyTaxesAmount = (prev.propertyTaxesPercent / 100) * value
      return {
        ...prev,
        homePrice: value,
        downPaymentAmount: Math.round(downPaymentAmount),
        propertyTaxesAmount: Math.round(propertyTaxesAmount)
      }
    })
  }, [])

  return (
    <div className="space-y-8">
      {/* Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle>Mortgage Calculator</CardTitle>
          <CardDescription>
            Calculate your monthly mortgage payments, view amortization schedules, and analyze extra payment scenarios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Loan Details</h3>
              
              {/* Home Price */}
              <div className="space-y-2">
                <Label htmlFor="homePrice">Home Price</Label>
                <Input
                  id="homePrice"
                  type="number"
                  value={inputs.homePrice}
                  onChange={(e) => updateHomePrice(Number(e.target.value))}
                  className="text-right"
                />
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <Label>Down Payment</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="downPaymentAmount" className="text-sm text-muted-foreground">Amount ($)</Label>
                    <Input
                      id="downPaymentAmount"
                      type="number"
                      value={inputs.downPaymentAmount}
                      onChange={(e) => updateDownPayment('amount', Number(e.target.value))}
                      className="text-right"
                    />
                  </div>
                  <div>
                    <Label htmlFor="downPaymentPercent" className="text-sm text-muted-foreground">Percent (%)</Label>
                    <Input
                      id="downPaymentPercent"
                      type="number"
                      step="0.1"
                      value={inputs.downPaymentPercent}
                      onChange={(e) => updateDownPayment('percent', Number(e.target.value))}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Term */}
              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={inputs.loanTerm}
                  onChange={(e) => setInputs(prev => ({ ...prev, loanTerm: Number(e.target.value) }))}
                  className="text-right"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (% annual)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.001"
                  value={inputs.interestRate}
                  onChange={(e) => setInputs(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                  className="text-right"
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
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
            </div>

            {/* Right Column - Additional Costs & Extra Payments */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Additional Costs</h3>

              {/* Property Taxes */}
              <div className="space-y-2">
                <Label>Property Taxes (annual)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="propertyTaxesAmount" className="text-sm text-muted-foreground">Amount ($)</Label>
                    <Input
                      id="propertyTaxesAmount"
                      type="number"
                      value={inputs.propertyTaxesAmount}
                      onChange={(e) => updatePropertyTaxes('amount', Number(e.target.value))}
                      className="text-right"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyTaxesPercent" className="text-sm text-muted-foreground">Percent (%)</Label>
                    <Input
                      id="propertyTaxesPercent"
                      type="number"
                      step="0.01"
                      value={inputs.propertyTaxesPercent}
                      onChange={(e) => updatePropertyTaxes('percent', Number(e.target.value))}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Home Insurance */}
              <div className="space-y-2">
                <Label htmlFor="homeInsurance">Home Insurance (annual $)</Label>
                <Input
                  id="homeInsurance"
                  type="number"
                  value={inputs.homeInsurance}
                  onChange={(e) => setInputs(prev => ({ ...prev, homeInsurance: Number(e.target.value) }))}
                  className="text-right"
                />
              </div>

              {/* PMI */}
              <div className="space-y-2">
                <Label htmlFor="pmi">PMI (annual % of loan amount)</Label>
                <Input
                  id="pmi"
                  type="number"
                  step="0.01"
                  value={inputs.pmi}
                  onChange={(e) => setInputs(prev => ({ ...prev, pmi: Number(e.target.value) }))}
                  className="text-right"
                  disabled={inputs.downPaymentPercent >= 20}
                />
                {inputs.downPaymentPercent >= 20 && (
                  <p className="text-sm text-muted-foreground">PMI not required (down payment ≥ 20%)</p>
                )}
              </div>

              {/* HOA Fee */}
              <div className="space-y-2">
                <Label htmlFor="hoaFee">HOA Fee (monthly $)</Label>
                <Input
                  id="hoaFee"
                  type="number"
                  value={inputs.hoaFee}
                  onChange={(e) => setInputs(prev => ({ ...prev, hoaFee: Number(e.target.value) }))}
                  className="text-right"
                />
              </div>

              {/* Other Costs */}
              <div className="space-y-2">
                <Label htmlFor="otherCosts">Other Costs (monthly $)</Label>
                <Input
                  id="otherCosts"
                  type="number"
                  value={inputs.otherCosts}
                  onChange={(e) => setInputs(prev => ({ ...prev, otherCosts: Number(e.target.value) }))}
                  className="text-right"
                />
              </div>

              <Separator />

              <h3 className="text-lg font-semibold">Extra Payments</h3>

              {/* Extra Monthly Payment */}
              <div className="space-y-2">
                <Label htmlFor="extraMonthlyPayment">Extra Monthly Payment ($)</Label>
                <Input
                  id="extraMonthlyPayment"
                  type="number"
                  value={inputs.extraMonthlyPayment}
                  onChange={(e) => setInputs(prev => ({ ...prev, extraMonthlyPayment: Number(e.target.value) }))}
                  className="text-right"
                />
                {inputs.extraMonthlyPayment > 0 && (
                  <div className="grid grid-cols-2 gap-2">
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
                )}
              </div>

              {/* One-time Extra Payment */}
              <div className="space-y-2">
                <Label htmlFor="oneTimeExtraPayment">One-time Extra Payment ($)</Label>
                <Input
                  id="oneTimeExtraPayment"
                  type="number"
                  value={inputs.oneTimeExtraPayment}
                  onChange={(e) => setInputs(prev => ({ ...prev, oneTimeExtraPayment: Number(e.target.value) }))}
                  className="text-right"
                />
                {inputs.oneTimeExtraPayment > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={inputs.oneTimeExtraMonth.toString()} onValueChange={(value) => setInputs(prev => ({ ...prev, oneTimeExtraMonth: Number(value) }))}>
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
                    <Select value={inputs.oneTimeExtraYear.toString()} onValueChange={(value) => setInputs(prev => ({ ...prev, oneTimeExtraYear: Number(value) }))}>
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
                )}
              </div>

              {/* Annual Extra Payment */}
              <div className="space-y-2">
                <Label htmlFor="annualExtraPayment">Annual Extra Payment ($)</Label>
                <Input
                  id="annualExtraPayment"
                  type="number"
                  value={inputs.annualExtraPayment}
                  onChange={(e) => setInputs(prev => ({ ...prev, annualExtraPayment: Number(e.target.value) }))}
                  className="text-right"
                />
                {inputs.annualExtraPayment > 0 && (
                  <Select value={inputs.annualExtraStartYear.toString()} onValueChange={(value) => setInputs(prev => ({ ...prev, annualExtraStartYear: Number(value) }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Starting year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-2">
            <Checkbox 
              id="showSchedule" 
              checked={showSchedule}
              onCheckedChange={(checked) => setShowSchedule(checked as boolean)}
            />
            <Label htmlFor="showSchedule">Show Payment Schedule</Label>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Payment Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(mortgageOutput.totalMonthlyPayment)}
              </div>
              <div className="text-sm text-muted-foreground">Total Monthly Payment</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-xl font-semibold">
                {formatCurrency(mortgageOutput.monthlyPI)}
              </div>
              <div className="text-sm text-muted-foreground">Principal & Interest</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-xl font-semibold">
                {formatCurrency(mortgageOutput.monthlyEscrow)}
              </div>
              <div className="text-sm text-muted-foreground">Taxes, Insurance & Other</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-xl font-semibold">
                {formatCurrency(mortgageOutput.loanAmount)}
              </div>
              <div className="text-sm text-muted-foreground">Loan Amount</div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium">House Price</div>
              <div className="text-muted-foreground">{formatCurrency(inputs.homePrice)}</div>
            </div>
            <div>
              <div className="font-medium">Down Payment</div>
              <div className="text-muted-foreground">
                {formatCurrency(inputs.downPaymentAmount)} ({formatPercent(inputs.downPaymentPercent)})
              </div>
            </div>
            <div>
              <div className="font-medium">Loan Amount</div>
              <div className="text-muted-foreground">{formatCurrency(mortgageOutput.loanAmount)}</div>
            </div>
            <div>
              <div className="font-medium">Total of Payments</div>
              <div className="text-muted-foreground">{formatCurrency(mortgageOutput.totalMortgagePayments)}</div>
            </div>
            <div>
              <div className="font-medium">Total Interest</div>
              <div className="text-muted-foreground">{formatCurrency(mortgageOutput.totalInterest)}</div>
            </div>
            <div>
              <div className="font-medium">Payoff Date</div>
              <div className="text-muted-foreground">{format(mortgageOutput.payoffDate, 'MMMM yyyy')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <PaymentChart mortgageOutput={mortgageOutput} />

      {/* Amortization Schedule */}
      {showSchedule && (
        <AmortizationTable annualSummary={mortgageOutput.annualSummary} />
      )}
    </div>
  )
}

export default MortgageCalculator 