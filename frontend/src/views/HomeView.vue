<template>
  <div>
    <MovieRecentTrailer />
    <MovieNowPlayingList />
    <MovieTopRatedList />
    <MovieGenreList />
  </div>
</template>

<script setup>
import MovieRecentTrailer from '@/components/movie/MovieRecentTrailer.vue'
import MovieNowPlayingList from '@/components/movie/MovieNowPlayingList.vue'
import MovieTopRatedList from '@/components/movie/MovieTopRatedList.vue'
import MovieGenreList from '@/components/movie/MovieGenreList.vue'
</script>

<style scoped>

</style>