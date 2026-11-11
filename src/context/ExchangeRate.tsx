'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { UsdRate } from '@/requests/exchangeRate'

const ExchangeRateContext = createContext<UsdRate | null>(null)

export function ExchangeRateProvider({ rate, children }: { rate: UsdRate; children: ReactNode }) {
  return <ExchangeRateContext.Provider value={rate}>{children}</ExchangeRateContext.Provider>
}

export function useUsdRate() {
  const rate = useContext(ExchangeRateContext)
  if (!rate) throw new Error('ExchangeRateProvider is missing')
  return rate
}
