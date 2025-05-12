import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tarefa from '@/components/Tarefa.vue'

const tarefaMock = {
  id: '1',
  descricao: 'Estudar Vue',
  duracaoEmSegundos: 1200,
  projeto: {
    id: '1',
    nome: 'Curso Vue',
  },
}

describe('Tarefa.vue', () => {
  it('renderiza a descrição da tarefa', () => {
    const wrapper = mount(Tarefa, {
      props: { tarefa: tarefaMock },
    })

    expect(wrapper.text()).toContain('Estudar Vue')
  })

  it('mostra o nome do projeto', () => {
    const wrapper = mount(Tarefa, {
      props: { tarefa: tarefaMock },
    })

    expect(wrapper.text()).toContain('Curso Vue')
  })

  it('emite evento ao clicar na tarefa', async () => {
    const wrapper = mount(Tarefa, {
      props: { tarefa: tarefaMock },
    })

    await wrapper.find('.clicavel').trigger('click')

    expect(wrapper.emitted().aoTarefaClicada).toBeTruthy()
    expect(wrapper.emitted().aoTarefaClicada?.[0]).toEqual([tarefaMock])
  })
})
