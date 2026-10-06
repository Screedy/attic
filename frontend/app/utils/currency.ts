import type { Asset } from '~/types/api'

export const DEFAULT_CURRENCY = 'USD'

// Every ISO 4217 code the runtime knows; curate a shortlist if the long menu gets in the way.
export const currencies = Intl.supportedValuesOf('currency')

export function formatMoney(value: number, currency = DEFAULT_CURRENCY, fractionDigits?: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value)
}

// Purchase price * quantity, summed per currency.
export function sumPurchaseValues(assets: Pick<Asset, 'purchase_price' | 'quantity' | 'currency'>[]) {
  const values: Record<string, number> = {}
  for (const asset of assets) {
    if (asset.purchase_price == null) continue
    const currency = asset.currency || DEFAULT_CURRENCY
    values[currency] = (values[currency] || 0) + asset.purchase_price * asset.quantity
  }
  return values
}

// One formatted value per currency, rendered as separate items so they wrap cleanly.
// Currencies are listed side by side, never converted; add exchange rates if one grand total is needed.
export function formatPurchaseValues(values: Record<string, number>, fallbackCurrency = DEFAULT_CURRENCY) {
  const entries = Object.entries(values).sort(([a], [b]) => a.localeCompare(b))
  if (!entries.length) return [formatMoney(0, fallbackCurrency, 0)]
  return entries.map(([currency, value]) => formatMoney(value, currency, 0))
}
