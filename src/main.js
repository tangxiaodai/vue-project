import Vue from 'vue'
import App from './App.vue'
import router from '@/router.js'
import '@/styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 让vm实例支持使用element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
