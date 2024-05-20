<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <div v-if="movieStore.isLiked"><button @click="movieLike">좋아요 취소</button></div>
    <div v-else><button @click="movieLike">좋아요</button></div>
    <p>좋아요 개수: {{ movieStore.likeCount }}</p>
    <img :src="movie.poster_path" alt="Movie Poster">
    <p>{{ movie.overview }}</p>
    <p>Release Date: {{ movie.release_date }}</p>
    <p>Popularity: {{ movie.popularity }}</p>
    <p>Average Vote: {{ movie.vote_avg }}</p>
    <h3>리뷰</h3>
    <MovieReview 
    :movieId="movieId"
    />
    <hr>
    <h3>리뷰 작성하기</h3>
    <router-link :to="{name:'review', params: {id: movieId}}">작성 하기</router-link>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRecomStore } from '@/stores/recomStore.js'
import { useMovieStore } from '@/stores/movieStore'
import MovieReview from '@/components/movie/detail/MovieReview.vue'

const { movieId } = defineProps({
  movieId: String,
})

const recomStore = useRecomStore()
const movieStore = useMovieStore()
const movie = ref(null)

const movieLike = () => {
  movieStore.movieLike(movieId)
}

onMounted(() => {
  const foundMovie = recomStore.userSetGenre.find(m => m.movie_id === Number(movieId))
  if (foundMovie) {
    movie.value = {
      title: foundMovie.title,
      poster_path: `https://image.tmdb.org/t/p/original${foundMovie.poster_path}`,
      overview: foundMovie.overview,
      release_date: foundMovie.release_date,
      popularity: foundMovie.popularity,
      vote_avg: foundMovie.vote_avg,
    }
  }
})
</script>
