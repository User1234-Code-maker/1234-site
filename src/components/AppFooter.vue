<script setup lang="ts">
import BrandMark from './BrandMark.vue'
import SocialLinks from './SocialLinks.vue'
import PixelPal from './PixelPal.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="wrap foot">
    <RouterLink class="brand" to="/" aria-label="1234"><BrandMark :size="26" />1234</RouterLink>
    <PixelPal name="sleep" :scale="2" class="foot-pal" />
    <SocialLinks round class="foot-soc" />
    <span class="footmeta">
      <span>© {{ year }} Bogdan Korzun</span>
    </span>
  </footer>
</template>
