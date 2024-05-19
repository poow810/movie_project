<template>
    <div>
      <!-- 기본 이미지 -->
      <img :src="selectedImage" @click="showModal = true" alt="Selected" style="cursor: pointer;">
  
      <!-- 이미지 선택 모달 -->
      <div v-if="showModal" @click.self="showModal = false" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5);">
        <div style="background: white; padding: 20px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
          <h3>이미지 선택</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <!-- 이미지 목록 -->
            <img v-for="(image, index) in images" :key="index" :src="image" @click="selectImage(image)" alt="Option" style="width: 100px; cursor: pointer;">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  // 이미지 import
  import image1 from '@/assets/static/cinnamoroll.png'
  import image2 from '@/assets/static/kitty.png'
  import image3 from '@/assets/static/kuromi.png'
  import image4 from '@/assets/static/mymelody.png'
  import image5 from '@/assets/static/pompompurin.png'
  
  // 이미지 배열
  const images = [image1, image2, image3, image4, image5]
  
  // 선택된 이미지와 모달 상태
  const selectedImage = ref(images[0]) // 기본 이미지로 첫 번째 이미지 설정
  const showModal = ref(false)
  
  // 이미지 선택 함수
  function selectImage(image) {
    selectedImage.value = image
    showModal.value = false
  }
  </script>
  
  <style scoped>
  /* 스타일 작성 */
  </style>
  