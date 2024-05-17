import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useArticleStore = defineStore('articleStore', () => {
  const articles = ref([])
  const token = ref(null)
  const router = useRouter()
  const BASE_URL = 'http://43.202.204.222'

  const getArticles = function () {
    axios({
      method: 'get',
      url: 'http://192.168.214.72:8080/community/',
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
    .then((res) => {
      articles.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const createArticle = function (title, content, category) {
    axios({
      method: 'post',
      url: 'http://192.168.214.72:8080/community/create/',
      data: {
        title, content, category
      },
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
    .then((res) => {
      router.push({ name: 'community' })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  return { token, BASE_URL, getArticles, createArticle}
}, {persist: true})
