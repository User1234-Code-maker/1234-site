<script setup lang="ts">
import { useLang } from '../composables/useLang'
import { usePalSpeech } from '../composables/usePalSpeech'
import ToriiArt from './ToriiArt.vue'

// Японский декор сцены. Всё — векторы и CSS, анимируем только transform/opacity.
// wires — столб и провода (как в аниме-городах), lanterns — гирлянда бумажных фонарей,
// petals — падающие лепестки сакуры, torii — ворота, cranes — бумажные журавлики.
defineProps<{ items: ('wires' | 'lanterns' | 'petals' | 'torii' | 'cranes')[] }>()
const petals = Array.from({ length: 12 }, (_, i) => ({
  x: (i * 37 + 7) % 100,
  d: 13 + ((i * 7) % 9),
  delay: -((i * 2.3) % 18),
  s: 0.7 + ((i * 13) % 6) / 10,
}))
// птичка на проводах и журавлики тоже отвечают на клик (мышью и пальцем; для клавиатуры это просто декор)
const { t } = useLang()
const { speak } = usePalSpeech(t)
const lanternX = [8, 20, 33, 46, 59, 72, 86]
// провисание гирлянды: y = 4 + 26·(1 − ((x − 50)/50)²)
const sag = (x: number) => 4 + 26 * (1 - ((x - 50) / 50) ** 2)
</script>

<template>
  <div class="sd" aria-hidden="true">
    <svg v-if="items.includes('wires')" class="sd-wires" viewBox="0 0 600 360" preserveAspectRatio="none">
      <g class="sd-pole">
        <rect x="520" y="20" width="12" height="340" rx="3" />
        <rect x="478" y="56" width="96" height="8" rx="3" />
        <rect x="490" y="96" width="74" height="7" rx="3" />
        <rect x="500" y="70" width="8" height="10" rx="2" />
        <rect x="548" y="70" width="8" height="10" rx="2" />
      </g>
      <g class="sd-line" fill="none">
        <path d="M484 60 C 330 150, 160 150, -10 96" />
        <path d="M570 60 C 400 170, 200 180, -10 140" />
        <path d="M494 100 C 340 200, 170 210, -10 190" />
        <path d="M560 100 C 400 230, 220 250, -10 236" />
      </g>
      <g class="sd-bird" @click="speak('bird', $event.currentTarget as Element)">
        <rect class="sd-hit" x="240" y="120" width="90" height="30" />
        <path d="M250 133c4-6 9-6 12 0 3-6 8-6 12 0-4-2-8-1-12 3-4-4-8-5-12-3Z" />
        <path d="M300 136c3-5 7-5 10 0 3-5 7-5 10 0-3-2-7-1-10 3-3-4-7-5-10-3Z" />
      </g>
    </svg>
    <svg
      v-if="items.includes('lanterns')"
      class="sd-lanterns"
      viewBox="0 0 100 50"
      preserveAspectRatio="none"
    >
      <path class="sd-string" d="M0 4 Q 50 56 100 4" fill="none" />
    </svg>
    <div v-if="items.includes('lanterns')" class="sd-lanterns-row">
      <span
        v-for="(x, i) in lanternX"
        :key="x"
        class="sd-lantern"
        :style="{ left: `${x}%`, top: `${sag(x) * 2}%`, '--dl': `${-i * 0.7}s` }"
        ><i></i
      ></span>
    </div>
    <ToriiArt v-if="items.includes('torii')" />
    <template v-if="items.includes('cranes')">
      <svg
        v-for="n in 2"
        :key="n"
        class="sd-crane"
        :class="`c${n}`"
        viewBox="0 0 60 40"
        @click="speak('crane', $event.currentTarget as Element)"
      >
        <path d="M2 24 30 18 58 4 40 22 52 30 30 26 18 38 20 26Z" />
        <path class="fold" d="M30 18 40 22 30 26Z" />
      </svg>
    </template>
    <template v-if="items.includes('petals')">
      <span
        v-for="(p, i) in petals"
        :key="i"
        class="sd-petal"
        :style="{ left: `${p.x}%`, '--d': `${p.d}s`, '--dl': `${p.delay}s`, '--s': p.s }"
      ></span>
    </template>
  </div>
</template>
