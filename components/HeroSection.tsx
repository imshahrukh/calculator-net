'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            <span>Most Advanced Financial Calculators</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
            Calculate Your
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Financial Future</span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Make informed financial decisions with our comprehensive suite of calculators. Get detailed analysis, 
            interactive charts, and expert insights to plan your perfect financial strategy.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mortgage-calculator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Start Calculating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2">
              View All Tools
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>No Registration</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 