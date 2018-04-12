import Vue from 'vue'
import Router from 'vue-router'

const login = () => import(/* webpackChunkName: "group-login" */ '../view/Login.vue')
const main = () => import(/* webpackChunkName: "group-main" */ '../view/Main.vue')
const Template = () => import(/* webpackChunkName: "group-main" */ '../view/Template.vue')
const EOShare = () => import(/* webpackChunkName: "group-catering" */ '../view/catering/EOShare.vue')
const report = () => import(/* webpackChunkName: "group-main" */ '../view/Report.vue')
const Maint = () => import(/* webpackChunkName: "group-main" */ '../view/Maint.vue')
const Lossstatistics = () => import(/* webpackChunkName: "group-report" */ '../view/report/Lossstatistics.vue')
const Hotelinfo = () => import(/* webpackChunkName: "group-maint" */ '../view/maint/hotelinfo.vue')
const Empnoinfo = () => import(/* webpackChunkName: "group-maint" */ '../view/maint/empnoinfo.vue')
const Sysoption = () => import(/* webpackChunkName: "group-maint" */ '../view/maint/Sysoption.vue')
Vue.use(Router)

const router =new Router({
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
          component: EOShare,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/main/catering/cateringInfo',
          name: '宴会预订详情',
          component: Template,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/main/catering/eventItem',
          name: '宴会事务项目',
          component: Template,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/main/EOShare',
          name: '宴会预订EO单',
          component: EOShare,
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
          component: Maint,
          meta: {
            keepAlive: true // 需要被缓存
          },
          children: [
            {
              path: '',
              name: '基础代码维护',
              component: Hotelinfo
            },
            {
              path: '/main/maint/hotelinfo',
              name: '酒店信息',
              component: Hotelinfo
            },
            {
              path: '/main/maint/empnoinfo',
              name: '用户管理',
              component: Empnoinfo
            },
            {
              path: '/main/maint/hoteldept',
              name: '岗位设置',
              component: Hotelinfo
            },
            {
              path: '/main/maint/sysoption',
              name: '系统参数',
              component: Sysoption
            },
            {
              path: '/main/maint/pccode',
              name: '宴会营业点',
              component: Hotelinfo
            },
            {
              path: '/main/maint/item',
              name: '宴会项目',
              component: Hotelinfo
            },
            {
              path: '/main/maint/basecode',
              name: '基础代码',
              component: Hotelinfo
            }
          ]
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

router.beforeEach((to, from, next) => {
  console.log(new Date().getTime())
  router.app.$store.commit("set_loading",true);
  if (to.path.indexOf("/login")<0) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!router.app.$store.getters.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }else {
      let tokentime = router.app.$store.getters.tokentime;
      let now = new Date().getTime();
      let timelong =  parseInt(now - tokentime) / 1000 / 60 /60;
      if(!tokentime||timelong>=8){
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }else{
        next()
      }
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

router.afterEach((to, from) => {
  console.log(new Date().getTime())
  router.app.$store.commit("set_loading",false);
})


export default router
