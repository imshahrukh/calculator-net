# Mortgage Calculator - Next.js Application

A comprehensive mortgage calculator built with Next.js, TypeScript, Tailwind CSS, and Shadcn/UI that replicates the functionality of Calculator.net's mortgage calculator with enhanced features and SEO optimization.

## Features

### 🏠 Core Calculator Functions
- **Monthly Payment Calculation**: Principal & Interest using standard mortgage formula
- **Linked Input Fields**: Down payment ($ ↔ %), Property taxes ($ ↔ %)
- **Complete Cost Breakdown**: Taxes, insurance, PMI, HOA, and other costs
- **Start Date Selection**: Month and year selectors for loan start

### 💰 Extra Payment Analysis
- **Monthly Extra Payments**: With custom start date
- **One-time Extra Payments**: For windfalls and bonuses
- **Annual Extra Payments**: Recurring yearly additions
- **PMI Auto-Removal**: When loan-to-value reaches 80%

### 📊 Visualizations
- **Interactive Pie Chart**: Monthly payment breakdown
- **Line Chart**: Loan balance, cumulative interest, and payments over time
- **Amortization Table**: Annual summary with date ranges

### 🎯 SEO & Performance
- **Comprehensive Meta Tags**: OpenGraph, Twitter Cards, structured data
- **Schema.org JSON-LD**: WebApplication and FAQPage markup
- **Dynamic Imports**: Lazy-loaded charts for better performance
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Accessibility**: ARIA labels and semantic HTML

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **UI Components**: Shadcn/UI (Radix UI primitives)
- **Charts**: React Chart.js 2 with Chart.js
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Shadcn/UI** (if needed)
   ```bash
   npx shadcn-ui@latest init
   ```

3. **Add Required Components**
   ```bash
   npx shadcn-ui@latest add button input label select table checkbox card separator
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
mortgage-calculator/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Homepage with calculator and content
│   ├── globals.css         # Global styles and CSS variables
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/
│   ├── MortgageCalculator.tsx    # Main calculator component
│   ├── AmortizationTable.tsx     # Annual payment schedule
│   ├── PaymentChart.tsx          # Pie and line charts
│   └── ui/                       # Shadcn/UI components
├── lib/
│   └── utils.ts            # Calculation logic and utilities
├── public/
│   └── robots.txt          # SEO robots file
└── config files
```

## Key Components

### MortgageCalculator.tsx
- Form inputs with real-time updates
- Linked fields (down payment %, property tax %)
- Extra payment configuration
- Dynamic chart and table rendering

### lib/utils.ts
- `calculateMortgage()`: Core calculation engine
- Amortization schedule generation
- Extra payment handling
- PMI and escrow calculations

### PaymentChart.tsx
- Pie chart for payment breakdown
- Line chart for loan progression
- Responsive design with Chart.js

## Calculation Logic

### Monthly Payment Formula
```
M = P[r(1+r)^n]/[(1+r)^n-1]
```
Where:
- M = Monthly payment
- P = Principal loan amount
- r = Monthly interest rate
- n = Number of payments

### Extra Payment Processing
1. **Monthly Extra**: Added from specified start date
2. **Annual Extra**: Applied every January from start year
3. **One-time Extra**: Applied on exact date
4. **PMI Removal**: When balance ≤ 80% of original home value

## SEO Optimization

### On-Page SEO
- Semantic HTML structure
- H1/H2 heading hierarchy
- Meta descriptions and keywords
- Image alt attributes
- Schema.org structured data

### Technical SEO
- Sitemap.xml generation
- Robots.txt configuration
- Open Graph and Twitter Cards
- Core Web Vitals optimization
- Mobile-first responsive design

### Content Strategy
- Educational content sections
- FAQ-style structured data
- Keyword-rich explanatory text
- Long-tail keyword targeting

## Performance Features

- **Dynamic Imports**: Charts loaded only when needed
- **useMemo**: Calculations cached until inputs change
- **SSG**: Static generation for optimal loading
- **Code Splitting**: Automatic Next.js optimization
- **Image Optimization**: Next.js Image component ready

## Accessibility

- ARIA labels on form controls
- Semantic HTML elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus management

## Customization

### Styling
- Modify `app/globals.css` for theme colors
- Update Tailwind config for design system
- Customize Shadcn/UI component styles

### Calculations
- Extend `MortgageInputs` interface for new fields
- Add logic in `calculateMortgage()` function
- Update UI components to match

### Charts
- Modify chart options in `PaymentChart.tsx`
- Add new chart types or data visualizations
- Customize colors and styling

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with ES2020 support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## SEO Notes

### For Production Deployment
1. Update `metadataBase` URL in `app/layout.tsx`
2. Replace example.com in sitemap and robots.txt
3. Add Google Analytics/Search Console
4. Set up actual verification codes
5. Generate real OG images
6. Configure CDN for performance

### Recommended SEO Actions
- Submit sitemap to Google Search Console
- Create backlinks from finance/real estate sites
- Add local business schema if applicable
- Implement Core Web Vitals monitoring
- Set up Google Business Profile
- Add hreflang tags for international versions

## Support

For questions or issues, please open a GitHub issue or contact the development team. 