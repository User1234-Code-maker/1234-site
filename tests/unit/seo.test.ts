import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import seo from '../../src/data/seo.json'
import { projects } from '../../src/data/projects'

// у каждого проекта должно быть своё превью ссылки, иначе в мессенджере покажется общее
describe('превью ссылок', () => {
  it('есть для каждого проекта', () => {
    for (const p of projects) expect(Object.keys(seo.pages)).toContain(`projects/${p.slug}`)
  })
  it('картинки превью лежат в public', () => {
    for (const meta of Object.values(seo.pages)) expect(existsSync(`public/${meta.image}`)).toBe(true)
  })
  it('описания короче 200 знаков (длиннее мессенджеры обрезают)', () => {
    for (const meta of Object.values(seo.pages)) expect(meta.description.length).toBeLessThan(200)
  })
})
