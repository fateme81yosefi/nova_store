'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useThemeMode } from '@/context/ThemeProvider'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cartCount, useCart } from '@/storage/cartStore'
import { ThemeMode } from '@/types/enums/theme'
import { useProductQuery } from '../useProductQuery'

export function useHeaderState() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()
  const { category, update } = useProductQuery()
  const { theme, toggle } = useThemeMode()
  const count = useCart((state) => cartCount(state.items))
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const onHome = pathname === '/'
  const query = params.toString()
  const languageHref = query ? `${pathname}?${query}` : pathname

  function pickCategory(next: string | null) {
    setMenuOpen(false)
    setProductsOpen(false)
    if (pathname !== '/') {
      router.push(next ? `/?category=${encodeURIComponent(next)}` : '/')
      return
    }
    update({ category: next })
  }

  function chooseTheme(next: ThemeMode) {
    if (next !== theme) toggle()
  }

  useEffect(() => {
    if (!productsOpen) return
    function onPointer(event: MouseEvent) {
      if (!productsRef.current?.contains(event.target as Node)) setProductsOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setProductsOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [productsOpen])

  return {
    locale,
    theme,
    count,
    menuOpen,
    setMenuOpen,
    productsOpen,
    setProductsOpen,
    productsRef,
    onHome,
    pathname,
    languageHref,
    category,
    pickCategory,
    chooseTheme,
  }
}
