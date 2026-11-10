import { SortKey } from '@/types/enums/sort'
import type { Product } from '@/types/product'

export const PAGE_SIZE = 6

type Query = {
  q: string
  category: string
  sort: SortKey
}

export function filterProducts(products: Product[], query: Query) {
  const needle = query.q.trim().toLowerCase()

  const filtered = products.filter((product) => {
    const matchesCategory = !query.category || product.category === query.category
    const matchesQuery =
      !needle ||
      product.title.toLowerCase().includes(needle) ||
      product.category.toLowerCase().includes(needle)
    return matchesCategory && matchesQuery
  })

  const sorted = [...filtered]
  if (query.sort === SortKey.PriceAsc) sorted.sort((a, b) => a.price - b.price)
  else if (query.sort === SortKey.PriceDesc) sorted.sort((a, b) => b.price - a.price)
  else if (query.sort === SortKey.TitleAsc) sorted.sort((a, b) => a.title.localeCompare(b.title))
  else sorted.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))

  return sorted
}
