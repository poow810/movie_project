<template>
  <!-- 글쓰기 -->
  <p class="fs-3 mt-3">자유게시판</p>
  <hr>
  <table class="table table-striped table-hover">
    <thead>
    <tr>
      <th>작성자</th>
      <th style="width: 50px;">분류</th>
      <th>제목</th>
      <th>내용</th>
      <th>좋아요❤</th>
      <th>조회수</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="article in store.articles.posts" :key="article.id" @click="goToDetail(article.id)">
        <td>{{ article.user.username }}</td>
        <td>{{ categoryNames[article.category] || '알 수 없음' }}</td>
        <td>{{ article.title }}</td>
        <td>{{ article.content }}</td>
        <td>{{ article.likes_count}}</td>
        <td>{{ article.click_count }}</td>
        <td>{{ article.comments_count }}</td>
      </tr>
    </tbody>
  </table> 
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
    <button class="btn btn-secondary btn-lg" @click="router.push({name: 'create'})">새 글작성</button>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore';

const store = useArticleStore();
const router = useRouter();
const category = ref(null);

const categoryNames = {
  1: '영화',
  2: '배우',
  3: '잡담'
};

onMounted(async () => {
  await store.getArticles();
  if (store.articles.posts.length > 0) {
    category.value = categoryNames[store.articles.posts[0].category] || '알 수 없음';
  } else {
    category.value = 'No Category';
  }
});

const goToDetail = (id) => {
  router.push({ name: 'articleDetail', params: { id } });
};
</script>

<style scoped>

</style>