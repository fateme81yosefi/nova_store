import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getProducts } from '@/requests/products'

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = siteUrl()
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = [
    { url: `${site}/fa`, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${site}/en`, lastModified, changeFrequency: 'daily', priority: 0.9 },
  ]

  try {
    const products = await getProducts()
    for (const product of products) {
      const languages = {
        fa: `${site}/fa/products/${product.id}`,
        en: `${site}/en/products/${product.id}`,
      }
      for (const locale of routing.locales) {
        entries.push({
          url: languages[locale],
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: { languages },
        })
      }
    }
  } catch {
    return entries
  }

  return entries
}
