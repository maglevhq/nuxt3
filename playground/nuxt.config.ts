import { defineNuxtConfig } from 'nuxt/config'
import MaglevModule from '..'

export default defineNuxtConfig({
  modules: [
    MaglevModule
  ],
  maglev: {
    host: process.env.NUXT_ENV_MAGLEV_HOST,
    publicApiKey: process.env.NUXT_ENV_MAGLEV_PUBLIC_API_KEY,
    privateApiKey: process.env.NUXT_ENV_MAGLEV_PRIVATE_API_KEY,
    livePreview: false
  },
  imports: {
    autoImport: true
  }
})
