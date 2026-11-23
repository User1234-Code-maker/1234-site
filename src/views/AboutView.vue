<script setup lang="ts">
import { computed, ref } from 'vue'
import PageShell from '../components/PageShell.vue'
import SceneEyebrow from '../components/SceneEyebrow.vue'
import UiIcon from '../components/UiIcon.vue'
import TrackWave from '../components/TrackWave.vue'
import PixelPal from '../components/PixelPal.vue'
import { useLang } from '../composables/useLang'
import { toggle, usePlayer } from '../composables/usePlayer'
import { jobs, milestones, services, skills } from '../data/about'
import { releases } from '../data/music'
import { tx } from '../utils/i18n'
import { vReveal } from '../directives/reveal'
import { useCharacter } from '../composables/useCharacter'
import cloudFront from '../assets/img/cloud-a-xs.webp'
import cloudFront2 from '../assets/img/cloud-b-xs.webp'
import { techIcons } from '../data/techIcons'

const { lang, t } = useLang()
const chara = useCharacter()

const cvHref = computed(
  () => `${import.meta.env.BASE_URL}cv/Bogdan-Korzun-CV-${lang.value === 'ru' ? 'RU' : 'EN'}.pdf`,
)
const serviceIcons = ['code', 'layers', 'grid', 'note'] as const

// путь: открыт последний этап
const step = ref(milestones.length - 1)

// мини-плеер альбома прямо на странице
const album = releases.find((r) => r.kind === 'album') ?? releases[0]!
const player = usePlayer()
const albumPlaying = computed(() => player.release?.id === album.id && player.playing)
const playAlbum = () => toggle(album, player.release?.id === album.id ? player.index : 0)
</script>

<template>
  <PageShell name="about" jp="自己紹介">
    <template #hero>
      <SceneEyebrow :text="t('eyebrow')" />
      <h1 class="sc-title">{{ t('a_hi') }}</h1>
      <p class="sc-lead">{{ t('a_role') }}</p>
      <div class="sc-actions">
        <a class="pill cv-btn" :href="cvHref" download
          >{{ t('a_cv') }} <UiIcon name="download" :size="18"
        /></a>
      </div>
    </template>
    <template #art>
      <div class="ab-art">
        <span class="ab-halo" aria-hidden="true"></span>
        <picture>
          <source media="(max-width: 700px)" :srcset="chara.sm" />
          <img class="ab-char" :src="chara.src" alt="" width="2664" height="1872" fetchpriority="high" />
        </picture>
        <!-- облака перед низом персонажа: он «выходит» из неба, а не висит обрезанной фоткой -->
        <img class="ab-cloud a" :src="cloudFront" alt="" width="600" height="303" decoding="async" />
        <img class="ab-cloud b" :src="cloudFront2" alt="" width="600" height="213" decoding="async" />
      </div>
    </template>

    <!-- кто я: крупный текст и две стороны -->
    <section class="wrap blk ab-story" aria-labelledby="story-t">
      <div v-reveal class="ab-story-text">
        <h2 id="story-t" class="blk-kicker">{{ t('a_story_t') }}</h2>
        <p class="ab-big">{{ t('a_text') }}</p>
      </div>
      <div class="ab-sides stagger">
        <RouterLink v-reveal to="/projects" class="side-card glass" style="--i: 0">
          <span class="side-ic"><UiIcon name="code" :size="26" /></span>
          <h3>{{ t('a_dev_t') }}</h3>
          <p>{{ t('a_dev_p') }}</p>
          <span class="side-go">{{ t('p_title') }} <UiIcon name="arrow" :size="18" /></span>
        </RouterLink>
        <RouterLink v-reveal to="/music" class="side-card glass alt" style="--i: 1">
          <span class="side-ic"><UiIcon name="note" :size="26" /></span>
          <h3>{{ t('a_music_t') }}</h3>
          <p>{{ t('a_music_p') }}</p>
          <span class="side-go">{{ t('m_title') }} <UiIcon name="arrow" :size="18" /></span>
          <PixelPal name="note" :scale="4" class="pal-corner" />
        </RouterLink>
      </div>
    </section>

    <!-- путь: горизонтальная шкала, этапы кликабельны -->
    <section v-reveal class="wrap blk" aria-labelledby="path-t">
      <h2 id="path-t" class="blk-h">{{ t('a_tl_t') }}</h2>
      <p class="blk-hint">{{ t('a_tl_hint') }}</p>
      <div class="path" :style="{ '--fill': (step + 0.5) / milestones.length }">
        <div class="path-track" aria-hidden="true"><i></i></div>
        <div class="path-steps" role="tablist" :aria-label="t('a_tl_t')">
          <button
            v-for="(m, i) in milestones"
            :id="`ms-tab-${i}`"
            :key="m.year"
            type="button"
            role="tab"
            :class="{ on: step === i, past: i < step }"
            :aria-selected="step === i"
            aria-controls="ms-panel"
            @click="step = i"
          >
            <span class="path-dot" aria-hidden="true"></span>
            <span class="path-year">{{ m.year }}</span>
            <span class="path-title">{{ tx(m.title, lang) }}</span>
          </button>
        </div>
        <Transition name="swap" mode="out-in">
          <div
            id="ms-panel"
            :key="step"
            class="path-panel glass"
            role="tabpanel"
            :aria-labelledby="`ms-tab-${step}`"
          >
            <PixelPal name="sleep" :scale="3" class="pal-on-panel" />
            <span class="path-panel-y" aria-hidden="true">{{ milestones[step]!.year }}</span>
            <div>
              <h3>{{ tx(milestones[step]!.title, lang) }}</h3>
              <p>{{ tx(milestones[step]!.text, lang) }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- технологии и навыки -->
    <section v-reveal class="wrap blk" aria-labelledby="skills-t">
      <div class="ab-skills-head">
        <h2 id="skills-t" class="blk-h">{{ t('a_skills_t') }}</h2>
        <ul class="tech-tiles stagger" :aria-label="t('a_stack_t')">
          <li v-for="(s, i) in techIcons" :key="s.name" class="tech-tile" :style="{ '--i': i }">
            <img
              :class="{ 'ic-swap': s.dark }"
              :src="s.src"
              :alt="s.name"
              width="34"
              height="34"
              loading="lazy"
              decoding="async"
            />
            <img
              v-if="s.dark"
              class="ic-dk"
              :src="s.dark"
              :alt="s.name"
              width="34"
              height="34"
              loading="lazy"
              decoding="async"
            />
            <span>{{ s.name }}</span>
          </li>
        </ul>
      </div>
      <!-- все группы сразу, компактной сеткой: без вкладок и пустот -->
      <div class="skill-grid stagger">
        <article v-for="(g, i) in skills" :key="g.name.en" class="skill-card" :style="{ '--i': i }">
          <h3>
            {{ tx(g.name, lang) }}<small>{{ g.items.length }}</small>
          </h3>
          <ul class="chip-row">
            <li v-for="item in g.items" :key="tx(item, 'en')">{{ tx(item, lang) }}</li>
          </ul>
        </article>
        <PixelPal name="peek" :scale="4" class="pal-on-grid" />
      </div>

      <h3 class="blk-sub">{{ t('a_do') }}</h3>
      <ul class="services-row stagger">
        <li v-for="(s, i) in services" :key="s.title.en" class="service-card" :style="{ '--i': i }">
          <span class="service-ic"><UiIcon :name="serviceIcons[i] ?? 'spark'" :size="22" /></span>
          <h4>{{ tx(s.title, lang) }}</h4>
          <p>{{ tx(s.text, lang) }}</p>
        </li>
      </ul>
    </section>

    <!-- опыт: вертикальная линия, которая «дорисовывается» при прокрутке -->
    <section class="wrap blk" aria-labelledby="exp-t">
      <h2 id="exp-t" v-reveal class="blk-h">{{ t('a_exp_t') }}</h2>
      <ol class="jobs">
        <li v-for="(j, i) in jobs" :key="j.period.en" v-reveal class="job" :style="{ '--i': i }">
          <time class="job-when">{{ tx(j.period, lang) }}</time>
          <span class="job-dot" aria-hidden="true"></span>
          <div class="job-body">
            <h3>{{ tx(j.role, lang) }}</h3>
            <p class="job-co">{{ tx(j.company, lang) }}</p>
            <p>{{ tx(j.text, lang) }}</p>
          </div>
        </li>
      </ol>
    </section>

    <!-- музыка: альбом можно включить прямо здесь -->
    <section v-reveal class="wrap blk" :aria-label="t('a_music_t')">
      <div class="ab-band glass">
        <img
          class="ab-band-cover"
          :src="album.coverSm ?? album.cover"
          alt=""
          width="160"
          height="160"
          loading="lazy"
          decoding="async"
        />
        <div class="ab-band-text">
          <h2>{{ t('a_band_t') }}</h2>
          <p>{{ t('a_band_p') }}</p>
        </div>
        <button
          type="button"
          class="play-round"
          :aria-label="albumPlaying ? t('np_pause') : t('np_play_album')"
          @click="playAlbum"
        >
          <UiIcon :name="albumPlaying ? 'pause' : 'play'" :size="22" />
        </button>
        <TrackWave class="ab-band-wave" :playing="albumPlaying" :bars="56" />
        <PixelPal name="music" :scale="4" class="pal-on-band" />
      </div>
    </section>
  </PageShell>
</template>
