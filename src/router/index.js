import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/home.vue';
import News from '../components/news/news.vue';
import NewsDetail from '../components/news/news-detail.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/home/news', component: News },
    { path: '/home/news/:id', component: NewsDetail },
  ],
});

export default router;
