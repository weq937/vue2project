<template>
  <div>
    <header>
      <a href="javascript:void(0)" class="back" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
      <p>个人中心</p>
    </header>

    <div class="content">
      <div class="detail">
        <img v-if="message.pic" v-lazy="`https://weq01.oss-cn-beijing.aliyuncs.com/${message.pic}`" alt="">
        <img v-else :src="imgStr" alt="" />
        <ul class="block">
          <li>姓名：{{ message.realname ? message.realname : "暂无名称" }}</li>
          <li>手机：{{ message.phone ? message.phone : "暂无电话" }}</li>
          <li>邮箱：{{ message.email ? message.email : "暂无邮箱" }}</li>
        </ul>
      </div>
      <!-- 判断其他详情信息有没有更新完毕，如果跟新完毕，会出现更换头像按钮 -->
      <div v-if="message.realname != ''">
        <div class="form-group">
          <div class="col-sm-2 col-xs-offset-4">
            <label for="file" class="btn btn-default">更换头像</label>

            <input
              id="file"
              type="file"
              style="display: none"
              @change="onchangeImgFun"
            />
          </div>
        </div>
      </div>

      <div class="edit">
        <mt-button
          type="primary"
          style="width: 100%"
          data-toggle="modal"
          data-target="#myModal"
          >编辑</mt-button
        >
      </div>
      <form @submit.prevent="updateuser" method="post">
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
                <h4 class="modal-title">编辑个人详情</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>昵称</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请添加昵称"
                    v-if="!message.realname"
                    v-model="realname"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改昵称"
                    v-else
                    v-model="realname1"
                  />
                </div>
                <div class="form-group">
                  <label>电话</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请添加电话"
                    v-if="!message.phone"
                    v-model="phone"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改电话"
                    v-else
                    v-model="phone1"
                  />
                </div>
                <div class="form-group">
                  <label>邮箱</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请添加邮箱"
                    v-if="!message.email"
                    v-model="email"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改邮箱"
                    v-else
                    v-model="email1"
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
                <button class="btn btn-success">编辑</button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div class="login-out">
        <mt-button
          type="danger"
          style="width: 100%"
          v-if="userInfo"
          @click="logout"
          >退出</mt-button
        >
      </div>

      <footer></footer>
    </div>
  </div>
</template>

<script>
//导入获取会员详情信息的方法

import { MessageBox } from "mint-ui";
import { mapState } from "vuex";
import {
  getusermessage,
  insertusermessage,
  updateusermessage,
  updateuserpic
} from "../../api/index";
//导入oss模块
import OSS from "ali-oss";
//配置
const client = new OSS({
  accessKeyId: "***", // 查看你自己的阿里云KEY
  accessKeySecret: "***", // 查看自己的阿里云KEYSECRET
  bucket: "weq01", // 你的 OSS bucket 名称
  region: "oss-cn-beijing", // bucket 所在地址，我的是 华北2 北京
  // cname: true // 开启自定义域名上传
  // endpoint:"file.xxxx.live" // 自己的域名
});
export default {
  data() {
    return {
      message: "", //存储个人详情信息的数据
      realname: "", //添加的名称
      phone: "", //添加的电话
      email: "", //添加的邮箱
      realname1: "", //修改的名称
      phone1: "", //修改的电话
      email1: "", //修改的邮箱
      imgStr:require('./avatar.jpg'), //存放头像数据
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    //更新用户的详情信息
    async updateuser() {
      if (this.message.realname !== "") {
        //修改个人详情信息
        // console.log("修改");
        //调用接口
        let username = this.realname1;
        let phone = this.phone1;
        let email = this.email1;
        let userinfo_name = this.$route.params.username;
        let res = await updateusermessage(
          username,
          phone,
          email,
          userinfo_name
        );
        if (res.msg === "ok") {
          //修改成功,跳转本界面
          this.$router.go(0);
        }
      } else if (this.message.realname === "") {
        console.log("添加");
        let username = this.realname;
        let phone = this.phone;
        let email = this.email;
        let userinfo_name = this.$route.params.username;
        let res = await insertusermessage(
          username,
          phone,
          email,
          userinfo_name
        );
        // console.log(res);
        if (res.msg === "ok") {
          //跳转的本界面为0
          this.$router.go(0);
        }
      }
    },
    // 退出方法
    logout() {
      MessageBox.confirm("确定执行此操作?").then(
        (action) => {
          // console.log(111);
          // 清除cookie信息
          // 分发动作
          this.$store.dispatch("logouts");
          this.$router.push("/login");
        },
        (action) => {}
      );
    },
    //更换头像
    async onchangeImgFun(e) {
      var file = e.target.files[0];
      var fileNames = file.name;
      console.log(file);
      console.log(fileNames);
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size;
      // console.log(imgSize);
      var _this = this; // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 5000 * 1024) {
        // 合格
        _this.errorStr = "";
        console.log("大小合适");
        // 开始渲染选择的图片
        // 本地路径方法 1
        // this.imgStr = window.URL.createObjectURL(e.target.files[0]);
        // console.log(window.URL.createObjectURL(e.target.files[0])); // 获取当前文件的信息
        // base64方法 2
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          console.log(dataURL);
          _this.imgStr = dataURL;
          // 下面逻辑处理
        };
        //阿里oss上传头像
        // 上传文件,这里是上传到OSS
        await client.put(fileNames, file).then((res) => {
          if (res.res.statusCode === 200) {
            // options.onSuccess(res);
            console.log("上传成功");
          } else {
            options.onError("上传失败");
          }
        });
        //调用后端接口代码位置
       let res= await updateuserpic(fileNames,this.$route.params.username);
       console.log(res);
      //  if(res.msg==='ok'){
      //   this.$router.go(0)
      //  }
      } else {
        console.log("大小不合适");
        _this.errorStr = "图片大小超出范围";
      }
    },
  },
  async mounted() {
    let name = this.$route.params.username;
    let res = await getusermessage(name);
    console.log(res);
    if (res.realname === "") {
      //无详情信息
      this.message = res;
    } else {
      //有详情信息
      this.message = res;
      this.realname1 = res.realname;
      this.phone1 = res.phone;
      this.email1 = res.email;
    }
  },
};
</script>

<style scoped>
@charset "utf-8";
li {
  padding-top: 5px;
}
body {
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
  font-family: 微软雅黑;
}

ul {
  list-style: none;
  margin: 0 0 0 7.5em;
  padding: 0;
}

header {
  width: 100%;
  height: 3em;
  background-color: #02a774;
  color: white;
}

header p {
  text-align: center;
  line-height: 3em;
}

.content {
  width: 100%;
  background-color: #ffffff;
}

.detail {
  background-color: #ffffff;
  height: auto;
  margin-top: 1em;
  padding: 10px;
  position: relative;
}

.edit {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 10em;
  clear: both;
}

.login-out {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 5em;
  margin-bottom: 0.5em;
}

.footer {
  width: 100%;
  height: 2em;
  background-color: rgb(75, 75, 75);
}

img {
  width: 100%;
  height: 100%;
  height: 7em;
  width: 7em;
  border: 1px solid grey;
  position: absolute;
  top: 0.5em;
  left: 0.5em;
}

a {
  text-decoration: none;
  display: inline-block;
  height: 2em;
  text-align: center;
  width: 100%;
  line-height: 2em;
  color: black;
}

.block {
  display: inline-block;
  height: auto;
  word-wrap: break-word;
  width: 50%;
}
.back {
  position: absolute;
  top: 5px;
  left: 0;
  text-align: left;
}
.icon-arrow_left {
  display: block;
  padding: 5px;
  font-size: 20px;
  color: #fff;
}
</style>