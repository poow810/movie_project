<template>
  <div>
    <h2>상영중인 영화</h2>
    <ul>
      <MovieShowingList 
        v-for="movie in store.movies"
        :key="movie.id"
        :movie="movie"
      />
    </ul>
  </div>
</template>

<script setup>
import MovieShowingList from '@/components/movie/MovieShowingList.vue'
import { useMovieStore } from '@/stores/movieStore'

const store = useMovieStore()

</script>

<style scoped>

</style>