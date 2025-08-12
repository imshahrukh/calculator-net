'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Filter, Home, TrendingUp, CreditCard, PiggyBank, TrendingDown, Calculator, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

interface Calculator {
  id: string
  name: string
  description: string
  category: string
  status: 'available' | 'coming-soon'
  icon: React.ReactNode
  color: string
  link?: string
  features: string[]
}

const calculators: Calculator[] = [
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    description: 'Calculate monthly payments, view amortization schedules, and analyze extra payment scenarios',
    category: 'mortgage',
    status: 'available',
    icon: <Home className="h-6 w-6" />,
    color: 'blue',
    link: '/mortgage-calculator',
    features: ['Monthly payment calculation', 'Amortization schedules', 'Extra payment analysis', 'Interactive charts']
  },
  {
    id: 'investment',
    name: 'Investment Calculator',
    description: 'Calculate returns on stocks, bonds, and mutual funds with compound interest analysis',
    category: 'investment',
    status: 'coming-soon',
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'purple',
    features: ['Portfolio diversification analysis', 'Risk assessment tools', 'Retirement planning scenarios', 'Market trend analysis']
  },
  {
    id: 'budget',
    name: 'Budget Planner',
    description: 'Comprehensive budget planning with expense tracking and savings goals',
    category: 'savings',
    status: 'coming-soon',
    icon: <PiggyBank className="h-6 w-6" />,
    color: 'green',
    features: ['Monthly budget tracking', 'Savings goal calculator', 'Expense categorization', 'Financial goal planning']
  },
  {
    id: 'loan-comparison',
    name: 'Loan Comparison Tool',
    description: 'Compare multiple loan offers side-by-side with detailed cost analysis',
    category: 'loans',
    status: 'coming-soon',
    icon: <CreditCard className="h-6 w-6" />,
    color: 'orange',
    features: ['Multi-lender comparison', 'Total cost of ownership', 'Break-even analysis', 'Interest rate comparison']
  },
  {
    id: 'debt-payoff',
    name: 'Debt Payoff Calculator',
    description: 'Plan your debt payoff strategy with snowball and avalanche methods',
    category: 'debt',
    status: 'coming-soon',
    icon: <TrendingDown className="h-6 w-6" />,
    color: 'red',
    features: ['Debt snowball method', 'Debt avalanche method', 'Payoff timeline', 'Interest savings calculator']
  }
]

const categories = [
  { id: 'all', name: 'All Tools', icon: <Calculator className="h-6 w-6" />, color: 'cyan' },
  { id: 'mortgage', name: 'Mortgage', icon: <Home className="h-6 w-6" />, color: 'blue' },
  { id: 'investment', name: 'Investment', icon: <TrendingUp className="h-6 w-6" />, color: 'purple' },
  { id: 'savings', name: 'Savings', icon: <PiggyBank className="h-6 w-6" />, color: 'green' },
  { id: 'loans', name: 'Loans', icon: <CreditCard className="h-6 w-6" />, color: 'orange' },
  { id: 'debt', name: 'Debt', icon: <TrendingDown className="h-6 w-6" />, color: 'red' }
]

const getColorClasses = (color: string, type: 'bg' | 'text' | 'border' | 'icon' = 'bg') => {
  const colors = {
    blue: {
      bg: 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200',
      text: 'text-blue-800',
      border: 'border-blue-200 hover:border-blue-300',
      icon: 'text-blue-600'
    },
    purple: {
      bg: 'from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200',
      text: 'text-purple-800',
      border: 'border-purple-200 hover:border-purple-300',
      icon: 'text-purple-600'
    },
    green: {
      bg: 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200',
      text: 'text-green-800',
      border: 'border-green-200 hover:border-green-300',
      icon: 'text-green-600'
    },
    orange: {
      bg: 'from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200',
      text: 'text-orange-800',
      border: 'border-orange-200 hover:border-orange-300',
      icon: 'text-orange-600'
    },
    red: {
      bg: 'from-red-50 to-red-100 hover:from-red-100 hover:to-red-200',
      text: 'text-red-800',
      border: 'border-red-200 hover:border-red-300',
      icon: 'text-red-600'
    },
    cyan: {
      bg: 'from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200',
      text: 'text-cyan-800',
      border: 'border-cyan-200 hover:border-cyan-300',
      icon: 'text-cyan-600'
    }
  }
  return colors[color as keyof typeof colors]?.[type] || colors.blue[type]
}

const getCalculatorColorClasses = (color: string) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    cyan: 'from-cyan-500 to-cyan-600'
  }
  return colors[color as keyof typeof colors] || colors.blue
}

const SearchAndFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredCalculators = useMemo(() => {
    return calculators.filter(calculator => {
      const matchesSearch = calculator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           calculator.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           calculator.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || calculator.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <section className="py-12 bg-white relative overflow-hidden" data-section="search-filter">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Find Your Perfect <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Calculator</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Search and filter through our comprehensive collection of financial calculators
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search calculators (e.g., mortgage, investment, budget)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center p-4 bg-gradient-to-br ${getColorClasses(category.color, 'bg')} rounded-xl transition-all duration-300 group border-2 ${getColorClasses(category.color, 'border')} ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
            >
              <div className={`h-8 w-8 mb-2 group-hover:scale-110 transition-transform ${getColorClasses(category.color, 'icon')}`}>
                {category.icon}
              </div>
              <span className={`text-sm font-medium ${getColorClasses(category.color, 'text')}`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-slate-600">
            {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Calculator Results */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.map((calculator) => (
            <Card key={calculator.id} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white border-0 shadow-lg relative">
              <div className={`absolute top-4 right-4 z-10 ${
                calculator.status === 'available' 
                  ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm' 
                  : 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 shadow-sm'
              } px-3 py-1 rounded-full text-xs font-medium border`}>
                {calculator.status === 'available' ? 'Available Now' : 'Coming Soon'}
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`h-12 w-12 bg-gradient-to-r ${getCalculatorColorClasses(calculator.color)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {calculator.icon}
                  </div>
                  <span className="text-lg font-semibold text-slate-900">{calculator.name}</span>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  {calculator.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 text-sm text-slate-600 mb-6">
                  {calculator.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {calculator.status === 'available' && calculator.link ? (
                  <Link href={calculator.link}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                      Use Calculator
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" className="w-full cursor-not-allowed" disabled>
                    <Clock className="mr-2 h-4 w-4" />
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <Calculator className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No calculators found</h3>
            <p className="text-slate-500">Try adjusting your search terms or category filter</p>
            <Button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchAndFilter
