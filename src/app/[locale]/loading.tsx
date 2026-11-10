import { getTranslations } from 'next-intl/server'

export default async function Loading() {
  const t = await getTranslations('common')
  return <p style={{ textAlign: 'center', padding: 48 }}>{t('loading')}</p>
}
