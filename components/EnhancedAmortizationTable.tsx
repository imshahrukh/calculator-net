'use client'

import React, { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatCurrencyWithCents, type AnnualSummary, type MonthlyPayment } from '@/lib/utils'
import { Calendar, TrendingDown, DollarSign, FileText, ChevronDown, ChevronRight, BarChart3, Eye, EyeOff, Download, Filter } from 'lucide-react'
import { format, getYear } from 'date-fns'

interface EnhancedAmortizationTableProps {
  annualSummary: AnnualSummary[]
  monthlyPayments: MonthlyPayment[]
}

const EnhancedAmortizationTable: React.FC<EnhancedAmortizationTableProps> = ({ 
  annualSummary, 
  monthlyPayments 
}) => {
  const [viewType, setViewType] = useState<'monthly' | 'yearly'>('yearly')
  const [showAllMonths, setShowAllMonths] = useState(false)
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set([new Date().getFullYear()]))
  const [expandedMonths, setExpandedMonths] = useState<Set<number>>(new Set())

  // Group monthly payments by year
  const monthlyPaymentsByYear = useMemo(() => {
    const grouped: { [year: number]: MonthlyPayment[] } = {}
    monthlyPayments.forEach(payment => {
      const year = getYear(payment.date)
      if (!grouped[year]) {
        grouped[year] = []
      }
      grouped[year].push(payment)
    })
    return grouped
  }, [monthlyPayments])

  // Get years to display (limit to first few years if not showing all)
  const yearsToShow = useMemo(() => {
    const allYears = Object.keys(monthlyPaymentsByYear).map(Number).sort()
    return showAllMonths ? allYears : allYears.slice(0, 3)
  }, [monthlyPaymentsByYear, showAllMonths])

  // Toggle year expansion
  const toggleYear = (year: number) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev)
      if (newSet.has(year)) {
        newSet.delete(year)
      } else {
        newSet.add(year)
      }
      return newSet
    })
  }

  // Expand/collapse all years
  const toggleAllYears = () => {
    if (expandedYears.size === yearsToShow.length) {
      setExpandedYears(new Set())
    } else {
      setExpandedYears(new Set(yearsToShow))
    }
  }

  // Toggle month expansion
  const toggleMonth = (paymentNumber: number) => {
    setExpandedMonths(prev => {
      const newSet = new Set(prev)
      if (newSet.has(paymentNumber)) {
        newSet.delete(paymentNumber)
      } else {
        newSet.add(paymentNumber)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Schedule Header */}
      <Card className="border-2 border-purple-100 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border-b border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-purple-900">
                  Amortization Schedule
                </CardTitle>
                <CardDescription className="text-purple-700">
                  Detailed breakdown of your payment schedule by month or year
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                onClick={toggleAllYears}
              >
                {expandedYears.size === yearsToShow.length ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Collapse All
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Expand All
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 hover:border-purple-300 hover:bg-purple-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* View Type Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-900">View Type:</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewType === 'yearly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('yearly')}
                className={viewType === 'yearly' 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
                }
              >
                <Calendar className="h-4 w-4 mr-2" />
                Yearly Summary
              </Button>
              
              <Button
                variant={viewType === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('monthly')}
                className={viewType === 'monthly' 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
                }
              >
                <FileText className="h-4 w-4 mr-2" />
                Monthly Details
              </Button>
            </div>
            
            {viewType === 'monthly' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllMonths(!showAllMonths)}
                className="border-purple-200 hover:border-purple-300 hover:bg-purple-50"
              >
                {showAllMonths ? 'Show First 3 Years' : 'Show All Years'}
              </Button>
            )}
          </div>

          {/* Yearly Summary View */}
          {viewType === 'yearly' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">Total Years</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{annualSummary.length}</div>
                </div>
                
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-800">Total Payments</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-900">
                    {formatCurrency(annualSummary.reduce((sum, year) => sum + year.totalPrincipal + year.totalInterest + year.totalEscrow, 0))}
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">Total Interest</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-900">
                    {formatCurrency(annualSummary.reduce((sum, year) => sum + year.totalInterest, 0))}
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-800">Remaining Balance</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {formatCurrency(annualSummary[annualSummary.length - 1]?.endingBalance || 0)}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table className="border-2 border-purple-200 rounded-lg overflow-hidden">
                  <TableHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <TableRow>
                      <TableHead className="text-purple-900 font-bold">Year</TableHead>
                      <TableHead className="text-purple-900 font-bold text-right">Beginning Balance</TableHead>
                      <TableHead className="text-purple-900 font-bold text-right">Payment</TableHead>
                      <TableHead className="text-purple-900 font-bold text-right">Principal</TableHead>
                      <TableHead className="text-purple-900 font-bold text-right">Interest</TableHead>
                      <TableHead className="text-purple-900 font-bold text-right">Ending Balance</TableHead>
                      <TableHead className="text-purple-900 font-bold text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {annualSummary.map((year, index) => (
                      <React.Fragment key={year.year}>
                        <TableRow className="hover:bg-purple-50 transition-colors">
                          <TableCell className="font-semibold text-purple-900">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">{year.year}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleYear(year.year)}
                                className="h-6 w-6 p-0 text-purple-600 hover:text-purple-800"
                              >
                                {expandedYears.has(year.year) ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                                                     <TableCell className="text-right font-mono text-purple-700">
                             {formatCurrency(year.endingBalance)}
                           </TableCell>
                           <TableCell className="text-right font-mono text-purple-700">
                             {formatCurrency(year.totalPrincipal + year.totalInterest + year.totalEscrow)}
                           </TableCell>
                          <TableCell className="text-right font-mono text-emerald-700">
                            {formatCurrency(year.totalPrincipal)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-amber-700">
                            {formatCurrency(year.totalInterest)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-purple-700">
                            {formatCurrency(year.endingBalance)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-purple-700">
                            {formatCurrency(year.totalPrincipal + year.totalInterest + year.totalEscrow)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleYear(year.year)}
                              className="border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                            >
                              {expandedYears.has(year.year) ? 'Hide' : 'Show'} Months
                            </Button>
                          </TableCell>
                        </TableRow>
                        
                        {/* Monthly details for expanded years */}
                        {expandedYears.has(year.year) && (
                          <TableRow>
                            <TableCell colSpan={7} className="p-0">
                              <div className="bg-purple-25 border-t border-purple-200">
                                <div className="p-4">
                                  <h4 className="font-semibold text-purple-900 mb-3">
                                    Monthly Breakdown for {year.year}
                                  </h4>
                                  <div className="overflow-x-auto">
                                    <Table className="border border-purple-200 rounded">
                                      <TableHeader className="bg-purple-100">
                                        <TableRow>
                                          <TableHead className="text-purple-900">Month</TableHead>
                                          <TableHead className="text-purple-900 text-right">Payment</TableHead>
                                          <TableHead className="text-purple-900 text-right">Principal</TableHead>
                                          <TableHead className="text-purple-900 text-right">Interest</TableHead>
                                          <TableHead className="text-purple-900 text-right">Balance</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {monthlyPaymentsByYear[year.year]?.map((payment, index) => (
                                          <TableRow key={`${year.year}-${index}`} className="hover:bg-purple-50">
                                            <TableCell className="text-purple-700">
                                              {format(payment.date, 'MMM yyyy')}
                                            </TableCell>
                                            <TableCell className="text-right font-mono text-purple-700">
                                              {formatCurrency(payment.totalPayment)}
                                            </TableCell>
                                            <TableCell className="text-right font-mono text-emerald-700">
                                              {formatCurrency(payment.principalPayment)}
                                            </TableCell>
                                            <TableCell className="text-right font-mono text-amber-700">
                                              {formatCurrency(payment.interestPayment)}
                                            </TableCell>
                                            <TableCell className="text-right font-mono text-purple-700">
                                              {formatCurrency(payment.remainingBalance)}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Monthly Details View */}
          {viewType === 'monthly' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <Table className="border-2 border-purple-200 rounded-lg overflow-hidden">
                  <TableHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <TableRow>
                      <TableHead className="text-purple-900 font-bold">Payment #</TableHead>
                      <TableHead className="text-purple-900 font-bold">Date</TableHead>
                      <TableHead className="text-purple-900 font-bold text-right">Payment</TableHead>
                      <TableHead className="text-purple-900 font-bold text-right">Principal</TableHead>
                      <TableHead className="text-purple-900 font-bold text-right">Interest</TableHead>
                      <TableHead className="text-purple-900 font-bold text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyPayments
                      .filter((_, index) => showAllMonths || index < 36) // Show first 3 years or all
                      .map((payment, index) => (
                        <TableRow key={index} className="hover:bg-purple-50 transition-colors">
                          <TableCell className="font-semibold text-purple-900">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-purple-700">
                            {format(payment.date, 'MMM yyyy')}
                          </TableCell>
                          <TableCell className="text-right font-mono text-purple-700">
                            {formatCurrency(payment.totalPayment)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-emerald-700">
                            {formatCurrency(payment.principalPayment)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-amber-700">
                            {formatCurrency(payment.interestPayment)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-purple-700">
                            {formatCurrency(payment.remainingBalance)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default EnhancedAmortizationTable
