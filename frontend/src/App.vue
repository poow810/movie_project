<script setup>
import { computed, ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useMovieStore } from '@/stores/movieStore';
const userStore = useUserStore()
const searchText = ref('')
const movieStore = useMovieStore()

const id = computed(() => {
  return userStore.userId
})

const searchMovie = () => {
  movieStore.searchMovie(searchText.value)
  searchText.value = ''
}

const logOut = function () { 
  userStore.logOut()
}

onMounted(() => {
  console.log(userStore.isLogIn)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #1b1b1b;">
    <div class="container-fluid">
      <RouterLink class="navbar-brand text-white" to="/">H&J RecomMans</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active text-white" aria-current="page" :to="{ name: 'actor' }">배우</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-white" :to="{ name: 'community' }">커뮤니티</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              추천 알고리즘
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><RouterLink class="dropdown-item text-white" :to="{ name: 'recommend' }">영화추천</RouterLink></li>
              <li><RouterLink class="dropdown-item text-white" :to="{ name: 'weather' }">날씨추천</RouterLink></li>
              <li><hr class="dropdown-divider text-white"></li>
              <li><RouterLink class="dropdown-item text-white" href="#">Something else here</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item">
            <!-- <input class="nav-link disabled text-white" href="#" tabindex="-1" aria-disabled="true" v-model="searchText" @keypress.enter="searchMovie" placeholder="검색어를 입력해주세요."> -->
            <!-- <span class="input-group-text" id="basic-addon1" @click="searchMovie">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> -->
            <!-- </span> -->
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <form class="d-flex">
            <input class="form-control me-2 other" type="search" placeholder="영화를 입력해주세요 :)" @keypress.enter="searchMovie" aria-label="Search">
            <button @click="searchMovie" class="btn btn-outline-success other text-white" type="submit">Search</button>
          </form>
          <li class="nav-item">
            <RouterLink v-if="!userStore.isLogIn" class= "nav-link text-white" :to="{ name: 'signup' }">회원가입</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink v-if="!userStore.isLogIn" class="nav-link text-white" :to="{ name: 'login' }">로그인</RouterLink>
          </li>
          <li>
            <RouterLink v-if="userStore.isLogIn" class="nav-link text-white" :to="{ name: 'profile', params: {'id': id}}">프로필</RouterLink>
          </li>
          <li>
              <button v-if="userStore.isLogIn" class="btn btn-outline-success other text-white" @click="logOut">로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  

  <RouterView />
</template>



<style scoped>
.navbar-nav .nav-item {
  display: flex;
}
.dropdown-menu {
  border-radius: 5px;
  border-color: #CCB15F;
  background-color: black;
}
.navbar-toggler-icon {
  color: beige;
}
.navbar-toggler.collapsed {
  color: gray;
  border-color: gray;
  background-color: #1B1B1B;
}
.navbar-toggler {
  color: gray;
  border-color: #685a30;
  background-color: #1B1B1B;
}
span.navbar-toggler-icon {
  color: gray;
  border-color: #CCB15F;
}
.other {
  color: gray;
  border-color: #CCB15F;
  background-color: #1B1B1B;
  border-radius: 100px;
}

</style>
