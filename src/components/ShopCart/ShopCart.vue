<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleshow">
          <div class="logo-wrapper">
            <!-- highlight -->
            <div class="logo" :class="{ highlight: totalCount }">
              <!-- highlight:激活购物车样式 -->
              <i
                class="iconfont icon-shopping_cart"
                :class="{ highlight: totalCount }"></i>
            </div>
            <div class="num" v-if="totalCount">{{ totalCount }}</div>
          </div>
          <div class="price highlight">￥{{ totalPrice }}</div>
          <div class="desc">另需配送费￥{{ shopones.fee }} 元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass" @click="account">{{ payText}}</div>
        </div>
      </div>
      <!-- <div class="shopcart-list" style="display: none"> -->
      <div class="shopcart-list" v-show="showlist">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(item, index) in cartFoods" :key="index">
              <span class="name">{{ item.foodname }}</span>
              <div class="price">
                <span>￥{{ item.price }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <!-- <div class="cartcontrol">
                  <div class="iconfont icon-remove_circle_outline"></div>
                  <div class="cart-count">1</div>
                  <div class="iconfont icon-add_circle"></div>
                </div> -->
                <CartControl :food="item"></CartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="showlist" @click="toggleshow"></div>
  </div>
</template>

<script>
import { MessageBox ,Toast} from "mint-ui";
import CartControl from "../CartControl/CartControl";
import { mapState, mapGetters } from "vuex";
import { shopone } from "../../api/index";
export default {
  data() {
    return {
      shopones: "",
      shopCount: "",
      isshow: false, //隐藏购物车
    };
  },
  components: { CartControl },
  computed: {
    ...mapState(["cartFoods",'userInfo']),
    ...mapGetters(["totalCount", "totalPrice"]),
    showlist() {
      if (this.totalCount === 0) {
        this.isshow = false;
        return false;
      }
      return this.isshow;
    },
    // 结算按钮的样式取值
    payClass(){
        // 获取总价格
        const {totalPrice} =this;
        // 获取配送费
        const fee=this.shopones.fee;
        return totalPrice>=fee?'enough':'not-enough'
    },
    //结算按钮的文字
    payText(){
      const {totalPrice} =this;
        // 获取配送费
        const fee=this.shopones.fee;
        if(totalPrice===0){
          return `￥${fee}元起送`
        }else if(totalPrice<fee){
          return `还差￥${fee-totalPrice}元起送`
        }else{
          return '结算'
        }
    }
  },
  // 声明接收\
  props: ["shoplistid"],
  async mounted() {
    let id = this.shoplistid;
    let res = await shopone(id);
    // console.log(res);
    this.shopones = res;
  },
  methods: {
    toggleshow() {
      if (this.totalCount > 0) {
        this.isshow = !this.isshow;
      }
    },
    clearCart() {
      //引入mint-ui的message组件
      MessageBox.confirm("确定清空购物车吗?").then(
        (action) => {
          // console.log('清空购物车');
          // 清除cookie信息
          // 分发动作
          this.$store.dispatch("clearcarts");
        },
        (action) => {
    
        }
      );
    },
    account(){
      const {totalPrice} =this;
        // 获取配送费
        const fee=this.shopones.fee;
        if(totalPrice===0){
          // return `￥${fee}元起送`
          Toast(`￥${fee}元起送`);
        }else if(totalPrice<fee){
          // return `还差￥${fee-totalPrice}元起送`
          Toast(`还差￥${fee-totalPrice}元起送`);
        }else{
          // return '结算'
          //判断用户有没有登录
          // userInfo 是否有值

          if(this.userInfo){
             // console.log('结算');
          this.$router.push('/account/'+this.userInfo)
          }else{
            this.$router.replace('/login')
          }
         
        }
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $green;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>