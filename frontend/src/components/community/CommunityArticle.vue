<template>
  <div>
    <h1>글쓰기</h1>
    <form @submit.prevent="submitData">
      <label for="category">카테고리</label>
      <select name="분류">
        <option value="">분류</option>
        <option value="movie"> 영화 </option>
        <option value="actor"> 배우 </option>
        <option value="treshtalk"> 잡담 </option>
      </select>

      <label for="title">제목: </label>
      <input type="text" id="title">
      
      <label for="content">내용: </label>
      <input type="textarea" id="content">

      <button @submit.prevent="submitData">완료</button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useArticleStore } from '@/stores/articleStore'

const store = useArticleStore()

const category = ref('')
const title = ref('')
const content = ref('')

const submitData = function () {
  const article = {
    title: title.value,
    content: content.value,
    category: category.value,
  }
  store.createArticle(article)
  category.value = ''
  title.value = ''
  content.value = ''
}
</script>

<style scoped>

</style>