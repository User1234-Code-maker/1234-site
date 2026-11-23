import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useCatSpeech } from '../../src/composables/useCatSpeech'

// composable с onBeforeUnmount проверяем внутри настоящего компонента
function setup() {
  let api!: ReturnType<typeof useCatSpeech>
  const wrapper = mount(
    defineComponent({
      setup() {
        api = useCatSpeech((k) => k)
        return () => h('div')
      },
    }),
  )
  return { api, wrapper }
}

describe('useCatSpeech', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('фраза появляется и сама пропадает', () => {
    const { api } = setup()
    api.sayMood('click', 1000)
    expect(api.said.value).toMatch(/^cat_line_/)
    vi.advanceTimersByTime(1001)
    expect(api.said.value).toBe('')
  })

  it('крик меняется, пока котика несут, и останавливается', () => {
    const { api } = setup()
    api.startScream()
    expect(api.said.value).toMatch(/^cat_scream_/)
    api.stopScream()
    const last = api.said.value
    vi.advanceTimersByTime(5000)
    expect(api.said.value).toBe(last)
  })

  it('болтает сам, только когда это уместно, и про музыку, если она играет', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1) // пауза 22 000 + 0,1·28 000 = 24 800 мс
    const { api } = setup()
    let allowed = false
    api.startChatter(
      () => allowed,
      () => true,
    )
    vi.advanceTimersByTime(24800)
    expect(api.said.value).toBe('')
    allowed = true
    vi.advanceTimersByTime(24800)
    expect(api.said.value).toMatch(/^cat_music_/)
  })

  it('при размонтировании все таймеры останавливаются', () => {
    const { api, wrapper } = setup()
    api.startChatter(
      () => true,
      () => false,
    )
    wrapper.unmount()
    vi.advanceTimersByTime(120000)
    expect(api.said.value).toBe('')
  })
})
