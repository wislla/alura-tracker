import { INotificacao } from '@/interfaces/INotificacao'
import { Estado } from '@/store'
import { NOTIFICAR } from '@/store/tipo-mutacoes'
import { Module } from 'vuex'

export interface EstadoNotificacao {
  notificacoes: INotificacao[]
}

export const notificacao: Module<EstadoNotificacao, Estado> = {
  state: () => ({
    notificacoes: [],
  }),
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter((notif) => notif.id != novaNotificacao.id)
      }, 3000)
    },
  },
}
