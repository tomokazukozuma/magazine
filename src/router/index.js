import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/login'
import Top from '../pages/top'
import Articles from '../pages/magazine/articles'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Top
    },
    {
      path: '/magazine/vue',
      component: Articles
    }
  ]
})