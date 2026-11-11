export function formatToman(amountInUsd: number, locale: string, tomanPerDollar: number) {
  return formatAmount(Math.round(amountInUsd * tomanPerDollar), locale)
}

export function formatRate(tomanPerDollar: number, locale: string) {
  return formatAmount(tomanPerDollar, locale)
}

function formatAmount(amount: number, locale: string) {
  const numberLocale = locale === 'fa' ? 'fa-IR' : 'en-US'
  return new Intl.NumberFormat(numberLocale).format(amount)
}
