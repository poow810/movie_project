<template>
  <div>
    <button @click="router.push({name: 'create'})">글쓰기</button>
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