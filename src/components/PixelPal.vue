<script setup lang="ts">
import sleep from '../assets/pixel/sleep.svg'
import music from '../assets/pixel/music.svg'
import peek from '../assets/pixel/peek.svg'
import heart from '../assets/pixel/heart.svg'
import star from '../assets/pixel/star.svg'
import fish from '../assets/pixel/fish.svg'
import note from '../assets/pixel/note.svg'

// Пиксельные «друзья» котика: декор в стиле сайта. Размер в пикселях арта × scale.
const art = {
  sleep: [sleep, 21, 13],
  music: [music, 18, 14],
  peek: [peek, 16, 11],
  heart: [heart, 7, 6],
  star: [star, 7, 7],
  fish: [fish, 11, 7],
  note: [note, 7, 7],
} as const
const props = withDefaults(defineProps<{ name: keyof typeof art; scale?: number }>(), { scale: 4 })
const a = art[props.name]
</script>

<template>
  <img
    class="pal"
    :class="`pal-${name}`"
    :src="a[0]"
    alt=""
    aria-hidden="true"
    :width="a[1] * scale"
    :height="a[2] * scale"
    loading="lazy"
    decoding="async"
  />
</template>
