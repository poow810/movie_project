import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const token = ref(null)
  const router = useRouter()
  const SERVER_URL = 'http://43.202.204.222'
  const LOCAL_URL = 'http://192.168.0.13:8000'
  const userId = ref(null)

  // 로그인 확인
  const isLogIn = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })
  
  // 로그인
  const logIn = function (payload) {
    const { username, password } = payload
    axios({ 
      method: 'post',
      url: `${LOCAL_URL}/accounts/login/`,
      data: {
        username, password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      token.value = res.data.key
      checkUser(token.value)
      console.log(res.data.key)
      token.value = res.data.key
      checkUser(token.value)
      router.push({ name: 'home' })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  // 로그인 후 사용자 확인 및 정의
  const checkUser = (token) => {
    axios({
      method: 'GET',
      url: `${LOCAL_URL}/accounts/user/`,
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(res => {
      console.log(res.data)
      userId.value = res.data.pk
      userName.value = res.data.username
    })
    .catch(err => { console.log(err) })
  }

  // 로그아웃
  const logOut = function () {
    axios({
      method: 'post',
      url: `${LOCAL_URL}/accounts/logout/`,
      headers: { Authorization: `Token ${token.value}`}
    })
    .then((res) => {
      token.value = null // token 초기화
      router.push({ name: 'login' })
    })
    .catch((err) => {
      console.log('로그아웃 실패')
      console.log(err)
    })
  }
  
  // 회원가입
  const signUp = function (payload) {
    const { username, nickname, email, password1, password2 } = payload
    axios({
      method: 'post',
      url: `${LOCAL_URL}/accounts/signup/`,
      data: {
        username, nickname, email, password1, password2
      }
    })
    .then((res) => {
      console.log(res)
      const password = password1
      logIn({ username, password })
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return { userId, token, SERVER_URL, LOCAL_URL, isLogIn,
  signUp, logIn, logOut, checkUser }
}, {persist: true})
