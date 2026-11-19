<script setup lang="ts">
import { ref } from 'vue'
import { useParallax } from '../composables/useParallax'
import AppHeader from './AppHeader.vue'
import HeroContent from './HeroContent.vue'
import HeroScene from './HeroScene.vue'

const root = ref<HTMLElement | null>(null)
useParallax(root)
</script>

<template>
  <section ref="root" class="hero">
    <HeroScene />
    <div class="wrap">
      <AppHeader />
      <HeroContent />
    </div>
  </section>
</template>
