import type { Ref } from 'vue'
import { Page } from '../types'
import { useRuntimeConfig } from '#imports'

export const useMaglevPage = (path: string): Ref<Page | undefined> => {
  const config = useRuntimeConfig()

  const { data: page } = useFetch<Page>(
    `${config.maglev.apiBaseURL}/page`, {
      params: { path },
      headers: {
        Authorization: `Token token="${config.maglev.apiKey}"`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

  return page
}
