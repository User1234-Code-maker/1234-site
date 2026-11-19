<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Рендерит содержимое (и подгружает его код), когда блок подъехал к экрану.
// Пока блок пустой, держим min-height, чтобы страница не прыгала.
const props = defineProps<{ id: string; minHeight: number }>()

const root = ref<HTMLElement | null>(null)
const visible = ref(false)
let io: IntersectionObserver | null = null

onMounted(() => {
  // без IntersectionObserver (старые браузеры, тесты) показываем сразу
  if (!('IntersectionObserver' in window)) {
    visible.value = true
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        visible.value = true
        io?.disconnect()
      }
    },
    { rootMargin: '700px 0px' },
  )
  if (root.value) io.observe(root.value)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div
    :id="props.id"
    ref="root"
    class="lazy"
    :style="visible ? undefined : { minHeight: `${props.minHeight}px` }"
  >
    <slot v-if="visible" />
  </div>
</template>
