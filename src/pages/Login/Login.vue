<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">扣哥外卖</h2>
          <div class="login_header_title">
            <a
              href="javascript:;"
              :class="{ on: loginway }"
              @click="loginway = true"
              >注册</a
            >
            <a
              href="javascript:;"
              :class="{ on: !loginway }"
              @click="loginway = false"
              >登录</a
            >
          </div>
        </div>
        <div class="login_content">
          <!-- prevent 可以阻止form表单默认的提交行为 -->
          <form @submit.prevent="register">
            <!--注册的开始  -->
            <div :class="{ on: loginway }">
              <section class="login_message">
                <input
                  type="text"
                  v-model="registername"
                  maxlength="11"
                  placeholder="请输入注册的用户名"
                />
              </section>
              <section class="login_verification">
                <input
                  type="password"
                  v-model="registerpass"
                  maxlength="20"
                  placeholder="请输入注册的密码"
                />
              </section>
              <button class="login_submit">注册</button>
            </div>
          </form>
          <!-- 注册结束 -->
          <!-- 登录开始 -->
          <form @submit.prevent="login">
            <div :class="{ on: !loginway }">
              <section>
                <section class="login_message">
                  <input
                    type="text"
                    maxlength="11"
                    placeholder="请输入登录的用户名"
                    v-model="loginname"
                  />
                </section>
                <section class="login_verification">
                  <input
                    type="text"
                    maxlength="20"
                    placeholder="请输入登录的密码"
                    v-if="showpwd"
                    v-model="loginpass"
                  />
                  <input
                    type="password"
                    maxlength="20"
                    placeholder="请输入登录的密码"
                    v-else
                    v-model="loginpass"
                  />
                  <!-- 类名如果是off的话,密码的类型就是password,背景颜色为白色 。类名如果是on的话,密码的类型就是text ，背景颜色为绿色-->
                  <div
                    class="switch_button"
                    :class="showpwd ? 'on' : 'off'"
                    @click="showpwd = !showpwd"
                  >
                    <div
                      class="switch_circle"
                      :class="{ right: showpwd }"
                    ></div>
                    <span class="switch_text"></span>
                  </div>
                </section>
              </section>
              <button class="login_submit">登录</button>
            </div>
            <!-- 登录结束 -->
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip
        v-show="showalert"
        :alertText="showtext"
        @closeTips="closeTips"
      />
    </section>
    <div class="box">
      <div class="p">
        <p class="p1">扣哥</p>
        <p class="p2">外卖</p>
      </div>
    </div>
  </div>
</template>

<script>
//导入注册的方法
import { doregister, dologin } from "../../api/index";
//导入提示框组件
import AlertTip from "../../components/AlertTip/AlertTip";
export default {
  //映射为标签
  components: {
    AlertTip,
  },
  data() {
    return {
      msg: "Login",
      loginway: true, //如果loginway为true的话，切换到注册界面,如果loginway为false 把界面切换到登录
      showpwd: false, //false 不显示密码(类型是password)，true显示登录的明文密码(类型是text)
      registername: "", //注册的名字
      registerpass: "", //注册密码
      showalert: false, //false的话指的是不显示提示框  true显示提示框
      showtext: "", //提示的内容
      loginname: "", //登录的名字
      loginpass: "", //登录密码
    };
  },
  //方法
  methods: {
    //执行注册交互的方法
    register: async function () {
      // console.log("这是注册操作")
      //获取注册的用户名和密码
      let name = this.registername;
      let pass = this.registerpass;
      //校验下注册的用户名和密码
      if (!/^\w{6,8}$/.test(name)) {
        // console.log("用户名必须是6-8位任意数字字母和下划线")
        //显示提示框
        this.showalert = true;
        this.showtext = "用户名必须是6-8位任意数字字母和下划线";
        return;
      }
      if (!/^\w{8,18}$/.test(pass)) {
        // console.log("密码必须是8-18位任意数字字母和下划线")
        //显示提示框
        this.showalert = true;
        this.showtext = "密码必须是8-18位任意数字字母和下划线";

        return;
      }
      // console.log(name,pass)
      //调用后端的注册接口
      let res = await doregister(name, pass);
      // console.log(res)
      //判断
      if (res.msg === "ok") {
        //注册成功
        //分发动作把用户登录的名字更新到vuex中
        this.$store.dispatch("getusername", name);
        this.$router.push("/profile");
      }
    },
    //执行登录
    login: async function () {
      //获取登录的用户名和密码
      let name = this.loginname;
      let pass = this.loginpass;
      // console.log(name,pass)
      let res = await dologin(name, pass);
      // console.log(res)
      if (res.msg === "usernameiserror") {
        this.showalert = true;
        this.showtext = "用户名有误";
        return;
      }
      if (res.msg === "userpassiserror") {
        this.showalert = true;
        this.showtext = "密码有误";
        return;
      }

      if (res.msg === "ok") {
        //登录ok
        //分发动作把用户登录的名字更新到vuex中
        this.$store.dispatch("getusername", name);
        //跳转到个人中心界面
        this.$router.push("/profile");
      }
    },
    //关闭提示框的函数
    closeTips: function () {
      //关闭提示框
      this.showalert = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.box {
  .p {
    font-size: 30px;
    position: absolute;
    left: 40px;
    color: #24500759;
    font-weight: bold
    .p1{
      margin-top:20px;
      padding-bottom: 5px
    }
  }

  position: relative;
  margin: 60px auto;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 0 20px #fff, -20px 0 80px #f0f, 20px 0 80px #0ff, inset 0 0 50px #fff, inset 50px 0 80px #f0f, inset -50px 0 80px #0ff, inset 50px 0 200px #f0f, inset -50px 0 200px #0ff;
  animation: from 6s linear infinite;
}

@keyframes from {
  50% {
    box-shadow: 0 0 20px #fff, 20px 0 80px #f0f, -20px 0 80px #0ff, inset 0 0 50px #fff, inset -50px 0 80px #f0f, inset 50px 0 80px #0ff, inset -50px 0 200px #f0f, inset 50px 0 200px #0ff;
  }
}

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
