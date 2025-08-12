'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, ArrowRight, CheckCircle, TrendingUp, BarChart3, PieChart } from 'lucide-react'
import Link from 'next/link'

const CalculatorsSection: React.FC = () => {
  return (
    <section id="calculators" className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-pink-100/30"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <Calculator className="h-4 w-4" />
            <span>Available Now</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Available <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Calculators</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our comprehensive suite of financial calculators designed to help you make informed decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mortgage Calculator - Available */}
          <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white border-0 shadow-lg">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              Available Now
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <CardHeader className="relative">
              <CardTitle className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-semibold text-slate-900">Mortgage Calculator</span>
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-slate-600">
                Calculate monthly payments, view amortization schedules, and analyze extra payment scenarios with precision
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="space-y-3 text-sm text-slate-600 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Monthly payment calculation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Detailed amortization schedules</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Extra payment analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Interactive charts & graphs</span>
                </div>
              </div>
              
              <Link href="/mortgage-calculator">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  Use Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Investment Calculator -Coming Soon */}
          <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white border-0 shadow-lg opacity-75">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
             Coming Soon
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <CardHeader className="relative">
              <CardTitle className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-semibold text-slate-900">Investment Calculator</span>
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-slate-600">
                Calculate returns on stocks, bonds, and mutual funds with compound interest analysis
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="space-y-3 text-sm text-slate-600 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Portfolio diversification analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Risk assessment tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Retirement planning scenarios</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Market trend analysis</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full group-hover:bg-purple-50 group-hover:border-purple-200 transition-colors cursor-not-allowed" disabled>
               Coming Soon
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Budget Planner -Coming Soon */}
          <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white border-0 shadow-lg opacity-75">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
             Coming Soon
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <CardHeader className="relative">
              <CardTitle className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <PieChart className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-semibold text-slate-900">Budget Planner</span>
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-slate-600">
                Comprehensive budget planning with expense tracking and savings goals
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="space-y-3 text-sm text-slate-600 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Monthly budget tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Savings goal calculator</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Expense categorization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Financial goal planning</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full group-hover:bg-green-50 group-hover:border-green-200 transition-colors cursor-not-allowed" disabled>
               Coming Soon
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default CalculatorsSection 