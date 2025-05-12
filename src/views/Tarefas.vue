<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { computed, onMounted, watchEffect } from 'vue'
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue'
import type ITarefa from '../interfaces/ITarefa'
import Box from '../components/Box.vue'
import { useStore } from '@/store'
import {
  ALTERAR_TAREFAS,
  CADASTRAR_TAREFAS,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from '@/store/tipos-acoes'
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'

const store = useStore()

const tarefas = computed(() => store.state.tarefas)

function salvarTarefa(tarefa: ITarefa) {
  store.dispatch(CADASTRAR_TAREFAS, tarefa)
}

const listaEstaVazia = computed(() => {
  return tarefas.value.length === 0
})

onMounted(() => {
  store.dispatch(OBTER_TAREFAS)
  store.dispatch(OBTER_PROJETOS)
})

const tarefaSelecionada = ref<ITarefa | null>(null)

function selecionarTarefa(tarefa: ITarefa) {
  tarefaSelecionada.value = tarefa
}

function fecharModal() {
  tarefaSelecionada.value = null
}

function alterarTarefa() {
  store.dispatch(ALTERAR_TAREFAS, tarefaSelecionada.value)
  fecharModal()
}

const filtro = ref<string>('')

watchEffect(() => {
  console.log(filtro.value)
  store.dispatch(OBTER_TAREFAS, filtro.value)
  //.filter((t) => !filtro.value || t.descricao.includes(filtro.value))
})
</script>

<template>
  <div class="column is-three-quarter">
    <Formulario @ao-salvar-tarefa="salvarTarefa" />
    <div class="lista">
      <Box v-if="listaEstaVazia">
        Você não está muito produtivo hoje
        <span class="has-text-weight-bold">:(</span>
      </Box>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro" />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <Tarefa
        :tarefa="tarefa"
        v-for="(tarefa, index) in tarefas"
        :key="index"
        @ao-tarefa-clicada="selecionarTarefa"
      />
    </div>
  </div>
  <Modal :mostrar="tarefaSelecionada != null" v-if="tarefaSelecionada != null">
    <template #cabecalho>
      <p class="modal-card-title">Editando uma tarefa</p>
      <button @click="fecharModal" class="delete" aria-label="close"></button>
    </template>

    <template #corpo>
      <div class="field">
        <label class="label" for="descricaoDaTarefa">Descrição</label>
        <input id="descricaoDaTarefa" class="input" v-model="tarefaSelecionada.descricao" />
      </div>
    </template>

    <template #rodape>
      <button @click="alterarTarefa" class="button is-success">Salvar</button>
      <button @click="fecharModal" class="button">Cancelar</button>
    </template>
  </Modal>
</template>

<style>
.lista {
  padding: 1.25rem;
}
</style>
