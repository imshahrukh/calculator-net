import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { addMonths, format, getYear, getMonth } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface MortgageInputs {
  homePrice: number
  downPaymentAmount: number
  downPaymentPercent: number
  loanTerm: number
  interestRate: number
  startMonth: number
  startYear: number
  propertyTaxesAmount: number
  propertyTaxesPercent: number
  homeInsurance: number
  pmi: number
  hoaFee: number
  otherCosts: number
  extraMonthlyPayment: number
  extraMonthlyStartMonth: number
  extraMonthlyStartYear: number
  oneTimeExtraPayment: number
  oneTimeExtraMonth: number
  oneTimeExtraYear: number
  annualExtraPayment: number
  annualExtraStartYear: number
}

export interface MonthlyPayment {
  month: number
  date: Date
  principalAndInterest: number
  principalPayment: number
  interestPayment: number
  extraPayment: number
  totalPayment: number
  remainingBalance: number
  cumulativeInterest: number
  cumulativePayments: number
  monthlyEscrow: number
}

export interface AnnualSummary {
  year: number
  dateRange: string
  totalInterest: number
  totalPrincipal: number
  totalEscrow: number
  endingBalance: number
}

export interface MortgageOutput {
  monthlyPI: number
  monthlyEscrow: number
  totalMonthlyPayment: number
  loanAmount: number
  totalMortgagePayments: number
  totalInterest: number
  payoffDate: Date
  monthlyPayments: MonthlyPayment[]
  annualSummary: AnnualSummary[]
  pmiDropOffMonth?: number
}

export function calculateMortgage(inputs: MortgageInputs): MortgageOutput {
  const {
    homePrice,
    downPaymentAmount,
    loanTerm,
    interestRate,
    startMonth,
    startYear,
    propertyTaxesAmount,
    homeInsurance,
    pmi,
    hoaFee,
    otherCosts,
    extraMonthlyPayment,
    extraMonthlyStartMonth,
    extraMonthlyStartYear,
    oneTimeExtraPayment,
    oneTimeExtraMonth,
    oneTimeExtraYear,
    annualExtraPayment,
    annualExtraStartYear,
  } = inputs

  // Calculate loan amount
  const loanAmount = homePrice - downPaymentAmount
  
  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12
  
  // Total number of payments
  const totalPayments = loanTerm * 12
  
  // Calculate monthly PI payment using standard mortgage formula
  const monthlyPI = monthlyRate === 0 ? 
    loanAmount / totalPayments : 
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1)

  // Calculate monthly escrow (taxes, insurance, PMI, HOA, other)
  const monthlyPropertyTaxes = propertyTaxesAmount / 12
  const monthlyInsurance = homeInsurance / 12
  const monthlyPMI = (downPaymentAmount / homePrice < 0.2) ? (pmi / 100 * loanAmount / 12) : 0
  const monthlyEscrow = monthlyPropertyTaxes + monthlyInsurance + monthlyPMI + hoaFee + otherCosts

  // Total monthly payment (before extra payments)
  const totalMonthlyPayment = monthlyPI + monthlyEscrow

  // Generate amortization schedule
  const monthlyPayments: MonthlyPayment[] = []
  let currentBalance = loanAmount
  let cumulativeInterest = 0
  let cumulativePayments = 0
  let currentDate = new Date(startYear, startMonth - 1, 1)
  let month = 0
  let pmiDropOffMonth: number | undefined

  // Extra payment start date
  const extraMonthlyStart = new Date(extraMonthlyStartYear, extraMonthlyStartMonth - 1, 1)
  const oneTimeExtraDate = new Date(oneTimeExtraYear, oneTimeExtraMonth - 1, 1)

  while (currentBalance > 0.01 && month < totalPayments + 120) { // Add buffer for early payoff
    month++
    
    // Calculate interest for this month
    const interestPayment = currentBalance * monthlyRate
    
    // Calculate principal payment
    let principalPayment = monthlyPI - interestPayment
    
    // Calculate extra payments for this month
    let extraPayment = 0
    
    // Monthly extra payment (if started)
    if (currentDate >= extraMonthlyStart) {
      extraPayment += extraMonthlyPayment
    }
    
    // One-time extra payment
    if (currentDate.getTime() === oneTimeExtraDate.getTime()) {
      extraPayment += oneTimeExtraPayment
    }
    
    // Annual extra payment (if it's January and year >= start year)
    if (getMonth(currentDate) === 0 && getYear(currentDate) >= annualExtraStartYear) {
      extraPayment += annualExtraPayment
    }
    
    // Total payment to principal this month
    const totalPrincipalPayment = principalPayment + extraPayment
    
    // Don't pay more than remaining balance
    const actualPrincipalPayment = Math.min(totalPrincipalPayment, currentBalance)
    const actualExtraPayment = Math.max(0, actualPrincipalPayment - principalPayment)
    
    // Update balance
    currentBalance -= actualPrincipalPayment
    cumulativeInterest += interestPayment
    
    const totalPayment = monthlyPI + monthlyEscrow + actualExtraPayment
    cumulativePayments += totalPayment

    // Check for PMI drop-off (when loan balance <= 80% of original home price)
    if (monthlyPMI > 0 && !pmiDropOffMonth && currentBalance <= homePrice * 0.8) {
      pmiDropOffMonth = month
    }

    monthlyPayments.push({
      month,
      date: new Date(currentDate),
      principalAndInterest: monthlyPI,
      principalPayment: Math.min(principalPayment, currentBalance + actualPrincipalPayment),
      interestPayment,
      extraPayment: actualExtraPayment,
      totalPayment,
      remainingBalance: Math.max(0, currentBalance),
      cumulativeInterest,
      cumulativePayments,
      monthlyEscrow,
    })
    
    // Break if balance is paid off
    if (currentBalance <= 0.01) {
      break
    }
    
    // Move to next month
    currentDate = addMonths(currentDate, 1)
  }

  // Calculate payoff date
  const payoffDate = monthlyPayments[monthlyPayments.length - 1]?.date || new Date()

  // Group by year for annual summary
  const annualSummary: AnnualSummary[] = []
  const yearGroups: { [year: number]: MonthlyPayment[] } = {}

  monthlyPayments.forEach(payment => {
    const year = getYear(payment.date)
    if (!yearGroups[year]) {
      yearGroups[year] = []
    }
    yearGroups[year].push(payment)
  })

  Object.keys(yearGroups).forEach(yearStr => {
    const year = parseInt(yearStr)
    const yearPayments = yearGroups[year]
    const firstMonth = yearPayments[0]
    const lastMonth = yearPayments[yearPayments.length - 1]
    
    const totalInterest = yearPayments.reduce((sum, p) => sum + p.interestPayment, 0)
    const totalPrincipal = yearPayments.reduce((sum, p) => sum + p.principalPayment + p.extraPayment, 0)
    const totalEscrow = yearPayments.reduce((sum, p) => sum + p.monthlyEscrow, 0)
    
    annualSummary.push({
      year,
      dateRange: `${format(firstMonth.date, 'MMM yyyy')} - ${format(lastMonth.date, 'MMM yyyy')}`,
      totalInterest,
      totalPrincipal,
      totalEscrow,
      endingBalance: lastMonth.remainingBalance,
    })
  })

  return {
    monthlyPI,
    monthlyEscrow,
    totalMonthlyPayment,
    loanAmount,
    totalMortgagePayments: cumulativePayments,
    totalInterest: cumulativeInterest,
    payoffDate,
    monthlyPayments,
    annualSummary,
    pmiDropOffMonth,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrencyWithCents(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
} 