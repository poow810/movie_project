import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useMovieStore = defineStore('movieStore', () => {
  const token = ref(null)
  const router = useRouter()
  const BASE_URL = 'http://172.29.114.46:8000'
  const API_KEY = ref()
  const movies = ref([])

  const getMovies = function () {
    axios({
      method: 'get',
      url: `${BASE_URL}/movies`,
    })
    .then(res => {
      movies.value = res.data
    })
    .catch(err => {
      console.error('영화 데이터를 가져오는 데 실패했습니다:', err)
    })
  }
  



  
  return { token, BASE_URL, movies, getMovies}
}, {persist: true})
