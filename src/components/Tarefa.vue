<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type ITarefa from '@/interfaces/ITarefa'
import Cronometro from './Cronometro.vue'
import Box from './Box.vue'

defineOptions({
  name: 'Tarefa',
})

const props = defineProps<{
  tarefa: ITarefa
}>()

const emit = defineEmits<{
  (e: 'aoTarefaClicada', tarefa: ITarefa): void
}>()

function tarefaClicada(tarefa: ITarefa) {
  emit('aoTarefaClicada', tarefa)
}
</script>

<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada(props.tarefa)">
      <div class="column is-4">{{ props.tarefa.descricao || 'Tarefa Sem descrição' }}</div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <Cronometro :tempo-em-segundos="props.tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>
