import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// base задаётся снаружи: для GitHub Pages это /<имя-репозитория>/ (см. .github/workflows/deploy.yml)
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/unit/setup.ts'],
    include: ['tests/unit/**/*.test.ts'],
  },
})
