import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import News from '@/components/News'
import Login from '@/components/Login'
import Reg from '@/components/Reg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/reg',
      component: Reg
    }
  ]
})
