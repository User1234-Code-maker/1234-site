import { describe, expect, it, beforeEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../../src/App.vue'
import { useLang } from '../../src/composables/useLang'

// ленивые секции подгружаются динамическим import — ждём, пока они появятся
async function mountReady() {
  const w = mount(App)
  await vi.waitFor(() => expect(w.find('#contact h2').exists()).toBe(true))
  await flushPromises()
  return w
}

describe('App', () => {
  beforeEach(() => {
    useLang().setLang('en')
  })

  it('показывает заголовок и все секции', async () => {
    const w = await mountReady()
    expect(w.get('h1').text()).toContain('Fullstack Developer')
    for (const id of ['projects', 'skills', 'music', 'experience', 'about', 'contact']) {
      expect(w.find(`#${id}`).exists(), id).toBe(true)
    }
  })

  it('переключает язык и сохраняет выбор', async () => {
    const w = await mountReady()
    const ru = w.findAll('.lang button').find((b) => b.text() === 'RU')!
    await ru.trigger('click')
    await nextTick()
    expect(w.get('h1').text()).toContain('Фуллстек-разработчик')
    expect(w.get('#projects h2').text()).toBe('Работы')
    expect(document.documentElement.lang).toBe('ru')
    expect(localStorage.getItem('lang')).toBe('ru')
  })

  it('у декоративных изображений пустой alt, у иллюстрации — осмысленный', () => {
    const w = mount(App)
    expect(w.get('img.main').attributes('alt')).not.toBe('')
    expect(w.get('img.cat').attributes('alt')).toBe('')
  })

  it('у проектов-заглушек нет ссылок, у настоящего проекта есть', async () => {
    const w = await mountReady()
    const cards = w.findAll('#projects .card')
    expect(cards.length).toBeGreaterThanOrEqual(6)
    expect(cards[0].findAll('a').length).toBe(2)
    expect(cards.slice(1).every((c) => c.findAll('a').length === 0)).toBe(true)
  })

  it('все картинки ниже первого экрана грузятся лениво', async () => {
    const w = await mountReady()
    const imgs = w.findAll('.rest img')
    expect(imgs.length).toBeGreaterThan(0)
    for (const i of imgs) expect(i.attributes('loading')).toBe('lazy')
  })
})
