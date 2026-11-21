import { computed } from 'vue'
import { useTheme } from './useTheme'
import day from '../assets/img/character.webp'
import daySm from '../assets/img/character-sm.webp'
import night from '../assets/img/character-dark.webp'
import nightSm from '../assets/img/character-dark-sm.webp'

// Персонаж: в тёмной теме версия без белой «наклеечной» обводки (сделана скриптом из того же арта)
export function useCharacter() {
  const { theme } = useTheme()
  return computed(() => (theme.value === 'dark' ? { src: night, sm: nightSm } : { src: day, sm: daySm }))
}
