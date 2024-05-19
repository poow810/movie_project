<template>
  <div>
    <ul>
      <div
        v-for="article in store.articles.posts"
        :key="article.pk"
      >
        <h3 @click="router.push({ name: 'articleDetail', params: { 'id': article.id } })">{{ article.id }}번 게시글</h3>
        <p>작성자 : {{ article.category }}</p>
        <p>제목 : {{ article.title }}</p>
        <p>내용 : {{ article.content }}</p>
        <hr>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/articleStore'
const store = useArticleStore()
const router = useRouter()

onMounted(() => {
  store.getArticles()
})
</script>

<style scoped>

</style>