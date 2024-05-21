<template>
  <div>
    <h1>디테일</h1>
    <hr>
    <div v-if="article">
      <h1>게시글 상세페이지</h1>
      <hr>
      게시글 제목: {{ article.title }}
      <br>
      게시글 내용: {{ article.content }}
      <br>
      조회수: {{ article.click_count }}
      <button @click="handleFavorite(article.id)">
        좋아요 ({{ articleStore.likeCount }})
      </button>
      <hr>
      <CommentView v-if="article.id" :articleId="article.id" :key="article.id"/>
    </div>
    <div v-else>게시글 불러오는 중..</div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useArticleStore } from '@/stores/articleStore'
import CommentView from '@/components/community/CommentView.vue';

const articleStore = useArticleStore()
const userStore = useUserStore()
const route = useRoute()

const article = ref(null) // 초기값을 null로 변경
const postId = route.params.id

const getDetailPost = async (postId) => {
  try {
    const res = await axios({
      url: `http://192.168.214.72:8000/community/detail/${postId}/`,
      method: 'GET',
      headers: {
        Authorization: `Token ${userStore.token}`
      }
    });
    console.log(res.data);
    article.value = res.data;
  } catch (err) {
    console.log(err);
  }
}

const handleFavorite = (postId) => {
  articleStore.favoriteArticle(postId)
}

onMounted(() => {
  getDetailPost(postId)
})
</script>

<style scoped>
button {
  margin-top: 10px;
}
</style>
