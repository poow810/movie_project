<template>
  <div>
    <h4>장르별 영화 리스트</h4>
    <ul>
      <li v-for="movie in movies">
        <h2>{{ movie.title }}</h2>
        <h2>{{ movie.genre_id }}</h2>
        <h2>{{ movie.overview }}</h2>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/movieStore'
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import 'swiper/swiper-bundle.css';

const store = useMovieStore()
const movies = store.genreMovies 
onMounted(() => {
  console.log('ok')
  store.getGenreList()
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