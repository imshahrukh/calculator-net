import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, TrendingUp, PieChart, BarChart3, Clock, CheckCircle, Star, Users, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import SearchAndFilter from '@/components/SearchAndFilter'
import CalculatorsSection from '@/components/CalculatorsSection'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Search and Filter Section */}
      <SearchAndFilter />

      {/* Features Section */}
      <section id="features" className="py-16 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Why Choose Our Calculators</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Everything You Need to Make <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Smart Decisions</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our advanced calculators provide comprehensive insights to help you understand every aspect of your finances with precision and clarity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Cards */}
            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Calculator className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">Advanced Calculations</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Precise financial calculations with support for complex scenarios and detailed analysis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <PieChart className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">Visual Analytics</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Interactive charts and graphs showing breakdowns, progressions, and comparisons
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">Detailed Reports</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Comprehensive schedules and reports showing every detail of your financial plan
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">Scenario Planning</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Compare different strategies and see how changes affect your financial outcomes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">Privacy First</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  All calculations are done locally in your browser. No data is stored or transmitted
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">Lightning Fast</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Instant calculations with real-time updates as you adjust your parameters
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Trusted by Thousands of Users</h3>
            <p className="text-slate-300 text-lg">Join the community making smarter financial decisions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">1M+</div>
              <div className="text-slate-300 text-lg">Calculations Performed</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">50K+</div>
              <div className="text-slate-300 text-lg">Happy Users</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-slate-300 text-lg">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Calculators Section */}
      <CalculatorsSection />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Calculator.net</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md text-lg leading-relaxed">
                The most comprehensive and accurate financial calculators to help you make informed decisions about your future.
              </p>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Users className="h-4 w-4" />
                  <span>50K+ Users</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Calculators</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/mortgage-calculator" className="hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Mortgage Calculator
                </Link></li>
                <li><a href="#calculators" className="hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Investment Calculator
                </a></li>
                <li><a href="#calculators" className="hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Loan Comparison
                </a></li>
                <li><a href="#calculators" className="hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Budget Planner
                </a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Privacy Policy
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms of Service
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Calculator.net. All rights reserved. Built with ❤️ for better financial decisions.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 