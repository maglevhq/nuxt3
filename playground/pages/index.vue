<script setup lang="ts">
const site = useMaglevSite()
const page = useMaglevPage('index')

useHead({
  title: `${site.value?.name} - ${page.value?.title}`
})
</script>

<template>
  <div>
    <MaglevSections :sections="page.sections" />
  </div>
</template>
