import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

export const useMovieStore = defineStore('movieStore', () => {
  const store = useUserStore()
  const token =  store.token
  const router = useRouter()
  const LOCAL_URL = 'http://192.168.214.72:8000'
  const SERVER_URL = 'http://43.202.204.222'
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const nowPlayingMovies = ref([]) // 상영중 영화
  const ratedMovies = ref([]) // 평점순 영화
  const genreMovies = ref([]) // 장르별 영화
  
  // 평점 높은순
  const getRatedMovies = async () => {
    axios({
      method: 'get',
      url: `${TMDB_BASE_URL}/movie/top_rated`,
      params: {
        api_key: API_KEY,
        language: 'ko-KR'
      }
    })
    .then(res => {
      console.log('평점영화 데이터 가져오기 성공:', res.data)
      ratedMovies.value = res.data.results
    })
    .catch(err => {
      console.error('영화 데이터 가져오기 실패:', err)
    })
  }

  // 현재 상영중
  const getNowPlayingMovies = async () => {
    axios({
      method: 'get',
      url: `${TMDB_BASE_URL}/movie/now_playing`,
      params: {
        api_key: API_KEY,
        language: 'ko-KR'
      }
    })
    .then(res => {
      console.log('상영영화 데이터 가져오기 성공:', res.data)
      nowPlayingMovies.value = res.data.results
    })
    .catch(err => {
      console.error('영화 데이터 가져오기 실패:', err)
    })
  }

  // 장르별
  const getGenreList = async () => {
    axios({
      method: 'get',
      url: `${LOCAL_URL}/movie/genre/`,
      // headers: {
        // Authorization: `Token ${token}`
      // }
    })
    .then((res) => {
      console.log('데이터수집 완료:', res.data)
      genreMovies.value = res.data
    })
    .catch((err) => {
      console.log('데이터수집 실패:', err)
    })
  }
  
  return { token, SERVER_URL, LOCAL_URL, nowPlayingMovies, ratedMovies, genreMovies,
    getRatedMovies, getNowPlayingMovies, getGenreList }
}, {persist: true})
