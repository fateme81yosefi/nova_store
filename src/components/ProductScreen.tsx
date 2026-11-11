'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { getProduct } from '@/requests/products'
import type { Product } from '@/types/product'
import { ProductDetail } from './ProductDetail'

export function ProductScreen({ id, product, blocked }: { id: string; product: Product | null; blocked: boolean }) {
  const common = useTranslations('common')
  const catalog = useTranslations('catalog')
  const [item, setItem] = useState(product)
  const [pending, setPending] = useState(blocked)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!blocked) return
    let active = true
    getProduct(id)
      .then((next) => {
        if (!active) return
        setItem(next)
      })
      .catch(() => {
        if (active) setFailed(true)
      })
      .finally(() => {
        if (active) setPending(false)
      })
    return () => {
      active = false
    }
  }, [blocked, id])

  if (pending) return <Status>{common('loading')}</Status>
  if (failed) return <Status>{catalog('error')}</Status>
  if (!item) return <Status>{common('notFound')}</Status>
  return <ProductDetail product={item} />
}

const Status = styled.p`
  margin: 28px 0;
  font-weight: 700;
`
