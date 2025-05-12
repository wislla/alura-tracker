<script lang="ts" setup>
import BarraLateral from './components/BarraLateral.vue'
import Notificacoes from './components/Notificacoes.vue'
</script>

<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter">
      <router-view></router-view>
    </div>
    <Notificacoes />
  </main>
</template>

<style>
.lista {
  padding: 1.25rem;
}
</style>
