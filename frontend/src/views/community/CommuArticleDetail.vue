<template>
  <div>
    <h1>디테일</h1>
    <hr>
    <div v-if="article">
      <p>글 번호: {{ article.id }}</p>
      <p>글 제목: {{ article.title }}</p>
      <p>글 내용: {{ article.content }}</p>
    </div>
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

onMounted(async () => {
  axios({
    method: 'get',
    url: `${articleStore.LOCAL_URL}/community/${route.params.id}`,
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
  .then((res) => {
    article.value = res.data
    console.log(res.data)
  })
  .catch((err) => { console.log(err) })
})
</script>

<style scoped>

</style>