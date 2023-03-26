<template>
  <div>
    <!-- 展示路由组件 -->
    <router-view v-if="isRouterAlive"></router-view>
    <!-- 底部tabbar组件 -->
    <Footer v-if="$route.meta.isshowfooter"></Footer>
  </div>
</template>

<script>
import { getShoplists } from "./api";
import Footer from "./components/FooterGuide/FooterGuide";

export default {
  name: "App",
  data() {
    return {
      isShow: true,
    };
  },
  components: { Footer },

  mounted() {
    this.$store.dispatch("getshops");
    //分发动作=》获取用户登录或者用户注册的cookie信息
    this.$store.dispatch("getcookie");
  },
  computed: {
    isShowFooter() {
      return this.$route.path !== "/login";
    },
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    //提供
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
* {
  touch-action: pan-y;
}</style>
