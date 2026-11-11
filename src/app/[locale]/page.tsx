import { setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { Storefront } from '@/components/Storefront'
import { loadStorefront } from '@/requests/products'
import { Container, PageMain } from '@/shared/layout'

export const revalidate = 60

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const data = await loadStorefront()

  return (
    <PageMain>
      <Container>
        <Suspense>
          <Storefront initial={data} />
        </Suspense>
      </Container>
    </PageMain>
  )
}
