<template>
  <div>
    <footer class="footer_guide border-1px">
      <a href="javascript:;" class="guide_item" @click="goto('/msite')" :class="{on:$route.path === '/msite'}">
        <span class="item_icon">
          <i class="iconfont icon-xuanxiang"></i>
        </span>
        <span>外卖</span>
      </a>
      <a href="javascript:;" class="guide_item" @click="goto('/search')" :class="{on:$route.path === '/search'}">
        <span class="item_icon">
          <i class="iconfont icon-search"></i>
        </span>
        <span>搜索</span>
      </a> 
      <!-- <router-link to="/search" href="javascript:;" class="guide_item">
        <span class="item_icon">
          <i class="iconfont icon-search"></i>
        </span>
        <span>搜索</span>
      </router-link> -->
      <a href="javascript:;" class="guide_item" @click="goto('/order')" :class="{on:$route.path === '/order'}">
        <span class="item_icon">
          <i class="iconfont icon-dingdan"></i>
        </span>
        <span>订单</span>
      </a>
      <a href="javascript:;" class="guide_item" @click="goto('/profile')" :class="{on:$route.path === '/profile'}">
        <span class="item_icon">
          <i class="iconfont icon-geren"></i>
        </span>
        <span>我的</span>
      </a>
    </footer>
  </div>
</template>

<script>
  export default {
    methods:{
      goto(url){
        this.$router.push(url)
      }
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

* { touch-action: pan-y; }  // 禁止google浏览器监听移动端的默认事件
.footer_guide { // footer
  top-border-1px(#e4e4e4);
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 60px;
  display: flex;

  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999999;

    &.on {
      color: #02a774;
    }

    span {
      font-size: 12px;
      margin-top: 2px;
      margin-bottom: 2px;

      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>