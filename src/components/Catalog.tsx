'use client'

import { useEffect, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { SortKey } from '@/types/enums/sort'
import type { Product } from '@/types/product'
import { filterProducts, PAGE_SIZE } from '@/utils/catalog'
import { useProductQuery } from '@/shared/useProductQuery'
import { CategoryList } from './CategoryList'
import { Hero } from './Hero'
import { Newsletter } from './Newsletter'
import { ProductCard } from './ProductCard'

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
      <Hero images={products.map((product) => product.image)} />
      <CategoryList categories={categories} selected={category} onSelect={(value) => update({ category: value })} />
      <Section id="products">
        <Toolbar>
          <h2>{t('title')}</h2>
          <label>
            {t('sortLabel')}
            <select
              aria-label={t('sortLabel')}
              value={sort}
              onChange={(event) => update({ sort: event.target.value === SortKey.Popular ? null : event.target.value })}
            >
              <option value={SortKey.Popular}>{t('popular')}</option>
              <option value={SortKey.PriceAsc}>{t('priceAsc')}</option>
              <option value={SortKey.PriceDesc}>{t('priceDesc')}</option>
              <option value={SortKey.TitleAsc}>{t('titleAsc')}</option>
            </select>
          </label>
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
            <button type="button" disabled={safePage === 1} onClick={() => update({ page: String(safePage - 1) }, false)}>
              {t('prev')}
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                data-active={number === safePage}
                onClick={() => update({ page: number === 1 ? null : String(number) }, false)}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage === pageCount}
              onClick={() => update({ page: String(safePage + 1) }, false)}
            >
              {t('next')}
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
`

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 14px;

  h2 {
    margin: 0;
    font-size: 26px;
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.muted};
    font-size: 14px;
  }

  select {
    height: 42px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    padding: 0 10px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1023px) {
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

const Pager = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;

  button {
    min-width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    padding: 0 10px;
  }

  button[data-active='true'] {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.onAccent};
    border-color: ${({ theme }) => theme.accent};
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`
