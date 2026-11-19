<script setup lang="ts">
import { site } from '../data/site'
import { useLang } from '../composables/useLang'

const { lang, t } = useLang()
</script>

<template>
  <section id="projects" class="sec wrap" aria-labelledby="projects-title">
    <header class="sec-h">
      <h2 id="projects-title">{{ t('p_title') }}</h2>
      <p>{{ t('p_sub') }}</p>
    </header>
    <div class="cards">
      <article v-for="p in site.projects" :key="p.title" class="card">
        <div class="thumb"><img :src="p.cover" alt="" loading="lazy" width="870" height="231" /></div>
        <div class="body">
          <h3>{{ p.title }}</h3>
          <p>{{ p[lang] }}</p>
          <div class="chips">
            <span v-for="tech in p.tech" :key="tech">{{ tech }}</span>
          </div>
          <div class="links">
            <a v-if="p.demo" class="solid" :href="p.demo" target="_blank" rel="noopener">{{ t('p_demo') }}</a>
            <a v-if="p.repo" :href="p.repo" target="_blank" rel="noopener">{{ t('p_repo') }}</a>
          </div>
        </div>
      </article>
      <article class="card soon">{{ t('p_soon') }}</article>
    </div>
  </section>
</template>
