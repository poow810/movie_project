import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

export const useArticleStore = defineStore('articleStore', () => {
  const store = useUserStore()
  const router = useRouter()
  const articles = ref([])
  const SERVER_URL = 'http://43.202.204.222'
  const LOCAL_URL = 'http://192.168.0.13:8000'

  const getArticles = function () {
    axios({
      method: 'get',
      url: `${LOCAL_URL}/community/`,
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
    axios({
      method: 'post',
      url: `${LOCAL_URL}/community/create/`,
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
      console.log(err)
    })
  }

  // 좋아요
  const favoriteArticle = async (articleId) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${LOCAL_URL}/community/detail/${articleId}/`, // URL 수정
        headers: {
          Authorization: `Token ${store.token}`
        }
      });
  
      // 성공적으로 응답을 받은 후, 좋아요 수 업데이트
      articles.value = articles.value.map((article) => {
        if (article.id === articleId) {
          // 서버로부터 받은 좋아요 수로 업데이트
          return { ...article, like_count: response.data.like_count };
        } else {
          return article;
        }
      });
    } catch (err) {
      console.log('좋아요 기능 처리 중 에러', err);
    }
  };

  return  {SERVER_URL, LOCAL_URL, articles, store, getArticles, createArticle, favoriteArticle}
}, {persist: true})
