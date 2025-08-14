// Mock API for sharing calculations
// In a real app, this would be replaced with actual API calls to your backend

interface SharedCalculation {
  id: string
  title: string
  description: string
  inputs: any
  mortgageOutput: any
  createdAt: string
  shareUrl: string
}

// Use localStorage for persistence (simulates database)
const STORAGE_KEY = 'shared_calculations'

const getStorage = (): { [key: string]: SharedCalculation } => {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return {}
  }
}

const setStorage = (data: { [key: string]: SharedCalculation }) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error writing to localStorage:', error)
  }
}

export const shareAPI = {
  // Save a shared calculation
  async saveCalculation(calculation: Omit<SharedCalculation, 'id' | 'shareUrl'>): Promise<SharedCalculation> {
    const id = generateShareId()
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://fastcalculator.co'}/mortgage-calculator/shared/${id}`
    
    const sharedCalc: SharedCalculation = {
      ...calculation,
      id,
      shareUrl
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Save to localStorage
    const storage = getStorage()
    storage[id] = sharedCalc
    setStorage(storage)
    
    console.log('Saved calculation:', id, sharedCalc)
    
    return sharedCalc
  },

  // Get a shared calculation by ID
  async getCalculation(id: string): Promise<SharedCalculation | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const storage = getStorage()
    const calculation = storage[id]
    
    console.log('Looking for calculation:', id)
    console.log('Available calculations:', Object.keys(storage))
    console.log('Found calculation:', calculation)
    
    return calculation || null
  },

  // Delete a shared calculation
  async deleteCalculation(id: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const storage = getStorage()
    if (storage[id]) {
      delete storage[id]
      setStorage(storage)
      return true
    }
    return false
  },

  // Get all calculations (for admin purposes)
  async getAllCalculations(): Promise<SharedCalculation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const storage = getStorage()
    return Object.values(storage)
  },

  // Clear all calculations (for testing)
  async clearAllCalculations(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
}

function generateShareId(): string {
  return 'share_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36)
}

// Initialize with sample data if storage is empty
if (typeof window !== 'undefined') {
  const storage = getStorage()
  
  // Only add sample data if storage is empty
  if (Object.keys(storage).length === 0) {
    const sampleCalculation: SharedCalculation = {
      id: 'sample_share_123',
      title: '$500,000 Home - 20% Down - 30yr @ 6.5%',
      description: 'Monthly payment: $3,044, Total interest: $695,905',
      inputs: {
        homePrice: 500000,
        downPaymentAmount: 100000,
        downPaymentPercent: 20,
        loanTerm: 30,
        interestRate: 6.5,
        startMonth: new Date().getMonth() + 1,
        startYear: new Date().getFullYear(),
        propertyTaxesAmount: 5000,
        propertyTaxesPercent: 1,
        homeInsurance: 1200,
        pmi: 0,
        hoaFee: 0,
        otherCosts: 0,
        extraMonthlyPayment: 0,
        extraMonthlyStartMonth: new Date().getMonth() + 1,
        extraMonthlyStartYear: new Date().getFullYear(),
        oneTimeExtraPayment: 0,
        oneTimeExtraMonth: new Date().getMonth() + 1,
        oneTimeExtraYear: new Date().getFullYear(),
        annualExtraPayment: 0,
        annualExtraStartYear: new Date().getFullYear() + 1,
      },
      mortgageOutput: {
        monthlyPI: 2527.51,
        monthlyEscrow: 516.67,
        totalMonthlyPayment: 3044.18,
        loanAmount: 400000,
        totalMortgagePayments: 1095904.80,
        totalInterest: 695904.80,
        payoffDate: new Date(new Date().getFullYear() + 30, new Date().getMonth(), 1)
      },
      createdAt: new Date().toISOString(),
      shareUrl: `${window.location.origin}/mortgage-calculator/shared/sample_share_123`
    }
    
    storage['sample_share_123'] = sampleCalculation
    setStorage(storage)
    console.log('Initialized with sample calculation')
  }
}
