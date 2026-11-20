import { createRouter, createWebHistory } from 'vue-router'
import { pageScroll } from './utils/pageScroll'

// Главная грузится сразу, остальные страницы отдельными кусками кода
import HomeView from './views/HomeView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/projects', name: 'projects', component: () => import('./views/ProjectsView.vue') },
    {
      path: '/projects/:slug',
      name: 'project',
      component: () => import('./views/ProjectView.vue'),
      props: true,
    },
    { path: '/music', name: 'music', component: () => import('./views/MusicView.vue') },
    { path: '/about', name: 'about', component: () => import('./views/AboutView.vue') },
    { path: '/contact', name: 'contact', component: () => import('./views/ContactView.vue') },
    { path: '/:rest(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue') },
  ],
  // скролл наверх делаем, когда новая страница уже встала на место (см. pageScroll)
  scrollBehavior: (to, _from, saved) => pageScroll(to.hash, saved),
})
