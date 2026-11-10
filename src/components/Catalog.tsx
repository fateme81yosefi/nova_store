'use client'

import { useEffect, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { ThemeMode } from '@/types/enums/theme'
import { SortKey } from '@/types/enums/sort'
import type { Product } from '@/types/product'
import { filterProducts, PAGE_SIZE } from '@/utils/catalog'
import { useProductQuery } from '@/shared/useProductQuery'
import { CategoryList } from './CategoryList'
import { Hero } from './Hero'
import { Newsletter } from './Newsletter'
import { ProductCard } from './ProductCard'
import { SortMenu } from './SortMenu'

export function Catalog({
  products,
  categories,
  failed,
}: {
  products: Product[]
  categories: string[]
  failed: boolean
}) {
  const t = useTranslations('catalog')
  const { q, category, sort, page, update } = useProductQuery()
  const filtered = useMemo(() => filterProducts(products, { q, category, sort }), [products, q, category, sort])
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  useEffect(() => {
    if (page <= pageCount) return
    update({ page: pageCount === 1 ? null : String(pageCount) }, false)
  }, [page, pageCount, update])

  return (
    <>
      <Hero products={products} />
      <CategoryList categories={categories} selected={category} onSelect={(value) => update({ category: value })} />
      <Section id="products">
        <Toolbar>
          <Heading>
            {t('title')}
            <Mark aria-hidden="true" />
          </Heading>
          <SortSlot>
            <SortMenu
              label={t('sortLabel')}
              value={sort}
              options={[
                { value: SortKey.Popular, label: t('popular') },
                { value: SortKey.PriceAsc, label: t('priceAsc') },
                { value: SortKey.PriceDesc, label: t('priceDesc') },
                { value: SortKey.TitleAsc, label: t('titleAsc') },
              ]}
              onChange={(next) => update({ sort: next === SortKey.Popular ? null : next })}
            />
          </SortSlot>
        </Toolbar>
        {failed ? <Note>{t('error')}</Note> : null}
        {!failed && filtered.length === 0 ? <Note>{t('empty')}</Note> : null}
        <Grid>
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
        {filtered.length > PAGE_SIZE ? (
          <Pager>
            <button type="button" aria-label={t('prev')} disabled={safePage === 1} onClick={() => update({ page: String(safePage - 1) }, false)}>
              <Chevron direction="left" />
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                data-active={number === safePage}
                aria-current={number === safePage ? 'page' : undefined}
                onClick={() => update({ page: number === 1 ? null : String(number) }, false)}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              aria-label={t('next')}
              disabled={safePage === pageCount}
              onClick={() => update({ page: String(safePage + 1) }, false)}
            >
              <Chevron direction="right" />
            </button>
          </Pager>
        ) : null}
      </Section>
      <Newsletter />
    </>
  )
}

const Section = styled.section`
  margin-top: 18px;
  scroll-margin-top: 84px;
`

const Heading = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.4;

  @media (max-width: 767px) {
    font-size: 22px;
  }
`

const Mark = styled.span`
  display: block;
  width: 46px;
  height: 3px;
  margin-top: 6px;
  border-radius: 99px;
  background: ${({ theme }) => theme.accent};
`

const SortSlot = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 14px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Note = styled.p`
  padding: 28px 12px;
  text-align: center;
  color: ${({ theme }) => theme.muted};
`

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M14.5 6 8.5 12l6 6' : 'M9.5 6l6 6-6 6'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Pager = styled.nav`
  direction: ltr;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 28px;

  button {
    min-width: 34px;
    height: 34px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: ${({ theme }) => theme.muted};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  button[data-active='true'] {
    width: 34px;
    min-width: 34px;
    border-radius: 50%;
    background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#101C33' : theme.headerText)};
    color: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#FFFFFF' : theme.header)};
  }

  button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`
