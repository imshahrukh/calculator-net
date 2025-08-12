'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import ShareModal from './ShareModal'
import { type MortgageInputs } from '@/lib/utils'

const ShareModalWrapper: React.FC = () => {
  const [inputs, setInputs] = useState<MortgageInputs | null>(null)
  const [mortgageOutput, setMortgageOutput] = useState<any>(null)

  // Listen for calculator state changes
  useEffect(() => {
    const handleCalculatorUpdate = (event: CustomEvent) => {
      if (event.detail.type === 'calculator-update') {
        setInputs(event.detail.inputs)
        setMortgageOutput(event.detail.mortgageOutput)
      }
    }

    window.addEventListener('calculator-update' as any, handleCalculatorUpdate)
    
    return () => {
      window.removeEventListener('calculator-update' as any, handleCalculatorUpdate)
    }
  }, [])

  // Default values if calculator hasn't been used yet
  const defaultInputs: MortgageInputs = {
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

  const defaultMortgageOutput = {
    monthlyPI: 2527.51,
    monthlyEscrow: 516.67,
    totalMonthlyPayment: 3044.18,
    loanAmount: 400000,
    totalMortgagePayments: 1095904.80,
    totalInterest: 695904.80,
    payoffDate: new Date(new Date().getFullYear() + 30, new Date().getMonth(), 1)
  }

  return (
    <ShareModal 
      inputs={inputs || defaultInputs}
      mortgageOutput={mortgageOutput || defaultMortgageOutput}
    >
      <Button variant="outline" size="sm" className="flex items-center space-x-2">
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>
    </ShareModal>
  )
}

export default ShareModalWrapper
