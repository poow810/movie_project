import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const token = ref(null)
  const router = useRouter()
  const API_KEY = 'http://43.202.204.222/'


  // 회원가입
  const signUp = function (payload) {
    const { username, password1, password2 } = payload
    axios({
      method: 'post',
      url: `${API_KEY}/accounts/signup/`,
      data: {
        username, password1, password2
      }
    })
    .then((res) => {
      router.push({ name: 'home' })
    })
    .catch((err) => {
      console.log(err)
    })
  }


  // 로그인
  const logIn = function (payload) {
    const { username, password } = password
    axios({
      method: 'post',
      url: `${API_KEY}/accounts/login/`,
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

  return { token, API_KEY, 
  signUp, logIn }
}, {persist: true})
