import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const router = useRouter()
  const BASE_URL = 'http://192.168.214.72:8080'


  // 회원가입
  const signUp = function (payload) {
    const { username, nickname, email, password1, password2 } = payload
    axios({
      method: 'post',
      url: `${BASE_URL}/accounts/signup/`,
      data: {
        username, nickname, email, password1, password2
      }
    })
    .then((res) => {
      console.log(res)
      router.push({ name: 'home' })
    })
    .catch((err) => {
      console.log(err)
    })
  }


  // 로그인
  const logIn = function (payload) {
    const { username, password } = payload
    axios({
      method: 'post',
      url: `${BASE_URL}/accounts/login/`,
      data: {
        username, password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(res.data.key)
      token.value = res.data.key
      router.push({ name: 'home' })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return { token, BASE_URL, 
  signUp, logIn }
}, {persist: true})
