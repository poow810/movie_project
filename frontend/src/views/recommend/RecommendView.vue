<template>
    <div>
        <div v-if="isSelected">
            <MovieRecomView />
            <button @click="reload">재추천</button>
        </div>
        <div v-else>
            <MovieRecomselectView />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRecomStore } from '@/stores/recomStore'
import MovieRecomselectView from '@/components/recommend/MovieRecomselectView.vue'
import MovieRecomView from '@/components/recommend/MovieRecomView.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const recomStore = useRecomStore()

const isSelected = computed(() => {
    return recomStore.isSelect
})

const reload = () => {
    recomStore.resetUserSetGenre()
    router.push({name : "recommend"})
}

</script>