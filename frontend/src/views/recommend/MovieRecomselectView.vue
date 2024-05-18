<template>
  <div>
    <select v-model="select">
      <option disabled value="">장르를 선택해주세요</option>
      <option v-for="selectGenre in selectGenres" value="select">{{ selectGenre }}</option>
    </select>
    <button @click="submitSelect">완료</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRecomStore } from '@/stores/recomStore'

const store = useRecomStore()

const select = ref(null)
const selectGenre = [
  18, 10770, 28, 18, 35, 27, 28, 12, 80, 18, 878
] 

const submitSelect = () => {
  getGenreToServer(select.value)
}

</script>

<style scoped>

</style>