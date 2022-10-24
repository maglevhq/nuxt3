import type { Ref } from 'vue'
import { Page } from '../types'
import { useRuntimeConfig } from '#imports'

export const useMaglevPage = (path: string | string[]): Ref<Page | undefined> => {
  const config = useRuntimeConfig()

  // special cases...
  if (path === '') { path = 'index' }
  if (Array.isArray(path)) { path = path.join('/') }

  const { data: page } = useFetch<Page>(
    `${config.maglev.apiBaseURL}/page`, {
      params: { path },
      headers: {
        Authorization: `Token token="${config.maglev.apiKey}"`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

  // TODO: deal with NotFound error here (or the 500)
  // watch(page, () => console.log(page.value))
  // watch(error, (bar) => {
  //   console.log('error has changed!!!', bar)
  // }, { immediate: true })

  return page
}
