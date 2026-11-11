import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ProductDetail } from '@/components/ProductDetail'
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
  const product = await getProduct(id)
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
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        fa: `/fa${path}`,
        en: `/en${path}`,
      },
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { locale, id } = await params
  setRequestLocale(locale)
  const product = await getProduct(id)
  if (!product) notFound()

  return (
    <PageMain>
      <Container>
        <ProductDetail product={product} />
      </Container>
    </PageMain>
  )
}
