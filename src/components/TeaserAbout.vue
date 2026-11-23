<script setup lang="ts">
import { useLang } from '../composables/useLang'
import { vReveal } from '../directives/reveal'
import { vTilt } from '../directives/tilt'

const { t } = useLang()
const cards = [
  { icon: '{ }', title: 'a_dev_t', text: 'a_dev_p' },
  { icon: '♪', title: 'a_music_t', text: 'a_music_p' },
]
</script>

<template>
  <section v-reveal class="sec wrap" aria-labelledby="about-title">
    <header class="sec-h">
      <h2 id="about-title">{{ t('a_title') }}</h2>
      <p>{{ t('a_role') }}</p>
    </header>
    <div class="ta-grid">
      <div class="about">
        <p>{{ t('a_text') }}</p>
        <RouterLink class="slink" to="/about"
          ><span>{{ t('a_more') }}</span> <span aria-hidden="true">→</span></RouterLink
        >
      </div>
      <div class="ta-cards stagger">
        <article
          v-for="(c, i) in cards"
          :key="c.title"
          v-tilt
          class="duo-card tilt"
          :class="{ alt: i === 1 }"
          :style="{ '--i': i }"
        >
          <span class="duo-ic" aria-hidden="true">{{ c.icon }}</span>
          <h3>{{ t(c.title) }}</h3>
          <p>{{ t(c.text) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
