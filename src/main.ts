import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { finishBoot } from './boot'
import './styles/tokens.css'
import './styles/main.css'
import './styles/pages.css'
import './styles/inner/index.css'
import './styles/dark.css'

// кольцо фокуса показываем, только когда человек ходит клавишами (Tab, стрелки), а не мышью или пальцем
const root = document.documentElement
addEventListener('keydown', (e) => {
  if (e.key === 'Tab' || e.key.startsWith('Arrow')) root.classList.add('kbd')
})
addEventListener('pointerdown', () => root.classList.remove('kbd'))

const app = createApp(App).use(router)
router.isReady().then(() => {
  app.mount('#app')
  finishBoot()
})
