<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Temporizador from './Temporizador.vue'
import { useStore } from 'vuex'
import { key } from '@/store/index'
const descricao = ref<string>('')

function finalizarTarefa(): void {
  descricao.value = ''
}

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
