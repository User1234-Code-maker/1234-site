<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { srcsets } from '../utils/img'

// Картинка со скелетоном: пока грузится, видно мягкий блок, потом плавное проявление (только opacity).
// Браузер сам берёт AVIF (если умеет) и копию нужного размера (sizes — сколько места картинка занимает на экране).
const props = defineProps<{
  src: string
  width: number
  height: number
  alt?: string
  eager?: boolean
  sizes?: string
}>()
const loaded = ref(false)
const img = ref<HTMLImageElement | null>(null)
const sets = computed(() => srcsets(props.src))
const sz = computed(() => props.sizes ?? '(max-width: 700px) 100vw, 900px')
onMounted(() => {
  if (img.value?.complete && img.value.naturalWidth) loaded.value = true
})
</script>

<template>
  <span class="lazyimg" :class="{ loaded }">
    <picture>
      <source v-if="sets.avif" type="image/avif" :srcset="sets.avif" :sizes="sets.webp ? sz : undefined" />
      <img
        ref="img"
        :src="props.src"
        :srcset="sets.webp"
        :sizes="sets.webp ? sz : undefined"
        :alt="props.alt ?? ''"
        :width="props.width"
        :height="props.height"
        :loading="props.eager ? 'eager' : 'lazy'"
        decoding="async"
        @load="loaded = true"
      />
    </picture>
  </span>
</template>
