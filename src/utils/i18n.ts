import type { Bi, Lang } from '../data/types'
import { typoRu } from './typo'

// Имена собственные (React, SQL...) остаются строкой, переводимое хранится как { ru, en }.
// Русский текст проходит типографику: короткие слова не повисают в конце строки.
export const tx = (v: string | Bi, lang: Lang): string => {
  const s = typeof v === 'string' ? v : v[lang]
  return lang === 'ru' ? typoRu(s) : s
}
