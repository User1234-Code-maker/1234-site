import { describe, expect, it, vi } from 'vitest'
import { palPhrases } from '../../src/data/pals'
import { usePalSpeech } from '../../src/composables/usePalSpeech'

const el = {
  getBoundingClientRect: () => ({ left: 100, top: 200, width: 20, height: 10 }),
} as unknown as Element

describe('usePalSpeech', () => {
  it('отвечает по очереди своими фразами и гаснет через пару секунд', () => {
    vi.useFakeTimers()
    const { bubble, speak } = usePalSpeech((k) => k)
    speak('fish', el)
    const first = bubble.value?.text
    expect(palPhrases.fish).toContain(first)
    speak('fish', el)
    expect(bubble.value?.text).not.toBe(first)
    expect(bubble.value?.x).toBe(110)
    vi.advanceTimersByTime(2500)
    expect(bubble.value).toBeNull()
    vi.useRealTimers()
  })

  it('у каждого существа есть три реплики', () => {
    for (const list of Object.values(palPhrases)) expect(list).toHaveLength(3)
  })
})
