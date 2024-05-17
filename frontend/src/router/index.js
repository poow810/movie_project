import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/accounts/SignUpView.vue'
import LogInView from '@/views/accounts/LogInView.vue'
import CommuView from '@/views/community/CommuView.vue'
import CommuArticleCreateView from '@/views/community/CommuArticleCreateView.vue'
import LogOug from '@/components/accounts/LogOut.vue'

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
      component: CommuView,
    },
    {
      path: '/community/create',
      name: 'create',
      component: CommuArticleCreateView
    },
    {
      path: '/accounts/logout',
      name: 'logout',
      component: LogOug
    }
  ]
})

export default router
