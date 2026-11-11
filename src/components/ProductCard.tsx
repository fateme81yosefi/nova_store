'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { CartIcon } from '@/assets/Icons/glyphs'
import { Link } from '@/i18n/navigation'
import { useCart } from '@/storage/cartStore'
import { ThemeMode } from '@/types/enums/theme'
import type { Product } from '@/types/product'
import { categoryMessageKey } from '@/utils/categoryKey'
import { Money } from '@/shared/Money'
import { Rating } from '@/shared/Rating'
import { SafeImage } from '@/shared/SafeImage'
import { safeImageUrl } from '@/security/url'

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations()
  const addItem = useCart((state) => state.addItem)
  const [added, setAdded] = useState(false)
  useEffect(() => {
    if (!added) return
    const timer = window.setTimeout(() => setAdded(false), 1000)
    return () => window.clearTimeout(timer)
  }, [added])

  const categoryKey = categoryMessageKey(product.category)
  const categoryLabel = categoryKey ? t(`categories.${categoryKey}`) : product.category

  return (
    <Card>
      <ImageLink href={`/products/${product.id}`}>
        <SafeImage src={product.image} alt={product.title} />
      </ImageLink>
      <Body>
        <Category>{categoryLabel}</Category>
        <h3>
          <TitleLink href={`/products/${product.id}`}>{product.title}</TitleLink>
        </h3>
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
              image: safeImageUrl(product.image) ?? '',
              category: product.category,
            })
            setAdded(true)
          }}
        >
          <span>{added ? t('catalog.added') : t('catalog.add')}</span>
          <CartIcon size={18} />
        </Add>
      </Body>
    </Card>
  )
}

const Card = styled.article`
  background: ${({ theme }) => theme.surface};
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
  box-shadow: ${({ theme }) => theme.shadow};
`

const ImageLink = styled(Link)`
  background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#F4F5F7' : theme.soft)};
  height: 248px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 28px 40px;
  overflow: hidden;
  text-decoration: none;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    mix-blend-mode: ${({ theme }) => (theme.mode === ThemeMode.Light ? 'multiply' : 'normal')};
  }
`

const Body = styled.div`
  position: relative;
  background: ${({ theme }) => theme.surface};
  padding: 28px 18px 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  text-align: start;

  h3 {
    margin: 0 0 8px;
    min-height: 54px;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.7;
  }
`

const TitleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`

const Category = styled.span`
  position: absolute;
  top: 0;
  inset-inline-start: 16px;
  z-index: 1;
  max-width: calc(100% - 32px);
  transform: translateY(-50%);
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#E7F1FB' : '#24344C')};
  color: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#3E648C' : '#D5E4F5')};
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Price = styled.p`
  margin: 2px 0 16px;
  font-size: 18px;
  font-weight: 800;
`

const Add = styled.button`
  margin-top: auto;
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 14px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.onAccent};
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
  }
`
