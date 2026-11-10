'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import styled, { css } from 'styled-components'
import { BagIcon, CartIcon, MenuIcon, MoonIcon, SunIcon } from '@/assets/Icons/glyphs'
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
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const onHome = pathname === '/'
  const query = params.toString()
  const languageHref = query ? `${pathname}?${query}` : pathname

  function pickCategory(next: string | null) {
    setMenuOpen(false)
    setProductsOpen(false)
    if (pathname !== '/') {
      router.push(next ? `/?category=${encodeURIComponent(next)}` : '/')
      return
    }
    update({ category: next })
  }

  function chooseTheme(next: ThemeMode) {
    if (next !== theme) toggle()
  }

  useEffect(() => {
    if (!productsOpen) return
    function onPointer(event: MouseEvent) {
      if (!productsRef.current?.contains(event.target as Node)) setProductsOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setProductsOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [productsOpen])

  return (
    <Bar id="top">
      <Inner>
        <MenuButton type="button" aria-label={t('header.openMenu')} onClick={() => setMenuOpen(true)}>
          <MenuIcon />
        </MenuButton>
        <Brand href="/">
          <span>NOVA</span>
          <BagIcon />
        </Brand>
        <Nav>
          <NavLink href="/" data-active={onHome} aria-current={onHome ? 'page' : undefined}>
            {t('nav.home')}
          </NavLink>
          <ProductWrap ref={productsRef}>
            <ProductButton type="button" aria-expanded={productsOpen} aria-controls="product-menu" onClick={() => setProductsOpen((open) => !open)}>
              {t('nav.products')}
              <Caret $open={productsOpen} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.5 9.2 12 14.8l5.5-5.6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </Caret>
            </ProductButton>
            {productsOpen ? (
              <ProductMenu id="product-menu">
                <button type="button" onClick={() => pickCategory(null)}>
                  {t('nav.allCategories')}
                </button>
                {categories.map((item) => (
                  <button key={item} type="button" data-active={item === category} onClick={() => pickCategory(item)}>
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
        <Tools>
          <SearchBox />
          <CartLink href="/cart" aria-label={t('header.cart')}>
            <IconWrap>
              <CartIcon />
              {count > 0 ? <Badge>{count.toLocaleString('en-US')}</Badge> : null}
            </IconWrap>
          </CartLink>
          <Rule aria-hidden="true" />
          <LangGroup aria-label={t('header.language')}>
            <LangLink href={languageHref} locale={Locale.Fa} data-active={locale === Locale.Fa}>
              {t('header.faShort')}
            </LangLink>
            <LangSep aria-hidden="true" />
            <LangLink href={languageHref} locale={Locale.En} data-active={locale === Locale.En}>
              {t('header.enShort')}
            </LangLink>
          </LangGroup>
          <ThemeSwitch>
            <ThemeChoice
              type="button"
              data-active={theme === ThemeMode.Dark}
              aria-pressed={theme === ThemeMode.Dark}
              aria-label={t('header.themeToDark')}
              onClick={() => chooseTheme(ThemeMode.Dark)}
            >
              <MoonIcon size={16} />
            </ThemeChoice>
            <ThemeChoice
              type="button"
              data-active={theme === ThemeMode.Light}
              aria-pressed={theme === ThemeMode.Light}
              aria-label={t('header.themeToLight')}
              onClick={() => chooseTheme(ThemeMode.Light)}
            >
              <SunIcon size={16} />
            </ThemeChoice>
          </ThemeSwitch>
        </Tools>
      </Inner>
      {menuOpen ? <MobileMenu categories={categories} onClose={() => setMenuOpen(false)} onPickCategory={pickCategory} /> : null}
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

const Tools = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  min-width: 0;
  margin-inline-start: auto;

  @media (max-width: 980px) {
    gap: 8px;
  }
`

const CartLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: inherit;
  flex: none;
`

const IconWrap = styled.span`
  direction: ltr;
  position: relative;
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const Badge = styled.span`
  position: absolute;
  top: -7px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: grid;
  place-items: center;
  padding: 0 4px;
  line-height: 1;
`

const Rule = styled.span`
  width: 1px;
  height: 22px;
  background: ${({ theme }) => theme.border};
  flex: none;

  @media (max-width: 980px) {
    display: none;
  }
`

const LangGroup = styled.div`
  direction: ltr;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: none;

  @media (max-width: 980px) {
    display: none;
  }
`

const LangLink = styled(Link)`
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1;

  &[data-active='true'] {
    color: ${({ theme }) => theme.text};
    font-weight: 800;
  }
`

const LangSep = styled.span`
  width: 1px;
  height: 14px;
  background: ${({ theme }) => theme.border};
`

const ThemeSwitch = styled.div`
  direction: ltr;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  flex: none;
`

const ThemeChoice = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: transparent;
  color: ${({ theme }) => theme.text};

  &[data-active='true'] {
    background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#1A2744' : '#F4F7FB')};
    color: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#FFFFFF' : '#1A2744')};
  }

  @media (max-width: 980px) {
    width: 28px;
    height: 28px;
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
