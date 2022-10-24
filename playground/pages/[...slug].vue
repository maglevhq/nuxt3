<script setup lang="ts">
const route = useRoute()

const site = useMaglevSite()
const page = useMaglevPage(route.params.slug)

useHead({
  title: `${site.value?.name} - ${page.value?.title}`
})
</script>

<template>
  <div>
    <MaglevSections v-if="page" :sections="page.sections" />
  </div>
</template>
