<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { reducedMotion } from '../utils/pageScroll'
// «Единый мир»: тот же фон, что под Hero на главной. Сетка, световые пятна, далёкие облака
// и еле заметный силуэт города. Один компонент на все страницы, чтобы они читались как одно место.
import cloudA from '../assets/img/cloud-a-sm.webp'
import cloudB from '../assets/img/cloud-b-sm.webp'
import cityUrl from '../assets/img/city-sm.webp'
import sparkUrl from '../assets/img/spark.webp'

// единая переменная прокрутки --sy для лёгкого параллакса облаков (только translate, без перерисовки)
const root = ref<HTMLElement | null>(null)
let raf = 0
const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    root.value?.style.setProperty('--sy', String(Math.round(window.scrollY)))
  })
}
onMounted(() => {
  if (!reducedMotion()) window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="root" class="world" aria-hidden="true">
    <div class="rest-grid"></div>
    <div class="aurora">
      <i class="ab a1"></i><i class="ab a2"></i><i class="ab a3"></i> <i class="ab a4"></i
      ><i class="ab a5"></i><i class="ab a6"></i>
    </div>
    <div class="shimmer"></div>
    <div class="orb o1"></div>
    <div class="orb o2"></div>
    <div class="orb o3"></div>
    <span class="drift dr1"
      ><img class="w-cloud" :src="cloudA" alt="" width="749" height="378" loading="lazy" decoding="async"
    /></span>
    <span class="drift dr2"
      ><img class="w-cloud" :src="cloudB" alt="" width="770" height="273" loading="lazy" decoding="async"
    /></span>
    <span class="drift dr3"
      ><img class="w-cloud" :src="cloudA" alt="" width="749" height="378" loading="lazy" decoding="async"
    /></span>
    <img class="w-city" :src="cityUrl" alt="" loading="lazy" decoding="async" />
    <i class="twk" style="--x: 6%; --y: 12%; --dl: 0s"></i>
    <i class="twk" style="--x: 18%; --y: 30%; --dl: 1.2s"></i>
    <i class="twk" style="--x: 33%; --y: 8%; --dl: 2.1s"></i>
    <i class="twk" style="--x: 47%; --y: 22%; --dl: 0.6s"></i>
    <i class="twk" style="--x: 61%; --y: 14%; --dl: 1.7s"></i>
    <i class="twk" style="--x: 76%; --y: 27%; --dl: 0.3s"></i>
    <i class="twk" style="--x: 88%; --y: 10%; --dl: 2.6s"></i>
    <i class="twk" style="--x: 12%; --y: 44%; --dl: 1.1s"></i>
    <i class="twk" style="--x: 40%; --y: 52%; --dl: 2.3s"></i>
    <i class="twk" style="--x: 68%; --y: 48%; --dl: 0.8s"></i>
    <i class="twk" style="--x: 84%; --y: 60%; --dl: 1.9s"></i>
    <i class="twk" style="--x: 25%; --y: 68%; --dl: 0.2s"></i>
    <i class="twk" style="--x: 55%; --y: 75%; --dl: 2.8s"></i>
    <i class="twk" style="--x: 92%; --y: 82%; --dl: 1.4s"></i>
    <i class="twk" style="--x: 8%; --y: 88%; --dl: 2.2s"></i>
    <i class="twk" style="--x: 72%; --y: 92%; --dl: 0.9s"></i>
    <img class="w-star ws1" :src="sparkUrl" alt="" width="368" height="368" loading="lazy" decoding="async" />
    <img class="w-star ws2" :src="sparkUrl" alt="" width="368" height="368" loading="lazy" decoding="async" />
  </div>
</template>
