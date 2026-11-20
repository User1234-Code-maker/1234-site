<script setup lang="ts">
import { useLang } from '../composables/useLang'

const { lang, setLang, t } = useLang()
</script>

<template>
  <span class="lang" role="group" :aria-label="t('aria_lang')">
    <button type="button" :class="{ on: lang === 'ru' }" :aria-pressed="lang === 'ru'" @click="setLang('ru')">
      RU
    </button>
    <button type="button" :class="{ on: lang === 'en' }" :aria-pressed="lang === 'en'" @click="setLang('en')">
      EN
    </button>
  </span>
</template>
