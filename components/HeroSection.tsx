'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, CheckCircle, Star, Users, Shield } from 'lucide-react'
import Link from 'next/link'

const HeroSection: React.FC = () => {
  const scrollToSearchSection = () => {
    const searchSection = document.querySelector('[data-section="search-filter"]')
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>Most Advanced Financial Calculators</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
            Calculate Your
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Financial Future</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-10">
            Make informed financial decisions with our comprehensive suite of calculators. Get detailed analysis, 
            interactive charts, and expert insights to plan your perfect financial strategy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/mortgage-calculator">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Start Calculating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1"
              onClick={scrollToSearchSection}
            >
              View All Tools
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-slate-500 mb-8">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">100% Free</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="font-medium">No Registration</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Instant Results</span>
            </div>
          </div>
          
          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 border-white flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full border-2 border-white flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-600 rounded-full border-2 border-white flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </div>
              <span className="font-medium">50K+ users trust us</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-medium">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 