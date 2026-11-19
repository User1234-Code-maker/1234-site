import type { Directive } from 'vue'

// Плавное появление блока при прокрутке. Двигаем только opacity/translate.
// При prefers-reduced-motion и без IntersectionObserver блок просто виден.
type RevealEl = HTMLElement & { __io?: IntersectionObserver }

export const vReveal: Directive<RevealEl> = {
  mounted(el) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    el.classList.add('reveal')
    el.__io = new IntersectionObserver(
      (entries, io) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    el.__io.observe(el)
  },
  unmounted(el) {
    el.__io?.disconnect()
  },
}
