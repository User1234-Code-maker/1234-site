<script setup lang="ts">
import capUrl from '../assets/brand/cap.svg'

// Фирменный знак 1234: синяя шапочка с ушками (по арту персонажа)
withDefaults(defineProps<{ size?: number }>(), { size: 30 })
</script>

<template>
  <img class="mark" :src="capUrl" alt="" :width="size" :height="size" decoding="async" />
</template>
