const keys = {
  electronics: 'electronics',
  jewelery: 'jewelery',
  "men's clothing": 'mens',
  "women's clothing": 'womens',
} as const

export type CategoryMessageKey = (typeof keys)[keyof typeof keys]

export function categoryMessageKey(category: string): CategoryMessageKey | null {
  if (category in keys) return keys[category as keyof typeof keys]
  return null
}
