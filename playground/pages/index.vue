<script setup lang="ts">
import { sectionDefinitionMapping } from '~~/maglev/types'

const site = useMaglevSite()
const page = useMaglevPage('index')

useHead({
  title: `${site.value?.name} - ${page.value?.title}`
})
</script>

<template>
  <div>
    <MaglevSections
      :section-definition-mapping="sectionDefinitionMapping"
      :sections="page.sections"
    />
  </div>
</template>
