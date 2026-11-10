// API قیمت را به دلار می‌دهد. طرح تومان است، پس فقط موقع نمایش تبدیل می‌کنم.
export const USD_TO_TOMAN = 50000

export function formatToman(amountInUsd: number, locale: string) {
  const toman = Math.round(amountInUsd * USD_TO_TOMAN)
  const numberLocale = locale === 'fa' ? 'fa-IR' : 'en-US'
  return new Intl.NumberFormat(numberLocale).format(toman)
}
