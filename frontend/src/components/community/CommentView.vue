<template>
  <div>
    <h4>댓글</h4>
    <div v-for="comment in articleStore.comments" :key="comment.id">
        <img :src="images[comment.user.user_image]"  alt="User Image" style="width: 50px; height: 50px;">
        {{ comment.user.nickname }}
        {{ comment.content }}
        {{ formatDate(comment.created_at) }}
    </div>
    <form @submit.prevent="createComment">
      <input type="text" v-model="comment" placeholder="댓글을 남겨보세요">
      <button type="submit">등록</button>
    </form>    
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useArticleStore } from '@/stores/articleStore'
import noimage from '@/assets/static/noimage.png'
import image1 from '@/assets/static/cinnamoroll.png'
import image2 from '@/assets/static/kitty.png'
import image3 from '@/assets/static/kuromi.png'
import image4 from '@/assets/static/mymelody.png'
import image5 from '@/assets/static/pompompurin.png'

const images = [noimage, image1, image2, image3, image4, image5]


const { articleId } = defineProps({
  articleId: Number,
})

const articleStore = useArticleStore()
const comment = ref('')

const createComment = () => {
  if (comment.value.trim()) { 
    articleStore.createComment(articleId, comment.value)
    comment.value = ''
  }
}

watch(() => articleId, (newVal, oldVal) => {
  if (newVal !== undefined && newVal !== oldVal) {
    articleStore.fetchComments(newVal)
  }
}, { immediate: true }) // 컴포넌트가 마운트될 때 즉시 실행


const formatDate = function(dateString) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('ko-KR', options);
  return formattedDate.replace(/\. /g, '.').replace(/, /g, ' ');
}
</script>
