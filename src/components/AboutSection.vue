<script setup lang="ts">
import { useLang } from '../composables/useLang'

const { t } = useLang()
</script>

<template>
  <section id="about" class="sec wrap" aria-labelledby="about-title">
    <header class="sec-h">
      <h2 id="about-title">{{ t('a_title') }}</h2>
    </header>
    <div class="about">
      <p>{{ t('a_text') }}</p>
      <span class="avail"
        ><i></i><span>{{ t('a_open') }}</span></span
      >
    </div>
  </section>
</template>
