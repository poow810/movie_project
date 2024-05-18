<template>
  <!-- 글쓰기 -->
  <div>
    <button @click="router.push({name: 'create'})">새 글작성</button>
  </div>
  <div>
    <CommunityArticleList />    
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import CommunityArticleList from '@/components/community/CommunityArticleList.vue'
const router = useRouter()

</script>

<style scoped>

</style>