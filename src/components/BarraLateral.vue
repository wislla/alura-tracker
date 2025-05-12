<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="" />
    </h1>
    <nav class="panel mt-5">
      <ul>
        <li class="link">
          <router-link to="/">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li class="link">
          <router-link to="/projetos">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BarraLateral',
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}
</style>
