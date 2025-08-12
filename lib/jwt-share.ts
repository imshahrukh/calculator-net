import jwt from 'jsonwebtoken'
import { type MortgageInputs } from './utils'

// Secret key for JWT signing (in production, use environment variable)
const JWT_SECRET = 'calculator-net-secret-key-2024'

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
}

interface DecodedCalculation {
  data: SharedCalculationData
  iat: number
  exp: number
}

export const jwtShare = {
  // Create a JWT token with calculation data
  createShareToken(calculationData: SharedCalculationData): string {
    try {
      // Create a token that expires in 1 year
      const token = jwt.sign(
        { data: calculationData },
        JWT_SECRET,
        { 
          expiresIn: '1y',
          algorithm: 'HS256'
        }
      )
      
      console.log('Created JWT token for sharing')
      return token
    } catch (error) {
      console.error('Error creating JWT token:', error)
      throw new Error('Failed to create share token')
    }
  },

  // Decode and verify a JWT token
  decodeShareToken(token: string): SharedCalculationData | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedCalculation
      
      console.log('Successfully decoded JWT token')
      return decoded.data
    } catch (error) {
      console.error('Error decoding JWT token:', error)
      
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Share link has expired')
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid share link')
      } else {
        throw new Error('Failed to decode share link')
      }
    }
  },

  // Generate a shareable URL with JWT token
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
      jwt.verify(token, JWT_SECRET)
      return true
    } catch {
      return false
    }
  },

  // Get token expiration info
  getTokenInfo(token: string): { isValid: boolean; expiresAt?: Date; createdAt?: Date } {
    try {
      const decoded = jwt.decode(token) as DecodedCalculation
      if (!decoded) {
        return { isValid: false }
      }
      
      return {
        isValid: true,
        expiresAt: new Date(decoded.exp * 1000),
        createdAt: new Date(decoded.iat * 1000)
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
    // Simple base64 encoding (in production, you might want more compression)
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
