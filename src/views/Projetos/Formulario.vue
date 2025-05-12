<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { useNotificacao } from '@/composables/notificar'
import { useStore } from '@/store'
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from '@/store/tipos-acoes'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useStore()

const nomeDoProjeto = ref<string>('')

const { notificar } = useNotificacao()

function salvar() {
  if (props.id) {
    store.dispatch(ALTERAR_PROJETOS, {
      id: props.id,
      nome: nomeDoProjeto.value,
    })
    lidarComOSucesso()
  } else {
    store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
    lidarComOSucesso()
  }
}
function lidarComOSucesso() {
  nomeDoProjeto.value = ''
  notificar(TipoNotificacao.SUCESSO, 'Novo projeto salvo', 'Pronto')

  router.push('/projetos')
}

const props = defineProps<{
  id: string
}>()

onMounted(() => {
  if (props.id) {
    const projeto = store.state.projeto.projetos.find((proj) => proj.id == props.id)
    nomeDoProjeto.value = projeto?.nome || ''
  }
})
</script>

<template>
  <section class="projetos">
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjet" />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
