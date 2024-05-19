<template>
    <div>
        <div>
          <img :src="selectedImage" @click="showModal = true" alt="Selected" style="cursor: pointer;">
          <div v-if="showModal" @click.self="showModal = false" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5);">
            <div style="background: white; padding: 20px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
              <h3>이미지 선택</h3>
              <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                <!-- 이미지 목록 -->
                <img v-for="(image, index) in images" :key="index" :src="image" @click="selectImage(index)" alt="Option" style="width: 100px; cursor: pointer;">
              </div>
            </div>
          </div>
        </div>
        <div>
            <span>팔로워 수: {{ user.followers }}명</span>
            <hr>
            <span>팔로잉 수: {{ user.followings }}명</span>
            <hr>
            <span>{{ user.username }}</span>
            <span>{{ user.nickname }}</span>
            <div v-if="user_id==userId"><button>닉네임 변경</button></div>
            <div v-else><button @click="following(user_id)">팔로잉</button></div>
            <hr>
            <span>작성한 리뷰 수: </span>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'
import { useProfileStore } from '@/stores/profileStore'
import { useUserStore } from '@/stores/userStore'
import noimage from '@/assets/static/noimage.png'
import image1 from '@/assets/static/cinnamoroll.png'
import image2 from '@/assets/static/kitty.png'
import image3 from '@/assets/static/kuromi.png'
import image4 from '@/assets/static/mymelody.png'
import image5 from '@/assets/static/pompompurin.png'

defineProps({
    user_id:String,
    user:Object,
})

// 이미지 배열
const images = [noimage, image1, image2, image3, image4, image5]

// 프로필 스토어 사용
const profileStore = useProfileStore()
const userStore = useUserStore()
const userId = userStore.userId

// 유저 팔로잉
const following = (user_id) => {
    profileStore.userFollowing(user_id)
}

// 선택된 이미지와 모달 상태
const selectedImage = ref(images[0]) // 기본 이미지로 noimage 설정
const showModal = ref(false)

// 이미지 선택 함수
function selectImage(index) {
    selectedImage.value = images[index]
    showModal.value = false
    updateUserImage(index)
}

// 사용자 이미지 업데이트 함수
function updateUserImage(imageIndex) {
    axios({
        method: 'PUT',
        url: `${profileStore.LOCAL_URL}/profile/${userStore.userId}/`,
        headers: {
            'Authorization': `Token ${userStore.token}`
        },
        data: {
            user_image: imageIndex
        }
    })
    .then(res => {
        console.log('이미지 업데이트 성공:', res.data)
    })
    .catch(err => {
        console.error('이미지 업데이트 실패:', err)
    })
}

// 프로필 데이터 가져오기
watch(() => profileStore.userImage, (newValue) => {
    selectedImage.value = images[newValue] || noimage
})

if (profileStore.userImage !== null) {
    selectedImage.value = images[profileStore.userImage] || noimage
} else {
    selectedImage.value = noimage
}
</script>

<style scoped>
/* 스타일 작성 */
</style>
