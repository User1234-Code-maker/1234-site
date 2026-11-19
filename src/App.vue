<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from './composables/useReveal'
import AboutSection from './components/AboutSection.vue'
import AppFooter from './components/AppFooter.vue'
import ContactSection from './components/ContactSection.vue'
import HeroSection from './components/HeroSection.vue'
import MusicSection from './components/MusicSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'

const rest = ref<HTMLElement | null>(null)
useReveal(rest)
</script>

<template>
  <HeroSection />
  <div ref="rest" class="rest">
    <div class="rest-grid" aria-hidden="true"></div>
    <ProjectsSection />
    <MusicSection />
    <AboutSection />
    <ContactSection />
    <AppFooter />
  </div>
</template>
