'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, type AnnualSummary } from '@/lib/utils'

interface AmortizationTableProps {
  annualSummary: AnnualSummary[]
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ annualSummary }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Amortization Schedule</CardTitle>
        <CardDescription>
          Annual summary of principal, interest, and escrow payments with remaining balance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Year</TableHead>
                <TableHead className="text-left">Date Range</TableHead>
                <TableHead className="text-right">Interest Paid</TableHead>
                <TableHead className="text-right">Principal Paid</TableHead>
                <TableHead className="text-right">Taxes & Insurance</TableHead>
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
                    {formatCurrency(yearData.endingBalance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {annualSummary.length > 10 && (
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Showing {annualSummary.length} years of amortization schedule
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AmortizationTable 