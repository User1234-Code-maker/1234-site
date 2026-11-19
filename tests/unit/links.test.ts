import { describe, expect, it } from 'vitest'
import { hrefFor, isExternal, splitFirstWord } from '../../src/utils/links'
import { site } from '../../src/data/site'

describe('links', () => {
  it('mail собирается в mailto', () => {
    expect(hrefFor('mail')).toBe(`mailto:${site.contacts.email}`)
  })
  it('внешние ссылки открываются в новой вкладке, mailto — нет', () => {
    expect(isExternal('github')).toBe(true)
    expect(isExternal('mail')).toBe(false)
  })
  it('splitFirstWord делит по первому пробелу', () => {
    expect(splitFirstWord('& Musician')).toEqual({ head: '&', tail: ' Musician' })
    expect(splitFirstWord('Один')).toEqual({ head: 'Один', tail: '' })
  })
})
