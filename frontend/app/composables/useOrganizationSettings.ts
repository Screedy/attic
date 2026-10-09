import type { OrganizationSettings } from '~/types/api'

// Organization-wide preferences, loaded once after login (see app.vue).
export function useOrganizationSettings() {
  const settings = useState<OrganizationSettings>('organization-settings', () => ({ default_currency: DEFAULT_CURRENCY }))

  const load = async () => {
    try {
      settings.value = await useApiFetch()<OrganizationSettings>('/api/organization/settings')
    } catch {
      // Keep the current value: forms still work with the fallback currency.
    }
  }

  const update = async (next: OrganizationSettings) => {
    settings.value = await useApiFetch()<OrganizationSettings>('/api/organization/settings', {
      method: 'PUT',
      body: JSON.stringify(next)
    })
    return settings.value
  }

  // Called on logout, so a failed load after the next login (possibly against another
  // instance on the same address) never reuses the previous instance's default.
  const reset = () => {
    settings.value = { default_currency: DEFAULT_CURRENCY }
  }

  return { settings, load, update, reset }
}
