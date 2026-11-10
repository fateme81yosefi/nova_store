'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { LogoMark } from '@/assets/Icons/LogoMark'
import { Container } from './layout'

const guide = ['shipping', 'returns', 'privacy', 'faq'] as const
const useful = ['about', 'contact'] as const

export function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <Wrap>
      <Inner>
        <Brand>
          <LogoRow>
            <LogoMark size={34} />
            <strong>NOVA</strong>
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
          {useful.map((key) => (
            <a key={key} href="#top">
              {t(key)}
            </a>
          ))}
        </Column>
        <Column>
          <h2>{t('social')}</h2>
          <Social>
            <a href="#top" aria-label={t('telegram')}>
              Tg
            </a>
            <a href="#top" aria-label={t('instagram')}>
              Ig
            </a>
            <a href="#top" aria-label={t('linkedin')}>
              In
            </a>
            <a href="#top" aria-label={t('x')}>
              X
            </a>
          </Social>
        </Column>
      </Inner>
      <Copy>
        <Container>
          {year} © {t('rights')}
        </Container>
      </Copy>
    </Wrap>
  )
}

const Wrap = styled.footer`
  background: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.headerText};
  margin-top: 12px;
`

const Inner = styled(Container)`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 24px;
  padding-block: 36px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const Brand = styled.div`
  p {
    color: rgba(247, 248, 251, 0.72);
    line-height: 1.7;
  }
`

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.08em;
`

const Column = styled.nav`
  display: grid;
  align-content: start;
  gap: 8px;

  h2 {
    margin: 0 0 6px;
    font-size: 15px;
  }

  a {
    color: rgba(247, 248, 251, 0.75);
    font-size: 14px;
  }
`

const Social = styled.div`
  display: flex;
  gap: 8px;

  a {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.16);
  }
`

const Copy = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-block: 14px;
  color: rgba(247, 248, 251, 0.65);
  font-size: 13px;
`
