import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

export const useRecomStore = defineStore('recomStore', () => {
  const store = useUserStore()
  const token =  store.token
  const router = useRouter()
  const BASE_URL = 'http://43.202.204.222'
  const LOCAL_URL = 'http://192.168.0.13:8000'

  const recomSetGenre = ref([])

  const setPreferredGenre = (genre) => {
    preferredGenres.value = genre
  }

  const getGenreMovies = async () => {
    axios({
      method: 'get',
      url: `${LOCAL_URL}/movie/recommend`,
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => {
      console.log('성공영화:', res.data)
      recomSetGenre.value = res.data.results
    })
    .catch(err => {
      console.error('영화 데이터 가져오기 실패:', err)
    })
  }

  
  return { store, token, BASE_URL, LOCAL_URL, recomSetGenre, preferredGenres, getGenreMovies, setPreferredGenre, 
   }
}, {persist: true})
