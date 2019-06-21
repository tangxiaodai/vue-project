import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import Users from '@/views/users/user.vue'

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
      name: 'Home',
      path: '/home',
      component: Home,
      // 添加重定向
      redirect: { name: 'Welcome' },
      // 添加子路由
      children: [{
        name: 'Welcome',
        path: 'welcome',
        component: Welcome
      }, {
        name: 'Users',
        path: 'users',
        component: Users
      }]
    }]
})

export default router
