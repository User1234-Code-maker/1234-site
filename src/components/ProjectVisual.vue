<script setup lang="ts">
import { computed } from 'vue'
import type { Project, Visual } from '../data/types'
import { srcsets } from '../utils/img'

// Образ проекта. Есть обложка — показываем её; нет (NDA) — рисуем абстрактную иллюстрацию
// по типу проекта: окно с таблицами для ERP, чат и плитки mini app для ботов,
// карточки кампаний для платформы и звуковая дорожка для распознавания музыки.
// Никаких выдуманных данных: только формы, без текста.
const props = withDefaults(defineProps<{ project: Project; eager?: boolean; sizes?: string }>(), {
  eager: false,
  sizes: '(max-width: 700px) 100vw, 60vw',
})
// AVIF и копия на 800 px для карточек (браузер выберет сам)
const sets = computed(() =>
  props.project.cover ? srcsets(props.project.cover) : { webp: undefined, avif: undefined },
)
// высоты столбиков звуковой дорожки: детерминированно, чтобы картинка не прыгала между загрузками
const bars = Array.from({ length: 22 }, (_, i) => 24 + ((i * 37) % 62))
// иллюстрацию можно задать в данных проекта, иначе её выбирает категория
const kind = computed<Visual>(
  () => props.project.visual ?? (props.project.category === 'erp' ? 'erp' : 'bots'),
)
</script>

<template>
  <div class="pv" :class="`pv-${project.category}`" :style="{ '--h': project.hue }">
    <picture v-if="project.cover" class="pv-pic">
      <source v-if="sets.avif" type="image/avif" :srcset="sets.avif" :sizes="sets.webp ? sizes : undefined" />
      <img
        class="pv-img"
        :src="project.cover"
        :srcset="sets.webp"
        :sizes="sets.webp ? sizes : undefined"
        alt=""
        width="1600"
        height="760"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        decoding="async"
      />
    </picture>
    <div v-else-if="kind === 'erp'" class="pv-art pv-erp" aria-hidden="true">
      <div class="erp-win">
        <div class="erp-bar"><i></i><i></i><i></i></div>
        <div class="erp-side"><b></b><b></b><b class="on"></b><b></b><b></b></div>
        <div class="erp-main">
          <div class="erp-tools"><b></b><b></b><b class="acc"></b></div>
          <div class="erp-head"><b></b><b></b><b></b><b></b></div>
          <div v-for="n in 6" :key="n" class="erp-row" :class="{ sel: n === 3 }">
            <b></b><b></b><b></b><b></b>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="kind === 'platform'" class="pv-art pv-plat" aria-hidden="true">
      <div class="plt-win">
        <div class="erp-bar"><i></i><i></i><i></i></div>
        <div class="plt-body">
          <div v-for="n in 3" :key="n" class="plt-card" :class="`c${n}`">
            <b class="plt-cover"></b>
            <b class="plt-line"></b>
            <b class="plt-line short"></b>
            <span class="plt-bar"><i></i></span>
          </div>
        </div>
      </div>
      <div class="plt-coin"><b></b><b></b></div>
    </div>
    <div v-else-if="kind === 'wave'" class="pv-art pv-wave" aria-hidden="true">
      <div class="wv-card">
        <div class="wv-bars"><i v-for="(h, n) in bars" :key="n" :style="{ height: `${h}%` }"></i></div>
        <div class="wv-result">
          <b class="wv-art"></b><span><b></b><b class="short"></b></span>
        </div>
      </div>
      <div class="wv-chips"><b></b><b></b><b></b></div>
    </div>
    <div v-else class="pv-art pv-bots" aria-hidden="true">
      <div class="bot-phone">
        <div class="bot-top"><i></i><b></b></div>
        <div class="bot-msg in"></div>
        <div class="bot-msg out"></div>
        <div class="bot-msg in short"></div>
        <div class="bot-keys"><b></b><b></b><b></b><b></b></div>
      </div>
      <div class="bot-app"><b></b><b></b><b></b><b></b></div>
    </div>
  </div>
</template>
