<script setup lang="ts">
import { ref, watch } from 'vue'
import { reducedMotion } from '../utils/pageScroll'

// Занавес при смене страницы: светлая панель с сеткой проезжает слева направо.
// Страница меняется, пока панель закрывает экран. Под reduced-motion не показывается.
const props = defineProps<{ trigger: number }>()
const run = ref(false)

watch(
  () => props.trigger,
  () => {
    if (reducedMotion()) return
    run.value = false
    requestAnimationFrame(() => (run.value = true))
  },
)
</script>

<template>
  <div class="veil" :class="{ run }" aria-hidden="true" @animationend="run = false">
    <i></i>
  </div>
</template>
