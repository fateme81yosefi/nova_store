import { setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { Catalog } from '@/components/Catalog'
import { loadStorefront } from '@/requests/products'
import { Container, PageMain } from '@/shared/layout'

export const dynamic = 'force-dynamic'

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
          <Catalog products={data.products} categories={data.categories} failed={data.failed} />
        </Suspense>
      </Container>
    </PageMain>
  )
}
