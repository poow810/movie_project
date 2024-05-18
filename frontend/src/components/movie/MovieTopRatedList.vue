<template>
  <div>
    <h4>평점이 높은 영화</h4>
    <!-- Swiper -->
    <swiper :slides-per-view="5" :space-between="5" class="mySwiper">
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
const movies = store.ratedMovies 
onMounted(() => {
  console.log('ok')
  store.getRatedMovies()
})

</script>

<style scoped>
.mySwiper .swiper-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mySwiper img {
  width: 100%; /* 이미지의 너비를 슬라이드에 맞춥니다. */
  object-fit: cover; /* 이미지가 비율을 유지하면서 컨테이너에 꽉 차도록 합니다. */
}

.mySwiper h3, .mySwiper p {
  text-align: center; /* 텍스트를 가운데 정렬합니다. */
}
</style>