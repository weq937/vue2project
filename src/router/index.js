import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import Msite from '../pages/Msite/Msite'
// import Order from '../pages/Order/Order'
// import Search from '../pages/Search/Search'
// import Profile from '../pages/Profile/Profile'
const Msite = () => import('../pages/Msite/Msite')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
// import Login from '../pages/Login/Login'
const Login = () => import('../pages/Login/Login')
// import Userinfo from '../pages/Profile/Userinfo'
const Userinfo = () => import('../pages/Profile/Userinfo')

// import Shop from '../pages/Shop/Shop'
const Shop = () => import('../pages/Shop/Shop')

// import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods')
// import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
const ShopRatings = () => import('../pages/Shop/ShopRatings/ShopRatings')

// import Account from '../pages/Account/Account'
const Account = () => import('../pages/Account/Account')

// import OrderInfo from '../pages/Order/OrderInfo'
const OrderInfo = () => import('../pages/Order/OrderInfo')

const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        title: '外卖首页',
        isshowfooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        title: '外卖搜索页面',
        isshowfooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        title: '外卖订单页面',
        isshowfooter: true
      },
      children:[
        {
          path: '/orderinfo/:orders_id',
          component: OrderInfo,
          meta: {
            isshowfooter: true,
            title:'订单详情'
          }
        },
      ]
    },
  
    
    {
      path: '/profile',
      component: Profile,
      meta: {
        title: '外卖个人中心页面',
        isshowfooter: true
      }
    },
    {
      path: '/userinfo/:username',
      component: Userinfo,
      meta: {
        title: '个人详情页',
        isshowfooter: true
      }
    },
    {
      path: '/shop',
      component: Shop,

      children: [{
          path: '/shop/goods/:id',
          component: ShopGoods,
          meta: {
            title: '商家详情',
            isshowfooter: false
          },
        },
        {
          path: '/shop/ratings/:id',
          component: ShopRatings,
          meta: {
            title: '商家详情',
            isshowfooter: false
          },
        },
        {
          path: '',
          redirect: '/shop/goods',

        }
      ],
    },
    {
      path: '/account/:username',
      component: Account,
      meta: {
        title: '外卖登录页面',
        isshowfooter: false
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '外卖登录页面',
        isshowfooter: false
      }
    },

  ]

})
// 设置全局后置路由守卫
router.afterEach((to, from) => {
  document.title = to.meta.title

})
export default router
