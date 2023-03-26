// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'

import VueRouter from 'vue-router'
import store from './store'
import { Button,Radio } from 'mint-ui';
Vue.component(Button.name, Button,Radio.name, Radio);
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.gif'
Vue.use(VueLazyload, {
loading
})

Vue.config.productionTip = false




const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
  store
})
