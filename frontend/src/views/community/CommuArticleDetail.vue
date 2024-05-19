<template>
  <div>
    <h1>디테일</h1>
    <hr>
    <div v-if="article">
      <p>글 번호: {{ article.id }}</p>
      <p>글 제목: {{ article.title }}</p>
      <p>글 내용: {{ article.content }}</p>
    </div>
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
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/articleStore'
import { useUserStore } from '@/stores/userStore'

const article = ref(null)
const userStore = useUserStore()
const articleStore = useArticleStore()
const route = useRoute()


</script>

<style scoped>
button {
  margin-top: 10px;
}
</style>