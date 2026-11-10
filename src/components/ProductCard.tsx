'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { useCart } from '@/storage/cartStore'
import type { Product } from '@/types/product'
import { categoryMessageKey } from '@/utils/categoryKey'
import { Money } from '@/shared/Money'
import { Rating } from '@/shared/Rating'

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations()
  const addItem = useCart((state) => state.addItem)
  const [added, setAdded] = useState(false)
  const key = categoryMessageKey(product.category)

  useEffect(() => {
    if (!added) return
    const timer = window.setTimeout(() => setAdded(false), 1000)
    return () => window.clearTimeout(timer)
  }, [added])

  return (
    <Card>
      <ImageWrap>
        <img src={product.image} alt={product.title} />
      </ImageWrap>
      <Body>
        <Category>{key ? t(`categories.${key}`) : product.category}</Category>
        <h3>{product.title}</h3>
        <Rating rate={product.rating?.rate} count={product.rating?.count} />
        <Price>
          <Money usd={product.price} />
        </Price>
        <Add
          type="button"
          onClick={() => {
            addItem({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              category: product.category,
            })
            setAdded(true)
          }}
        >
          {added ? t('catalog.added') : t('catalog.add')}
        </Add>
      </Body>
    </Card>
  )
}

const Card = styled.article`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const ImageWrap = styled.div`
  background: ${({ theme }) => theme.soft};
  height: 190px;
  display: grid;
  place-items: center;

  img {
    width: 100%;
    height: 170px;
    object-fit: contain;
  }
`

const Body = styled.div`
  padding: 14px 14px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;

  h3 {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    min-height: 48px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const Category = styled.span`
  color: ${({ theme }) => theme.muted};
  font-size: 12px;
`

const Price = styled.p`
  margin: 0 0 12px;
  font-weight: 800;
`

const Add = styled.button`
  margin-top: auto;
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.onAccent};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
  }
`
