<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppFooter from './components/AppFooter.vue'
import HeroSection from './components/HeroSection.vue'
import LazySection from './components/LazySection.vue'

// секции ниже первого экрана: свой кусок кода, грузится когда блок подъезжает к экрану
const ProjectsSection = defineAsyncComponent(() => import('./components/ProjectsSection.vue'))
const SkillsSection = defineAsyncComponent(() => import('./components/SkillsSection.vue'))
const MusicSection = defineAsyncComponent(() => import('./components/MusicSection.vue'))
const ExperienceSection = defineAsyncComponent(() => import('./components/ExperienceSection.vue'))
const AboutSection = defineAsyncComponent(() => import('./components/AboutSection.vue'))
const ContactSection = defineAsyncComponent(() => import('./components/ContactSection.vue'))
</script>

<template>
  <HeroSection />
  <div class="rest">
    <div class="rest-grid" aria-hidden="true"></div>
    <div class="orb o1" aria-hidden="true"></div>
    <div class="orb o2" aria-hidden="true"></div>
    <div class="orb o3" aria-hidden="true"></div>
    <LazySection id="projects" :min-height="1100"><ProjectsSection /></LazySection>
    <LazySection id="skills" :min-height="520"><SkillsSection /></LazySection>
    <LazySection id="music" :min-height="620"><MusicSection /></LazySection>
    <LazySection id="experience" :min-height="620"><ExperienceSection /></LazySection>
    <LazySection id="about" :min-height="640"><AboutSection /></LazySection>
    <LazySection id="contact" :min-height="360"><ContactSection /></LazySection>
    <AppFooter />
  </div>
</template>
