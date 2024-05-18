<template>
  <div>
    <h2>평점 순 영화 목록</h2>
    <ul>
      <li v-for="(movie, index) in moviesByRating" :key="'rating' + index">
        {{ movie.title }} - 평점: {{ movie.rating }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRecomStore } from '@/stores/recomStore'

const recomStore = useRecomStore()

const moviesByRating = computed(() => {
  return [...recomStore.userSetGenre].sort((a, b) => b.rating - a.rating)
})
</script>