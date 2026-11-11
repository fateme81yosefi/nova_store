import { cache } from 'react'
import { notifyUnauthorized } from '@/api/client'
import type { Product } from '@/types/product'

const revalidateSeconds = 60

function apiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!base) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set')
  const normalized = base.endsWith('/') ? base.slice(0, -1) : base
  return `${normalized}${path.startsWith('/') ? path : `/${path}`}`
}

async function readJson<T>(path: string): Promise<T> {
  const response = await fetch(apiUrl(path), {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
    next: { revalidate: revalidateSeconds },
  })

  if (response.status === 401) notifyUnauthorized()
  if (!response.ok) {
    const failure = new Error(response.statusText || 'Request failed') as Error & { status?: number }
    failure.status = response.status
    throw failure
  }

  return response.json() as Promise<T>
}

export const getProducts = cache(async function getProducts() {
  const data = await readJson<Product[]>('/products')
  if (!Array.isArray(data)) throw new Error('Unexpected products response')
  return data
})

export const getCategories = cache(async function getCategories() {
  const data = await readJson<string[]>('/products/categories')
  if (!Array.isArray(data)) throw new Error('Unexpected categories response')
  return data
})

export const getProduct = cache(async function getProduct(id: string) {
  if (!/^\d+$/.test(id)) return null
  try {
    const data = await readJson<Product | ''>(`/products/${id}`)
    if (!data || typeof data !== 'object' || typeof data.id !== 'number' || !data.title) return null
    return data
  } catch (error) {
    const status = typeof error === 'object' && error && 'status' in error ? error.status : undefined
    if (status === 404) return null
    throw error
  }
})

export async function loadStorefront() {
  try {
    const products = await getProducts()
    let categories: string[] = []
    try {
      categories = await getCategories()
    } catch {
      categories = [...new Set(products.map((item) => item.category))]
    }
    return { products, categories, failed: false }
  } catch {
    return { products: [] as Product[], categories: [] as string[], failed: true }
  }
}
