import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { clearTokens, getAccessToken } from '../lib/api'

type AppState = {
  isLoggedIn: boolean
  username: string | null
  login: (username: string) => void
  logout: () => void
}

const AppStateContext = createContext<AppState | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getAccessToken())
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('username'))

  function login(name: string) {
    setIsLoggedIn(true)
    setUsername(name)
    localStorage.setItem('username', name)
  }

  function logout() {
    setIsLoggedIn(false)
    setUsername(null)
    localStorage.removeItem('username')
    clearTokens()
  }

  /* 토큰 만료 시 자동 로그아웃 */
  useEffect(() => {
    window.addEventListener('auth:expired', logout)
    return () => window.removeEventListener('auth:expired', logout)
  }, [])

  return (
    <AppStateContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider')
  return ctx
}
