<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Картинка со скелетоном: пока грузится, видно мягкий блок, потом плавное проявление (только opacity).
const props = defineProps<{ src: string; width: number; height: number; alt?: string; eager?: boolean }>()
const loaded = ref(false)
const img = ref<HTMLImageElement | null>(null)
onMounted(() => {
  if (img.value?.complete && img.value.naturalWidth) loaded.value = true
})
</script>

<template>
  <span class="lazyimg" :class="{ loaded }">
    <img
      ref="img"
      :src="props.src"
      :alt="props.alt ?? ''"
      :width="props.width"
      :height="props.height"
      :loading="props.eager ? 'eager' : 'lazy'"
      decoding="async"
      @load="loaded = true"
    />
  </span>
</template>
