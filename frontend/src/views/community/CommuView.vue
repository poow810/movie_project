<template>
  <!-- 글쓰기 -->
  <div>
    <button @click="router.push({name: 'create'})">새 글작성</button>
  </div>
  <CommunityArticleList 
  v-for="article in store.articles.posts"
  :key="article.id"
  :article="article"
  @click="router.push({name: 'articleDetail', params: {'id': article.id}})"
  />    
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import CommunityArticleList from '@/components/community/CommunityArticleList.vue'
import { useArticleStore } from '@/stores/articleStore'

const store = useArticleStore()
const router = useRouter()

onMounted(() => {
  store.getArticles()
})
</script>

<style scoped>

</style>