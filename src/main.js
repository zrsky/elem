// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import '../static/mui/dist/css/mui.css'
import '../static/mui/dist/js/mui.min.js'
import vueRouter from 'vue-router'
import Axios from 'axios'

// 挂载axios
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false
Vue.use(vueRouter);

//引入组件
import seller from './components/seller/seller.vue'
import ratings from './components/ratings/ratings.vue'
import goods from './components/goods/goods.vue'
// 配置路由参数
let router = new vueRouter({
  linkActiveClass: 'active',
  routes:[
    { path:'/', redirect:{name:'goods'}},
    { name:'seller', path:'/seller',component:seller},
    { name:'ratings', path:'/ratings',component:ratings},
    { name:'goods', path:'/goods',component:goods}
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
