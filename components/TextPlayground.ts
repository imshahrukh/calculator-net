export interface TextConfig {
  companyName: string;
  domain: string;
  showDomain: boolean;
  fontStyle: 'normal' | 'bold' | 'light' | 'mono';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  letterSpacing: number;
}
