'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { PlusIcon } from '@/assets/Icons/glyphs'
import { ThemeMode } from '@/types/enums/theme'

const SLIDES = 3

const groups = [
  ["women's clothing", 'jewelery', "men's clothing"],
  ["men's clothing", 'jewelery', "women's clothing"],
  ["women's clothing", "men's clothing", 'jewelery'],
] as const

type HeroProduct = {
  image: string
  category: string
}

export function Hero({ products }: { products: HeroProduct[] }) {
  const t = useTranslations('hero')
  const [slide, setSlide] = useState(1)
  const picks = useMemo(() => {
    const chosen = groups[slide]
      .map((category) => products.find((product) => product.category === category)?.image)
      .filter((src): src is string => Boolean(src))
    if (chosen.length > 0) return chosen
    return products.slice(0, 3).map((product) => product.image)
  }, [products, slide])

  return (
    <Wrap>
      <Section>
        <Copy>
          <h1>{t('title')}</h1>
          <p>{t('text')}</p>
          <a href="#products">
            <span>{t('cta')}</span>
            <PlusIcon size={15} />
          </a>
        </Copy>
        <Stage>
          {picks.length > 0 ? (
            picks.map((src, index) => (
              <Pedestal key={`${slide}-${index}`} data-slot={index}>
                <img src={src} alt="" />
                <Base />
              </Pedestal>
            ))
          ) : (
            <Fallback />
          )}
        </Stage>
      </Section>
      <Dots aria-label={t('slides')}>
        {Array.from({ length: SLIDES }, (_, index) => (
          <Dot
            key={index}
            type="button"
            aria-label={t('dot', { number: index + 1 })}
            aria-current={index === slide ? 'true' : undefined}
            data-active={index === slide}
            onClick={() => setSlide(index)}
          />
        ))}
      </Dots>
    </Wrap>
  )
}

const Wrap = styled.div`
  margin-top: 6px;

  @media (min-width: 768px) {
    margin-top: 22px;
  }
`

const Section = styled.section`
  background: ${({ theme }) =>
    theme.mode === ThemeMode.Light
      ? `radial-gradient(circle at 18% 78%, rgba(255, 255, 255, 0.95) 0 78px, transparent 80px),
         radial-gradient(circle at 8% 42%, rgba(255, 255, 255, 0.7) 0 36px, transparent 38px),
         radial-gradient(circle at 72% 22%, rgba(255, 196, 150, 0.45) 0 90px, transparent 92px),
         radial-gradient(circle at 90% 68%, rgba(255, 255, 255, 0.85) 0 48px, transparent 50px),
         linear-gradient(100deg, #eef3fb 0%, #f7f8fc 46%, #fde7d6 100%)`
      : theme.surface};
  border-radius: 22px;
  padding: 16px 14px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 6px;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
  min-height: 176px;

  @media (min-width: 768px) {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 20px;
    padding: 36px 40px;
    border-radius: 28px;
    min-height: 280px;
  }
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;

  h1 {
    margin: 0;
    font-size: 18px;
    line-height: 1.45;
    font-weight: 800;
  }

  p {
    margin: 6px 0 0;
    color: ${({ theme }) => theme.muted};
    font-size: 12px;
    line-height: 1.75;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 36px;
    margin-top: 12px;
    padding: 0 14px;
    border-radius: 999px;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.onAccent};
    font-weight: 700;
    font-size: 12px;
  }

  a:hover {
    background: ${({ theme }) => theme.accentHover};
  }

  @media (min-width: 768px) {
    h1 {
      font-size: clamp(32px, 4vw, 44px);
      line-height: 1.35;
    }

    p {
      margin-top: 10px;
      font-size: 16px;
    }

    a {
      height: 46px;
      margin-top: 18px;
      padding: 0 18px;
      font-size: 15px;
      gap: 8px;
    }
  }
`

const Stage = styled.div`
  direction: ltr;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  min-height: 132px;
`

const Pedestal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 46%;

  img {
    width: 100%;
    height: 96px;
    object-fit: contain;
    mix-blend-mode: ${({ theme }) => (theme.mode === ThemeMode.Light ? 'multiply' : 'normal')};
    filter: drop-shadow(0 10px 12px rgba(26, 39, 68, 0.12));
  }

  &[data-slot='2'] {
    display: none;
  }

  @media (min-width: 768px) {
    width: 32%;

    img {
      height: 132px;
    }

    &[data-slot='0'] img {
      height: 168px;
    }

    &[data-slot='1'] img {
      height: 124px;
    }

    &[data-slot='2'] {
      display: flex;

      img {
        height: 148px;
      }
    }
  }
`

const Base = styled.span`
  width: 72%;
  height: 16px;
  margin-top: -4px;
  border-radius: 50%;
  background: ${({ theme }) =>
    theme.mode === ThemeMode.Light ? 'linear-gradient(#ffffff, #e6edf6)' : theme.soft};
  box-shadow: 0 8px 14px rgba(26, 39, 68, 0.08);
`

const Fallback = styled.div`
  height: 100%;
  border-radius: 16px;
  background: radial-gradient(circle at 30% 40%, rgba(242, 106, 27, 0.28), transparent 36%);
`

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
  margin-top: 14px;
  position: relative;
  z-index: 1;
`

const Dot = styled.button`
  width: 7px;
  height: 7px;
  padding: 0;
  border: 0;
  border-radius: 99px;
  background: ${({ theme }) => theme.border};
  cursor: pointer;

  &[data-active='true'] {
    background: ${({ theme }) => theme.accent};
  }
`
