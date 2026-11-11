'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { BagIcon, MenuIcon } from '@/assets/Icons/glyphs'
import { Link } from '@/i18n/navigation'
import { getCategories } from '@/requests/products'
import { MobileMenu } from '@/modals/MobileMenu'
import { Container } from './layout'
import { HeaderNav } from './header/HeaderNav'
import { HeaderTools } from './header/HeaderTools'
import { useHeaderState } from './header/useHeaderState'

export function Header({ categories }: { categories: string[] }) {
  const t = useTranslations()
  const header = useHeaderState()
  const [items, setItems] = useState(categories)

  useEffect(() => {
    if (categories.length > 0) return
    let active = true
    getCategories()
      .then((next) => {
        if (active) setItems(next)
      })
      .catch(() => undefined)
    return () => {
      active = false
    }
  }, [categories.length])

  return (
    <Bar id="top">
      <Inner>
        <MenuButton type="button" aria-label={t('header.openMenu')} onClick={() => header.setMenuOpen(true)}>
          <MenuIcon />
        </MenuButton>
        <Brand href="/">
          <span>NOVA</span>
          <BagIcon />
        </Brand>
        <HeaderNav
          categories={items}
          category={header.category}
          productsOpen={header.productsOpen}
          productsRef={header.productsRef}
          onHome={header.onHome}
          pathname={header.pathname}
          onToggleProducts={() => header.setProductsOpen((open) => !open)}
          onPickCategory={header.pickCategory}
        />
        <HeaderTools
          count={header.count}
          locale={header.locale}
          theme={header.theme}
          languageHref={header.languageHref}
          onChooseTheme={header.chooseTheme}
        />
      </Inner>
      {header.menuOpen ? (
        <MobileMenu categories={items} onClose={() => header.setMenuOpen(false)} onPickCategory={header.pickCategory} />
      ) : null}
    </Bar>
  )
}

const Bar = styled.header`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  z-index: 20;
`

const Inner = styled(Container)`
  min-height: 78px;
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 980px) {
    position: relative;
    direction: ltr;
    min-height: 64px;
    gap: 8px;
  }
`

const Brand = styled(Link)`
  direction: ltr;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 26px;
  letter-spacing: 0.08em;
  flex: none;
  line-height: 1;

  @media (max-width: 980px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
  }
`

const MenuButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: inherit;
  padding: 0;
  cursor: pointer;

  @media (max-width: 980px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`
