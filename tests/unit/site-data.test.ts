import { describe, expect, it } from 'vitest'
import { site } from '../../src/data/site'

describe('данные сайта', () => {
  it('у русской и английской версий одинаковые ключи текстов', () => {
    expect(Object.keys(site.t.ru).sort()).toEqual(Object.keys(site.t.en).sort())
  })
  it('нет пустых текстов', () => {
    for (const lang of ['ru', 'en'] as const) {
      for (const [key, value] of Object.entries(site.t[lang])) {
        expect(value.trim(), `${lang}.${key}`).not.toBe('')
      }
    }
  })
  it('у каждого проекта есть название, описания и стек; у настоящего (не заглушки) ещё и обложка', () => {
    for (const p of site.projects) {
      expect(p.title).toBeTruthy()
      expect(p.ru).toBeTruthy()
      expect(p.en).toBeTruthy()
      expect(p.tech.length).toBeGreaterThan(0)
      if (!p.soon) expect(p.cover).toBeTruthy()
    }
  })
  it('у заглушек нет ссылок на код и демо', () => {
    for (const p of site.projects.filter((x) => x.soon)) {
      expect(p.repo).toBeUndefined()
      expect(p.demo).toBeUndefined()
    }
  })
  it('все контакты заполнены (ссылка на SoundCloud не заглушка)', () => {
    for (const [key, value] of Object.entries(site.contacts)) {
      expect(value, key).toBeTruthy()
      expect(value, key).not.toBe('#')
    }
  })
})
