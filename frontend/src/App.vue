<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
const store = useUserStore()

const logOut = function () {
  console.log('hi')
  store.logOut()
}
</script>

<template>
  <header>
    <div>
      <nav v-if="store.isLogIn">
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink :to="{ name: 'community' }">커뮤니티</RouterLink> |
        <button @click="logOut">로그아웃</button>
      </nav>
      <nav v-else>
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
