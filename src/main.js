import Vue from 'vue'
import App from './App.vue'
import utility from "./utility"
import Moment from "moment"

// 全局配置 moment，设置星期的第一天为 星期一
Moment.locale('zh', {
   week: {
      dow: 1
   }
})


// router
import Router from 'vue-router'
import {routes} from './route'
const router = new Router({
   // mode: 'history', // 由于该项目是二级目录，使用 history 会导致开发与布署的地址不一
   routes
})
Vue.use(Router)


router.beforeEach((to, from, next) => {
   if (to.name !== 'login' && to.name !== 'register' && to.name !== 'share'){
      if (utility.getAuthorization().email){
         next()
      } else {
         next('/login')
      }
   } else {
      next()
   }
})

// cookie
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)


// store
import store from "@/store"

// icons
import icons from "@/assets/img/SvgIcons"
Vue.prototype.$icons = icons


new Vue({
   router,
   store,
   render: h => h(App)
}).$mount('#app')


// 开发相关
Vue.config.productionTip = false
Vue.config.devtools = true  // Vue Devtools Chrome 插件支持
document.addEventListener("touchstart", function() {},false) // 使移动端支持 :hover 样式
