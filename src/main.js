import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import 'vant/lib/index.css';

createApp(App).use(router).mount('#app');
