<template>
    <div>
        <ProfileDetailView 
        :followers="store.followers_count"
        :followings="store.followings_count"
        :user_id="user_id"
        />
    </div>
</template>

<script setup>
import ProfileDetailView from '@/components/profile/ProfileDetailView.vue'
import { onMounted } from 'vue'
import { useProfileStore } from '@/stores/profileStore.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const user_id = route.params.id
const store = useProfileStore()

onMounted(() => {
    store.getProfile(user_id)
})
</script>