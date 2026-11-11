'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { CartIcon } from '@/assets/Icons/glyphs'
import { Link } from '@/i18n/navigation'
import { Money } from '@/shared/Money'
import { RateNote } from '@/shared/RateNote'
import { Rating } from '@/shared/Rating'
import { useCart } from '@/storage/cartStore'
import { ThemeMode } from '@/types/enums/theme'
import type { Product } from '@/types/product'
import { categoryMessageKey } from '@/utils/categoryKey'

export function ProductDetail({ product }: { product: Product }) {
  const t = useTranslations()
  const addItem = useCart((state) => state.addItem)
  const [added, setAdded] = useState(false)
  const categoryKey = categoryMessageKey(product.category)
  const categoryLabel = categoryKey ? t(`categories.${categoryKey}`) : product.category

  useEffect(() => {
    if (!added) return
    const timer = window.setTimeout(() => setAdded(false), 1000)
    return () => window.clearTimeout(timer)
  }, [added])

  return (
    <Page>
      <Crumb>
        <Link href="/">{t('nav.home')}</Link>
        <Link href="/#products">{t('nav.products')}</Link>
      </Crumb>
      <Panel>
        <ImageWrap>
          <img src={product.image} alt={product.title} />
        </ImageWrap>
        <Copy>
          <Category href={`/?category=${encodeURIComponent(product.category)}`}>{categoryLabel}</Category>
          <h1>{product.title}</h1>
          <Rating rate={product.rating?.rate} count={product.rating?.count} />
          <Price>
            <Money usd={product.price} />
          </Price>
          <RateNote />
          <h2>{t('product.description')}</h2>
          <Description>{product.description}</Description>
          <Actions>
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
              <span>{added ? t('catalog.added') : t('catalog.add')}</span>
              <CartIcon size={18} />
            </Add>
            <Back href="/#products">{t('product.back')}</Back>
          </Actions>
        </Copy>
      </Panel>
    </Page>
  )
}

const Page = styled.div`
  padding: 28px 0 12px;
`

const Crumb = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 18px;
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
  font-weight: 700;

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.accent};
  }

  a + a::before {
    content: '/';
    margin-inline: 8px;
    color: ${({ theme }) => theme.muted};
  }
`

const Panel = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
  gap: 28px;
  background: ${({ theme }) => theme.surface};
  border-radius: 28px;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;

  > * {
    min-width: 0;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const ImageWrap = styled.div`
  background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#F4F5F7' : theme.soft)};
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 460px;
    object-fit: contain;
    mix-blend-mode: ${({ theme }) => (theme.mode === ThemeMode.Light ? 'multiply' : 'normal')};
  }

  @media (max-width: 800px) {
    min-height: 280px;
    padding: 28px;

    img {
      max-height: 280px;
    }
  }
`

const Copy = styled.div`
  padding: 36px 32px 32px;
  text-align: start;

  h1 {
    margin: 14px 0 10px;
    font-size: 28px;
    line-height: 1.55;
    font-weight: 800;
  }

  h2 {
    margin: 22px 0 8px;
    font-size: 16px;
    font-weight: 800;
  }

  @media (max-width: 800px) {
    padding: 8px 20px 24px;

    h1 {
      font-size: 22px;
    }
  }
`

const Category = styled(Link)`
  display: inline-flex;
  max-width: 100%;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#E7F1FB' : '#24344C')};
  color: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#3E648C' : '#D5E4F5')};
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
  text-decoration: none;
`

const Price = styled.p`
  margin: 8px 0 0;
  font-size: 24px;
  font-weight: 800;
`

const Description = styled.p`
  margin: 0;
  max-width: 65ch;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  line-height: 1.9;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 18px;
  margin-top: 24px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const Add = styled.button`
  min-width: 220px;
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

  @media (max-width: 800px) {
    width: 100%;
  }
`

const Back = styled(Link)`
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`
