import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from './tipo-mutacoes'
import { INotificacao } from '@/interfaces/INotificacao'
import { ALTERAR_TAREFAS, CADASTRAR_TAREFAS, OBTER_TAREFAS } from './tipos-acoes'
import http from '@/http/index'
import ITarefa from '@/interfaces/ITarefa'
import { EstadoProjeto, projeto } from './modulos/projetos'

export interface Estado {
  projeto: EstadoProjeto
  notificacoes: INotificacao[]
  tarefas: ITarefa[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: [],
    },
    notificacoes: [],
    tarefas: [],
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        store.state.notificacoes = store.state.notificacoes.filter(
          (notif) => notif.id != novaNotificacao.id,
        )
      }, 3000)
    },

    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
  },
  actions: {
    async [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = 'tarefas'

      if (filtro) {
        url += `?descricao=${filtro}`
      }
      const resposta = await http.get(url)
      console.log(resposta)
      commit(DEFINIR_TAREFAS, resposta.data)
    },
    async [CADASTRAR_TAREFAS]({ commit }, tarefa: ITarefa) {
      const resposta = await http.post('/tarefas', tarefa)
      commit(ADICIONA_TAREFA, tarefa)
      console.log(resposta)
    },
    async [ALTERAR_TAREFAS](contexto, tarefa: ITarefa) {
      const resposta = await http.put(`/tarefas/${tarefa.id}`, tarefa)

      contexto.commit(ALTERA_TAREFA, tarefa)

      console.log(resposta)
    },
  },
  modules: {
    projeto,
  },
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
