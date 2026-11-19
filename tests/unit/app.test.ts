import { describe, expect, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../../src/App.vue'
import { useLang } from '../../src/composables/useLang'

describe('App', () => {
  beforeEach(() => {
    useLang().setLang('en')
  })

  it('показывает заголовок и все секции', () => {
    const w = mount(App)
    expect(w.get('h1').text()).toContain('Fullstack Developer')
    for (const id of ['projects', 'music', 'about', 'contact']) {
      expect(w.find(`#${id}`).exists(), id).toBe(true)
    }
  })

  it('переключает язык и сохраняет выбор', async () => {
    const w = mount(App)
    const ru = w.findAll('.lang button').find((b) => b.text() === 'RU')!
    await ru.trigger('click')
    await nextTick()
    expect(w.get('h1').text()).toContain('Фуллстек-разработчик')
    expect(document.documentElement.lang).toBe('ru')
    expect(localStorage.getItem('lang')).toBe('ru')
  })

  it('у декоративных изображений пустой alt, у иллюстрации — осмысленный', () => {
    const w = mount(App)
    expect(w.get('img.main').attributes('alt')).not.toBe('')
    expect(w.get('img.cat').attributes('alt')).toBe('')
  })
})
