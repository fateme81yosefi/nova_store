const endpoint = 'https://nerkhara.com/api/v1/latest/usd.json'
const sourceUrl = 'https://nerkhara.com'
const fallbackRate = 50000

export type UsdRate = {
  tomanPerDollar: number
  live: boolean
  updatedAt: string | null
  sourceUrl: string | null
}

type FreeMarketDollar = {
  item?: {
    unit?: string
    price?: number
    updated_utc?: string
    stale?: boolean
  }
}

function readFallbackRate() {
  const raw = process.env.NEXT_PUBLIC_USD_TO_TOMAN
  const value = raw ? Number(raw) : Number.NaN
  if (!Number.isFinite(value) || value <= 0) return fallbackRate
  return value
}

function readTime(value: string | undefined) {
  if (!value) return null
  const iso = /(?:Z|[+-]\d{2}:\d{2})$/.test(value) ? value : `${value}Z`
  const time = new Date(iso)
  if (Number.isNaN(time.getTime())) return null
  return time.toISOString()
}

export async function getUsdToToman(): Promise<UsdRate> {
  const fallback = { tomanPerDollar: readFallbackRate(), live: false, updatedAt: null, sourceUrl: null }
  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 600 },
    })
    if (!response.ok) return fallback
    const data = (await response.json()) as FreeMarketDollar
    const item = data.item
    const price = item?.price
    const updatedAt = readTime(item?.updated_utc)
    if (!item || item.stale || item.unit !== 'IRT' || typeof price !== 'number' || !Number.isFinite(price) || price <= 0 || !updatedAt) {
      return fallback
    }
    return { tomanPerDollar: Math.round(price), live: true, updatedAt, sourceUrl }
  } catch {
    return fallback
  }
}
