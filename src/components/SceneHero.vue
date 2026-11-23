<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from './AppHeader.vue'
import SceneDecor from './SceneDecor.vue'
import { useCity, type CityMood } from '../composables/useCity'
import cloudA from '../assets/img/cloud-a-xs.webp'
import cloudB from '../assets/img/cloud-b-xs.webp'
import spark from '../assets/img/spark.webp'

// Сцена в начале каждой внутренней страницы: то же небо, облака и город, что на главной,
// но у каждой страницы своя композиция (variant) и своё время суток (mood).
const props = withDefaults(defineProps<{ variant: string; jp?: string; mood?: CityMood }>(), {
  jp: '',
  mood: 'day',
})
const city = useCity(() => props.mood)
// какой декор у какой страницы
const decor = computed(() => {
  const v = props.variant
  if (v.startsWith('about')) return ['wires', 'petals'] as const
  if (v.startsWith('projects')) return ['lanterns', 'petals'] as const
  if (v.startsWith('project')) return ['wires', 'cranes'] as const
  if (v.startsWith('music')) return ['lanterns', 'petals', 'cranes'] as const
  if (v.startsWith('contact')) return ['wires', 'petals'] as const
  return ['petals', 'cranes'] as const
})
const cls = computed(() => [`scene--${props.variant}`, `mood-${props.mood}`])
</script>

<template>
  <section class="scene" :class="cls">
    <div class="sc-layers" aria-hidden="true">
      <div class="sc-sky"></div>
      <picture>
        <source media="(max-width: 700px)" :srcset="city.sm" />
        <img class="sc-city" :src="city.src" alt="" width="2504" height="1376" fetchpriority="high" />
      </picture>
      <img
        class="sc-cloud c1"
        :src="cloudA"
        alt=""
        width="600"
        height="303"
        fetchpriority="low"
        decoding="async"
      />
      <img
        class="sc-cloud c2"
        :src="cloudB"
        alt=""
        width="600"
        height="213"
        fetchpriority="low"
        decoding="async"
      />
      <div class="sc-grid"></div>
      <img
        class="sc-star s1"
        :src="spark"
        alt=""
        width="368"
        height="368"
        fetchpriority="low"
        decoding="async"
      />
      <img
        class="sc-star s2"
        :src="spark"
        alt=""
        width="368"
        height="368"
        fetchpriority="low"
        decoding="async"
      />
      <div class="sc-fade"></div>
    </div>
    <!-- декор вне маски растворения: хорошо виден и в светлой теме -->
    <div class="sc-decor">
      <SceneDecor :items="[...decor]" />
      <slot name="decor" />
    </div>
    <div class="wrap page-top"><AppHeader /></div>
    <div class="wrap sc-body">
      <div class="sc-text"><slot /></div>
      <div v-if="$slots.art" class="sc-art"><slot name="art" /></div>
    </div>
    <span v-if="jp" class="sc-jp" aria-hidden="true"><i class="a"></i>{{ jp }}<i class="b"></i></span>
  </section>
</template>
