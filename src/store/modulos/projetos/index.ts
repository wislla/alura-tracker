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
      try {
        const resposta = await http.get('projetos')
        commit(DEFINIR_PROJETO, resposta.data)
      } catch (erro) {
        console.error('Erro ao obter projetos:', erro)
      }
    },
    async [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string) {
      try {
        await http.post('/projetos', {
          nome: nomeDoProjeto,
        })
      } catch (erro) {
        console.error('Erro ao cadastrar projeto:', erro)
      }
    },
    async [ALTERAR_PROJETOS](contexto, projeto: IProjeto) {
      try {
        await http.put(`/projetos/${projeto.id}`, projeto)
      } catch (erro) {
        console.error('Erro ao alterar projeto:', erro)
      }
    },
    async [REMOVER_PROJETOS](contexto, id: string) {
      try {
        contexto.commit(EXCLUIR_PROJETO, id)
        await http.delete(`/projetos/${id}`)
      } catch (erro) {
        console.error('Erro ao remover projeto:', erro)
      }
    },
  },
}
