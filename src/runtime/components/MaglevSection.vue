<script setup lang="ts">
import { PropType } from 'vue'
import { camelize } from '../utils'
import { Section } from '../types'

const props = defineProps({
  section: {
    type: Object as PropType<Section>,
    required: true
  }
})

const sectionComponentName = computed(() => camelize(props.section.type, true))
const sectionComponent = computed(() => resolveComponent(sectionComponentName.value))
</script>
<template>
  <component
    :is="sectionComponent"
    :section="section"
    :data-maglev-section-id="section.id"
  />
</template>
