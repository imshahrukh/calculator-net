import MortgageCalculatorEnhanced from '@/components/MortgageCalculatorEnhanced'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <main className="space-y-12" role="main">
      {/* Page Header */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Mortgage Calculator
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate your monthly mortgage payments, explore different scenarios, and understand your home loan with our comprehensive mortgage calculator.
        </p>
      </header>

      {/* Main Calculator */}
      <section aria-label="Mortgage calculator tool">
        <MortgageCalculatorEnhanced />
      </section>

      {/* SEO Content Sections */}
      <section className="space-y-8" aria-label="Mortgage education and information">
        {/* What is a Mortgage */}
        <Card>
          <CardHeader>
            <CardTitle>What is a Mortgage?</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              A mortgage is a loan specifically used to purchase real estate, typically a home. The property itself serves as collateral for the loan, meaning if you fail to make payments, the lender can foreclose on the property. Mortgages are usually long-term loans, commonly spanning 15 to 30 years, with fixed or adjustable interest rates.
            </p>
            <p>
              The mortgage payment consists of principal (the amount borrowed) and interest (the cost of borrowing). Most homeowners also pay property taxes, homeowners insurance, and possibly private mortgage insurance (PMI) as part of their monthly payment, held in an escrow account by the lender.
            </p>
          </CardContent>
        </Card>

        {/* Mortgage Calculator Components */}
        <Card>
          <CardHeader>
            <CardTitle>Understanding Mortgage Calculator Components</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <h3>Principal and Interest (P&I)</h3>
            <p>
              The core of your mortgage payment, calculated using the loan amount, interest rate, and loan term. Early in the loan, most of your payment goes toward interest. Over time, more goes toward principal as you build equity.
            </p>

            <h3>Property Taxes</h3>
            <p>
              Annual taxes assessed by local government based on your property's value. These are typically collected monthly by your lender and held in escrow, then paid to the tax authority when due.
            </p>

            <h3>Homeowners Insurance</h3>
            <p>
              Required by lenders to protect the property against damage from fire, theft, and other covered perils. The annual premium is divided by 12 and collected monthly with your mortgage payment.
            </p>

            <h3>Private Mortgage Insurance (PMI)</h3>
            <p>
              Required when your down payment is less than 20% of the home's value. PMI protects the lender if you default on the loan. Once you reach 20% equity, you can typically request PMI removal.
            </p>

            <h3>HOA Fees and Other Costs</h3>
            <p>
              Homeowner Association fees for properties in planned communities, plus any other monthly costs like flood insurance or special assessments.
            </p>
          </CardContent>
        </Card>

        {/* Costs Associated with Homeownership */}
        <Card>
          <CardHeader>
            <CardTitle>Costs Associated with Homeownership</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              Beyond the monthly mortgage payment, homeownership involves several additional costs that buyers should budget for:
            </p>
            
            <h3>Upfront Costs</h3>
            <ul>
              <li><strong>Down Payment:</strong> Typically 3-20% of the home price</li>
              <li><strong>Closing Costs:</strong> Usually 2-5% of the loan amount</li>
              <li><strong>Home Inspection:</strong> $300-500 for professional assessment</li>
              <li><strong>Appraisal:</strong> $300-700 required by most lenders</li>
            </ul>

            <h3>Ongoing Expenses</h3>
            <ul>
              <li><strong>Maintenance and Repairs:</strong> Budget 1-3% of home value annually</li>
              <li><strong>Utilities:</strong> Electricity, gas, water, internet, trash collection</li>
              <li><strong>Property Taxes:</strong> Vary by location, typically 0.5-2% annually</li>
              <li><strong>Homeowners Insurance:</strong> Varies by location and coverage</li>
            </ul>
          </CardContent>
        </Card>

        {/* Extra Payments and Early Repayment */}
        <Card>
          <CardHeader>
            <CardTitle>Extra Payments and Early Mortgage Repayment</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              Making extra payments toward your mortgage principal can significantly reduce the total interest paid and shorten your loan term. Our calculator shows exactly how different extra payment strategies affect your mortgage.
            </p>

            <h3>Types of Extra Payments</h3>
            <ul>
              <li><strong>Monthly Extra Payments:</strong> Add a fixed amount to each monthly payment</li>
              <li><strong>Annual Extra Payments:</strong> Make one large payment per year, often using tax refunds or bonuses</li>
              <li><strong>One-time Payments:</strong> Apply windfalls like inheritance or investment gains</li>
            </ul>

            <h3>Benefits of Extra Payments</h3>
            <ul>
              <li>Reduce total interest paid over the life of the loan</li>
              <li>Build home equity faster</li>
              <li>Achieve mortgage-free homeownership earlier</li>
              <li>Provide peace of mind and financial security</li>
            </ul>

            <h3>Considerations</h3>
            <p>
              Before making extra mortgage payments, ensure you have an emergency fund, are maximizing employer 401(k) matching, and have paid off higher-interest debt like credit cards. The opportunity cost of extra mortgage payments should be weighed against other investment opportunities.
            </p>
          </CardContent>
        </Card>

        {/* Making Extra Payments in Early Stages */}
        <Card>
          <CardHeader>
            <CardTitle>The Power of Extra Payments in Early Loan Stages</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              Extra payments made early in your mortgage term have a more dramatic impact than those made later. This is because early payments primarily go toward interest, so any extra amount directly reduces the principal balance.
            </p>

            <h3>Why Early Extra Payments Are More Effective</h3>
            <p>
              In the early years of a 30-year mortgage, your required payment may be 80% interest and only 20% principal. Any extra payment goes entirely toward principal, immediately reducing the balance on which future interest is calculated.
            </p>

            <h3>Example Impact</h3>
            <p>
              On a $300,000 mortgage at 7% interest, an extra $100 monthly payment starting in year one can save over $50,000 in interest and reduce the loan term by approximately 4 years. The same $100 extra payment starting in year 15 would save much less.
            </p>

            <h3>Strategies for Early Extra Payments</h3>
            <ul>
              <li>Round up your monthly payment to the nearest $50 or $100</li>
              <li>Apply raises and bonuses to mortgage principal</li>
              <li>Make a 13th payment each year using your tax refund</li>
              <li>Switch to bi-weekly payments (26 payments = 13 monthly payments)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Historical Context */}
        <Card>
          <CardHeader>
            <CardTitle>History of Mortgages in the United States</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              The modern mortgage system developed over centuries, with significant changes following major economic events:
            </p>

            <h3>Early Development (1930s)</h3>
            <p>
              During the Great Depression, the federal government created the Federal Housing Administration (FHA) and Federal National Mortgage Association (Fannie Mae) to stabilize the housing market and make homeownership more accessible.
            </p>

            <h3>Post-War Boom (1940s-1950s)</h3>
            <p>
              The GI Bill provided favorable loan terms for veterans, fueling suburban development and making the 30-year fixed-rate mortgage the standard for American homeowners.
            </p>

            <h3>Modern Era (1970s-Present)</h3>
            <p>
              The secondary mortgage market expanded, allowing lenders to sell loans to investors. This increased liquidity but also contributed to the 2008 financial crisis. Today's mortgage market features stricter lending standards and diverse loan products.
            </p>

            <h3>Current Trends</h3>
            <p>
              Digital mortgage applications, artificial intelligence in underwriting, and alternative credit scoring are modernizing the mortgage process while maintaining the fundamental structure of long-term home financing.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
} 