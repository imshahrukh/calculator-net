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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, TrendingUp, DollarSign, Calendar, Target, BarChart3 } from 'lucide-react'

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

interface EnhancedPaymentChartProps {
  mortgageOutput: MortgageOutput
}

const EnhancedPaymentChart: React.FC<EnhancedPaymentChartProps> = memo(({ mortgageOutput }) => {
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
          '#3B82F6', // Blue-500
          '#F59E0B', // Amber-500
          '#10B981', // Emerald-500
          '#8B5CF6', // Violet-500
        ],
        borderColor: [
          '#2563EB', // Blue-600
          '#D97706', // Amber-600
          '#059669', // Emerald-600
          '#7C3AED', // Violet-600
        ],
        borderWidth: 3,
        hoverBorderWidth: 4,
        hoverOffset: 8,
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
          padding: 25,
          usePointStyle: true,
          font: {
            size: 13,
            weight: 600,
          },
          generateLabels: (chart: any) => {
            const data = chart.data
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0]
                const value = dataset.data[i]
                const total = dataset.data.reduce((a: number, b: number) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor[i],
                  lineWidth: 2,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i,
                }
              })
            }
            return []
          }
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context: any) => context[0].label,
          label: function(context: any) {
            const value = context.parsed
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`
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
        borderColor: '#EF4444', // Red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#EF4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
      {
        label: 'Cumulative Interest',
        data: sampledPayments.map(payment => payment.cumulativeInterest),
        borderColor: '#F59E0B', // Amber-500
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#F59E0B',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
      {
        label: 'Cumulative Payments',
        data: sampledPayments.map(payment => payment.cumulativePayments),
        borderColor: '#10B981', // Emerald-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
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
          padding: 25,
          font: {
            size: 13,
            weight: 600,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context: any) => `Year ${context[0].dataIndex + 1}`,
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
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        title: {
          display: true,
          text: 'Loan Progress (Years)',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          color: '#374151',
          padding: 10,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        title: {
          display: true,
          text: 'Amount ($)',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          color: '#374151',
          padding: 10,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 500,
          },
          callback: function(value: any) {
            return '$' + value.toLocaleString()
          },
        },
      },
    },
  }

  return (
    <div className="space-y-8" role="region" aria-label="Enhanced mortgage payment charts">
      {/* Enhanced Monthly Payment Breakdown Pie Chart */}
      <Card className="border-2 border-blue-100 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-blue-200">
          <CardTitle className="flex items-center gap-3 text-blue-900">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <PieChart className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">Monthly Payment Breakdown</div>
              <div className="text-sm font-medium text-blue-700">Visual breakdown of your monthly payment components</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2">
              <div className="h-96 relative" aria-label="Enhanced pie chart showing monthly payment breakdown">
                <Pie data={pieData} options={pieOptions} aria-label="Monthly payment breakdown pie chart" />
              </div>
            </div>
            
            {/* Summary Stats */}
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Payment Summary</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">Principal & Interest</span>
                  </div>
                  <span className="font-mono font-semibold text-blue-700">
                    ${monthlyPI.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-medium text-amber-800">Property Taxes</span>
                  </div>
                  <span className="font-mono font-semibold text-amber-700">
                    ${monthlyPropertyTaxes.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-emerald-800">Home Insurance</span>
                  </div>
                  <span className="font-mono font-semibold text-emerald-700">
                    ${monthlyInsurance.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-violet-50 rounded-lg border border-violet-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                    <span className="text-sm font-medium text-violet-800">PMI/HOA/Other</span>
                  </div>
                  <span className="font-mono font-semibold text-violet-700">
                    ${monthlyPMIHOAOther.toLocaleString()}
                  </span>
                </div>
                
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-900">Total Monthly Payment</span>
                    <span className="font-mono text-lg font-bold text-blue-700">
                      ${(monthlyPI + monthlyEscrow).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Mortgage Payoff Line Chart */}
      <Card className="border-2 border-emerald-100 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border-b border-emerald-200">
          <CardTitle className="flex items-center gap-3 text-emerald-900">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">Mortgage Payoff Progress</div>
              <div className="text-sm font-medium text-emerald-700">Track your loan balance and payment progress over time</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Chart */}
            <div className="h-96 relative" aria-label="Enhanced line chart showing mortgage payoff progress over time">
              <Line data={lineData} options={lineOptions} aria-label="Mortgage payoff progress line chart" />
            </div>
            
            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-red-100 rounded">
                    <Target className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="font-semibold text-red-900">Remaining Balance</span>
                </div>
                <p className="text-sm text-red-700">
                  Your loan balance decreases over time as you make payments
                </p>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-amber-100 rounded">
                    <DollarSign className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="font-semibold text-amber-900">Cumulative Interest</span>
                </div>
                <p className="text-sm text-amber-700">
                  Total interest paid increases over the life of the loan
                </p>
              </div>
              
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-emerald-100 rounded">
                    <BarChart3 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="font-semibold text-emerald-900">Cumulative Payments</span>
                </div>
                <p className="text-sm text-emerald-700">
                  Total amount paid including principal and interest
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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

EnhancedPaymentChart.displayName = 'EnhancedPaymentChart'

export default EnhancedPaymentChart
