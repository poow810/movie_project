import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useMovieStore = defineStore('movieStore', () => {
  const token = ref(null)
  const router = useRouter()
  const BASE_URL = 'http://127.0.0.1:8000'
  const API_KEY = ref()

  const getMovies = function () {
    axios({
      
    })
  }
  



  
  return { token, BASE_URL, }
}, {persist: true})
