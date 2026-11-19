<script setup lang="ts">
import { useLang } from '../composables/useLang'

const { t } = useLang()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="wrap foot">
    <span class="brand"><span class="sp" aria-hidden="true">✦</span>1234</span>
    <span class="footmeta">
      <span>{{ t('foot') }}</span>
      <span>© {{ year }} Bogdan Korzun</span>
    </span>
  </footer>
</template>
