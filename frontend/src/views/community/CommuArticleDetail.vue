<template>
  <div>
    <h1>제목</h1>
    <hr>
    <h1>내용</h1>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/articleStore'

const articleStore = useArticleStore()
const route = useRoute()

onMounted(() => {
  axios({
    method: 'get',
    url: `${articleStore.}`
  })
  .then()
  .catch()
})
</script>

<style scoped>

</style>