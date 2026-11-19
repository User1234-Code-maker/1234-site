import type { Directive } from 'vue'

// Лёгкий 3D-наклон карточки за курсором + блик. Выключен на тач-экранах и при prefers-reduced-motion.
const MAX = 5 // градусов

type TiltEl = HTMLElement & { __tiltOff?: () => void }

export const vTilt: Directive<TiltEl> = {
  mounted(el) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(hover: none)').matches) return
    let raf = 0

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        el.style.setProperty('--ry', `${((x - 0.5) * 2 * MAX).toFixed(2)}deg`)
        el.style.setProperty('--rx', `${((0.5 - y) * 2 * MAX).toFixed(2)}deg`)
        el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
        el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
      })
    }
    const enter = () => el.classList.add('tilting')
    const leave = () => {
      cancelAnimationFrame(raf)
      el.classList.remove('tilting')
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }

    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointermove', move, { passive: true })
    el.addEventListener('pointerleave', leave)
    el.__tiltOff = () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  },
  unmounted(el) {
    el.__tiltOff?.()
  },
}
