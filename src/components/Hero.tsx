'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'

export function Hero({ images }: { images: string[] }) {
  const t = useTranslations('hero')

  return (
    <Section>
      <Copy>
        <h1>{t('title')}</h1>
        <p>{t('text')}</p>
        <a href="#products">{t('cta')}</a>
      </Copy>
      <Collage>
        {images.length > 0 ? (
          images.slice(0, 3).map((src) => <img key={src} src={src} alt="" />)
        ) : (
          <Fallback />
        )}
      </Collage>
    </Section>
  )
}

const Section = styled.section`
  margin-top: 22px;
  background: ${({ theme }) => theme.surface};
  border-radius: 28px;
  padding: 28px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 24px;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`

const Copy = styled.div`
  h1 {
    margin: 0;
    font-size: clamp(30px, 4vw, 46px);
    line-height: 1.35;
  }

  p {
    color: ${({ theme }) => theme.muted};
    font-size: 16px;
    line-height: 1.8;
  }

  a {
    display: inline-flex;
    align-items: center;
    height: 46px;
    padding: 0 18px;
    border-radius: 12px;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.onAccent};
    font-weight: 700;
  }
`

const Collage = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 12px;

  img {
    width: 100%;
    height: 150px;
    object-fit: contain;
    background: ${({ theme }) => theme.soft};
    border-radius: 18px;
    padding: 12px;
  }

  img:first-child {
    grid-row: span 2;
    height: 100%;
    min-height: 220px;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr 1fr;

    img:first-child {
      grid-row: auto;
      min-height: 140px;
      height: 140px;
    }
  }
`

const Fallback = styled.div`
  grid-column: 1 / -1;
  min-height: 220px;
  border-radius: 18px;
  background:
    radial-gradient(circle at 30% 40%, rgba(242, 106, 27, 0.35), transparent 30%),
    ${({ theme }) => theme.soft};
`
