'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  Calculator, 
  Home, 
  DollarSign, 
  Percent, 
  Calendar, 
  Shield, 
  Building, 
  Plus, 
  Minus,
  TrendingUp,
  Settings,
  Eye,
  EyeOff,
  Info
} from 'lucide-react'
import { formatCurrency, formatPercent } from '@/lib/utils'

interface ExtraPayment {
  amount: number
  month: number
  year: number
}

interface EnhancedMortgageFormProps {
  inputs: any
  setInputs: (inputs: any | ((prev: any) => any)) => void
  updateHomePrice: (price: number) => void
  updateDownPayment: (amount: number) => void
  updateDownPaymentPercent: (percent: number) => void
  updatePropertyTaxes: (amount: number) => void
  updatePropertyTaxesPercent: (percent: number) => void
  showAdvanced: boolean
  setShowAdvanced: (show: boolean) => void
  showBiweekly: boolean
  setShowBiweekly: (show: boolean) => void
  paymentFrequency: 'monthly' | 'biweekly'
  setPaymentFrequency: (frequency: 'monthly' | 'biweekly') => void
  annualIncreases: any
  setAnnualIncreases: (increases: any) => void
  extraPayments: any[]
  setExtraPayments: (payments: any[]) => void
  addExtraPayment: () => void
  removeExtraPayment: (index: number) => void
  updateExtraPayment: (index: number, field: keyof ExtraPayment, value: number) => void
  months: string[]
  years: number[]
  currentMonth: number
  currentYear: number
}

export function EnhancedMortgageForm({
  inputs,
  setInputs,
  updateHomePrice,
  updateDownPayment,
  updateDownPaymentPercent,
  updatePropertyTaxes,
  updatePropertyTaxesPercent,
  showAdvanced,
  setShowAdvanced,
  showBiweekly,
  setShowBiweekly,
  paymentFrequency,
  setPaymentFrequency,
  annualIncreases,
  setAnnualIncreases,
  extraPayments,
  setExtraPayments,
  addExtraPayment,
  removeExtraPayment,
  updateExtraPayment,
  months,
  years,
  currentMonth,
  currentYear
}: EnhancedMortgageFormProps) {
  const [showPercentages, setShowPercentages] = useState(false)

  return (
    <div className="space-y-6">
      {/* Basic Loan Information */}
      <Card className="border-2 border-blue-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
          <CardTitle className="flex items-center gap-3 text-blue-900">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            Basic Loan Information
          </CardTitle>
          <CardDescription className="text-blue-700">
            Enter your home purchase details and loan terms
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Home Price Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="homePrice" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                Home Price
              </Label>
              <div className="relative">
                <Input
                  id="homePrice"
                  type="number"
                  value={inputs.homePrice}
                  onChange={(e) => updateHomePrice(Number(e.target.value))}
                  className="text-right font-mono text-lg pr-8 border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="300,000"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  $
                </div>
              </div>
              <p className="text-xs text-slate-500">Total purchase price of the home</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanTerm" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                Loan Term
              </Label>
              <Select 
                value={inputs.loanTerm.toString()} 
                onValueChange={(value) => setInputs((prev: any) => ({ ...prev, loanTerm: Number(value) }))}
              >
                <SelectTrigger className="border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">Length of your mortgage</p>
            </div>
          </div>

          {/* Down Payment Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                Down Payment
                <button
                  type="button"
                  onClick={() => setShowPercentages(!showPercentages)}
                  className="ml-auto text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {showPercentages ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  value={showPercentages ? inputs.downPaymentPercent : inputs.downPaymentAmount}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    if (showPercentages) {
                      updateDownPaymentPercent(value)
                    } else {
                      updateDownPayment(value)
                    }
                  }}
                  className="text-right font-mono text-lg pr-8 border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={showPercentages ? "20" : "60,000"}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  {showPercentages ? "%" : "$"}
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Amount: {formatCurrency(inputs.downPaymentAmount)}</span>
                <span>Percent: {formatPercent(inputs.downPaymentPercent)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Percent className="h-4 w-4 text-red-600" />
                Interest Rate
              </Label>
              <div className="relative">
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  value={inputs.interestRate}
                  onChange={(e) => setInputs((prev: any) => ({ ...prev, interestRate: Number(e.target.value) }))}
                  className="text-right font-mono text-lg pr-8 border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="7.0"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  %
                </div>
              </div>
              <p className="text-xs text-slate-500">Annual interest rate</p>
            </div>
          </div>

          {/* Loan Amount Display */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg border border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-700">Loan Amount:</span>
              <span className="text-lg font-bold text-blue-600">
                {formatCurrency(inputs.homePrice - inputs.downPaymentAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-slate-600">Loan-to-Value Ratio:</span>
              <span className="text-sm font-semibold text-slate-700">
                {formatPercent(((inputs.homePrice - inputs.downPaymentAmount) / inputs.homePrice) * 100)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Costs */}
      <Card className="border-2 border-emerald-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200">
          <CardTitle className="flex items-center gap-3 text-emerald-900">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Building className="h-5 w-5 text-emerald-600" />
            </div>
            Property Costs
          </CardTitle>
          <CardDescription className="text-emerald-700">
            Monthly costs beyond your principal and interest
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Taxes */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-600" />
                Property Taxes
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  value={showPercentages ? inputs.propertyTaxesPercent : inputs.propertyTaxesAmount}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    if (showPercentages) {
                      updatePropertyTaxesPercent(value)
                    } else {
                      updatePropertyTaxes(value)
                    }
                  }}
                  className="text-right font-mono text-lg pr-8 border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder={showPercentages ? "1.2" : "3,600"}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  {showPercentages ? "%" : "$"}
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Annual: {formatCurrency(inputs.propertyTaxesAmount)}</span>
                <span>Monthly: {formatCurrency(inputs.propertyTaxesAmount / 12)}</span>
              </div>
            </div>

            {/* Home Insurance */}
            <div className="space-y-2">
              <Label htmlFor="homeInsurance" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                Home Insurance
              </Label>
              <div className="relative">
                <Input
                  id="homeInsurance"
                  type="number"
                  value={inputs.homeInsurance}
                  onChange={(e) => setInputs((prev: any) => ({ ...prev, homeInsurance: Number(e.target.value) }))}
                  className="text-right font-mono text-lg pr-8 border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="1,000"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  $
                </div>
              </div>
              <p className="text-xs text-slate-500">Annual homeowners insurance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PMI */}
            <div className="space-y-2">
              <Label htmlFor="pmi" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-600" />
                PMI (Private Mortgage Insurance)
              </Label>
              <div className="relative">
                <Input
                  id="pmi"
                  type="number"
                  step="0.01"
                  value={inputs.pmi}
                  onChange={(e) => setInputs((prev: any) => ({ ...prev, pmi: Number(e.target.value) }))}
                  className="text-right font-mono text-lg pr-8 border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="0.5"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  %
                </div>
              </div>
              <p className="text-xs text-slate-500">Required when down payment &lt; 20%</p>
            </div>

            {/* HOA Fees */}
            <div className="space-y-2">
              <Label htmlFor="hoaFee" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Building className="h-4 w-4 text-indigo-600" />
                HOA Fees
              </Label>
              <div className="relative">
                <Input
                  id="hoaFee"
                  type="number"
                  value={inputs.hoaFee}
                  onChange={(e) => setInputs((prev: any) => ({ ...prev, hoaFee: Number(e.target.value) }))}
                  className="text-right font-mono text-lg pr-8 border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="0"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  $
                </div>
              </div>
              <p className="text-xs text-slate-500">Monthly homeowners association fees</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Options Toggle */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50"
        >
          <Settings className="h-4 w-4" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </Button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="space-y-6">
          {/* Extra Payments */}
          <Card className="border-2 border-purple-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200">
              <CardTitle className="flex items-center gap-3 text-purple-900">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                Extra Payments
              </CardTitle>
              <CardDescription className="text-purple-700">
                Accelerate your loan payoff and save on interest
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Monthly Extra Payment */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="extraMonthlyPayment" className="text-sm font-semibold text-slate-700">
                    Monthly Extra Payment
                  </Label>
                  <div className="relative">
                    <Input
                      id="extraMonthlyPayment"
                      type="number"
                      value={inputs.extraMonthlyPayment}
                      onChange={(e) => setInputs((prev: any) => ({ ...prev, extraMonthlyPayment: Number(e.target.value) }))}
                      className="text-right font-mono pr-8 border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="0"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                      $
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extraMonthlyStartMonth" className="text-sm font-semibold text-slate-700">
                    Start Month
                  </Label>
                  <Select 
                    value={inputs.extraMonthlyStartMonth.toString()} 
                    onValueChange={(value) => setInputs((prev: any) => ({ ...prev, extraMonthlyStartMonth: Number(value) }))}
                  >
                    <SelectTrigger className="border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extraMonthlyStartYear" className="text-sm font-semibold text-slate-700">
                    Start Year
                  </Label>
                  <Select 
                    value={inputs.extraMonthlyStartYear.toString()} 
                    onValueChange={(value) => setInputs((prev: any) => ({ ...prev, extraMonthlyStartYear: Number(value) }))}
                  >
                    <SelectTrigger className="border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* One-time Extra Payment */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="oneTimeExtraPayment" className="text-sm font-semibold text-slate-700">
                    One-time Extra Payment
                  </Label>
                  <div className="relative">
                    <Input
                      id="oneTimeExtraPayment"
                      type="number"
                      value={inputs.oneTimeExtraPayment}
                      onChange={(e) => setInputs((prev: any) => ({ ...prev, oneTimeExtraPayment: Number(e.target.value) }))}
                      className="text-right font-mono pr-8 border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="0"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                      $
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oneTimeExtraMonth" className="text-sm font-semibold text-slate-700">
                    Month
                  </Label>
                  <Select 
                    value={inputs.oneTimeExtraMonth.toString()} 
                    onValueChange={(value) => setInputs((prev: any) => ({ ...prev, oneTimeExtraMonth: Number(value) }))}
                  >
                    <SelectTrigger className="border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oneTimeExtraYear" className="text-sm font-semibold text-slate-700">
                    Year
                  </Label>
                  <Select 
                    value={inputs.oneTimeExtraYear.toString()} 
                    onValueChange={(value) => setInputs((prev: any) => ({ ...prev, oneTimeExtraYear: Number(value) }))}
                  >
                    <SelectTrigger className="border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualExtraPayment" className="text-sm font-semibold text-slate-700">
                    Annual Extra Payment
                  </Label>
                  <div className="relative">
                    <Input
                      id="annualExtraPayment"
                      type="number"
                      value={inputs.annualExtraPayment}
                      onChange={(e) => setInputs((prev: any) => ({ ...prev, annualExtraPayment: Number(e.target.value) }))}
                      className="text-right font-mono pr-8 border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="0"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                      $
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Frequency */}
              <div className="flex items-center space-x-4">
                <Label className="text-sm font-semibold text-slate-700">Payment Frequency:</Label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentFrequency"
                      value="monthly"
                      checked={paymentFrequency === 'monthly'}
                      onChange={(e) => setPaymentFrequency(e.target.value as 'monthly' | 'biweekly')}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">Monthly</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentFrequency"
                      value="biweekly"
                      checked={paymentFrequency === 'biweekly'}
                      onChange={(e) => setPaymentFrequency(e.target.value as 'monthly' | 'biweekly')}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">Bi-weekly</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
