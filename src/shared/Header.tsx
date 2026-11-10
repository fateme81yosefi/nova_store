'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import styled from 'styled-components'
import { LogoMark } from '@/assets/Icons/LogoMark'
import { useThemeMode } from '@/context/ThemeProvider'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { MobileMenu } from '@/modals/MobileMenu'
import { cartCount, useCart } from '@/storage/cartStore'
import { Locale } from '@/types/enums/locale'
import { ThemeMode } from '@/types/enums/theme'
import { categoryMessageKey } from '@/utils/categoryKey'
import { Container } from './layout'
import { SearchBox } from './SearchBox'
import { useProductQuery } from './useProductQuery'

export function Header({ categories }: { categories: string[] }) {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()
  const { category, update } = useProductQuery()
  const { theme, toggle } = useThemeMode()
  const count = useCart((state) => cartCount(state.items))
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const otherLocale = locale === Locale.Fa ? Locale.En : Locale.Fa
  const query = params.toString()
  const languageHref = query ? `${pathname}?${query}` : pathname

  function pickCategory(next: string | null) {
    setMenuOpen(false)
    setCategoriesOpen(false)
    if (pathname !== '/') {
      router.push(next ? `/?category=${encodeURIComponent(next)}` : '/')
      return
    }
    update({ category: next })
  }

  return (
    <Bar id="top">
      <Inner>
        <MenuButton type="button" aria-label={t('header.openMenu')} onClick={() => setMenuOpen(true)}>
          <span aria-hidden="true">☰</span>
        </MenuButton>
        <Brand href="/">
          <LogoMark size={34} />
          <span>NOVA</span>
        </Brand>
        <Nav>
          <NavLink href="/">{t('nav.home')}</NavLink>
          <NavLink href="/#products">{t('nav.products')}</NavLink>
          <CategoryWrap>
            <CategoryButton type="button" aria-expanded={categoriesOpen} onClick={() => setCategoriesOpen((open) => !open)}>
              {t('nav.categories')}
            </CategoryButton>
            {categoriesOpen ? (
              <CategoryMenu>
                <button type="button" onClick={() => pickCategory(null)}>
                  {t('nav.allCategories')}
                </button>
                {categories.map((item) => (
                  <button key={item} type="button" data-active={item === category} onClick={() => pickCategory(item)}>
                    <CategoryName category={item} />
                  </button>
                ))}
              </CategoryMenu>
            ) : null}
          </CategoryWrap>
        </Nav>
        <SearchBox />
        <Tools>
          <LangLink href={languageHref} locale={otherLocale} aria-label={t('header.language')}>
            {otherLocale === Locale.Fa ? t('header.faShort') : t('header.enShort')}
          </LangLink>
          <IconButton type="button" onClick={toggle}>
            {theme === ThemeMode.Light ? t('header.themeToDark') : t('header.themeToLight')}
          </IconButton>
          <CartLink href="/cart">
            {t('header.cart')}
            {count > 0 ? <Badge>{count}</Badge> : null}
          </CartLink>
        </Tools>
      </Inner>
      {menuOpen ? (
        <MobileMenu categories={categories} onClose={() => setMenuOpen(false)} onPickCategory={pickCategory} />
      ) : null}
    </Bar>
  )
}

function CategoryName({ category }: { category: string }) {
  const t = useTranslations('categories')
  const key = categoryMessageKey(category)
  if (!key) return category
  return t(key)
}

const Bar = styled.header`
  background: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.headerText};
  position: sticky;
  top: 0;
  z-index: 20;
`

const Inner = styled(Container)`
  min-height: 72px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding-block: 12px;
  flex-wrap: wrap;
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  letter-spacing: 0.08em;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 767px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  font-size: 14px;
  opacity: 0.9;
`

const CategoryWrap = styled.div`
  position: relative;
`

const CategoryButton = styled.button`
  background: transparent;
  color: inherit;
  border: 0;
  cursor: pointer;
`

const CategoryMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  inset-inline-start: 0;
  min-width: 190px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: 14px;
  padding: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: grid;

  button {
    text-align: start;
    background: transparent;
    border: 0;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    color: inherit;
  }

  button[data-active='true'] {
    background: ${({ theme }) => theme.soft};
  }
`

const Tools = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-inline-start: auto;
`

const IconButton = styled.button`
  height: 36px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: inherit;
  padding: 0 12px;
  cursor: pointer;
`

const LangLink = styled(Link)`
  height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-weight: 700;
`

const CartLink = styled(Link)`
  position: relative;
  height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.onAccent};
  font-weight: 700;
`

const Badge = styled.span`
  position: absolute;
  top: -7px;
  inset-inline-end: -6px;
  min-width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #fff;
  color: #101c33;
  font-size: 11px;
  display: grid;
  place-items: center;
  padding: 0 4px;
`

const MenuButton = styled.button`
  display: none;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: inherit;
  padding: 0 10px;

  @media (max-width: 767px) {
    display: inline-flex;
    align-items: center;
  }
`
