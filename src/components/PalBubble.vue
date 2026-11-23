<script setup lang="ts">
import { useLang } from '../composables/useLang'
import { usePalSpeech } from '../composables/usePalSpeech'

// Облачко речи для пиксельных друзей. Всегда одно, поэтому лежит в App.vue.
const { t } = useLang()
const { bubble } = usePalSpeech(t)
</script>

<template>
  <span
    v-if="bubble"
    :key="bubble.id"
    class="pal-say"
    role="status"
    :style="{ left: `${bubble.x}px`, top: `${bubble.y}px` }"
    >{{ bubble.text }}</span
  >
</template>
