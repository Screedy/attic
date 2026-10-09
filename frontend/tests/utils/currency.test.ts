import { describe, expect, it } from 'vitest'
import { currencies, formatPurchaseValues } from '../../app/utils/currency'

describe('purchase values', () => {
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

  it('hides codes the backend rejects', () => {
    for (const code of ['MRU', 'SLE', 'VES', 'XCG', 'ZWG']) expect(currencies).not.toContain(code)
  })
})
