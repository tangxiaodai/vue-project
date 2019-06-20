import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    }]
})

export default router
