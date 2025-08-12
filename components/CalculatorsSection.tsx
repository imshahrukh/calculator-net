'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const CalculatorsSection: React.FC = () => {
  return (
    <section id="calculators" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Available Calculators
          </h2>
          <p className="text-xl text-slate-600">
            Choose from our comprehensive suite of financial calculators
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mortgage Calculator - Available */}
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white">
            <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
              Available Now
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <span>Mortgage Calculator</span>
              </CardTitle>
              <CardDescription>
                Calculate monthly payments, view amortization schedules, and analyze extra payment scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Monthly payment calculation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Amortization schedules</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Extra payment analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Interactive charts</span>
                </div>
              </div>
              <Link href="/mortgage-calculator">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Use Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default CalculatorsSection 