<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang'
import { hrefFor } from '../utils/links'
import navAbout from '../assets/pixel/nav-about.svg'
import navContact from '../assets/pixel/nav-contact.svg'
import navHome from '../assets/pixel/nav-home.svg'
import navMusic from '../assets/pixel/nav-music.svg'
import navProjects from '../assets/pixel/nav-projects.svg'
import BrandMark from './BrandMark.vue'
import LangSwitch from './LangSwitch.vue'
import SocialLinks from './SocialLinks.vue'
import ThemeToggle from './ThemeToggle.vue'

const { t } = useLang()
const route = useRoute()
const open = ref(false)

const links = [
  { to: '/about', key: 'nav_about', icon: navAbout },
  { to: '/projects', key: 'nav_projects', icon: navProjects },
  { to: '/music', key: 'nav_music', icon: navMusic },
  { to: '/contact', key: 'nav_contact', icon: navContact },
]

// на главной, как в утверждённом макете, подчёркнут «Обо мне»
const isHome = computed(() => route.name === 'home')
const isOn = (to: string) =>
  isHome.value ? to === '/about' : route.path === to || route.path.startsWith(to + '/')

watch(
  () => route.fullPath,
  () => (open.value = false),
)
</script>

<template>
  <header :class="{ 'menu-open': open }">
    <RouterLink class="brand" to="/" :aria-label="`1234, ${t('nav_home')}`"><BrandMark />1234</RouterLink>
    <nav :aria-label="t('aria_main')">
      <RouterLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        :class="{ on: isOn(l.to) }"
        :aria-current="isOn(l.to) ? 'page' : undefined"
        >{{ t(l.key) }}</RouterLink
      >
    </nav>
    <div class="right">
      <SocialLinks />
      <ThemeToggle />
      <LangSwitch />
      <a class="pill" :href="hrefFor('mail')">{{ t('talk') }}</a>
      <button
        class="menu-btn"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        :aria-label="t('menu')"
        @click="open = !open"
      >
        <span></span><span></span>
      </button>
    </div>
    <nav
      id="mobile-menu"
      class="mobile-menu"
      :aria-hidden="!open"
      :inert="!open"
      :aria-label="t('aria_menu')"
    >
      <RouterLink to="/" :class="{ on: isHome }">
        <img class="mm-ico" :src="navHome" alt="" aria-hidden="true" width="34" height="34" />{{
          t('nav_home')
        }}
      </RouterLink>
      <RouterLink v-for="l in links" :key="l.to" :to="l.to" :class="{ on: !isHome && isOn(l.to) }">
        <img class="mm-ico" :src="l.icon" alt="" aria-hidden="true" width="34" height="34" />{{ t(l.key) }}
      </RouterLink>
      <div class="menu-contact">
        <a class="pill" :href="hrefFor('mail')">{{ t('talk') }}</a>
        <SocialLinks round />
      </div>
    </nav>
  </header>
</template>
