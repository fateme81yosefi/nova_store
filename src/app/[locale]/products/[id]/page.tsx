import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ProductScreen } from '@/components/ProductScreen'
import { localeAlternates } from '@/i18n/alternates'
import { getProduct, getProducts } from '@/requests/products'
import { Container, PageMain } from '@/shared/layout'

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.map((product) => ({ id: String(product.id) }))
  } catch {
    return []
  }
}

function preview(text: string) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= 160) return clean
  const cut = clean.slice(0, 157)
  const space = cut.lastIndexOf(' ')
  return `${(space > 80 ? cut.slice(0, space) : cut).trimEnd()}…`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params
  let product: Awaited<ReturnType<typeof getProduct>> = null
  try {
    product = await getProduct(id)
  } catch {
    const t = await getTranslations({ locale, namespace: 'nav' })
    return { title: `${t('products')} | NOVA` }
  }
  if (!product) {
    const t = await getTranslations({ locale, namespace: 'common' })
    return { title: t('notFound'), robots: { index: false, follow: false } }
  }

  const description = preview(product.description)
  const title = `${product.title} | NOVA`
  const path = `/products/${product.id}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      images: [{ url: product.image, alt: product.title }],
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      siteName: 'NOVA',
      type: 'website',
    },
    alternates: localeAlternates(locale, path),
  }
}

export default async function ProductPage({ params }: Props) {
  const { locale, id } = await params
  setRequestLocale(locale)
  let product: Awaited<ReturnType<typeof getProduct>> = null
  let blocked = false
  try {
    product = await getProduct(id)
  } catch {
    blocked = true
  }
  if (!product && !blocked) notFound()

  return (
    <PageMain>
      <Container>
        <ProductScreen id={id} product={product} blocked={blocked} />
      </Container>
    </PageMain>
  )
}
