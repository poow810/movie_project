<template>
    <div class="container mt-5 p-4 rounded" style="background-color: #2C2C2C;">
      <ProfileDetailView
        :user="user"
        :user_id="user_id"
      />
    </div>
  </template>
  
  <script setup>
  import ProfileDetailView from '@/components/profile/ProfileDetailView.vue'
  import { onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useProfileStore } from '@/stores/profileStore.js'
  
  const route = useRoute()
  const user_id = route.params.id
  const profileStore = useProfileStore()
  const username = profileStore.userName
  const nickname = profileStore.nickName
  const followers = profileStore.followers_count
  const followings = profileStore.followings_count
  
  const user = { username, nickname, followers, followings }
  onMounted(() => {
      profileStore.getProfile(user_id)
  })
  </script>
  
  <style scoped>
  body {
    background-color: #2C2C2C;
    color: #ffffff;
  }
  
  h1, label {
    color: #ffffff;
  }
  
  .form-control {
    background-color: #2C2C2C;
    color: #ffffff;
    border: 1px solid #CCB15F;
  }
  
  .form-control:focus {
    background-color: #2C2C2C;
    border-color: #CCB15F;
    box-shadow: none;
  }
  
  .btn-primary {
    background-color: #CCB15F;
    border-color: #CCB15F;
  }
  
  .btn-primary:hover {
    background-color: #B89D50;
    border-color: #B89D50;
  }
  
  .text-center {
    text-align: center;
  }
  </style>
  