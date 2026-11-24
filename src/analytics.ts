// Аналитика без cookie (GoatCounter). Включается только если при сборке задан код счётчика:
// переменная VITE_GOATCOUNTER (в GitHub: Settings → Secrets and variables → Actions → Variables → GOATCOUNTER).
// Без неё ничего не грузится и никуда не отправляется.
import type { Router } from 'vue-router'

type Gc = { count?: (o: { path: string }) => void; no_onload?: boolean }

export function setupAnalytics(router: Router) {
  const code = import.meta.env.VITE_GOATCOUNTER as string | undefined
  if (!code || !/^[a-z0-9-]+$/.test(code)) return
  const w = window as unknown as { goatcounter?: Gc }
  // считаем сами при каждом переходе: у одностраничного сайта нет перезагрузок
  w.goatcounter = { no_onload: true }
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://gc.zgo.at/count.js'
  s.dataset.goatcounter = `https://${code}.goatcounter.com/count`
  document.head.appendChild(s)
  const send = () => w.goatcounter?.count?.({ path: location.pathname })
  s.addEventListener('load', send, { once: true })
  router.afterEach((to, from) => {
    if (to.path !== from.path && from.matched.length) setTimeout(send, 0)
  })
}
