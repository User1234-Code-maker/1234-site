import type { Bi, Lang } from '../data/types'

// Имена собственные (React, SQL...) остаются строкой, переводимое хранится как { ru, en }
export const tx = (v: string | Bi, lang: Lang): string => (typeof v === 'string' ? v : v[lang])
