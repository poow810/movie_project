import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const token = ref(null)
  const router = useRouter()
  const BASE_URL = 'http://43.202.204.222'


  // 회원가입
  const signUp = function (payload) {
    const { username, password1, password2 } = payload
    axios({
      method: 'post',
      url: `${BASE_URL}/accounts/signup/`,
      data: {
        username, password1, password2
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
      }
    })
    .then((res) => {
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
