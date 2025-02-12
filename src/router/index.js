import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import config from '../views/config.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: () => import('../views/crypto.vue'),
      children: [
        {
          path: '',
          name: 'hashing',
          component: () => import('../views/hashing/hashing.vue')
        },
        {
          path: 'encrypted',
          name: 'encrypted',
          component: () => import('../views/encrypted/encrypted.vue')
        },
        {
          path: 'blockchain',
          name: 'blockchain',
          component: () => import('../views/blockchain/blockchain.vue')
        },
      ]
    },
    {
      path: '/config',
      name: 'config',
      component: config,
    },
  ],
})

export default router
