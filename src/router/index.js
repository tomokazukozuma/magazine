import Vue from 'vue'
import Router from 'vue-router'

import Top from '../components/Top'
import HellowWorld from '../components/HelloWorld'
import Category from '../components/Category'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Top
    },
    {
      path: '/vue',
      component: HellowWorld
    },
    {
      path: '/category',
      component: Category
    }
  ]
})