import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const token = ref(null)
  const router = useRouter()
  const BASE_URL = 'http://172.30.1.37:8000'

  // 로그인 확인
  const isLogIn = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })

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

  // 로그아웃
  const logOut = function () {
    axios({
      method: 'post',
      url: `${BASE_URL}/accounts/logout/`,
      headers: { Authorization: `Token ${token.value}`}
    })
    .then((res) => {
      console.log('로그아웃 성공')
      console.log(res.data)
      token.value = null // token 초기화
      router.push({ name: 'login' })
    })
    .catch((err) => {
      console.log('로그아웃 실패')
      console.log(err)
    })
  }

  return { token, BASE_URL, isLogIn,
  signUp, logIn, logOut }
}, {persist: true})
