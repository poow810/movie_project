import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/accounts/SignUpView.vue'
import LogInView from '@/views/accounts/LogInView.vue'
import CommunityView from '@/views/community/CommunityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView
    },
  ]
})

export default router
