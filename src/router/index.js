import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/login'
import Top from '../pages/top'
import Articles from '../pages/magazine/articles'
import Add from '../pages/magazine/add'
import UserMagazine from '../pages/user/magazine'

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
            path: '/magazine/add',
            component: Add
        },
        {
            path: '/magazine/vue',
            component: Articles
        },
        {
            name: 'UserMagazine',
            path: '/user/:uid/magazine',
            component: UserMagazine
        }
    ]
})