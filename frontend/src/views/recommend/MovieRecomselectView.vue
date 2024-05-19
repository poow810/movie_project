<template>
  <div class="genre-selection">
    <div v-for="genre in selectGenres" :key="genre.id" class="genre-item" @click="toggleSelect(genre.id)">
      <img :src="genre.image" :alt="genre.name" class="genre-image" :class="{'selected': select.includes(genre.id)}">
      <p>{{ genre.name }}</p>
    </div>
    <button @click="submitSelect">완료</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRecomStore } from '@/stores/recomStore'
const store = useRecomStore()

// 선택된 장르들을 관리할 ref
const select = ref([])
const selectGenres = [
  { id: 28, name: "Action", image: "/path/to/action.jpg" },
  { id: 12, name: "Adventure", image: "/path/to/adventure.jpg" },
  { id: 16, name: "Animation", image: "/path/to/animation.jpg" },
  { id: 35, name: "Comedy", image: "/path/to/comedy.jpg" },
  { id: 80, name: "Crime", image: "/path/to/crime.jpg" },
  { id: 99, name: "Documentary", image: "/path/to/documentary.jpg" },
  { id: 18, name: "Drama", image: "/path/to/drama.jpg" },
  { id: 10751, name: "Family", image: "/path/to/family.jpg" },
  { id: 14, name: "Fantasy", image: "/path/to/fantasy.jpg" },
  { id: 36, name: "History", image: "/path/to/history.jpg" },
  { id: 27, name: "Horror", image: "/path/to/horror.jpg" },
  { id: 10402, name: "Music", image: "/path/to/music.jpg" },
  { id: 9648, name: "Mystery", image: "/path/to/mystery.jpg" },
  { id: 10749, name: "Romance", image: "/path/to/romance.jpg" },
  { id: 878, name: "Science Fiction", image: "/path/to/science-fiction.jpg" },
  { id: 10770, name: "TV Movie", image: "/path/to/tv-movie.jpg" },
  { id: 53, name: "Thriller", image: "/path/to/thriller.jpg" },
  { id: 10752, name: "War", image: "/path/to/war.jpg" },
  { id: 37, name: "Western", image: "/path/to/western.jpg" }
];

// 장르 선택 및 선택 해제 토글
const toggleSelect = (genreId) => {
  const index = select.value.indexOf(genreId);
  if (index > -1) {
    // 이미 선택된 장르 해제
    select.value.splice(index, 1);
  } else {
    // 장르 선택
    select.value.push(genreId);
  }
}

// 선택된 장르 서버로 전송
const submitSelect = () => {
  if (select.value.length >= 2) {
    store.getGenreToServer(select.value)
  } else {
    alert("두 개 이상의 장르를 선택해주세요!")
  }
}


</script>

<style scoped>
.genre-selection {
  display: flex;
  flex-wrap: wrap;
}
.genre-item {
  cursor: pointer;
  margin: 10px;
}
.genre-image {
  width: 100px; /* 이미지 크기 조절 */
  height: 100px;
  object-fit: cover;
}
.genre-image.selected {
  border: 2px solid orange; /* 선택된 항목 표시 */
}
</style>