import { ref } from 'vue'
import { palPhrases, type PalName } from '../data/pals'

// Одно общее облачко на весь сайт: говорит то существо, по которому кликнули.
// Позиция считается один раз в момент клика, дальше облачко живёт ~2,4 секунды и гаснет.
interface PalBubble {
  text: string
  x: number
  y: number
  id: number
}

const bubble = ref<PalBubble | null>(null)
const turn: Partial<Record<PalName, number>> = {}
let hideTimer = 0
let seq = 0

export function usePalSpeech(t: (key: string) => string) {
  function speak(name: PalName, el: Element) {
    const list = palPhrases[name]
    const n = turn[name] ?? Math.floor(Math.random() * list.length)
    turn[name] = (n + 1) % list.length
    const r = el.getBoundingClientRect()
    // облачко не должно вылезать за экран: держим центр на расстоянии от краёв
    const half = 90
    const x = Math.min(Math.max(r.left + r.width / 2, half), window.innerWidth - half)
    bubble.value = { text: t(list[n]!), x, y: r.top, id: ++seq }
    window.clearTimeout(hideTimer)
    hideTimer = window.setTimeout(() => (bubble.value = null), 2400)
  }
  return { bubble, speak }
}
