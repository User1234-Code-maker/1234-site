import { nextTick, ref, watchEffect } from 'vue'
import { site, type Lang } from '../data/site'

const STORAGE_KEY = 'lang'

function readSaved(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'ru' || v === 'en') return v
  } catch {
    /* localStorage может быть недоступен — не страшно */
  }
  return 'en'
}

// одно общее состояние языка на всё приложение
const lang = ref<Lang>(readSaved())

watchEffect(() => {
  document.documentElement.lang = lang.value
  try {
    localStorage.setItem(STORAGE_KEY, lang.value)
  } catch {
    /* ignore */
  }
})

export function useLang() {
  const t = (key: string): string => site.t[lang.value][key] ?? key
  // Смена языка без скачка: страница плавно растворяется и проявляется уже на новом языке.
  // View Transitions (Chrome, Safari) делают снимок и сводят старое с новым; без них короткий fade.
  const setLang = (l: Lang) => {
    if (l === lang.value) return
    const root = document.documentElement
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lang.value = l
      return
    }
    const vt = (
      document as Document & {
        startViewTransition?: (cb: () => Promise<void>) => { finished: Promise<void> }
      }
    ).startViewTransition
    if (typeof vt === 'function') {
      root.classList.add('lang-vt')
      vt.call(document, async () => {
        lang.value = l
        await nextTick()
      }).finished.finally(() => root.classList.remove('lang-vt'))
    } else {
      root.classList.add('lang-swap')
      window.setTimeout(() => {
        lang.value = l
        nextTick().then(() => requestAnimationFrame(() => root.classList.remove('lang-swap')))
      }, 170)
    }
  }
  return { lang, t, setLang }
}
