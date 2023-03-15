import Vue from 'vue'
import VueRouter from 'vue-router'
// import Cookie from 'js-cookie'

import Home from '@/views/Home'
import User from '@/views/User'
import Main from '@/views/Main'
import Mall from '@/views/Mall'
import PageOne from '@/views/PageOne'
import PageTwo from '@/views/PageTwo'
import Login from '@/views/Login'

//创建路由组件
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                meta: { title: '首页', icon: 's-home' },
                component: Home
            },
            {
                path: 'mall',
                name: 'Mall',
                meta: { title: '视频管理', icon: 'user' },
                component: Mall
            },
            {
                path: 'user',
                name: 'User',
                meta: { title: '用户管理', icon: 'user' },
                component: User
            },
            {
                path: 'page1',
                name: 'Page1',
                meta: { title: '产品管理', icon: 'user' },
                component: PageOne,
            },
            {
                path: 'page2',
                name: 'Page2',
                meta: { title: '页面2', icon: 'user' },
                component: PageTwo
            },
        ]
    }
]

const router = new VueRouter({
    routes,
    
})

export default router
