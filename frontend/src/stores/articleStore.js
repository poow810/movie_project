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
  const LOCAL_URL = 'http://172.30.1.98:8000'
  const isLiked = ref(false)
  const likeCount = ref(0)
  const comments = ref([])

  const getArticles = function () {
    axios({
      method: 'get',
      url: `${LOCAL_URL}/community/`,
      headers: {
        Authorization: `Token ${store.token}`
      }
    })
    .then((res) => {
      console.log(res.data)
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
      console.log(res.data)
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
        url: `${LOCAL_URL}/community/detail/like/${articleId}/`, // URL 수정
        headers: {
          Authorization: `Token ${store.token}`
        }
      })
      isLiked.value = response.data.is_liked
      likeCount.value = response.data.like_count

    } catch (err) {
      console.log('좋아요 기능 처리 중 에러', err);
    }
  };

  // 댓글
  const fetchComments = async (articleId) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${LOCAL_URL}/community/comments/${articleId}/`,
        headers: {
          Authorization: `Token ${store.token}`
        }
      })
      console.log(response.data)
      comments.value = response.data
    } catch (err) {
      console.log('댓글 조회 기능 처리 중 에러', err);
    }
  }

  const createComment = async (articleId, content) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${LOCAL_URL}/community/comments/${articleId}/`,
        headers: {
          Authorization: `Token ${store.token}`
        },
        data: {
          'content': content
        }
      })
      comments.value.push(response.data)
    } catch (err) {
      console.log('댓글 생성 기능 처리 중 에러', err);
    }
  }


  return  {SERVER_URL, LOCAL_URL, articles, isLiked, likeCount, store, comments,
    fetchComments, getArticles, createArticle, favoriteArticle, createComment}
}, {persist: true})
