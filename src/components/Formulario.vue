<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Temporizador from './Temporizador.vue'
// import type ITarefa from '@/interfaces/ITarefa'
import { useStore } from 'vuex'
import { key } from '@/store/index'
// import type IProjeto from '@/interfaces/IProjeto'
const descricao = ref<string>('')

function finalizarTarefa(tempoDecorrido: number): void {
  console.log(tempoDecorrido)
  console.log('desc', descricao.value)

  // emit('aoSalvarTarefa', {
  //   duracaoEmSegundos: tempoDecorrido,
  //   descricao: descricao.value,
  //   projeto: projetos.value.find((proj) => proj.id == idProjeto.value) as IProjeto,
  // })

  descricao.value = ''
}

// const emit = defineEmits<{
//   (e: 'aoSalvarTarefa', tarefa: ITarefa): void
// }>()

const store = useStore(key)
const projetos = computed(() => store.state.projeto.projetos)

const idProjeto = ref<string>('')
</script>
<template>
  <div class="box">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para iniciar uma nova tarefa">
        <input
          class="input"
          type="text"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>
