<!--
 * @Author: Mengyu Xu
 * @Date: 2020-12-24 12:00:42
 * @LastEditTime: 2020-12-30 11:13:31
 * @FilePath: \adminc:\Users\Meng\Documents\Code\aslife\src\App.vue
-->
<template>
  <div class="app-container">
    <van-nav-bar
      :left-arrow="showBack"
      @click-left="goBack"
      class="header"
      title="安师生活"
      fixed
    />
    <main class="main">
      <router-view></router-view>
    </main>
    <van-tabbar class="footer" route active-color="#ee0a24">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/categor" icon="apps-o">
        分类
      </van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">
        购物车
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem } from 'vant';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup() {
    const showBack = ref(false);
    const router = useRouter();

    // 监听路由变化
    watch(router.currentRoute, (val) => {
      const { fullPath } = val;
      if (fullPath !== '/home') {
        showBack.value = true;
        return;
      }
      showBack.value = false;
    });

    const goBack = () => {
      router.go(-1);
    };

    return {
      showBack,
      goBack,
    };
  },
};
</script>
<style>
.app-container .main {
  margin-top: 46px;
  height: calc(100vh - 46px - 50px);
}
</style>
