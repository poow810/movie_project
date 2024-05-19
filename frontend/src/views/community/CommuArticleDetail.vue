<template>
  <div v-if="article">
    <h1>게시글 상세페이지</h1>
    <hr>
    {{ article.title }}
    <br>
    {{ article.content }}
    <br>
    <button @click="handleFavorite(article.id)">
      좋아요 ({{ article.like_count }})
    </button>
  </div>
  <div v-else>게시글 불러오는 중..</div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/articleStore'

const articleStore = useArticleStore()
const route = useRoute()
const article = ref(null)

const fetchArticle = async (id) => {
  axios({
    method: 'get',
    url: `${articleStore.LOCAL_URL}/community/detail/${id}/`,
    headers: {
      Authorization: `Token ${articleStore.store.token}`
    }
  })
  .then((res) => {
    article.value = res.data
  })
  .catch((err) => {
    console.log('게시글을 가져오는 중 에러가 발생했습니다', err)
  })
}

const favoriteArticle = async (articleId) => {
  // '좋아요' 처리를 위한 API 요청
  // 이 부분은 실제 API 엔드포인트와 요청 방식에 맞게 수정해야 합니다.
  axios({
    method: 'post', // '좋아요' 처리를 위해 'post' 메서드 사용 (실제 메서드는 API에 따라 다를 수 있음)
    url: `${articleStore.LOCAL_URL}/community/like/${articleId}/`, // 가정한 '좋아요' API 엔드포인트
    headers: {
      Authorization: `Token ${articleStore.store.token}`
    }
  })
  .then((res) => {
    article.value.like_count = res.data.like_count // 응답으로 받은 '좋아요' 수로 업데이트
  })
  .catch((err) => {
    console.log('좋아요 처리 중 에러가 발생했습니다', err)
  })
}

// '좋아요' 버튼 클릭 시 실행되는 함수
const handleFavorite = (articleId) => {
  favoriteArticle(articleId);
}

onMounted(() => {
  const articleId = route.params.id
  if (articleId) {
    fetchArticle(articleId)
  }
})
</script>

<style scoped>
button {
  margin-top: 10px;
}
</style>