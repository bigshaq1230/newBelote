import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Account from '@/views/Account.vue'
import Authenticate from '@/views/Authenticate.vue'
import Match from '@/views/Match.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/account',
      component:Account
    },
    {
      path:'/auth',
      component:Authenticate
    },
    {
      path: '/match/:id',
      name: 'match',
      component: Match,
    }
  ]
})

export default router
