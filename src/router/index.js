import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  // Descomentar conforme criar as views:
  { path: '/sobre', component: () => import('@/views/SobreView.vue') },
  // { path: '/projetos', name: 'projetos', component: () => import('../views/ProjetosView.vue') },

  // { path: '/blog', name: 'blog', component: () => import('../views/BlogView.vue') },
  // { path: '/blog/:slug', name: 'post', component: () => import('../views/PostView.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
