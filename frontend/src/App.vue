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
    <div>
      <nav v-if="isLogIn">
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink :to="{ name: 'actor' }">배우</RouterLink> |
        <RouterLink :to="{ name: 'community' }">커뮤니티</RouterLink> |
        <!-- recomStore.userSetGenre가 존재하면 'genreselect'로, 그렇지 않으면 'recommend'로 라우팅 -->
        <RouterLink :to="{ name: 'recommend' }">영화추천</RouterLink> |
        <RouterLink :to="{ name: 'profile', params: {'id': id}}">프로필</RouterLink> |
        <button @click="logOut">로그아웃</button>
      </nav>
      <nav v-else>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink :to="{ name: 'community' }">커뮤니티</RouterLink> |
        <RouterLink :to="{ name: 'signup' }">회원가입</RouterLink> |
        <RouterLink :to="{ name: 'login' }">로그인</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
