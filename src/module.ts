import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addImportsDir, createResolver, addComponent, addComponentsDir } from '@nuxt/kit'
import { name as pkgName, version as pkgVersion } from '../package.json'

export interface ModuleOptions {
  apiBaseURL: string
  apiKey: string
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: pkgName,
    configKey: 'maglev',
    version: pkgVersion,
    compatibility: { nuxt: '^3.0.0-rc.6' }
  },
  defaults: {
    apiBaseURL: '<use-the-api-base-url-provided-by-the-maglev-server>',
    apiKey: '<use-the-api-key-provided-by-the-maglev-server>',
    addPlugin: true
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    if (options.addPlugin) {
      addPlugin(resolve(runtimeDir, 'plugin'))
    }

    // Expose the config to the components / composables
    nuxt.options.runtimeConfig.public ||= {} as typeof nuxt.options.runtimeConfig.public
    nuxt.options.runtimeConfig.public.maglev = options

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
  }
})
