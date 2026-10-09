import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { useOrganizationSettings } from '../../app/composables/useOrganizationSettings'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))

mockNuxtImport('useApiFetch', () => () => apiFetch)

async function mountSettingsConsumer() {
  let result!: ReturnType<typeof useOrganizationSettings>
  const wrapper = await mountSuspended(defineComponent({
    setup() {
      result = useOrganizationSettings()
      return () => h('div')
    }
  }))
  return { result, wrapper }
}

describe('organization settings', () => {
  it('loads the default, keeps it when a reload fails, and resets it on logout', async () => {
    const { result, wrapper } = await mountSettingsConsumer()

    apiFetch.mockResolvedValueOnce({ default_currency: 'GBP' })
    await result.load()
    expect(result.settings.value.default_currency).toBe('GBP')

    apiFetch.mockRejectedValueOnce(new Error('offline'))
    await result.load()
    expect(result.settings.value.default_currency).toBe('GBP')

    result.reset()
    expect(result.settings.value.default_currency).toBe('USD')
    wrapper.unmount()
  })
})
