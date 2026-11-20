<script setup lang="ts">
import { projects } from '../data/projects'
import { useLang } from '../composables/useLang'
import { vReveal } from '../directives/reveal'
import ProjectCard from './ProjectCard.vue'

const { t } = useLang()
const featured = projects.filter((p) => p.featured).slice(0, 3)
</script>

<template>
  <section v-reveal class="sec wrap" aria-labelledby="projects-title">
    <header class="sec-h">
      <h2 id="projects-title">{{ t('p_title') }}</h2>
      <p>{{ t('p_sub') }}</p>
    </header>
    <div class="cards stagger">
      <ProjectCard v-for="(p, i) in featured" :key="p.slug" :project="p" :index="i" />
    </div>
    <RouterLink class="slink" to="/projects"
      ><span>{{ t('p_all') }}</span> <span aria-hidden="true">→</span></RouterLink
    >
  </section>
</template>
