<script setup lang="ts">
import { PropType } from 'vue'
import { PageSection, SectionDefinitionMapping } from '../types'
import { buildSection } from '../utils/convertors'

const props = defineProps({
  sections: {
    type: Array as PropType<APIPageSection[]>,
    required: true
  },
  sectionDefinitionMapping: {
    type: Object as PropType<SectionDefinitionMapping>,
    required: true
  }
})

const currentAPISections = ref<APIPageSection[]>(props.sections)

const currentSections = computed(() => currentAPISections.value.map(apiSection =>
  buildSection(apiSection, props.sectionDefinitionMapping)))

const changeSections = (event) => {
  currentAPISections.value = event.detail.content.pageSections
}

const replaceSection = (event) => {
  const newSection = event.detail.section
  currentAPISections.value = currentAPISections.value.map((section) => {
    return section.id === newSection.id ? newSection : section
  })
}

const removeSection = (event) => {
  currentAPISections.value = currentAPISections.value.filter((section) => {
    return section.id !== event.detail.sectionId
  })
}

onMounted(() => {
  window.addEventListener('maglev:section:add', changeSections)
  window.addEventListener('maglev:section:move', changeSections)
  window.addEventListener('maglev:section:update', replaceSection)
  window.addEventListener('maglev:section:remove', removeSection)
  window.addEventListener('maglev:block:add', replaceSection)
  window.addEventListener('maglev:block:move', replaceSection)
  window.addEventListener('maglev:block:update', replaceSection)
  window.addEventListener('maglev:block:remove', replaceSection)
  window.addEventListener('maglev:style:update', changeSections)
})

onBeforeUnmount(() => {
  window.removeEventListener('maglev:section:add', changeSections)
  window.removeEventListener('maglev:section:move', changeSections)
  window.removeEventListener('maglev:section:update', replaceSection)
  window.removeEventListener('maglev:section:remove', removeSection)
  window.removeEventListener('maglev:block:add', replaceSection)
  window.removeEventListener('maglev:block:move', replaceSection)
  window.removeEventListener('maglev:block:update', replaceSection)
  window.removeEventListener('maglev:block:remove', replaceSection)
  window.removeEventListener('maglev:style:update', changeSections)
})
</script>
<template>
  <div>
    <MaglevSection
      v-for="section in currentSections"
      :key="section.id"
      :section="section"
    />
  </div>
</template>
