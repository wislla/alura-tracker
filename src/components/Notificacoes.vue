<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const notificacoes = computed(() => store.state.notificacoes)

const contexto = {
  [TipoNotificacao.ATENCAO]: 'is-warning ',
  [TipoNotificacao.FALHA]: 'is-danger',
  [TipoNotificacao.SUCESSO]: 'is-success',
}
</script>

<template>
  <div class="notificacoes">
    <article
      class="message"
      :class="contexto[notificacao.tipo]"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
    >
      <div class="message-header">{{ notificacao.titulo }}</div>
      <div class="message-body">
        {{ notificacao.texto }}
      </div>
    </article>
  </div>
</template>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>
