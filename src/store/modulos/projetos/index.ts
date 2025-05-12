import http from '@/http'
import IProjeto from '@/interfaces/IProjeto'
import { Estado } from '@/store'
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  DEFINIR_PROJETO,
  EXCLUIR_PROJETO,
} from '@/store/tipo-mutacoes'
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETOS,
  ALTERAR_PROJETOS,
  REMOVER_PROJETOS,
} from '@/store/tipos-acoes'
import { Module } from 'vuex'

export interface EstadoProjeto {
  projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto

      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id != id)
    },
    [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
      state.projetos = projetos
    },
  },
  actions: {
    async [OBTER_PROJETOS]({ commit }) {
      const resposta = await http.get('projetos')
      console.log(resposta)
      commit(DEFINIR_PROJETO, resposta.data)
    },
    async [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string) {
      const resposta = await http.post('/projetos', {
        nome: nomeDoProjeto,
      })
      console.log(resposta)
    },
    async [ALTERAR_PROJETOS](contexto, projeto: IProjeto) {
      const resposta = await http.put(`/projetos/${projeto.id}`, projeto)

      console.log(resposta)
    },
    async [REMOVER_PROJETOS](contexto, id: string) {
      contexto.commit(EXCLUIR_PROJETO, id)
      const resposta = await http.delete(`/projetos/${id}`)

      console.log(resposta)
    },
  },
}
