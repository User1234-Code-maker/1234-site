<script setup lang="ts">
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import WorldBackdrop from './WorldBackdrop.vue'
defineProps<{ tone?: 'music' }>()
</script>

<template>
  <div class="page" :class="tone && `tone-${tone}`">
    <WorldBackdrop />
    <div class="wrap page-top"><AppHeader /></div>
    <main id="main" class="page-main"><slot /></main>
    <AppFooter />
  </div>
</template>
