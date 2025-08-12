'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'
import Link from 'next/link'

const Navigation: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">Calculator.net</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#calculators" className="text-slate-600 hover:text-blue-600 transition-colors">Calculators</a>
            <a href="#coming-soon" className="text-slate-600 hover:text-blue-600 transition-colors">Coming Soon</a>
            <Link href="/mortgage-calculator">
              <Button className="bg-blue-600 hover:bg-blue-700">Try Calculator</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navigation 