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

const groups: Record<string, readonly string[]> = {
  clothing: ["men's clothing", "women's clothing"],
  digital: ['electronics'],
}

export function categoryMatches(productCategory: string, selected: string) {
  if (!selected) return true
  const group = groups[selected]
  if (group) return group.includes(productCategory)
  return productCategory === selected
}
