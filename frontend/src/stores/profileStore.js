import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

export const useProfileStore = defineStore('profileStore', () => {
    const store = useUserStore()
    const router = useRouter()
    const SERVER_URL = 'http://43.202.204.222'
    const LOCAL_URL = 'http://192.168.0.13:8000'
    const followers_count = ref(null)
    const followings_count = ref(null)
    const isFollowing = ref(null)
    const userImage = ref(null)
    const userName = ref(null)
    const nickName = ref(null)
    const changeFollowerCount = ref(null)
    const review_count = ref(null)


    const getProfile = async (id) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `${LOCAL_URL}/profile/${id}`,
                headers: {
                    'Authorization': `Token ${store.token}`
                }
            });
            followers_count.value = res.data.followers_count;
            followings_count.value = res.data.followings_count;
            userImage.value = res.data.user_image;
            userName.value = res.data.username;
            nickName.value = res.data.nickname;
            review_count.value = res.data.review_count
        } catch (err) {
            console.error(err);
        }
    }

    const userFollowing = async (id) => {
        try {
            const res = await axios({
                method: 'POST',
                url: `${LOCAL_URL}/profile/follow/${id}/`,
                headers: {
                    'Authorization': `Token ${store.token}`
                }
            })

            followers_count.value = res.data.follower_count;
            followings_count.value = res.data.following_count;
            isFollowing.value = res.data.is_followed;
            changeFollowerCount.value = followers_count.value;
        } catch (err) {
            console.error(err);
        }
    }

    const changeNickname = async (id, nickname) => {
        try {
            const res = await axios({
                method: 'PUT',
                url: `${LOCAL_URL}/profile/change/${id}/`,
                headers: {
                    'Authorization': `Token ${store.token}`
                },
                data: {
                    'nickname': nickname
                }
            });

            nickName.value = res.data.nickname;
            // 닉네임 변경 후 프로필 다시 불러오기
            await getProfile(id);
        } catch (err) {
            console.error(err);
        }
    }


    return { SERVER_URL, LOCAL_URL, followers_count, followings_count, review_count, changeFollowerCount, isFollowing, userImage, userName, nickName, getProfile, userFollowing, changeNickname }
}, { persist: true })
