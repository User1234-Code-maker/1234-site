// Лёгкие версии картинок (их готовит npm run images): AVIF рядом с webp и уменьшенные копии -w800.
// По адресу webp-картинки находим её AVIF и маленькую копию, чтобы браузер сам выбрал самую лёгкую.
import sizes from '../data/imgsizes.json'

const webp = import.meta.glob<string>('../assets/img/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})
const avif = import.meta.glob<string>('../assets/img/*.avif', {
  eager: true,
  query: '?url',
  import: 'default',
})

type Variant = { avif?: string; w800?: string; w800avif?: string; width?: number }
const byUrl = new Map<string, Variant>()
for (const [p, url] of Object.entries(webp)) {
  if (p.includes('-w800')) continue
  const base = p.replace(/\.webp$/, '')
  const name = base.split('/').pop() ?? ''
  byUrl.set(url, {
    avif: avif[base + '.avif'],
    w800: webp[base + '-w800.webp'],
    w800avif: avif[base + '-w800.avif'],
    width: (sizes as Record<string, number>)[name],
  })
}

/** AVIF-версия картинки, если она есть и заметно легче */
export const avifOf = (url: string) => byUrl.get(url)?.avif

/** srcset для webp и avif: полная картинка и копия на 800 px (если есть) */
export function srcsets(url: string) {
  const v = byUrl.get(url)
  if (!v?.w800 || !v.width) return { webp: undefined, avif: v?.avif }
  return {
    webp: `${v.w800} 800w, ${url} ${v.width}w`,
    avif: v.avif ? `${v.w800avif ?? v.w800} 800w, ${v.avif} ${v.width}w` : undefined,
  }
}
