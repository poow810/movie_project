<template>
  <div>
    <h1>로그인 페이지</h1>
    <form @submit.prevent="logIn">
      <label for="username">username: </label>
      <input type="text" id="username" v-model.trim="username"><br>

      <label for="email">email: </label>
      <input type="text" id="email" v-model.trim="email"><br>
      
      <label for="password1">password: </label>
      <input type="password" id="password1" v-model.trim="password1"><br>
      
      <label for="password2">password confirm: </label>
      <input type="password" id="password2" v-model.trim="password2"><br>

      <input type="submit" value="logIn">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
const store = useUserStore()

const username = ref(null)
const email = ref(null)
const password1 = ref(null)
const password2 = ref(null)

const logIn = function () {
  const payload = {
    username: username.value,
    email: email.value,
    password1: password1.value,
    password1: password2.value,
  }
  store.logIn(payload)
}
</script>

<style scoped>

</style>
