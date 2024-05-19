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
    const userImage = ref(null)

    const getProfile = (id) => {
        axios({
            method: 'GET',
            url: `${LOCAL_URL}/profile/${id}`,
            headers: {
                'Authorization': `Token ${store.token}`
            }
        })
        .then(res => {
            console.log(res.data)
            followers_count.value = res.data.followers_count
            followings_count.value = res.data.followings_count
            userImage.value = res.data.user_image
            console.log(followers_count.value)
        })
        .catch(err => { console.error(err) })
    }
    
    return  {SERVER_URL, LOCAL_URL, followers_count, followings_count, userImage, getProfile}
}, {persist: true})
