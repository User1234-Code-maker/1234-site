<script setup lang="ts">
import { useLang } from '../composables/useLang'
import { hrefFor, isExternal } from '../utils/links'
import cover from '../assets/img/cover-music.webp'

const { t } = useLang()

// декоративная «волна» плеера
const bars = Array.from({ length: 48 }, (_, i) => {
  const h = Math.min(4 + Math.abs(Math.sin(i * 0.9)) * 16 + ((i * 37) % 7), 22)
  return { x: i * 5, y: (24 - h) / 2, h, played: i < 18 }
})
const sc = { href: hrefFor('soundcloud'), external: isExternal('soundcloud') }
</script>

<template>
  <section id="music" class="sec wrap" aria-labelledby="music-title">
    <header class="sec-h">
      <h2 id="music-title">{{ t('m_title') }}</h2>
      <p>{{ t('m_sub') }}</p>
    </header>
    <div class="player">
      <span class="cover"><img :src="cover" alt="" width="774" height="231" loading="lazy" /></span>
      <span class="meta">
        <b>{{ t('m_name') }}</b>
        <i>{{ t('m_genre') }}</i>
        <svg class="wave" viewBox="0 0 240 24" aria-hidden="true">
          <rect
            v-for="b in bars"
            :key="b.x"
            :x="b.x"
            :y="b.y"
            width="3"
            :height="b.h"
            rx="1.5"
            :fill="b.played ? '#6B5BD6' : '#AEB6E8'"
          />
        </svg>
      </span>
      <a
        class="play"
        :href="sc.href"
        aria-label="SoundCloud"
        :target="sc.external ? '_blank' : undefined"
        :rel="sc.external ? 'noopener' : undefined"
        ><span aria-hidden="true">▶</span></a
      >
    </div>
    <a
      class="slink"
      :href="sc.href"
      :target="sc.external ? '_blank' : undefined"
      :rel="sc.external ? 'noopener' : undefined"
      ><span>{{ t('m_listen') }}</span> <span aria-hidden="true">→</span></a
    >
  </section>
</template>
