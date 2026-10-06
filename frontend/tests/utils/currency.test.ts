import { describe, expect, it } from 'vitest'
import { currencies, formatPurchaseValues, sumPurchaseValues } from '../../app/utils/currency'

describe('purchase values', () => {
  it('sums price times quantity per currency and skips unpriced assets', () => {
    expect(sumPurchaseValues([
      { purchase_price: 100, quantity: 2, currency: 'CZK' },
      { purchase_price: 50, quantity: 1, currency: 'CZK' },
      { purchase_price: 10, quantity: 3, currency: 'EUR' },
      { purchase_price: 5, quantity: 1 },
      { purchase_price: undefined, quantity: 4, currency: 'USD' }
    ])).toEqual({ CZK: 250, EUR: 30, USD: 5 })
  })

  it('lists each currency without converting', () => {
    expect(formatPurchaseValues({ USD: 3200, CZK: 125000, EUR: 450 })).toEqual(['CZK 125,000', '€450', '$3,200'])
  })

  it('shows zero in the default currency when nothing is priced', () => {
    expect(formatPurchaseValues({})).toEqual(['$0'])
    expect(formatPurchaseValues({}, 'GBP')).toEqual(['£0'])
  })

  it('offers CZK, EUR and USD', () => {
    expect(currencies).toEqual(expect.arrayContaining(['CZK', 'EUR', 'USD']))
  })
})
