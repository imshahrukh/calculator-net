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
import { Calendar, TrendingDown, DollarSign, FileText, ChevronDown, ChevronRight, BarChart3 } from 'lucide-react'
import { format, getYear } from 'date-fns'

interface AmortizationTableEnhancedProps {
  annualSummary: AnnualSummary[]
  monthlyPayments: MonthlyPayment[]
}

const AmortizationTableEnhanced: React.FC<AmortizationTableEnhancedProps> = ({ 
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
      {/* Schedule Type Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Amortization Schedule
              </CardTitle>
              <CardDescription>
                View your payment schedule breakdown by month or year
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewType === 'yearly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('yearly')}
                className="flex items-center gap-1"
              >
                <TrendingDown className="h-4 w-4" />
                Yearly Summary
              </Button>
              <Button
                variant={viewType === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('monthly')}
                className="flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                Monthly Detail
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === 'yearly' ? (
            // Yearly Summary Table
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Year</TableHead>
                      <TableHead className="text-left">Date Range</TableHead>
                      <TableHead className="text-right">Interest Paid</TableHead>
                      <TableHead className="text-right">Principal Paid</TableHead>
                      <TableHead className="text-right">Taxes & Insurance</TableHead>
                      <TableHead className="text-right">Total Paid</TableHead>
                      <TableHead className="text-right">Ending Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {annualSummary.map((yearData, index) => (
                      <TableRow key={yearData.year} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                        <TableCell className="font-medium">{yearData.year}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {yearData.dateRange}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(yearData.totalInterest)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(yearData.totalPrincipal)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(yearData.totalEscrow)}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          {formatCurrency(yearData.totalInterest + yearData.totalPrincipal + yearData.totalEscrow)}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold text-primary">
                          {formatCurrency(yearData.endingBalance)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {annualSummary.length > 10 && (
                <div className="text-sm text-muted-foreground text-center">
                  Showing {annualSummary.length} years of payment schedule
                </div>
              )}
            </div>
                     ) : (
             // Monthly Detail Table - Grouped by Year
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <p className="text-sm text-muted-foreground">
                   Showing {yearsToShow.length} years of {Object.keys(monthlyPaymentsByYear).length} total years
                 </p>
                 <div className="flex gap-2">
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={toggleAllYears}
                   >
                     {expandedYears.size === yearsToShow.length ? 'Collapse All' : 'Expand All'}
                   </Button>
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => setShowAllMonths(!showAllMonths)}
                   >
                     {showAllMonths ? 'Show First 3 Years' : `Show All ${Object.keys(monthlyPaymentsByYear).length} Years`}
                   </Button>
                 </div>
               </div>

               <div className="space-y-4">
                 {yearsToShow.map(year => {
                   const yearPayments = monthlyPaymentsByYear[year] || []
                   const isExpanded = expandedYears.has(year)
                   const yearTotals = {
                     payments: yearPayments.length,
                     totalPaid: yearPayments.reduce((sum, p) => sum + p.totalPayment, 0),
                     principal: yearPayments.reduce((sum, p) => sum + p.principalPayment, 0),
                     interest: yearPayments.reduce((sum, p) => sum + p.interestPayment, 0),
                     extra: yearPayments.reduce((sum, p) => sum + p.extraPayment, 0),
                     escrow: yearPayments.reduce((sum, p) => sum + p.monthlyEscrow, 0),
                   }

                   return (
                     <div key={year} className="border rounded-lg">
                                               {/* Year Header - Clickable to expand/collapse */}
                        <div 
                          className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 cursor-pointer hover:from-slate-100 hover:to-slate-150 hover:shadow-md transition-all duration-200 rounded-t-lg"
                          onClick={() => toggleYear(year)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full transition-colors duration-200 ${isExpanded ? 'bg-blue-500 text-white' : 'bg-white text-slate-600 border border-slate-300'}`}>
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-slate-800">{year}</h3>
                              <p className="text-sm text-slate-600 mt-1">
                                {yearTotals.payments} payments • {formatCurrency(yearTotals.totalPaid)} total paid
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-4 mb-2">
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">{formatCurrency(yearTotals.principal)}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">Principal</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-amber-600">{formatCurrency(yearTotals.interest)}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">Interest</div>
                              </div>
                              {yearTotals.extra > 0 && (
                                <div className="text-center">
                                  <div className="text-lg font-bold text-emerald-600">{formatCurrency(yearTotals.extra)}</div>
                                  <div className="text-xs text-slate-500 uppercase tracking-wide">Extra</div>
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-slate-600">
                              Year-end Balance: <span className="font-semibold text-slate-800">{formatCurrency(yearPayments[yearPayments.length - 1]?.remainingBalance || 0)}</span>
                            </div>
                          </div>
                        </div>

                                               {/* Expanded Monthly Details - Always show when expanded */}
                        {isExpanded && (
                          <div className="bg-white border-l border-r border-b border-slate-200 rounded-b-lg">
                            {/* Monthly Summary for this year */}
                            <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-emerald-50 border-b border-slate-100">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(yearTotals.principal)}</div>
                                  <div className="text-xs text-slate-600 uppercase tracking-wide mt-1">Principal Paid</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-amber-100">
                                  <div className="text-2xl font-bold text-amber-600">{formatCurrency(yearTotals.interest)}</div>
                                  <div className="text-xs text-slate-600 uppercase tracking-wide mt-1">Interest Paid</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-emerald-100">
                                  <div className="text-2xl font-bold text-emerald-600">{formatCurrency(yearTotals.extra)}</div>
                                  <div className="text-xs text-slate-600 uppercase tracking-wide mt-1">Extra Payments</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-indigo-100">
                                  <div className="text-2xl font-bold text-indigo-600">{formatCurrency(yearTotals.escrow)}</div>
                                  <div className="text-xs text-slate-600 uppercase tracking-wide mt-1">Escrow Paid</div>
                                </div>
                              </div>
                            </div>

                            {/* Detailed Monthly Table */}
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                  </div>
                                  Monthly Payment Details for {year}
                                </h4>
                                <div className="text-sm text-slate-500">
                                  {yearPayments.length} payments
                                </div>
                              </div>
                              
                              <div className="overflow-hidden rounded-lg border border-slate-200">
                                <Table>
                                  <TableHeader className="bg-slate-50">
                                    <TableRow className="border-b border-slate-200">
                                      <TableHead className="text-left w-16 py-4 px-4 font-semibold text-slate-700">#</TableHead>
                                      <TableHead className="text-left w-20 py-4 px-4 font-semibold text-slate-700">Month</TableHead>
                                      <TableHead className="text-right w-32 py-4 px-4 font-semibold text-slate-700">Total Payment</TableHead>
                                      <TableHead className="text-right w-28 py-4 px-4 font-semibold text-blue-600">Principal</TableHead>
                                      <TableHead className="text-right w-28 py-4 px-4 font-semibold text-amber-600">Interest</TableHead>
                                      <TableHead className="text-right w-24 py-4 px-4 font-semibold text-emerald-600">Extra</TableHead>
                                      <TableHead className="text-right w-24 py-4 px-4 font-semibold text-indigo-600">Escrow</TableHead>
                                      <TableHead className="text-right w-36 py-4 px-4 font-semibold text-slate-700">Remaining Balance</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody className="bg-white">
                                    {yearPayments.map((payment, index) => (
                                      <TableRow 
                                        key={payment.month} 
                                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150 ${
                                          index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                                        }`}
                                      >
                                        <TableCell className="py-4 px-4 font-semibold text-slate-700 text-center">
                                          {payment.month}
                                        </TableCell>
                                        <TableCell className="py-4 px-4 font-medium text-slate-600">
                                          {format(payment.date, 'MMM')}
                                        </TableCell>
                                        <TableCell className="py-4 px-4 text-right font-mono text-sm font-bold text-slate-800">
                                          {formatCurrencyWithCents(payment.totalPayment)}
                                        </TableCell>
                                        <TableCell className="py-4 px-4 text-right font-mono text-sm font-bold text-blue-600">
                                          {formatCurrencyWithCents(payment.principalPayment)}
                                        </TableCell>
                                        <TableCell className="py-4 px-4 text-right font-mono text-sm font-bold text-amber-600">
                                          {formatCurrencyWithCents(payment.interestPayment)}
                                        </TableCell>
                                        <TableCell className="py-4 px-4 text-right font-mono text-sm font-bold text-emerald-600">
                                          {payment.extraPayment > 0 ? formatCurrencyWithCents(payment.extraPayment) : (
                                            <span className="text-slate-400">—</span>
                                          )}
                                        </TableCell>
                                        <TableCell className="py-4 px-4 text-right font-mono text-sm font-semibold text-indigo-600">
                                          {formatCurrencyWithCents(payment.monthlyEscrow)}
                                        </TableCell>
                                        <TableCell className="py-4 px-4 text-right font-mono text-sm font-bold text-slate-800">
                                          {formatCurrency(payment.remainingBalance)}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>

                              {/* Year-end summary */}
                              <div className="mt-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 rounded-xl border border-slate-200 shadow-sm">
                                <div className="mb-4">
                                  <h5 className="text-lg font-bold text-slate-800 mb-2">Year {year} Summary</h5>
                                  <div className="h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full w-24"></div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="p-2 bg-slate-100 rounded-lg">
                                        <DollarSign className="h-4 w-4 text-slate-600" />
                                      </div>
                                      <span className="font-semibold text-slate-700">Year Totals</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-slate-600">Payments Made:</span>
                                        <span className="font-bold text-slate-800">{yearTotals.payments}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-600">Total Paid:</span>
                                        <span className="font-bold text-slate-800">{formatCurrency(yearTotals.totalPaid)}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="p-2 bg-blue-100 rounded-lg">
                                        <TrendingDown className="h-4 w-4 text-blue-600" />
                                      </div>
                                      <span className="font-semibold text-slate-700">Payment Breakdown</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-slate-600">Principal:</span>
                                        <span className="font-bold text-blue-600">{((yearTotals.principal / yearTotals.totalPaid) * 100).toFixed(1)}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-600">Interest:</span>
                                        <span className="font-bold text-amber-600">{((yearTotals.interest / yearTotals.totalPaid) * 100).toFixed(1)}%</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="p-2 bg-emerald-100 rounded-lg">
                                        <TrendingDown className="h-4 w-4 text-emerald-600" />
                                      </div>
                                      <span className="font-semibold text-slate-700">Balance Status</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-slate-600">Ending Balance:</span>
                                        <span className="font-bold text-slate-800">{formatCurrency(yearPayments[yearPayments.length - 1]?.remainingBalance || 0)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-600">Balance Reduction:</span>
                                        <span className="font-bold text-emerald-600">{formatCurrency(yearTotals.principal + yearTotals.extra)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                     </div>
                   )
                 })}
               </div>

               {/* Overall Summary Stats for Displayed Years */}
               {expandedYears.size > 0 && (
                 <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200 rounded-xl shadow-sm">
                   <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-blue-100 rounded-lg">
                       <BarChart3 className="h-5 w-5 text-blue-600" />
                     </div>
                     <h4 className="text-lg font-bold text-slate-800">Combined Totals for Expanded Years</h4>
                   </div>
                   
                   {(() => {
                     const displayedPayments = yearsToShow
                       .filter(year => expandedYears.has(year))
                       .flatMap(year => monthlyPaymentsByYear[year] || [])
                     
                     return (
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                         <div className="text-center p-5 bg-white border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                           <div className="text-2xl font-bold text-blue-600 mb-2">
                             {formatCurrency(displayedPayments.reduce((sum, p) => sum + p.principalPayment, 0))}
                           </div>
                           <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Total Principal</div>
                         </div>
                         <div className="text-center p-5 bg-white border border-amber-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                           <div className="text-2xl font-bold text-amber-600 mb-2">
                             {formatCurrency(displayedPayments.reduce((sum, p) => sum + p.interestPayment, 0))}
                           </div>
                           <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Total Interest</div>
                         </div>
                         <div className="text-center p-5 bg-white border border-emerald-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                           <div className="text-2xl font-bold text-emerald-600 mb-2">
                             {formatCurrency(displayedPayments.reduce((sum, p) => sum + p.extraPayment, 0))}
                           </div>
                           <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Total Extra</div>
                         </div>
                         <div className="text-center p-5 bg-white border border-indigo-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                           <div className="text-2xl font-bold text-indigo-600 mb-2">
                             {formatCurrency(displayedPayments.reduce((sum, p) => sum + p.monthlyEscrow, 0))}
                           </div>
                           <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Total Escrow</div>
                         </div>
                       </div>
                     )
                   })()}
                 </div>
               )}
             </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Summary Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Payment Schedule Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Total Payments</h4>
              <div className="text-2xl font-bold">{monthlyPayments.length}</div>
              <p className="text-sm text-muted-foreground">
                {Math.floor(monthlyPayments.length / 12)} years, {monthlyPayments.length % 12} months
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Total Amount Paid</h4>
              <div className="text-2xl font-bold">
                {formatCurrency(monthlyPayments.reduce((sum, p) => sum + p.totalPayment, 0))}
              </div>
              <p className="text-sm text-muted-foreground">
                Including all principal, interest, and escrow
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Interest vs Principal</h4>
              <div className="text-lg">
                <span className="text-red-600 font-semibold">
                  {((monthlyPayments.reduce((sum, p) => sum + p.interestPayment, 0) / 
                     monthlyPayments.reduce((sum, p) => sum + p.totalPayment, 0)) * 100).toFixed(1)}%
                </span>
                {' '}interest
              </div>
              <p className="text-sm text-muted-foreground">
                Of total payments goes to interest
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AmortizationTableEnhanced 