import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const ThemeContext = createContext(undefined)

/**
 * Reads the persisted theme from localStorage.
 * Falls back to "light" if nothing is stored or storage is unavailable
 * (e.g. disabled cookies, private browsing, SSR).
 * @returns {"light" | "dark"}
 */
function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage may be unavailable; fall back to default below
  }

  return 'light'
}

/**
 * ThemeProvider
 * Provides the current theme ("light" | "dark") and a toggle function to
 * the rest of the app, keeps the <html> element's "dark" class in sync,
 * and persists the chosen theme to localStorage.
 * @param {React.ReactNode} children - App tree that needs theme access
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore write failures (e.g. storage full or disabled)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * useTheme
 * Hook for reading/toggling the current theme.
 * @returns {{ theme: "light" | "dark", toggleTheme: Function, setTheme: Function }}
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
