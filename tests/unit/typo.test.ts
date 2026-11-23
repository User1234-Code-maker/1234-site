import { describe, expect, it } from 'vitest'
import { typoRu } from '../../src/utils/typo'

const NB = ' '

describe('typoRu', () => {
  it('приклеивает короткие слова к следующему', () => {
    expect(typoRu('Работаю в команде и пишу код')).toBe(`Работаю в${NB}команде и${NB}пишу код`)
  })
  it('не даёт тире остаться в начале строки', () => {
    expect(typoRu('Сайт — это просто')).toBe(`Сайт${NB}— это${NB}просто`)
  })
  it('склеивает число с единицей', () => {
    expect(typoRu('до 15 млн ₽ в 2026 г.')).toBe(`до${NB}15${NB}млн${NB}₽ в${NB}2026${NB}г.`)
  })
  it('не трогает пустые строки и английский', () => {
    expect(typoRu('')).toBe('')
    expect(typoRu('in a team')).toBe('in a team')
  })
})
