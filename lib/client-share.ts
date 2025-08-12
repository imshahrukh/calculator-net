import { type MortgageInputs } from './utils'

interface SharedCalculationData {
  title: string
  description: string
  inputs: MortgageInputs
  mortgageOutput: {
    monthlyPI: number
    monthlyEscrow: number
    totalMonthlyPayment: number
    loanAmount: number
    totalMortgagePayments: number
    totalInterest: number
    payoffDate: string
  }
  createdAt: string
  expiresAt?: string
}

export const clientShare = {
  // Create a shareable token with calculation data
  createShareToken(calculationData: SharedCalculationData): string {
    try {
      // Add expiration (1 year from now)
      const dataWithExpiry = {
        ...calculationData,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      }
      
      // Convert to JSON and encode
      const jsonString = JSON.stringify(dataWithExpiry)
      const encoded = btoa(jsonString)
      
      // Make URL safe
      const urlSafe = encoded
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
      
      console.log('Created client-side share token')
      return urlSafe
    } catch (error) {
      console.error('Error creating share token:', error)
      throw new Error('Failed to create share token')
    }
  },

  // Decode and verify a share token
  decodeShareToken(token: string): SharedCalculationData | null {
    try {
      // Make URL safe back to base64
      let base64 = token
        .replace(/-/g, '+')
        .replace(/_/g, '/')
      
      // Add padding if needed
      while (base64.length % 4) {
        base64 += '='
      }
      
      // Decode
      const jsonString = atob(base64)
      const data = JSON.parse(jsonString) as SharedCalculationData & { expiresAt: string }
      
      // Check expiration
      const expiresAt = new Date(data.expiresAt)
      if (expiresAt < new Date()) {
        throw new Error('Share link has expired')
      }
      
      console.log('Successfully decoded client-side share token')
      return data
    } catch (error) {
      console.error('Error decoding share token:', error)
      
      if (error instanceof Error && error.message.includes('expired')) {
        throw new Error('Share link has expired')
      } else {
        throw new Error('Invalid share link')
      }
    }
  },

  // Generate a shareable URL with token
  generateShareUrl(calculationData: SharedCalculationData): string {
    const token = this.createShareToken(calculationData)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://calculator.net'
    return `${baseUrl}/mortgage-calculator/shared/${token}`
  },

  // Extract token from URL
  extractTokenFromUrl(url: string): string | null {
    const match = url.match(/\/shared\/([^\/\?]+)/)
    return match ? match[1] : null
  },

  // Validate if a token is valid (without decoding)
  isTokenValid(token: string): boolean {
    try {
      const data = this.decodeShareToken(token)
      return data !== null
    } catch {
      return false
    }
  },

  // Get token expiration info
  getTokenInfo(token: string): { isValid: boolean; expiresAt?: Date; createdAt?: Date } {
    try {
      const data = this.decodeShareToken(token)
      if (!data) {
        return { isValid: false }
      }
      
      return {
        isValid: true,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        createdAt: new Date(data.createdAt)
      }
    } catch {
      return { isValid: false }
    }
  }
}

// Utility function to compress data for shorter URLs
export const compressData = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data)
    // Simple base64 encoding
    return btoa(jsonString)
  } catch (error) {
    console.error('Error compressing data:', error)
    throw new Error('Failed to compress data')
  }
}

// Utility function to decompress data
export const decompressData = (compressed: string): any => {
  try {
    const jsonString = atob(compressed)
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Error decompressing data:', error)
    throw new Error('Failed to decompress data')
  }
}
