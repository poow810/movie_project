<template>
  <div>
    <h1>미리보기</h1>
    <iframe id="player" type="text/html" width="640" height="360"
      :src="`https://www.youtube.com/embed/${videoId}`" frameborder="0"
      allowfullscreen>
    </iframe>
    <!-- <YouTube 
      :src="videoUrl" 
      @ready="onReady"
      ref="youtube" /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import YouTube from 'vue3-youtube';

const videoId = 'UPSPBnrqNmk'; // 여기에 원하는 YouTube 비디오 ID를 넣으세요.
const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
const youtube = ref(null);

function onReady() {
  youtube.value.playVideo();
}
</script>

<style scoped>

</style>