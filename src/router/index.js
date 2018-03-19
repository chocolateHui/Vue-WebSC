import Vue from 'vue'
import Router from 'vue-router'

const login = () => import(/* webpackChunkName: "group-login" */ '../view/Login.vue')
const main = () => import(/* webpackChunkName: "group-main" */ '../view/Main.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        // 当 /main 匹配成功，
        // DashBoard 会被渲染在 main 的 <router-view> 中
        // { path: '', component: DashBoard }
        // ...其他子路由
        // {
        //   // 当 /user/:id/profile 匹配成功，
        //   // UserProfile 会被渲染在 User 的 <router-view> 中
        //   path: 'profile',
        //   component: UserProfile
        // },
        // {
        //   // 当 /user/:id/posts 匹配成功
        //   // UserPosts 会被渲染在 User 的 <router-view> 中
        //   path: 'posts',
        //   component: UserPosts
        // }
      ]
    },
    {
      path: '/WebSC',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
