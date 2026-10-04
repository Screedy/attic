import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PurchaseValues from '../../app/components/PurchaseValues.vue'

describe('purchase values', () => {
  it('shows three currencies and toggles the rest', async () => {
    const wrapper = await mountSuspended(PurchaseValues, {
      props: { values: { USD: 1, EUR: 2, CZK: 3, GBP: 4, JPY: 5 } }
    })
    expect(wrapper.findAll('span')).toHaveLength(3)
    const toggle = wrapper.get('button')
    expect(toggle.text()).toBe('Show 2 more')

    await toggle.trigger('click')
    expect(wrapper.findAll('span')).toHaveLength(5)
    expect(toggle.text()).toBe('Show less')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    wrapper.unmount()
  })

  it('has no toggle for three or fewer currencies', async () => {
    const wrapper = await mountSuspended(PurchaseValues, {
      props: { values: { USD: 1, EUR: 2, CZK: 3 } }
    })
    expect(wrapper.findAll('span')).toHaveLength(3)
    expect(wrapper.find('button').exists()).toBe(false)
    wrapper.unmount()
  })
})
