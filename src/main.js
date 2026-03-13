import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './styles/css/main.css'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue') },
    // { path: '/sobre',    component: () => import('./views/SobreView.vue') },
    // { path: '/projetos', component: () => import('./views/ProjetosView.vue') },
    // { path: '/blog',     component: () => import('./views/BlogView.vue') },
    // { path: '/blog/:slug', component: () => import('./views/PostView.vue') },
  ],
})

createApp(App).use(router).mount('#app')
