<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  tempoEmSegundos: number
}>()

const tempoDecorrido = computed(() => {
  return new Date(props.tempoEmSegundos * 1000).toISOString().substr(11, 8)
})
</script>

<template>
  <section>
    <strong>
      {{ tempoDecorrido }}
    </strong>
  </section>
</template>

<style scoped></style>
