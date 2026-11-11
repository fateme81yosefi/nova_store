import { cache } from 'react'
import { api } from '@/api/client'
import type { Product } from '@/types/product'

export const getProducts = cache(async function getProducts() {
  const { data } = await api.get<Product[]>('/products')
  if (!Array.isArray(data)) throw new Error('Unexpected products response')
  return data
})

export const getCategories = cache(async function getCategories() {
  const { data } = await api.get<string[]>('/products/categories')
  if (!Array.isArray(data)) throw new Error('Unexpected categories response')
  return data
})

export const getProduct = cache(async function getProduct(id: string) {
  if (!/^\d+$/.test(id)) return null
  try {
    const { data } = await api.get<Product | ''>(`/products/${id}`)
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
