'use client'

import type { RefObject } from 'react'
import { useTranslations } from 'next-intl'
import styled, { css } from 'styled-components'
import { Link } from '@/i18n/navigation'
import { categoryMessageKey } from '@/utils/categoryKey'

type HeaderNavProps = {
  categories: string[]
  category: string
  productsOpen: boolean
  productsRef: RefObject<HTMLDivElement | null>
  onHome: boolean
  pathname: string
  onToggleProducts: () => void
  onPickCategory: (next: string | null) => void
}

export function HeaderNav({
  categories,
  category,
  productsOpen,
  productsRef,
  onHome,
  pathname,
  onToggleProducts,
  onPickCategory,
}: HeaderNavProps) {
  const t = useTranslations()

  return (
    <Nav>
      <NavLink href="/" data-active={onHome} aria-current={onHome ? 'page' : undefined}>
        {t('nav.home')}
      </NavLink>
      <ProductWrap ref={productsRef}>
        <ProductButton type="button" aria-expanded={productsOpen} aria-controls="product-menu" onClick={onToggleProducts}>
          {t('nav.products')}
          <Caret $open={productsOpen} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.5 9.2 12 14.8l5.5-5.6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </Caret>
        </ProductButton>
        {productsOpen ? (
          <ProductMenu id="product-menu">
            <button type="button" onClick={() => onPickCategory(null)}>
              {t('nav.allCategories')}
            </button>
            {categories.map((item) => (
              <button key={item} type="button" data-active={item === category} onClick={() => onPickCategory(item)}>
                <CategoryName category={item} />
              </button>
            ))}
          </ProductMenu>
        ) : null}
      </ProductWrap>
      <NavLink
        href="/#categories"
        onClick={(event) => {
          if (pathname !== '/') return
          event.preventDefault()
          document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        {t('nav.categories')}
      </NavLink>
    </Nav>
  )
}

function CategoryName({ category }: { category: string }) {
  const t = useTranslations('categories')
  const key = categoryMessageKey(category)
  if (!key) return category
  return t(key)
}

const item = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
  flex: none;

  @media (max-width: 980px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  ${item}

  &[data-active='true']::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -9px;
    width: 22px;
    height: 3px;
    border-radius: 999px;
    background: ${({ theme }) => theme.accent};
    transform: translateX(-50%);
  }
`

const ProductWrap = styled.div`
  position: relative;
`

const ProductButton = styled.button`
  ${item}
`

const Caret = styled.svg<{ $open: boolean }>`
  width: 14px;
  height: 14px;
  flex: none;
  transition: transform 0.15s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`

const ProductMenu = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  inset-inline-start: 0;
  min-width: 190px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: 14px;
  padding: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  display: grid;
  z-index: 5;

  button {
    text-align: start;
    background: transparent;
    border: 0;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    color: inherit;
    font-weight: 600;
  }

  button[data-active='true'] {
    background: ${({ theme }) => theme.soft};
  }
`
