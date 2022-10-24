import type { Ref } from 'vue'
import { Site } from '../types'
import { useRuntimeConfig } from '#imports'

export const useMaglevSite = (): Ref<Site | undefined> => {
  const config = useRuntimeConfig()

  const { data: site } = useFetch<Site>(
    `${config.maglev.apiBaseURL}/site`, {
      headers: {
        Authorization: `Token token="${config.maglev.apiKey}"`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

  return site
}
