import { useRouter } from 'expo-router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { TokenStorageAdapter } from '../adapters/TokenStorageAdapter'
import { UserRepository } from '../repositories/UserRepository'

type AuthContextType = {
  token: string | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  loading: true,
  signOut: async () => {}
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const tokenAdapter = new TokenStorageAdapter()
  const userRepo = new UserRepository()

  useEffect(() => {
    const init = async () => {
      const stored = await tokenAdapter.getToken()
      setToken(stored)
      setLoading(false)
      if (stored) {
        router.replace('/screens/Home')
      } else {
        router.replace('/screens/Welcome') 
      }
    }
    init()
    
  }, [])

  const signOut = async () => {
    await tokenAdapter.removeToken()
    setToken(null)
    router.replace('/screens/Welcome') 
  }

  return (
    <AuthContext.Provider value={{ token, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}