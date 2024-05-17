<template>
  <div>
    <h2>상영중인 영화</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
        <p>상영 시간: {{ movie.showtime }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/movieStore'

const movies = store.movies
const store = useMovieStore()
onMounted(() => {
  store.getMovies()
}),
</script>

<style scoped>

</style>