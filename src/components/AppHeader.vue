<script setup lang="ts">
import { useLang } from '../composables/useLang'
import { hrefFor } from '../utils/links'
import LangSwitch from './LangSwitch.vue'
import SocialLinks from './SocialLinks.vue'

const { t } = useLang()
</script>

<template>
  <header>
    <span class="brand"><span class="sp" aria-hidden="true">✦</span>1234</span>
    <nav aria-label="Main">
      <a href="#about" aria-current="page">{{ t('nav_about') }}</a>
      <a href="#projects">{{ t('nav_projects') }}</a>
      <a href="#music">{{ t('nav_music') }}</a>
      <a href="#contact">{{ t('nav_contact') }}</a>
    </nav>
    <div class="right">
      <SocialLinks />
      <LangSwitch />
      <a class="pill" :href="hrefFor('mail')">{{ t('talk') }}</a>
    </div>
  </header>
</template>
