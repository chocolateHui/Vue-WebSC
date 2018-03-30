import Vue from 'vue'
import Router from 'vue-router'

const login = () => import(/* webpackChunkName: "group-login" */ '../view/Login.vue')
const main = () => import(/* webpackChunkName: "group-main" */ '../view/Main.vue')
const Template = () => import(/* webpackChunkName: "group-main" */ '../view/Template.vue')
const report = () => import(/* webpackChunkName: "group-main" */ '../view/Report.vue')
const Maint = () => import(/* webpackChunkName: "group-main" */ '../view/Maint.vue')
const Lossstatistics = () => import(/* webpackChunkName: "group-report" */ '../view/report/Lossstatistics.vue')

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
      component: main,
      children: [
        // 当 /main 匹配成功，
        // DashBoard 会被渲染在 main 的 <router-view> 中
        { path: '',name: '首页', component: Template,
          meta: {
            keepAlive: false // 需要被缓存
          } },
        // ...其他子路由
        {
          path: '/main/caterList',
          name: '宴会预订列表',
          component: Template,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/main/newQuery',
          name: '新建宴会问询',
          component: Template,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/main/newReserve',
          name: '新建宴会预订',
          component: Template,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/main/placeDistribution',
          name: '宴会场地分布',
          component: Template,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/main/saleDiary',
          name: '销售活动日历',
          component: Template,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/main/report',
          name: '报表专家',
          component: report,
          meta: {
            keepAlive: false // 不需要被缓存
          }
        },
        {
          path: '/main/lostreport',
          name: '订单流失统计',
          component: Lossstatistics,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/main/maint',
          name: '基础代码维护',
          component: Maint,
          meta: {
            keepAlive: false // 不需要被缓存
          }
        },
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
