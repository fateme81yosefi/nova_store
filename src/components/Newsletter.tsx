'use client'

import { useState } from 'react'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { ThemeMode } from '@/types/enums/theme'
import { newsletterSchema } from '@/validations/newsletterSchema'

export function Newsletter() {
  const t = useTranslations('newsletter')
  const [done, setDone] = useState(false)

  return (
    <Box>
      <Intro>
        <IconWrap aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="m4 7.2 8 6.1 8-6.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
        </IconWrap>
        <div>
          <h2>{t('title')}</h2>
          <p>{t('text')}</p>
        </div>
      </Intro>
      {done ? (
        <Success>{t('success')}</Success>
      ) : (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={newsletterSchema(t('invalid'))}
          onSubmit={() => setDone(true)}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form noValidate method="post" action="#">
              <input
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={254}
                spellCheck={false}
                value={values.email}
                placeholder={t('placeholder')}
                aria-label={t('placeholder')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button type="submit">{t('submit')}</button>
              {touched.email && errors.email ? <ErrorText>{errors.email}</ErrorText> : null}
            </Form>
          )}
        </Formik>
      )}
    </Box>
  )
}

const Box = styled.section`
  margin-top: 36px;
  margin-bottom: -52px;
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.surface};
  border-radius: 20px;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow: ${({ theme }) => theme.shadow};

  form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    flex: 1 1 360px;
    max-width: 480px;
  }

  input {
    flex: 1 1 220px;
    height: 48px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => (theme.mode === ThemeMode.Light ? '#E4E8EF' : theme.border)};
    background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#FFFFFF' : theme.bg)};
    color: ${({ theme }) => theme.text};
    padding: 0 14px;
  }

  input:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 1px;
  }

  button {
    height: 48px;
    border: 0;
    border-radius: 12px;
    padding: 0 22px;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.onAccent};
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
  }

  button:hover {
    background: ${({ theme }) => theme.accentHover};
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;

    form {
      max-width: none;
    }
  }
`

const Intro = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;

  h2 {
    margin: 0 0 4px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.4;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.muted};
    font-size: 13px;
    line-height: 1.7;
  }
`

const IconWrap = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#101C33' : theme.headerText)};
  color: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#FFFFFF' : theme.header)};
`

const Success = styled.p`
  margin: 0;
  flex: 1 1 280px;
  max-width: 540px;
  color: ${({ theme }) => theme.accent};
  font-weight: 700;
`

const ErrorText = styled.small`
  flex-basis: 100%;
  color: #b42318;
`
