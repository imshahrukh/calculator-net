export const LOGO_COLORS = {
  gradient: {
    primary: '#3B82F6',    // Blue-500
    secondary: '#1D4ED8',  // Blue-700
  },
  solid: {
    dark: '#1F2937',       // Gray-800
    light: '#6B7280',      // Gray-500
  },
  white: '#FFFFFF',
  transparentWhite: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.3)',
  }
};

export function createGradientId(variant: string): string {
  return `logo-gradient-${variant}-${Math.random().toString(36).substr(2, 9)}`;
}
