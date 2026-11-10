'use client'

import { useState } from 'react'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { newsletterSchema } from '@/validations/newsletterSchema'

export function Newsletter() {
  const t = useTranslations('newsletter')
  const [done, setDone] = useState(false)

  return (
    <Box>
      <div>
        <h2>{t('title')}</h2>
        <p>{t('text')}</p>
      </div>
      {done ? (
        <Success>{t('success')}</Success>
      ) : (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={newsletterSchema(t('invalid'))}
          onSubmit={() => setDone(true)}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <input
                name="email"
                type="email"
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
  background: ${({ theme }) => theme.surface};
  border-radius: 24px;
  padding: 22px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;

  h2 {
    margin: 0 0 6px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.muted};
  }

  form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  input {
    flex: 1 1 180px;
    height: 48px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    padding: 0 12px;
  }

  button {
    height: 48px;
    border: 0;
    border-radius: 12px;
    padding: 0 16px;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.onAccent};
    font-weight: 700;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const Success = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.accent};
  font-weight: 700;
`

const ErrorText = styled.small`
  flex-basis: 100%;
  color: #b42318;
`
