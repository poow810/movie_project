<template>
  <div>
    <h1>디테일</h1>
    <hr>
    <div v-if="articleStore.detailPosts">
      <h1>게시글 상세페이지</h1>
      <hr>
      게시글 제목: {{ articleStore.detailPosts.title }}
      <br>
      게시글 내용: {{ articleStore.detailPosts.content }}
      <br>
      조회수: {{ articleStore.detailPosts.click_count }}
      <button @click="handleFavorite(articleStore.detailPosts.id)">
        좋아요 ({{ articleStore.detailPosts.like_count }})
      </button>
      <hr>
      <CommentView v-if="articleStore.detailPosts.id" :articleId="articleStore.detailPosts.id" :key="articleStore.detailPosts.id"/>
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

const handleFavorite = (postId) => {
  articleStore.favoriteArticle(postId)
}

onMounted(() => {
  articleStore.getDetailPost(postId)
})
</script>

<style scoped>
button {
  margin-top: 10px;
}
</style>
