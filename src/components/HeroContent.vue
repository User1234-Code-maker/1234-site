<script setup lang="ts">
import { computed } from 'vue'
import { useLang } from '../composables/useLang'
import { splitFirstWord } from '../utils/links'
import { techIcons } from '../data/techIcons'

const { t } = useLang()

const h1b = computed(() => splitFirstWord(t('h1b')))
const tagLines = computed(() => t('tag').split('\n'))
</script>

<template>
  <main>
    <p class="eyebrow">
      <span>{{ t('eyebrow') }}</span> <span class="sp" aria-hidden="true">✦</span>
    </p>
    <h1>
      <span>{{ t('h1a') }}</span><br /><span class="h1b"
        ><em>{{ h1b.head }}</em
        >{{ h1b.tail }}</span
      >
    </h1>
    <p class="tag">
      <template v-for="(line, i) in tagLines" :key="i"><br v-if="i > 0" />{{ line }}</template>
    </p>
    <div class="rule"></div>
    <div class="stack">
      <template v-for="s in techIcons" :key="s.name">
        <img :class="{ 'ic-swap': s.dark }" :src="s.src" :alt="s.name" height="34" />
        <img v-if="s.dark" class="ic-dk" :src="s.dark" :alt="s.name" height="34" />
      </template>
    </div>
    <div class="acts">
      <RouterLink class="pill" to="/projects"
        >{{ t('cta_projects') }} <span aria-hidden="true">→</span></RouterLink
      >
      <RouterLink class="listen" to="/music"
        ><b aria-hidden="true">▶</b> <span>{{ t('cta_music') }}</span></RouterLink
      >
    </div>
    <span class="scroll"
      ><u aria-hidden="true"><s></s></u> <span>{{ t('scroll') }}</span></span
    >
  </main>
</template>
