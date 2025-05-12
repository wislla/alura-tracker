<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useStore } from '@/store'
import { OBTER_PROJETOS, REMOVER_PROJETOS } from '@/store/tipos-acoes'
import { computed, onMounted } from 'vue'

const store = useStore()

const projetos = computed(() => store.state.projetos.projetos)

function excluirProjeto(id: string) {
  store.dispatch(REMOVER_PROJETOS, id)
}

onMounted(() => {
  store.dispatch(OBTER_PROJETOS)
})
</script>

<template>
  <section class="projetos">
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`">Editar</router-link>
            <button class="button" @click="excluirProjeto(projeto.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
