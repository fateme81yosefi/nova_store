'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { useCart } from '@/storage/cartStore'
import { readTheme, writeTheme } from '@/storage/preferences'
import { darkTheme, lightTheme } from '@/styles/theme'
import { ThemeMode } from '@/types/enums/theme'

type ThemeContextValue = {
  theme: ThemeMode
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useThemeMode() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('ThemeProvider is missing')
  return value
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(ThemeMode.Light)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTheme(readTheme())
    setReady(true)
    void useCart.persist.rehydrate()
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.dataset.theme = theme
    writeTheme(theme)
  }, [ready, theme])

  const styledTheme = theme === ThemeMode.Dark ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle: () => setTheme((current) => (current === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)),
      }}
    >
      <ThemeProvider theme={styledTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-family: Vazirmatn, sans-serif;
  }
  a { color: inherit; text-decoration: none; }
  button, input, select { font-family: inherit; font-size: 16px; }
  img { max-width: 100%; }
`
