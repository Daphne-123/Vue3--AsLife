<template>
  <div class="news-container">
    <van-list :loading="loading" @load="loadNews">
      <van-cell
        title-class="news-title"
        v-for="(news, index) in newsList"
        :key="index"
        :title="news.title"
        is-link
        :to="`/home/news/${news.id}`"
      >
        <template #label>
          <div class="custom-label">
            <span>点击量：{{ news.click_count }}</span>
            <span>作者：{{ news.author }}</span>
          </div>
        </template>
        <template #right-icon></template>
      </van-cell>
    </van-list>
    <div class="tips" v-if="finish">已经到底了~</div>
  </div>
</template>

<script>
import { List, Cell } from 'vant';
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
  name: 'News',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
  },
  setup() {
    const newsList = ref([]);
    const loading = ref(true);
    const finish = ref(false);
    const pageIndex = ref(1);
    const pageSize = 10;

    const loadNews = async () => {
      if (!finish.value) {
        const { data } = await axios({
          url: 'http://www.barteam.cn:8086/news/newslist',
          params: {
            pageindex: pageIndex.value++,
            pagesize: pageSize,
          },
        });

        if (data.Status === 0) {
          newsList.value = [...newsList.value, ...data.Data];
          loading.value = false;
          if (data.Data.length < pageSize) {
            finish.value = true;
          }
        }
      }
    };

    onMounted(() => {
      loadNews();
    });

    return {
      loading,
      loadNews,
      newsList,
      finish,
    };
  },
};
</script>

<style>
.news-container {
  padding-bottom: 50px;
}

.news-container .news-title {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-container .tips {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  font-size: 12px;
  color: #aaa;
}

.news-container .custom-label {
  display: flex;
  justify-content: space-between;
}
</style>
