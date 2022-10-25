import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addImportsDir, createResolver, addComponent, addComponentsDir, addTemplate } from '@nuxt/kit'
import { name as pkgName, version as pkgVersion } from '../package.json'

export interface ModuleOptions {
  host: string
  apiBaseUrl?: string
  publicApiKey: string
  privateApiKey: string
  livePreviewUrl?: string
  livePreview: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: pkgName,
    configKey: 'maglev',
    version: pkgVersion,
    compatibility: { nuxt: '^3.0.0-rc.6' }
  },
  defaults: {
    host: '<use-the-host-of-the-maglev-server>',
    publicApiKey: '<use-the-public-api-key-provided-by-the-maglev-server>',
    privateApiKey: '<use-the-private-api-key-provided-by-the-maglev-server>',
    livePreview: false
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))

    // Expose the config to the components / composables
    nuxt.options.runtimeConfig.public ||= {} as typeof nuxt.options.runtimeConfig.public
    nuxt.options.runtimeConfig.public.maglev = {
      apiBaseURL: options.apiBaseUrl || `${options.host}/api`,
      apiKey: options.publicApiKey
    }

    // Add Maglev composables
    addImportsDir([resolve(runtimeDir, 'composables')])

    // Register Maglev core components
    addComponent({
      name: 'MaglevSections', // name of the component to be used in vue templates
      filePath: resolve(runtimeDir, 'components', 'MaglevSections.vue')
    })
    addComponent({
      name: 'MaglevSection', // name of the component to be used in vue templates
      filePath: resolve(runtimeDir, 'components', 'MaglevSection.vue')
    })

    // Make Maglev developer generated components global
    addComponentsDir({
      path: `${nuxt.options.rootDir}/maglev/components`,
      global: true
    })

    // Add the JS lib which makes the bridge between the Maglev editor and the Nuxt app
    if (options.livePreview) {
      nuxt.options.app.head ||= {}
      nuxt.options.app.head.script ||= []
      nuxt.options.app.head.script.push({
        hid: 'maglev-livepreview',
        src: options.livePreviewUrl || `${options.host}/maglev/live-preview-client.js`,
        async: true,
        defer: true
      })
    }
  }
})
