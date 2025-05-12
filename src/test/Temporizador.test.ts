import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CronometroWrapper from '@/components/Temporizador.vue'

describe('Temporizador.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('emite evento com tempo ao clicar em stop', async () => {
    const wrapper = mount(CronometroWrapper)

    await wrapper.findAll('button')[0].trigger('click')
    vi.advanceTimersByTime(2000)
    await wrapper.findAll('button')[1].trigger('click')

    const eventos = wrapper.emitted('aoTemporizadorFinalizado')
    expect(eventos).toBeTruthy()
    expect(eventos?.[0][0]).toBeGreaterThanOrEqual(2)
  })

  it('desativa botão de play quando o cronômetro está rodando', async () => {
    const wrapper = mount(CronometroWrapper)

    const [play, stop] = wrapper.findAll('button')
    expect(play.attributes('disabled')).toBeUndefined()

    await play.trigger('click')

    expect(play.attributes('disabled')).toBeDefined()
    expect(stop.attributes('disabled')).toBeUndefined()
  })
})
