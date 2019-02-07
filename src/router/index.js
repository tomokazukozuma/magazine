import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/login'
import Top from '../pages/top'
import Article from '../pages/article'
import Articles from '../pages/magazine/articles'
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
            name: 'Top',
            path: '/',
            component: Top
        },
        {
            name: 'UserMagazine',
            path: '/user/:uid/magazine',
            component: UserMagazine
        },
        {
            name: 'MagazineArticles',
            path: '/magazine/:magazineId',
            component: Articles
        },
        {
            name: 'Article',
            path: '/article/:articleId',
            component: Article
        }
    ]
})