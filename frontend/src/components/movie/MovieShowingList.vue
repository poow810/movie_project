<template>
  <div>
    <h4>평점이 높은 영화</h4>
    <!-- Swiper -->
    <swiper :slides-per-view="3" :space-between="50" class="mySwiper">
      <swiper-slide v-for="movie in movies" :key="movie.id">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" />
        <h3>{{ movie.title }}</h3>
        <p>평점: {{ movie.vote_average }}</p>
        <!-- <p>줄거리: {{ movie.overview }}</p> -->
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/movieStore'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const store = useMovieStore()
const movies = store.movies
onMounted(() => {
  console.log('ok')
  store.getMovies()
})

</script>

<style scoped>

</style>