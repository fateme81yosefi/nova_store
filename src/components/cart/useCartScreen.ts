'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { cartTotal, useCart } from '@/storage/cartStore'
import { Locale } from '@/types/enums/locale'

export function useCartScreen() {
  const locale = useLocale()
  const items = useCart((state) => state.items)
  const increase = useCart((state) => state.increase)
  const decrease = useCart((state) => state.decrease)
  const remove = useCart((state) => state.remove)
  const clear = useCart((state) => state.clear)
  const hydrated = useHydrated()
  const total = cartTotal(items)
  const numberLocale = locale === Locale.Fa ? 'fa-IR' : 'en-US'

  return { items, increase, decrease, remove, clear, hydrated, total, numberLocale }
}

function useHydrated() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(useCart.persist.hasHydrated())
    return useCart.persist.onFinishHydration(() => setHydrated(true))
  }, [])

  return hydrated
}
