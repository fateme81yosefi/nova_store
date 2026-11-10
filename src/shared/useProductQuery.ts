'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { SortKey } from '@/types/enums/sort'

export function useProductQuery() {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const update = useCallback(
    (changes: Record<string, string | null>, resetPage = true) => {
      const next = new URLSearchParams(params.toString())
      if (resetPage) next.delete('page')
      Object.entries(changes).forEach(([key, value]) => {
        if (!value) next.delete(key)
        else next.set(key, value)
      })
      const query = next.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [params, pathname, router],
  )

  const rawSort = params.get('sort')
  const sort = Object.values(SortKey).includes(rawSort as SortKey) ? (rawSort as SortKey) : SortKey.Popular
  const parsedPage = Number(params.get('page') ?? '1')

  return {
    q: params.get('q') ?? '',
    category: params.get('category') ?? '',
    sort,
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1,
    update,
  }
}
