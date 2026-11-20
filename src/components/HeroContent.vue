<script setup lang="ts">
import { computed } from 'vue'
import { useLang } from '../composables/useLang'
import { splitFirstWord } from '../utils/links'
import icTs from '../assets/img/ic-ts.webp'
import icReact from '../assets/img/ic-react.webp'
import icNode from '../assets/img/ic-node.webp'
import icPg from '../assets/img/ic-pg.webp'
import icPrisma from '../assets/img/ic-prisma.webp'
import icRedis from '../assets/img/ic-redis.webp'

const { t } = useLang()

const stack = [
  { name: 'TypeScript', src: icTs },
  { name: 'React', src: icReact },
  { name: 'Node.js', src: icNode },
  { name: 'PostgreSQL', src: icPg },
  { name: 'Prisma', src: icPrisma },
  { name: 'Redis', src: icRedis },
]

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
      <img v-for="s in stack" :key="s.name" :src="s.src" :alt="s.name" height="34" />
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
