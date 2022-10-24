import { defineNuxtConfig } from 'nuxt/config'
import MaglevModule from '..'

export default defineNuxtConfig({
  modules: [
    MaglevModule
  ],
  maglev: {
    apiBaseURL: process.env.NUXT_ENV_MAGLEV_API_BASE_URL,
    apiKey: process.env.NUXT_ENV_MAGLEV_API_KEY,
    addPlugin: true
  },
  imports: {
    autoImport: true
  }
})
