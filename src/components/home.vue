<!--
 * @Author: Mengyu Xu
 * @Date: 2020-12-24 12:51:25
 * @LastEditTime: 2020-12-30 11:12:52
 * @FilePath: \adminc:\Users\Meng\Documents\Code\aslife\src\components\home.vue
-->
<template>
  <div class="home-container">
    <van-swipe
      class="swiper-wrapper"
      indicator-color="#ee0a24"
      :autoplay="3000"
      x
    >
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
        <img class="swiper-img" :src="item.img_url" />
      </van-swipe-item>
    </van-swipe>
    <van-grid class="grid-nav" :column-num="3">
      <van-grid-item to="/home/news" icon="newspaper-o" text="新闻" />
      <van-grid-item
        v-for="value in 8"
        :key="value"
        icon="photo-o"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem } from 'vant';
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
  name: 'Home',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  setup() {
    const swiperList = ref([]);

    onMounted(async () => {
      const { data } = await axios({
        url: 'http://www.barteam.cn:8086/sliderlist',
        method: 'get',
      });
      if (data.Status === 0) {
        swiperList.value = data.Data;
      }
    });

    return {
      swiperList,
    };
  },
};
</script>

<style>
.home-container {
  height: 100%;
}
.home-container .swiper-wrapper,
.home-container .swiper-wrapper .swiper-img {
  width: 100%;
  height: 190px;
}

.home-container .grid-nav {
  height: calc(100% - 190px);
}
</style>
