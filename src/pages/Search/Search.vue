<template>
  <section class="search">
    <HeaderTop title=" 搜索">
      <a slot="left" class="header_search" @click="goback">
        <i class="iconfont icon-jiantou2"></i
      ></a>
    </HeaderTop>
    <form class="search_form" @submit.prevent="getlist" action="#">
      <input
        type="search"
        name="limt"
        placeholder=" 请输入店铺名"
        class="search_input"
        v-model="limt"
      />
      <input type="submit" class="search_submit" />
    </form>
    <div class="shop_container">
      <ul class="shop_list">
        <li
          class="shop_li border-1px"
          v-for="(item, index) in shoplimt"
          :key="index"
        >
          <router-link :to="`/shop/goods/` + item.id">
            <div class="shop_left">
              <img
                class="shop_img"
                v-lazy="
                  `https://weq01.oss-cn-beijing.aliyuncs.com/` + item.logo
                "
              />
            </div>
            <div class="shop_right">
              <section class="shop_detail_header">
                <h4 class="shop_title">{{ item.shopname }}</h4>
                <ul class="shop_detail_ul">
                  <li class="supports">保</li>
                  <li class="supports">准</li>
                  <li class="supports">票</li>
                </ul>
              </section>
              <section class="shop_rating_order">
                <section class="shop_rating_order_left">
                  <div class="star star-24">
                    <span class="star-item on"></span>
                    <span class="star-item on"></span>
                    <span class="star-item on"></span>
                    <span class="star-item half"></span>
                    <span class="star-item off"></span>
                  </div>
                  <div class="rating_section">3.6</div>
                  <div class="order_section">月售 106 单</div>
                </section>
                <section class="shop_rating_order_right">
                  <span class="delivery_style delivery_left">起点专送 </span>
                  <span class="delivery_style delivery_right">准时达 </span>
                </section>
              </section>
              <section class="shop_distance">
                <p class="shop_delivery_msg">
                  <span>¥{{ item.fee }} 起送</span>
                  <span class="segmentation">/</span>
                  <span>配送费约¥{{ item.fee }}</span>
                </p>
              </section>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>
  <script>
  import { Toast,Radio } from "mint-ui";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { searchlist } from "../../api/index";
export default {
  //组件映射为标签
  data() {
    return {
      shoplimt: "",
      limt: '', // 搜索德名字
    };
  },
  components: {
    HeaderTop,
  },
  methods: {
    goback() {
      this.$router.back();
    },
    async getlist() {
      console.log(111)
      let res = await searchlist(this.limt);
      if(res==''){
        Toast(`没有此商家`)
        console.log(res);
      }else{
        this.shoplimt = res;
      }
      
    },
  },
};
</script>
  <style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';

  .icon-jiantou2 {
    color: #fff;
  }

  .search { // 搜索
    width: 100%;

    .search_form {
      clearFix();
      margin-top: 45px;
      background-color: #fff;
      padding: 12px 8px;

      input {
        height: 35px;
        padding: 0 4px;
        border-radius: 2px;
        font-weight: bold;
        outline: none;

        &.search_input {
          float: left;
          width: 79%;
          border: 4px solid #f2f2f2;
          font-size: 14px;
          color: #333;
          background-color: #f2f2f2;
        }

        &.search_submit {
          float: right;
          width: 18%;
          border: 4px solid #02a774;
          font-size: 16px;
          color: #fff;
          background-color: #02a774;
        }
      }
    }
  }
</style>