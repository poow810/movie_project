<template>
  <div>
    <h3>영화 상세 페이지</h3>
    <MovieDetail 
    :movieId="movieId"
    />
  </div>
</template>

<script setup>
import MovieDetail from "@/components/movie/detail/MovieDetail.vue"
import { useRoute } from "vue-router"

const route = useRoute()
const movieId = route.params.id

</script>