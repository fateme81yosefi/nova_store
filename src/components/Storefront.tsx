'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { loadStorefront } from '@/requests/products'
import type { Product } from '@/types/product'
import { Catalog } from './Catalog'

type Data = {
  products: Product[]
  categories: string[]
  failed: boolean
}

export function Storefront({ initial }: { initial: Data }) {
  const t = useTranslations('common')
  const [data, setData] = useState(initial)
  const [pending, setPending] = useState(initial.failed)

  useEffect(() => {
    if (!initial.failed) return
    let active = true
    loadStorefront()
      .then((next) => {
        if (active) setData(next)
      })
      .finally(() => {
        if (active) setPending(false)
      })
    return () => {
      active = false
    }
  }, [initial.failed])

  if (pending) return <Pending>{t('loading')}</Pending>
  return <Catalog products={data.products} categories={data.categories} failed={data.failed} />
}

const Pending = styled.p`
  margin: 28px 0;
  font-weight: 700;
`
