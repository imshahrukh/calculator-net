import React from 'react';
import { DynamicLogo } from './DynamicLogo';
import { TextConfig } from './TextPlayground';

interface LogoProps {
  variant?: 'primary' | 'icon' | 'text' | 'compact';
  size?: number;
  className?: string;
  textConfig?: Partial<TextConfig>;
}

export function Logo({ 
  variant = 'primary', 
  size = 32, 
  className = '', 
  textConfig = {} 
}: LogoProps) {
  const defaultConfig: TextConfig = {
      companyName: 'FastCalculator.co',
  domain: 'fastcalculator.co',
    showDomain: false,
    fontStyle: 'bold',
    textTransform: 'none',
    letterSpacing: 0,
    ...textConfig
  };

  return (
    <DynamicLogo
      variant={variant}
      size={size}
      className={className}
      textConfig={defaultConfig}
    />
  );
}
