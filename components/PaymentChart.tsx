'use client'

import React, { memo } from 'react'
import { Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { type MortgageOutput } from '@/lib/utils'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface PaymentChartProps {
  mortgageOutput: MortgageOutput
}

const PaymentChart: React.FC<PaymentChartProps> = memo(({ mortgageOutput }) => {
  const { monthlyPI, monthlyEscrow, monthlyPayments } = mortgageOutput

  // Calculate breakdown for pie chart
  const monthlyPropertyTaxes = mortgageOutput.monthlyPayments[0]?.monthlyEscrow 
    ? mortgageOutput.monthlyPayments[0].monthlyEscrow * 0.3 // Estimated portion
    : 0
  const monthlyInsurance = mortgageOutput.monthlyPayments[0]?.monthlyEscrow 
    ? mortgageOutput.monthlyPayments[0].monthlyEscrow * 0.3 // Estimated portion
    : 0
  const monthlyPMIHOAOther = monthlyEscrow - monthlyPropertyTaxes - monthlyInsurance

  const pieData = {
    labels: ['Principal & Interest', 'Property Taxes', 'Home Insurance', 'PMI/HOA/Other'],
    datasets: [
      {
        data: [monthlyPI, monthlyPropertyTaxes, monthlyInsurance, monthlyPMIHOAOther],
        backgroundColor: [
          '#3B82F6', // Blue
          '#F59E0B', // Amber
          '#10B981', // Emerald
          '#6366F1', // Indigo
        ],
        borderColor: [
          '#2563EB',
          '#D97706',
          '#059669',
          '#4F46E5',
        ],
        borderWidth: 2,
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${context.label}: $${value.toFixed(0)} (${percentage}%)`
          },
        },
      },
    },
  }

  // Prepare line chart data (sample every 12 months for performance)
  const sampleInterval = Math.max(1, Math.floor(monthlyPayments.length / 120)) // Max 120 data points
  const sampledPayments = monthlyPayments.filter((_, index) => index % sampleInterval === 0)
  
  const lineData = {
    labels: sampledPayments.map(payment => {
      const year = Math.floor((payment.month - 1) / 12)
      return `Year ${year + 1}`
    }),
    datasets: [
      {
        label: 'Remaining Balance',
        data: sampledPayments.map(payment => payment.remainingBalance),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Cumulative Interest',
        data: sampledPayments.map(payment => payment.cumulativeInterest),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Cumulative Payments',
        data: sampledPayments.map(payment => payment.cumulativePayments),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.1,
        fill: false,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y
            return `${context.dataset.label}: $${value.toLocaleString()}`
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
                  title: {
            display: true,
            text: 'Loan Progress',
            font: {
              size: 14,
              weight: 'bold' as const,
            },
          },
      },
      y: {
        display: true,
                  title: {
            display: true,
            text: 'Amount ($)',
            font: {
              size: 14,
              weight: 'bold' as const,
            },
          },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString()
          },
        },
      },
    },
  }

  return (
    <div className="space-y-8" role="region" aria-label="Mortgage payment charts">
      {/* Monthly Payment Breakdown Pie Chart */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          Monthly Payment Breakdown
        </h3>
        <div className="h-80" aria-label="Pie chart showing monthly payment breakdown">
          <Pie data={pieData} options={pieOptions} aria-label="Monthly payment breakdown pie chart" />
        </div>
      </div>

      {/* Mortgage Payoff Line Chart */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          Mortgage Payoff Chart
        </h3>
        <div className="h-96" aria-label="Line chart showing mortgage payoff progress over time">
          <Line data={lineData} options={lineOptions} aria-label="Mortgage payoff progress line chart" />
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  const prev = prevProps.mortgageOutput
  const next = nextProps.mortgageOutput
  
  return (
    prev.monthlyPI === next.monthlyPI &&
    prev.monthlyEscrow === next.monthlyEscrow &&
    prev.monthlyPayments.length === next.monthlyPayments.length &&
    prev.totalInterest === next.totalInterest
  )
})

PaymentChart.displayName = 'PaymentChart'

export default PaymentChart 