'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { BagIcon } from '@/assets/Icons/glyphs'
import { Link } from '@/i18n/navigation'
import { Container } from './layout'

const guide = ['shipping', 'returns', 'payment', 'faq'] as const
const useful = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/#products' },
  { key: 'about', href: '/#top' },
  { key: 'contact', href: '/#top' },
] as const
const social = ['telegram', 'instagram', 'linkedin', 'x'] as const

export function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const year = new Date().getFullYear()

  return (
    <Wrap>
      <Inner>
        <Brand>
          <LogoRow>
            <strong>NOVA</strong>
            <BagIcon size={32} />
          </LogoRow>
          <p>{t('tagline')}</p>
        </Brand>
        <Column>
          <h2>{t('guide')}</h2>
          {guide.map((key) => (
            <a key={key} href="#top">
              {t(key)}
            </a>
          ))}
        </Column>
        <Column>
          <h2>{t('links')}</h2>
          {useful.map((item) => (
            <Link key={item.key} href={item.href}>
              {item.key === 'home' || item.key === 'products' ? nav(item.key) : t(item.key)}
            </Link>
          ))}
        </Column>
        <Social>
          {social.map((key) => (
            <a key={key} href="#top" aria-label={t(key)}>
              <SocialIcon name={key} />
            </a>
          ))}
        </Social>
      </Inner>
      <Copy>
        <Container>© {year} {t('rights')}</Container>
      </Copy>
    </Wrap>
  )
}

function SocialIcon({ name }: { name: (typeof social)[number] }) {
  if (name === 'telegram') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.6 4.4 2.9 11.2c-1.3.5-1.2 1.2-.2 1.5l4.8 1.5 1.9 5.8c.2.7.1.9.8.9.5 0 .7-.2 1-.5l2.7-2.6 5.6 4.1c1 .6 1.8.3 2-1l3.3-15.2c.4-1.4-.5-2-1.7-1.5zM8.8 14.3l9.3-5.8c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.2-2-4.5z"
        />
      </svg>
    )
  }

  if (name === 'instagram') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'linkedin') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6.7 9H4.1V20h2.6V9zM5.4 3.8A1.6 1.6 0 1 0 5.4 7a1.6 1.6 0 0 0 0-3.2zM20 20h-2.6v-5.5c0-1.5-.5-2.5-1.9-2.5-1 0-1.6.7-1.8 1.4-.1.2-.1.6-.1.9V20H11V9h2.5v1.5c.4-.7 1.3-1.7 3.1-1.7 2.3 0 4 1.5 4 4.7V20z"
        />
      </svg>
    )
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.2 6.4c-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.5-2-.7.4-1.5.7-2.3.9A3.5 3.5 0 0 0 12.2 9c0 .3 0 .5.1.8-2.9-.1-5.5-1.5-7.2-3.7-.3.5-.5 1.1-.5 1.8 0 1.2.6 2.3 1.6 2.9-.6 0-1.1-.2-1.6-.4v.1c0 1.7 1.2 3.1 2.8 3.4-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.4 1.7 2.4 3.2 2.4A7 7 0 0 1 3 17.6a9.9 9.9 0 0 0 5.4 1.6c6.4 0 10-5.3 10-10v-.5c.7-.5 1.3-1.1 1.8-1.8-.6.3-1.3.5-2 .6z"
      />
    </svg>
  )
}

const Wrap = styled.footer`
  background: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.headerText};
  padding-top: 64px;
`

const Inner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  padding-block: 40px 28px;

  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

const Brand = styled.div`
  display: grid;
  justify-items: start;
  gap: 8px;

  p {
    margin: 0;
    color: rgba(247, 248, 251, 0.72);
    font-size: 14px;
    line-height: 1.7;
  }
`

const LogoRow = styled.div`
  direction: ltr;
  display: flex;
  align-items: center;
  gap: 10px;

  strong {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1;
  }
`

const Column = styled.nav`
  display: grid;
  align-content: start;
  justify-items: start;
  gap: 10px;

  h2 {
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 700;
  }

  a {
    color: rgba(247, 248, 251, 0.72);
    font-size: 14px;
    line-height: 1.4;
  }

  a:hover {
    color: #fff;
  }
`

const Social = styled.div`
  direction: ltr;
  display: flex;
  align-self: center;
  gap: 10px;

  @media (max-width: 800px) {
    direction: inherit;
    align-self: start;
  }

  a {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.04);
  }

  a:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`

const Copy = styled.div`
  direction: ltr;
  text-align: left;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-block: 16px 18px;
  color: rgba(247, 248, 251, 0.6);
  font-size: 13px;
`
