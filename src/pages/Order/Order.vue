<template>
  <section class="order">
    <HeaderTop title=" 订单列表" />
    <section class="order_no_login" v-if="!userInfo">
      <img src="./images/person.png" />
      <h3>登录后查看外卖订单</h3>
      <button @click="login">立即登陆</button>
    </section>
    <div v-else>
      <div style="width: 100%; height: 50px"></div>
      <h4 class="h3">订单页面</h4>
      <div class="container">
        <table class="table table-hover">
          <tr class="tr">
            <th>订单号</th>
            <th>总价格</th>
            <th>购买人</th>
            <th>操作</th>
          </tr>
          <h2 v-show="false">{{ orders }}</h2>
          <tr v-for="(item, index) in orderss" :key="index" style="">
            <td>{{ item.order_num }}</td>
            <td>{{ item.food_totalprice }}</td>
            <td>{{ item.username }}</td>
            <td>
              <router-link
                :to="`/orderinfo/` + item.id"
                class="btn btn-danger"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                查看详情
              </router-link>
              <button
                class="btn btn-success"
                data-toggle="modal"
                data-target="#myModal"
              >
                评价
              </button>
              <form @submit.prevent="addaddress" method="post">
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title">评价</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>请写出对商家的评价</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder="评价内容"
                    v-model="name"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-danger"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  取消
                </button>
                <button class="btn btn-success">评价</button>
              </div>
            </div>
          </div>
        </div>
      </form>
            </td>
          </tr>
        </table>
        <!--显示订单详情-->
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>
  <script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { getuserorder } from "../../api/index";
export default {
  //组件映射为标签
  data() {
    return {
      orderss: "",
    };
  },
  components: {
    HeaderTop,
  },
  computed: {
    ...mapState(["userInfo"]),
    // 计算属性
    async orders() {
      let res = await getuserorder(this.userInfo);
      this.orderss = res;
    },
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
  <style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';

  tr>th {
    color: red;
    font-size: 16px;
    text-align: center;
    border-bottom: 2px solid pink;
  }

  tr>td {
    text-align: center;
    font-size: 16px;
    padding-top: 5px;
  }

  .h3 {
    text-align: center;
    color: #1f88d8;
    border-bottom: 2px solid;
  }

  .order { // 订单
    width: 100%;

    .order_no_login {
      padding-top: 140px;
      width: 60%;
      margin: 0 auto;
      text-align: center;

      >img {
        display: block;
        width: 100%;
        height: 30%;
      }

      >h3 {
        padding: 10px 0;
        font-size: 17px;
        color: #6a6a6a;
      }

      >button {
        display: inline-block;
        background: #02a774;
        font-size: 14px;
        color: #fff;
        border: 0;
        outline: none;
        border-radius: 5px;
        padding: 10px 20px;
      }
    }
  }
</style>