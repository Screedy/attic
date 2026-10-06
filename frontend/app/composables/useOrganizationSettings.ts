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

  return { settings, load, update }
}
