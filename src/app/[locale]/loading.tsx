'use client'

import { useTranslations } from 'next-intl'

export default function Loading() {
  const t = useTranslations('common')
  return <p style={{ textAlign: 'center', padding: 48 }}>{t('loading')}</p>
}
