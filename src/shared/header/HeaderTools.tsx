'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { CartIcon, MoonIcon, SunIcon } from '@/assets/Icons/glyphs'
import { Link } from '@/i18n/navigation'
import { Locale } from '@/types/enums/locale'
import { ThemeMode } from '@/types/enums/theme'
import { SearchBox } from '../SearchBox'

type HeaderToolsProps = {
  count: number
  locale: string
  theme: ThemeMode
  languageHref: string
  onChooseTheme: (next: ThemeMode) => void
}

export function HeaderTools({ count, locale, theme, languageHref, onChooseTheme }: HeaderToolsProps) {
  const t = useTranslations()

  return (
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
          onClick={() => onChooseTheme(ThemeMode.Dark)}
        >
          <MoonIcon size={16} />
        </ThemeChoice>
        <ThemeChoice
          type="button"
          data-active={theme === ThemeMode.Light}
          aria-pressed={theme === ThemeMode.Light}
          aria-label={t('header.themeToLight')}
          onClick={() => onChooseTheme(ThemeMode.Light)}
        >
          <SunIcon size={16} />
        </ThemeChoice>
      </ThemeSwitch>
    </Tools>
  )
}

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
