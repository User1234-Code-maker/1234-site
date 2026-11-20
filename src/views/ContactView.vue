<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import PageShell from '../components/PageShell.vue'
import { useLang } from '../composables/useLang'
import { site } from '../data/site'
import { socials } from '../data/socials'
import { vReveal } from '../directives/reveal'
import { vTilt } from '../directives/tilt'
import { hrefFor } from '../utils/links'

const { t } = useLang()
const state = ref<'idle' | 'ok' | 'fail'>('idle')
let timer = 0

async function copy() {
  try {
    await navigator.clipboard.writeText(site.contacts.email)
    state.value = 'ok'
  } catch {
    state.value = 'fail'
  }
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (state.value = 'idle'), 2200)
}
onBeforeUnmount(() => window.clearTimeout(timer))

const message = computed(() =>
  state.value === 'ok' ? t('c_copied') : state.value === 'fail' ? t('c_copy_fail') : '',
)
const channels = computed(() => [
  { key: 'mail', label: 'Email', value: site.contacts.email, href: hrefFor('mail'), ext: false },
  ...socials.map((s) => ({
    key: s.key,
    label: s.label,
    value: '',
    href: hrefFor(s.key),
    ext: true,
    path: s.path,
  })),
])
</script>

<template>
  <PageShell>
    <PageHead :title="t('c_big')" :lead="t('c_lead')" jp="連絡先">
      <div class="cta-row">
        <a class="pill big" :href="hrefFor('mail')">{{ t('c_mail') }} <span aria-hidden="true">→</span></a>
        <button type="button" class="copy-btn" :class="state" @click="copy">
          <span class="ck" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect class="c-copy" x="8" y="8" width="12" height="12" rx="3" />
              <path class="c-copy" d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
              <path class="c-ok" d="m5 13 4.5 4.5L19 7" pathLength="1" />
            </svg>
          </span>
          <span>{{ state === 'ok' ? t('c_copied') : t('c_copy') }}</span>
        </button>
      </div>
      <p class="sr-only" role="status" aria-live="polite">{{ message }}</p>
      <p v-if="state === 'fail'" class="note" role="alert">{{ t('c_copy_fail') }}</p>
    </PageHead>

    <section class="wrap sec-tight" aria-labelledby="ch-t">
      <h2 id="ch-t" class="h2">{{ t('c_channels') }}</h2>
      <div v-reveal class="channels stagger">
        <a
          v-for="(c, i) in channels"
          :key="c.key"
          v-tilt
          class="chan tilt"
          :href="c.href"
          :target="c.ext ? '_blank' : undefined"
          :rel="c.ext ? 'noopener' : undefined"
          :style="{ '--i': i }"
        >
          <span class="chan-ic" aria-hidden="true">
            <svg
              v-if="c.key === 'mail'"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="m3.5 7.5 8.5 6 8.5-6" />
            </svg>
            <svg v-else viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path :d="'path' in c ? c.path : ''" />
            </svg>
          </span>
          <span class="chan-t">
            <b>{{ c.label }}</b>
            <small>{{ c.value || t('c_open') }}</small>
          </span>
          <span class="chan-go" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  </PageShell>
</template>
