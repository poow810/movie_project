<template>
  <div>
    <h3>영화 상세 페이지</h3>
    <movieDetail 
    :movieId="movieId"
    />
  </div>
</template>

<script setup>
import movieDetail from "@/components/movie/detail/movieDetail.vue"
import { useRoute } from "vue-router"

const route = useRoute()
const movieId = route.params.id

</script>