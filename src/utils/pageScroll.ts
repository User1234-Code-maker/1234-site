import type { RouterScrollBehavior } from 'vue-router'

type Pos = Exclude<Awaited<ReturnType<RouterScrollBehavior>>, false | void>

// Роутер просит позицию скролла сразу после перехода, но при плавной смене страниц
// старая ещё на экране. Поэтому ждём сигнал pageReady() от <Transition> (или 450 мс).
let pending: (() => void) | null = null

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function pageReady() {
  pending?.()
  pending = null
}

export const pageScroll = (hash: string, saved: { left: number; top: number } | null) =>
  new Promise<Pos>((resolve) => {
    const done = () => {
      if (saved) resolve(saved)
      else if (hash) resolve({ el: hash, top: 90, behavior: reducedMotion() ? 'auto' : 'smooth' })
      else resolve({ top: 0, left: 0 })
    }
    pending = done
    setTimeout(pageReady, 450)
  })
