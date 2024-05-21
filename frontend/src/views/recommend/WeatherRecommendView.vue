<template>
  <div class="d-flex justify-content-center">
    <div class="flex-column">
      <h1>날씨 기반 추천 영화</h1>
      <p>오늘의 날씨: {{ weather }}</p>
      <img :src="`https://image.tmdb.org/t/p/original`+movieRecommend.poster_path" class="card-img-top" alt="...">
      <p v-if="movieRecommend">{{ movieRecommend.title }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const movieRecommend = ref([])
const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY
const weather = ref('')

async function getWeather() {

  navigator.geolocation.getCurrentPosition(async position => {

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&lang=kr&units=metric`
    })
    .then((response) => {
      const weatherData = response.data
      recommendMovie(weatherData)
    })
    .catch((error) => {
      console.log(error)
    })
  })
}

function recommendMovie(weatherData) {
  const mainWeather = weatherData.weather[0].main;
  let genreId

  switch (mainWeather) {
    case 'Clear':
      genreId = 10749 // 로맨스
      weather.value = '맑음'
      break
    case 'Clouds':
      genreId = 18 //드라마
      weather.value = '흐림'
      break
    case 'Rain':
      genreId = 53 //스릴러
      weather.value = '비'
      break
    default:
      genreId = 35 //코미디
      weather.value = mainWeather
  }

  console.log(movieStore.MovieList)
  const filterMovies = movieStore.MovieList.filter(movie => movie.genre_ids.includes(genreId))
  const randomMovie = filterMovies[Math.floor(Math.random() * filterMovies.length)]
  movieRecommend.value = randomMovie
}

onMounted(() => {
  getWeather()
})
</script>

<style scoped>
img {
  width: 500px;
  height: 700px;
}
</style>