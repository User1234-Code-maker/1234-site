<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import PageShell from '../components/PageShell.vue'
import ReleaseCover from '../components/ReleaseCover.vue'
import WaveBars from '../components/WaveBars.vue'
import { fmt, usePlayer } from '../composables/useDemoPlayer'
import { useLang } from '../composables/useLang'
import { artistName, releases } from '../data/music'
import type { ReleaseKind } from '../data/types'
import { vReveal } from '../directives/reveal'
import { vTilt } from '../directives/tilt'
import { hrefFor } from '../utils/links'

const { lang, t } = useLang()
const player = usePlayer()
const { state, release, current } = player

// страницу покидаем, демо-таймер останавливаем
onBeforeUnmount(() => player.pause())

const filter = ref<ReleaseKind | 'all'>('all')
const list = computed(() =>
  filter.value === 'all' ? releases : releases.filter((r) => r.kind === filter.value),
)
const kinds: (ReleaseKind | 'all')[] = ['all', 'album', 'ep', 'single']
const kindLabel = (k: ReleaseKind | 'all') => t(k === 'all' ? 'm_f_all' : `m_f_${k}`)

const date = (iso: string) =>
  new Date(iso).toLocaleDateString(lang.value === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
  })
const sc = hrefFor('soundcloud')
</script>

<template>
  <PageShell tone="music">
    <PageHead :title="t('m_title')" :lead="t('m_hero_tag')" jp="音楽" />

    <section class="wrap mx-stage" :aria-label="t('m_featured')">
      <div v-tilt class="mx-card tilt" :class="{ playing: state.playing }">
        <div class="mx-cover">
          <ReleaseCover :key="release.id" :release="release" disc />
        </div>
        <div class="mx-info">
          <span class="kind-tag">{{ t(`k_${release.kind}`) }}</span>
          <h2>{{ release.title }}</h2>
          <p class="mx-sub">{{ artistName }} · {{ date(release.date) }}</p>
          <p class="mx-genres">{{ release.genres.join(' / ') }}</p>

          <p class="mx-now" aria-live="polite">
            <small>{{ t('m_now') }}</small>
            <b>{{ current.title }}</b>
          </p>
          <WaveBars
            :seed="release.id + current.title"
            :progress="state.progress"
            :playing="state.playing"
            :label="t('m_seek')"
            @seek="player.seek"
          />
          <div class="mx-time">
            <span>{{ fmt(player.elapsed.value) }}</span><span>{{ current.length }}</span>
          </div>

          <div class="mx-controls">
            <button type="button" class="ctl" :aria-label="t('m_prev')" @click="player.prev">
              <span aria-hidden="true">⏮</span>
            </button>
            <button
              type="button"
              class="ctl main"
              :aria-label="state.playing ? t('m_pause') : t('m_play')"
              @click="player.toggle"
            >
              <span aria-hidden="true">{{ state.playing ? '❚❚' : '▶' }}</span>
            </button>
            <button type="button" class="ctl" :aria-label="t('m_next')" @click="player.next">
              <span aria-hidden="true">⏭</span>
            </button>
            <a class="sc-btn" :href="sc" target="_blank" rel="noopener"
              >{{ t('m_open_sc') }} <span aria-hidden="true">↗</span></a
            >
          </div>
          <p class="demo-note">{{ t('m_demo') }}</p>
        </div>
      </div>

      <ol class="tracks mx-tracks" :aria-label="t('m_tracklist')">
        <li v-for="(tr, i) in release.tracks" :key="release.id + tr.title">
          <button type="button" :class="{ on: state.track === i }" @click="player.pick(release.id, i)">
            <span class="n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="tt">{{ tr.title }}</span>
            <span class="len">{{ tr.length }}</span>
            <span class="go" aria-hidden="true">{{ state.track === i && state.playing ? '❚❚' : '▶' }}</span>
            <span class="sr-only">{{ t('m_play') }}</span>
          </button>
        </li>
      </ol>
    </section>

    <section v-reveal class="wrap sec-tight" aria-labelledby="disco-t">
      <div class="disco-head">
        <h2 id="disco-t">{{ t('m_disco') }}</h2>
        <div class="filters" role="group" :aria-label="t('m_disco')">
          <button
            v-for="k in kinds"
            :key="k"
            type="button"
            class="fchip"
            :class="{ on: filter === k }"
            :aria-pressed="filter === k"
            @click="filter = k"
          >
            {{ kindLabel(k) }}
          </button>
        </div>
      </div>
      <Transition name="grid" mode="out-in">
        <div :key="filter" class="releases">
          <article
            v-for="(r, i) in list"
            :key="r.id"
            v-tilt
            class="rel tilt"
            :class="{ cur: r.id === release.id }"
            :style="{ '--i': i }"
          >
            <button
              type="button"
              class="rel-cover"
              :aria-label="`${t('m_show')}: ${r.title}`"
              @click="player.select(r.id)"
            >
              <ReleaseCover :release="r" />
              <span class="rel-play" aria-hidden="true">▶</span>
            </button>
            <div class="rel-body">
              <span class="kind-tag">{{ t(`k_${r.kind}`) }}</span>
              <h3>{{ r.title }}</h3>
              <p>{{ date(r.date) }}</p>
              <p class="g">{{ r.genres.join(' / ') }}</p>
              <span v-if="r.sample" class="badge static">{{ t('p_sample') }}</span>
            </div>
          </article>
        </div>
      </Transition>
      <a class="pill big sc-cta" :href="sc" target="_blank" rel="noopener"
        >{{ t('m_listen') }} <span aria-hidden="true">↗</span></a
      >
    </section>
  </PageShell>
</template>
