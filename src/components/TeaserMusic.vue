<script setup lang="ts">
import { releases } from '../data/music'
import { useLang } from '../composables/useLang'
import { vReveal } from '../directives/reveal'
import { vTilt } from '../directives/tilt'
import ReleaseCover from './ReleaseCover.vue'
import cover from '../assets/img/cover-music.webp'

const { t } = useLang()
const first = releases[0]!
</script>

<template>
  <section v-reveal class="sec wrap" aria-labelledby="music-title">
    <header class="sec-h">
      <h2 id="music-title">{{ t('m_title') }}</h2>
      <p>{{ t('m_sub') }}</p>
    </header>
    <RouterLink v-tilt class="player tilt teaser-player" to="/music">
      <span class="disc-wrap" aria-hidden="true">
        <span class="disc"></span>
        <span class="cover"
          ><img :src="cover" alt="" width="1032" height="308" loading="lazy" decoding="async"
        /></span>
      </span>
      <span class="meta">
        <b>{{ t('m_name') }}</b>
        <i>{{ t('m_genre') }}</i>
        <span class="mini-cover"><ReleaseCover :release="first" /></span>
      </span>
      <span class="play" aria-hidden="true">▶</span>
    </RouterLink>
    <RouterLink class="slink" to="/music"
      ><span>{{ t('m_all_releases') }}</span> <span aria-hidden="true">→</span></RouterLink
    >
  </section>
</template>
