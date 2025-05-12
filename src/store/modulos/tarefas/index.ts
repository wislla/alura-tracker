import http from '@/http'
import ITarefa from '@/interfaces/ITarefa'
import { Estado } from '@/store'
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from '@/store/tipo-mutacoes'
import { OBTER_TAREFAS, CADASTRAR_TAREFAS, ALTERAR_TAREFAS } from '@/store/tipos-acoes'
import { Module } from 'vuex'

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  mutations: {
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
      try {
        let url = 'tarefas'
        if (filtro) {
          url += `?descricao=${filtro}`
        }
        const resposta = await http.get(url)
        commit(DEFINIR_TAREFAS, resposta.data)
      } catch (erro) {
        console.error('Erro ao obter tarefas:', erro)
      }
    },
    async [CADASTRAR_TAREFAS]({ commit }, tarefa: ITarefa) {
      try {
        await http.post('/tarefas', tarefa)
        commit(ADICIONA_TAREFA, tarefa)
      } catch (erro) {
        console.error('Erro ao cadastrar tarefa:', erro)
      }
    },
    async [ALTERAR_TAREFAS](contexto, tarefa: ITarefa) {
      try {
        await http.put(`/tarefas/${tarefa.id}`, tarefa)
        contexto.commit(ALTERA_TAREFA, tarefa)
      } catch (erro) {
        console.error('Erro ao alterar tarefa:', erro)
      }
    },
  },
}
