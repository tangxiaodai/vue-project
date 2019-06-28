import Vue from 'vue'
import App from './App.vue'
import router from '@/router.js'
import '@/styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入富文本框的样式
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 让vm实例支持使用element-ui
Vue.use(ElementUI)
// 引入富文本框的中间件
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

// 增加导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(111)
  let token = localStorage.getItem('itcast_pro_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next({ name: 'Login' })
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
