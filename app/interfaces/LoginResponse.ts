export interface LoginResponse {
  token: string
  tokenType?: string
  expiresAt?: string 
  userId?: string 
  username?: string
  errorMessage?: string
  error?: boolean
}

