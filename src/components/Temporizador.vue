<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import Cronometro from './Cronometro.vue'

const tempoEmSegundos = ref<number>(0)
const cronometro = ref<number>(0)
const cronometroRodando = ref<boolean>(false)

function iniciar() {
  cronometroRodando.value = true
  cronometro.value = setInterval(() => {
    tempoEmSegundos.value = tempoEmSegundos.value + 1
    console.log('incrementando o contador')
  }, 1000)
}

function finalizar() {
  cronometroRodando.value = false
  clearInterval(cronometro.value)
  emit('aoTemporizadorFinalizado', tempoEmSegundos.value)
  tempoEmSegundos.value = 0
}

const emit = defineEmits<{
  (e: 'aoTemporizadorFinalizado', tempoEmSegundos: number): void
}>()
</script>

<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempo-em-segundos="tempoEmSegundos" />
    <button class="button" @click="iniciar" :disabled="cronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<style scoped></style>
