<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang'
import { hrefFor } from '../utils/links'
import navAbout from '../assets/pixel/nav-about.svg'
import navAboutLt from '../assets/pixel/nav-about-lt.svg'
import navContact from '../assets/pixel/nav-contact.svg'
import navContactLt from '../assets/pixel/nav-contact-lt.svg'
import navHome from '../assets/pixel/nav-home.svg'
import navHomeLt from '../assets/pixel/nav-home-lt.svg'
import navMusic from '../assets/pixel/nav-music.svg'
import navMusicLt from '../assets/pixel/nav-music-lt.svg'
import navProjects from '../assets/pixel/nav-projects.svg'
import navProjectsLt from '../assets/pixel/nav-projects-lt.svg'
import BrandMark from './BrandMark.vue'
import LangSwitch from './LangSwitch.vue'
import SocialLinks from './SocialLinks.vue'
import ThemeToggle from './ThemeToggle.vue'

const { t } = useLang()
const route = useRoute()
const open = ref(false)

const links = [
  { to: '/about', key: 'nav_about', icon: navAbout, lt: navAboutLt },
  { to: '/projects', key: 'nav_projects', icon: navProjects, lt: navProjectsLt },
  { to: '/music', key: 'nav_music', icon: navMusic, lt: navMusicLt },
  { to: '/contact', key: 'nav_contact', icon: navContact, lt: navContactLt },
]

// на главной, как в утверждённом макете, подчёркнут «Обо мне»
const isHome = computed(() => route.name === 'home')
const isOn = (to: string) => !isHome.value && (route.path === to || route.path.startsWith(to + '/'))

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
        <span class="mm-ico" aria-hidden="true"
          ><img class="lt-off" :src="navHome" alt="" width="30" height="30" /><img
            class="lt-on"
            :src="navHomeLt"
            alt=""
            width="30"
            height="30" /></span
        >{{ t('nav_home') }}
      </RouterLink>
      <RouterLink v-for="l in links" :key="l.to" :to="l.to" :class="{ on: !isHome && isOn(l.to) }">
        <span class="mm-ico" aria-hidden="true"
          ><img class="lt-off" :src="l.icon" alt="" width="30" height="30" /><img
            class="lt-on"
            :src="l.lt"
            alt=""
            width="30"
            height="30" /></span
        >{{ t(l.key) }}
      </RouterLink>
      <div class="menu-contact">
        <a class="pill" :href="hrefFor('mail')">{{ t('talk') }}</a>
        <SocialLinks round />
      </div>
    </nav>
  </header>
</template>
