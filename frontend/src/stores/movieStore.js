import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useMovieStore = defineStore('movieStore', () => {
  const token = ref(null)
  const router = useRouter()
  const BASE_URL = 'http://172.30.1.37:8000'
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY
  const movies = ref([])

  const getMovies = async () => {
    axios({
      method: 'get',
      url: `${TMDB_BASE_URL}/movie/top_rated`,
      params: {
        api_key: API_KEY,
        language: 'ko-KR'
      }
    })
    .then(res => {
      console.log('영화 데이터 가져오기 성공:', res.data)
      movies.value = res.data.results
    })
    .catch(err => {
      console.error('영화 데이터 가져오기 실패:', err)
    })
  }
  
  return { token, BASE_URL, movies, getMovies }
}, {persist: true})
