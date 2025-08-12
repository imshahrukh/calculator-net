import React from 'react';
import { Logo } from './Logo';

export function LogoExamples() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Logo Variants</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Primary Logo */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">Primary</h3>
          <Logo variant="primary" size={40} />
          <p className="text-sm text-slate-600 text-center">Full logo with icon and text</p>
        </div>

        {/* Icon Logo */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">Icon</h3>
          <Logo variant="icon" size={60} />
          <p className="text-sm text-slate-600 text-center">Just the icon with initials</p>
        </div>

        {/* Text Logo */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">Text</h3>
          <Logo variant="text" size={30} />
          <p className="text-sm text-slate-600 text-center">Text only with gradient</p>
        </div>

        {/* Compact Logo */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">Compact</h3>
          <Logo variant="compact" size={30} />
          <p className="text-sm text-slate-600 text-center">Compact version for small spaces</p>
        </div>
      </div>

      {/* Different Sizes */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Different Sizes</h3>
        <div className="flex items-center space-x-6">
          <Logo variant="primary" size={24} />
          <Logo variant="primary" size={32} />
          <Logo variant="primary" size={40} />
          <Logo variant="primary" size={48} />
          <Logo variant="primary" size={64} />
        </div>
      </div>

      {/* Custom Configuration */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Custom Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
            <h4 className="text-lg font-semibold text-slate-800">With Domain</h4>
            <Logo 
              variant="primary" 
              size={40} 
              textConfig={{
                showDomain: true,
                fontStyle: 'normal'
              }}
            />
          </div>
          
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
            <h4 className="text-lg font-semibold text-slate-800">Monospace Style</h4>
            <Logo 
              variant="text" 
              size={30} 
              textConfig={{
                fontStyle: 'mono',
                letterSpacing: 1
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
