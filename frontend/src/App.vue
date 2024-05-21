<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const id = computed(() => {
  return userStore.userId
})

const logOut = function () { 
  userStore.logOut()
}

const isLogIn = computed(() => {
  return userStore.isLogIn
})
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg" style="background-color: #1b1b1b;">
      <div class="container-fluid">
        <RouterLink class="navbar-brand fw-bold text-white" to="/">MOVIE</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="isLogIn">
              <RouterLink class="nav-link text-white" :to="{ name: 'actor' }">배우</RouterLink>
              <RouterLink class="nav-link text-white" :to="{ name: 'recommend' }">영화추천</RouterLink>
              <RouterLink class="nav-link text-white" :to="{ name: 'recommend' }">날씨추천</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" :to="{ name: 'community' }">커뮤니티</RouterLink>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="isLogIn">
              <RouterLink class="nav-link text-white" :to="{ name: 'profile', params: {'id': id}}">프로필</RouterLink>
              <button class="btn btn-outline-success" @click="logOut">로그아웃</button>
            </li>
            <li class="nav-item" v-else>
              <RouterLink class="nav-link text-white" :to="{ name: 'signup' }">회원가입</RouterLink>
              <RouterLink class="nav-link text-white" :to="{ name: 'login' }">로그인</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>



<style scoped>
.navbar-nav .nav-item {
  display: flex;
}
</style>
