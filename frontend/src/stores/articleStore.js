import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

export const useArticleStore = defineStore('articleStore', () => {
  const store = useUserStore()
  const token = store.token
  const router = useRouter()
  const articles = ref([])
  const SERVER_URL = 'http://43.202.204.222'
  const LOCAL_URL = 'http://192.168.0.13:8000'

  const getArticles = function () {
    axios({
      method: 'get',
      url: `${LOCAL_URL}/community/`,
      headers: {
        Authorization: `Token ${token}`
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
      url: `${LOCAL_URL}/community/create/`,
      data: {
        title, content, category
      },
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then((res) => {
      router.push({ name: 'community' })
    })
    .catch((err) => {
      console.log('err')
      console.log(err)
    })
  }
  
  return  {SERVER_URL, LOCAL_URL, articles, token, getArticles, createArticle}
}, {persist: true})
