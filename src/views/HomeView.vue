<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppFooter from '../components/AppFooter.vue'
import HeroSection from '../components/HeroSection.vue'
import LazySection from '../components/LazySection.vue'
import WorldBackdrop from '../components/WorldBackdrop.vue'

// блоки ниже первого экрана: свой кусок кода, грузится когда блок подъезжает к экрану
const TeaserProjects = defineAsyncComponent(() => import('../components/TeaserProjects.vue'))
const TeaserMusic = defineAsyncComponent(() => import('../components/TeaserMusic.vue'))
const TeaserAbout = defineAsyncComponent(() => import('../components/TeaserAbout.vue'))
const TeaserContact = defineAsyncComponent(() => import('../components/TeaserContact.vue'))
</script>

<template>
  <div class="home">
    <HeroSection />
    <div class="rest">
      <WorldBackdrop />
      <LazySection id="projects" :min-height="900"><TeaserProjects /></LazySection>
      <LazySection id="music" :min-height="620"><TeaserMusic /></LazySection>
      <LazySection id="about" :min-height="520"><TeaserAbout /></LazySection>
      <LazySection id="contact" :min-height="360"><TeaserContact /></LazySection>
      <AppFooter />
    </div>
  </div>
</template>
