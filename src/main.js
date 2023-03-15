import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入路由组件
import router from '@/router'
// 导入 vuex组件
import store from '@/store'
// 导入接口组件
import '@/api/mockjs'
// import '@/api/nodejs'

Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
