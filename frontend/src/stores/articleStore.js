import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

export const useArticleStore = defineStore('articleStore', () => {
  const store = useUserStore()
  const router = useRouter()
  const articles = ref([])
  const BASE_URL = 'http://172.30.1.37:8000'

  const getArticles = function () {
    // const token = store.token
    axios({
      method: 'get',
      url: `${BASE_URL}/community/`,
      headers: {
        Authorization: `Token ${store.token}`
      }
    })
    .then((res) => {
      console.log(articles.value)
      articles.value = res.data
    })
    .catch((err) => {
      console.log('에러입니다')
      console.log(err)
    })
  }

  const createArticle = function (article) {
    const title = article.title
    const content = article.content
    const category = article.category
    console.log(category)
    axios({
      method: 'post',
      url: `${BASE_URL}/community/create/`,
      data: {
        title, content, category
      },
      headers: {
        Authorization: `Token ${store.token}`
      }
    })
    .then((res) => {
      router.push({ name: 'community' })
    })
    .catch((err) => {
      console.log('hi')
      console.log(err)
    })
  }
  
  return  {BASE_URL, articles, getArticles, createArticle}
}, {persist: true})
