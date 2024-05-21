<template>
  <div class="text-white">
    <p class="fs-5">장르별 영화 리스트</p>
    <!-- Swiper -->
    <swiper :slides-per-view="5" :space-between="5" class="mySwiper d-flex">
      <swiper-slide v-for="movie in movies" :key="movie.id" class="m-1">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}` " class="rounded-2"/>
        <p class="fs-5">{{ movie.title }}</p>
        <p class="fs-6">평점: {{ movie.vote_average }}</p>
      </swiper-slide>
    </swiper>
  </div>
  
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useMovieStore } from '@/stores/movieStore'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const store = useMovieStore()
const movies = ref([])
onMounted(async () => {
  await store.getGenreList(); // 장르 목록 먼저 가져오기
  // 예시: 첫 번째 장르의 ID로 인기 영화 가져오기
  // 실제로는 사용자가 선택한 장르 ID를 인자로 전달해야 합니다.
  if (store.genreMovies.genres && store.genreMovies.genres.length > 0) {
    const genreId = store.genreMovies.genres[0].id;
    await store.getPopularMoviesByGenre(genreId); // 장르별 인기 영화 가져오기
    movies.value = store.genreMovies; // 가져온 영화 목록을 movies에 할당
  }
});

</script>

<style scoped>
.mySwiper .swiper-slide {
  flex-direction: column;
  align-items: center;
}

.mySwiper img {
  width: 200px; /* 이미지의 너비를 150px로 설정 */
  height: auto; /* 높이를 자동으로 맞춤 */
  object-fit: cover; /* 이미지가 비율을 유지하면서 컨테이너에 꽉 차도록 합니다. */
}

.mySwiper h3, .mySwiper p {
  text-align: center; /* 텍스트를 가운데 정렬합니다. */
}
</style>