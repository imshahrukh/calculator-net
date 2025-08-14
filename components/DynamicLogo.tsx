import React from 'react';
import { LOGO_COLORS, createGradientId } from './logo-constants';
import { TextConfig } from './TextPlayground';

interface DynamicLogoProps {
  variant: 'primary' | 'icon' | 'text' | 'compact';
  size: number;
  className: string;
  textConfig: TextConfig;
}

function getTextStyle(config: TextConfig) {
  const fontFamily = config.fontStyle === 'mono' 
    ? 'ui-monospace, SFMono-Regular, "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", monospace'
    : 'system-ui, -apple-system, sans-serif';
    
  const fontWeight = config.fontStyle === 'bold' ? '700' : 
                    config.fontStyle === 'light' ? '300' : '500';
  
  return {
    fontFamily,
    fontWeight,
    textTransform: config.textTransform,
    letterSpacing: `${config.letterSpacing}px`
  };
}

export function DynamicLogo({ variant, size, className, textConfig }: DynamicLogoProps) {
  const gradientId = createGradientId(variant);
  const textStyle = getTextStyle(textConfig);
  const displayText = textConfig.companyName || 'FastCalculator.co';
  const displayDomain = textConfig.showDomain ? textConfig.domain : '';

  // Icon variant
  if (variant === 'icon') {
    const initials = displayText.slice(0, 2).toUpperCase();
    
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={LOGO_COLORS.gradient.primary} />
            <stop offset="100%" stopColor={LOGO_COLORS.gradient.secondary} />
          </linearGradient>
        </defs>
        
        <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${gradientId})`} />
        <rect x="18" y="18" width="64" height="24" rx="4" fill={LOGO_COLORS.transparentWhite.light} stroke={LOGO_COLORS.transparentWhite.medium} strokeWidth="1" />
        
        <text 
          x="50" 
          y="35" 
          fontSize={initials.length > 2 ? "10" : "14"} 
          fontWeight="600" 
          fill={LOGO_COLORS.white} 
          textAnchor="middle" 
          fontFamily="monospace"
          style={{ letterSpacing: textConfig.letterSpacing * 0.5 + 'px' }}
        >
          {initials}
        </text>
        
        <g fill={LOGO_COLORS.transparentWhite.medium}>
          <rect x="22" y="50" width="12" height="12" rx="2" />
          <rect x="38" y="50" width="12" height="12" rx="2" />
          <rect x="54" y="50" width="12" height="12" rx="2" />
          <rect x="22" y="66" width="12" height="12" rx="2" />
          <rect x="38" y="66" width="12" height="12" rx="2" />
          <rect x="54" y="66" width="12" height="12" rx="2" />
        </g>
        
        <g fill={LOGO_COLORS.white} opacity="0.8">
          <rect x="72" y="54" width="2" height="8" />
          <rect x="69" y="57" width="8" height="2" />
          <rect x="69" y="70" width="8" height="1.5" />
          <rect x="69" y="74" width="8" height="1.5" />
        </g>
      </svg>
    );
  }

  // Primary variant
  if (variant === 'primary') {
    const initials = displayText.slice(0, 2).toUpperCase();
    const isLongName = displayText.length > 12;
    
    return (
      <svg 
        width={size * 2.4} 
        height={size} 
        viewBox="0 0 240 100" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={LOGO_COLORS.gradient.primary} />
            <stop offset="100%" stopColor={LOGO_COLORS.gradient.secondary} />
          </linearGradient>
        </defs>
        
        <g>
          <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${gradientId})`} />
          <rect x="18" y="18" width="64" height="24" rx="4" fill={LOGO_COLORS.transparentWhite.light} stroke={LOGO_COLORS.transparentWhite.medium} strokeWidth="1" />
          
          <text 
            x="50" 
            y="35" 
            fontSize={initials.length > 2 ? "10" : "14"} 
            fontWeight="600" 
            fill={LOGO_COLORS.white} 
            textAnchor="middle" 
            fontFamily="monospace"
          >
            {initials}
          </text>
          
          <g fill={LOGO_COLORS.transparentWhite.medium}>
            <rect x="22" y="50" width="12" height="12" rx="2" />
            <rect x="38" y="50" width="12" height="12" rx="2" />
            <rect x="54" y="50" width="12" height="12" rx="2" />
            <rect x="22" y="66" width="12" height="12" rx="2" />
            <rect x="38" y="66" width="12" height="12" rx="2" />
            <rect x="54" y="66" width="12" height="12" rx="2" />
          </g>
          
          <g fill={LOGO_COLORS.white} opacity="0.8">
            <rect x="72" y="54" width="2" height="8" />
            <rect x="69" y="57" width="8" height="2" />
            <rect x="69" y="70" width="8" height="1.5" />
            <rect x="69" y="74" width="8" height="1.5" />
          </g>
        </g>
        
        <g transform="translate(105, 25)">
          <text 
            x="0" 
            y="22" 
            fontSize={isLongName ? "18" : "22"}
            fontWeight={textStyle.fontWeight}
            fill={LOGO_COLORS.solid.dark} 
            fontFamily={textStyle.fontFamily}
            style={{
              textTransform: textStyle.textTransform,
              letterSpacing: textStyle.letterSpacing
            }}
          >
            {displayText}
          </text>
          {textConfig.showDomain && (
            <text 
              x="0" 
              y="45" 
              fontSize="14" 
              fontWeight="400" 
              fill={LOGO_COLORS.solid.light} 
              fontFamily={textStyle.fontFamily}
            >
              {displayDomain}
            </text>
          )}
        </g>
      </svg>
    );
  }

  // Text only variant
  if (variant === 'text') {
    return (
      <svg 
        width={size * 2.6} 
        height={size * 0.5} 
        viewBox="0 0 260 50" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={LOGO_COLORS.gradient.primary} />
            <stop offset="100%" stopColor={LOGO_COLORS.gradient.secondary} />
          </linearGradient>
        </defs>
        
        <text 
          x="0" 
          y="32" 
          fontSize={displayText.length > 12 ? "20" : "26"} 
          fontWeight={textStyle.fontWeight} 
          fill={`url(#${gradientId})`} 
          fontFamily={textStyle.fontFamily}
          style={{
            textTransform: textStyle.textTransform,
            letterSpacing: textStyle.letterSpacing
          }}
        >
          {displayText}
        </text>
        {textConfig.showDomain && (
          <text 
            x={displayText.length * (displayText.length > 12 ? 12 : 15)} 
            y="32" 
            fontSize="18" 
            fontWeight="400" 
            fill={LOGO_COLORS.solid.light} 
            fontFamily={textStyle.fontFamily}
          >
            {displayDomain}
          </text>
        )}
      </svg>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    const initials = displayText.slice(0, 2).toUpperCase();
    const isLongName = displayText.length > 12;
    
    return (
      <svg 
        width={size * 2.2} 
        height={size * 0.4} 
        viewBox="0 0 220 40" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={LOGO_COLORS.gradient.primary} />
            <stop offset="100%" stopColor={LOGO_COLORS.gradient.secondary} />
          </linearGradient>
        </defs>
        
        <rect x="2" y="2" width="36" height="36" rx="8" fill={`url(#${gradientId})`} />
        <rect x="6" y="6" width="28" height="10" rx="2" fill={LOGO_COLORS.transparentWhite.light} />
        <text 
          x="20" 
          y="14" 
          fontSize="8" 
          fontWeight="600" 
          fill={LOGO_COLORS.white} 
          textAnchor="middle" 
          fontFamily="monospace"
        >
          {initials}
        </text>
        
        <g fill={LOGO_COLORS.transparentWhite.medium}>
          <rect x="8" y="20" width="6" height="6" rx="1" />
          <rect x="16" y="20" width="6" height="6" rx="1" />
          <rect x="24" y="20" width="6" height="6" rx="1" />
          <rect x="8" y="28" width="6" height="6" rx="1" />
          <rect x="16" y="28" width="6" height="6" rx="1" />
          <rect x="24" y="28" width="6" height="6" rx="1" />
        </g>
        
        <text 
          x="45" 
          y="26" 
          fontSize={isLongName ? "14" : "16"} 
          fontWeight={textStyle.fontWeight} 
          fill={LOGO_COLORS.solid.dark} 
          fontFamily={textStyle.fontFamily}
          style={{
            textTransform: textStyle.textTransform,
            letterSpacing: textStyle.letterSpacing
          }}
        >
          {displayText}{textConfig.showDomain ? displayDomain : ''}
        </text>
      </svg>
    );
  }

  return null;
}
