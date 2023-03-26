<template>
  <div>
    <div class="cartcontrol">
      <!-- 减得按钮 -->
      <transition name="move">
        <div
          class="iconfont icon-remove_circle_outline"
          v-if="food.count"
          @click="updates(false)"
        ></div>
      </transition>
      <!-- 所购买得数量，假设购买得数量 属性名为:count,把count加在点餐得食品里 -->
      <div class="cart-count" v-if="food.count">{{ food.count }}</div>
      <!-- 加得按钮 -->
      <div class="iconfont icon-add_circle" @click="updates(true)"></div>
    </div>
  </div>
</template>
  <script>
import Vue from "vue";
export default {
  props: ["food"],
  methods: {
    //加得方法
    //   add(){
    //       // console.log('sss')
    //       //把点餐食品得数量属性 count得值加1
    //       //注意这个时候food中得count值没有，这个时候加入得属性count是非响应式数据
    //       // this.food.count=1;
    //       // 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
    //       if(!this.food.count){
    //            Vue.set(this.food, 'count', 1 )
    //       }else{
    //           this.food.count++
    //       }
    //   },
    //减得操作
    //   updates(){
    //       //判断下购买数量有没有 ，有的化，直接减一
    //       if(this.food.count){
    //           this.food.count--
    //       }
    //   }
    // 加减操作
    updates(isadd) {
      // isadd  true为加，false 为减
      this.$store.dispatch("updateFoodCount", { isadd, food: this.food });
    },
  },
};
</script>
  <style lang="stylus" scoped>
  @import '../../common/stylus/mixins.styl';

  .cartcontrol {
    font-size: 0;

    .cart-decrease {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }

    .icon-remove_circle_outline {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: $green;

      &.move-enter-active, &.move-leave-active {
        transition: all 2s;
      }

      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translateX(15px) rotate(180deg);
      }
    }

    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }

    .icon-add_circle {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: $green;
    }
  }
</style>