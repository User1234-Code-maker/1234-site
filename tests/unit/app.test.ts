import { describe, expect, it, beforeEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../../src/App.vue'
import { router } from '../../src/router'
import { useLang } from '../../src/composables/useLang'

// страницы и блоки подгружаются динамическим import — ждём, пока они появятся
async function open(path: string) {
  await router.push(path)
  await router.isReady()
  const w = mount(App, { global: { plugins: [router] } })
  await flushPromises()
  return w
}

describe('App', () => {
  beforeEach(() => {
    useLang().setLang('en')
    localStorage.clear()
  })

  it('главная: заголовок Hero и блоки ниже него', async () => {
    const w = await open('/')
    expect(w.get('h1').text()).toContain('Fullstack Developer')
    await vi.waitFor(() => expect(w.find('#contact h2').exists()).toBe(true))
    for (const id of ['projects', 'music', 'about', 'contact'])
      expect(w.find(`#${id}`).exists(), id).toBe(true)
  })

  it('переключает язык и сохраняет выбор', async () => {
    const w = await open('/')
    await w
      .findAll('.lang button')
      .find((b) => b.text() === 'RU')!
      .trigger('click')
    await new Promise((r) => setTimeout(r, 400))
    await nextTick()
    expect(w.get('h1').text()).toContain('Фуллстек-разработчик')
    expect(document.documentElement.lang).toBe('ru')
    expect(localStorage.getItem('lang')).toBe('ru')
  })

  it('у декоративных изображений пустой alt, у иллюстрации осмысленный', async () => {
    const w = await open('/')
    expect(w.get('img.main').attributes('alt')).not.toBe('')
    expect(w.get('img.cat').attributes('alt')).toBe('')
  })

  it('картинки ниже первого экрана на главной грузятся лениво', async () => {
    const w = await open('/')
    await vi.waitFor(() => expect(w.find('#contact h2').exists()).toBe(true))
    const imgs = w.findAll('.rest img:not(.mark)')
    expect(imgs.length).toBeGreaterThan(0)
    for (const i of imgs) expect(i.attributes('loading')).toBe('lazy')
  })

  it('страница проектов: фильтр категорий оставляет только нужные карточки', async () => {
    const w = await open('/projects')
    const all = w.findAll('.pcard').length
    expect(all).toBeGreaterThanOrEqual(6)
    await w
      .findAll('.fchip')
      .find((b) => b.text().startsWith('Telegram'))!
      .trigger('click')
    await flushPromises()
    await vi.waitFor(() => expect(w.findAll('.pcard').length).toBe(2))
    expect(w.findAll('.pcard').length).toBeLessThan(all)
  })

  it('у примеров нет внешних ссылок, у настоящего проекта есть', async () => {
    const w = await open('/projects')
    const cards = w.findAll('.pcard')
    const real = cards.find((c) => c.text().includes('Game Studio Website'))!
    expect(real.findAll('a[href^="https://"]').length).toBe(2)
    for (const c of cards.filter((x) => x.find('.badge').exists())) {
      expect(c.findAll('a[href^="https://"]').length).toBe(0)
    }
  })

  it('неизвестный проект показывает 404', async () => {
    const w = await open('/projects/nothing')
    expect(w.find('.nf-code').exists()).toBe(true)
  })

  it('контакты: копирование почты пишет в буфер и показывает подтверждение', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    const w = await open('/contact')
    await w.get('.copy-btn').trigger('click')
    await flushPromises()
    expect(writeText).toHaveBeenCalledWith('bogdan.korzun2003@gmail.com')
    expect(w.get('.copy-btn').classes()).toContain('ok')
  })

  it('контакты: если буфер недоступен, показывается подсказка', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('no')) } })
    const w = await open('/contact')
    await w.get('.copy-btn').trigger('click')
    await flushPromises()
    expect(w.find('[role="alert"]').exists()).toBe(true)
  })

  it('музыка: демо-плеер запускается, ставится на паузу и переключает трек', async () => {
    const w = await open('/music')
    await w.get('.ctl.main').trigger('click')
    expect(w.get('.mx-card').classes()).toContain('playing')
    await w.findAll('.ctl')[2]!.trigger('click')
    expect(w.get('.mx-now b').text()).toBe('Cloud Index')
    await w.get('.ctl.main').trigger('click')
    expect(w.get('.mx-card').classes()).not.toContain('playing')
  })
})
