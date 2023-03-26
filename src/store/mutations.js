//直接更新状态数据的模块
import Vue from 'vue';
import {
  GETSHOPS,
  GETUSERNAME,
  GETCOOKIE,
  LOGOUTS,
  UPDATEFOODCOUNTADD,
  UPDATEFOODCOUNTJIAN,
  CLEARCARTS
} from './mutation-types'
//注意mutations 模块接收动作一定是动作映射类型
export default {
  //直接添加数据
  //接收的参数是对象格式
  [GETSHOPS](state, {
    shoplists
  }) {
    // console.log("这是直接更新数据行为的mutations")
    // console.log(o)
    state.shoplists = shoplists
  },
  [GETUSERNAME](state, {
    name
  }) {
    // console.log("---mutations模块接收的name",name)
    state.userInfo = name;
  },
  //直接把cookie信息赋值给state中userInfo
  [GETCOOKIE](state, {
    usernames
  }) {
    state.userInfo = usernames;
  },
  // 清空state的userInfo
  [LOGOUTS](state) {
    state.userInfo = ''
  },
  // 实现点餐页面的加减
  [UPDATEFOODCOUNTADD](state, {
    food
  }) {
    if (!food.count) {
      Vue.set(food, 'count', 1)
      // 把食品添加入到cartFoods里
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  //   减操做
  [UPDATEFOODCOUNTJIAN](state, {
    food
  }) {
    if (food.count) {
      food.count--
      if(food.count===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  //清空购物车按钮
  [CLEARCARTS](state){
    state.cartFoods.forEach(food=>food.count=0);
    state.cartFoods=[]
  }
}
