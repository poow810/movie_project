<template>
  <div>
    <h2>인기도 순 영화 목록</h2>
    <ul>
      <li v-for="(movie, index) in moviesByPopularity" :key="'popularity' + index">
        {{ movie.title }} - 인기도: {{ movie.popularity }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRecomStore } from '@/stores/recomStore'

const recomStore = useRecomStore()

const moviesByPopularity = computed(() => {
  return [...recomStore.userSetGenre].sort((a, b) => b.popularity - a.popularity)
})
</script>
