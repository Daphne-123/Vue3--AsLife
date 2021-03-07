<template>
  <div class="news-detail-container">
    <van-loading v-if="isLoading" vertical>加载中</van-loading>
    <div v-else>
      <section class="title-wrapper">
        <p class="title">{{ newsInfo.title }}</p>
        <p class="desc">
          <span>点击量：{{ newsInfo.click_count }}</span>
          <span>作者：{{ newsInfo.author }}</span>
          <span>发布时间：{{ newsInfo.add_time }}</span>
        </p>
      </section>
      <section class="content-wrapper">
        <div class="banner">
          <img :src="newsInfo.img_url" />
        </div>
        <div class="content" v-html="newsInfo.content"></div>
      </section>
      <section class="comment-wrapper">
        <van-field
          label-width="2em"
          class="comment-input"
          v-model="commentMessage"
          rows="2"
          autosize
          label="评论"
          type="textarea"
          maxlength="200"
          placeholder="请输入评论"
          show-word-limit
        />
      </section>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Loading, Field } from 'vant';
import axios from 'axios';

export default {
  name: 'NewsDetail',
  components: {
    [Loading.name]: Loading,
    [Field.name]: Field,
  },
  setup() {
    const router = useRouter();
    const { id } = router.currentRoute.value.params;
    const newsInfo = ref({});
    const isLoading = ref(true);
    const commentMessage = ref('');

    onMounted(async () => {
      const { data } = await axios({
        url: 'http://www.barteam.cn:8086/news/newsinfo',
        method: 'get',
        params: {
          newsid: id,
        },
      });

      if (data.Status === 0) {
        newsInfo.value = {
          title: data.Data[0].title,
          author: data.Data[0].author,
          add_time: new Date(data.Data[0].add_time).toLocaleDateString(),
          click_count: data.Data[0].click_count,
          img_url: data.Data[0].img_url,
          content: data.Data[0].content,
        };
        isLoading.value = false;
      }
    });

    return {
      newsInfo,
      isLoading,
      commentMessage,
    };
  },
};
</script>

<style>
.news-detail-container {
  padding: 10px 1rem 51px;
}
.news-detail-container .title-wrapper {
  border-bottom: 1px solid #eee;
}
.news-detail-container .title-wrapper .title {
  font-weight: bold;
  margin-bottom: 0.8rem;
}
.news-detail-container .title-wrapper .desc {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #aaa;
  padding-bottom: 0.6rem;
}
.news-detail-container .content-wrapper {
  margin-top: 0.6rem;
}
.news-detail-container .content-wrapper .banner img {
  width: 100%;
}
.news-detail-container .content-wrapper .content {
  font-size: 14px;
}
.news-detail-container .content-wrapper .content p {
  text-indent: 1em;
  margin-top: 0.5rem;
}
.news-detail-container .comment-wrapper {
  margin-top: 1rem;
  border: 1px solid #eee;
}
</style>
