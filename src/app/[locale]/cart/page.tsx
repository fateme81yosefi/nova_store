import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CartScreen } from '@/components/CartScreen'
import { Container, PageMain } from '@/shared/layout'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    title: t('cartTitle'),
    description: t('cartDescription'),
    robots: { index: false, follow: false },
  }
}

export default async function CartPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <PageMain>
      <Container>
        <CartScreen />
      </Container>
    </PageMain>
  )
}
