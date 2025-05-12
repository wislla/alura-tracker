import { tarefa } from './modulos/tarefas/index'
import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { EstadoProjeto, projeto } from './modulos/projetos'
import { EstadoTarefa } from './modulos/tarefas'
import { notificacao } from './modulos/notificacoes'
import { EstadoNotificacao } from './modulos/notificacoes'

export interface Estado {
  projeto: EstadoProjeto
  notificacao: EstadoNotificacao
  tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: [],
    },
    notificacao: {
      notificacoes: [],
    },
    tarefa: {
      tarefas: [],
    },
  },

  modules: {
    projeto,
    tarefa,
    notificacao,
  },
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
