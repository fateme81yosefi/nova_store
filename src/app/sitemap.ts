import type { MetadataRoute } from 'next'

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteUrl()
  const lastModified = new Date()

  return [
    { url: `${site}/fa`, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${site}/en`, lastModified, changeFrequency: 'daily', priority: 0.9 },
  ]
}
