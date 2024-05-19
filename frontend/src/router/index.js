import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/accounts/SignUpView.vue'
import LogInView from '@/views/accounts/LogInView.vue'
import CommuView from '@/views/community/CommuView.vue'
import CommuArticleCreateView from '@/views/community/CommuArticleCreateView.vue'
import LogOug from '@/components/accounts/LogOut.vue'
import PasswordChange from '@/components/accounts/PasswordChange.vue'
import ActorView from '@/views/actors/ActorView.vue'
import MovieRecomselectView from '@/views/recommend/MovieRecomselectView.vue'
import MovieRecomView from '@/views/recommend/MovieRecomView.vue'
import CommuArticleDetail from '@/views/community/CommuArticleDetail.vue'
import ProfileView from '@/views/profile/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    // ACTOR
    {
      path: '/actors',
      name: 'actor',
      component: ActorView
    },

    // COMMUNITY
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
      path: '/community/:id',
      name: 'articleDetail',
      component: CommuArticleDetail
    },

    // RECOMMEND
    {
      path: '/movies/genreselect',
      name: 'genreselect',
      component: MovieRecomselectView
    },
    {
      path: '/movie/recommend',
      name: 'recommend',
      component: MovieRecomView
    },


    // ACCOUNT
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
      path: '/accounts/logout',
      name: 'logout',
      component: LogOug
    },
    {
      path: '/accounts/passwordchange',
      name: 'passwordchange',
      component: PasswordChange
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileView
    }
  ]
})

export default router
