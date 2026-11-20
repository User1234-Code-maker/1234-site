<script setup lang="ts">
import PageShell from '../components/PageShell.vue'
import { useLang } from '../composables/useLang'

const { t } = useLang()
</script>

<template>
  <PageShell>
    <section class="wrap nf">
      <span class="nf-code" aria-hidden="true">404</span>
      <h1>{{ t('nf_title') }}</h1>
      <p class="lead">{{ t('nf_text') }}</p>
      <div class="cta-row">
        <RouterLink class="pill big" to="/">{{ t('nf_home') }}</RouterLink>
        <RouterLink class="slink" to="/projects"
          ><span>{{ t('p_title') }}</span> <span aria-hidden="true">→</span></RouterLink
        >
      </div>
    </section>
  </PageShell>
</template>
