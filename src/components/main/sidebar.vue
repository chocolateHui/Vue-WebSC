<template>
  <div id="sidebar">
    <div class="sidebar-shortcuts">
      <div style="padding:0 15px">
        <div id="oneday" class="oneday" style="font-size:14px!important;"></div>
        <div id="oneyear" class="oneyear" style="font-size:12px!important;"></div>
      </div>
    </div>
    <b-nav vertical>
      <b-nav-item :to="menu.route" :class="getselect(menu)"  v-for="menu in menus" :key="menu.route">
        <i class="menu-icon fa fa-fw" :class="menu.iconClass"></i>
        <span class="menu-text">{{menu.name}}</span>
      </b-nav-item>
    </b-nav>
    <div class="sidebar-toggle sidebar-collapse">
      <i id="sidebar-toggle-icon" class="fa fa-angle-double-left" data-icon1="fa fa-angle-double-left" data-icon2="fa fa-angle-double-right"></i>
    </div>
  </div>
</template>
<script>
  // 框架相关
  import vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'

  // 组件和参数

  export default {
    name: 'sidebar',
    data :function () {
      return {
        menus: [
          { route: '/main/caterList', name: '宴会预订列表',iconClass:"fa-list"},
          { route: '/main/newQuery', name: '新建宴会问询',iconClass:"fa-clock-o fa-rotate-90"},
          { route: '/main/newReserve', name: '新建宴会预订',iconClass:"fa-registered"},
          { route: '/main/placeDistribution', name: '宴会场地分布',iconClass:"fa-th"},
          { route: '/main/saleDiary', name: '销售活动日历',iconClass:"fa-calendar"},
          { route: '/main/maint', name: '基础代码维护',iconClass:"fa-cog"}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'mainRoutes',
        'activeIndex'
      ])
    },
    methods: {
      ...mapMutations([
        'add_tabs'
      ]),
      getselect: function (menu) {
        if(this.$route.path===menu.route){
          return "active"
        }
      }
    },
    mounted () {
      // 刷新时以当前路由做为tab加入tabs
      if (this.$route.path !== '/main') {
        this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
        this.$nextTick(function(){
          this.$store.commit('set_active_index', this.mainRoutes.length-1);
        })
      } else {
        this.$store.commit('set_active_index', 0);
        this.$router.push('/main');
      }
    },
  }
</script>
<style lang="scss">
  #sidebar{
    background-color: #f2f2f2;
    border-style: solid;
    border-color: #CCC;
    border-width: 0 1px 0 0;
    width: 160px;
    float: left;
    position: static;
    padding-left: 0;
    padding-right: 0;
    .sidebar-shortcuts{
      background-color: #fafafa;
      text-align: center;
      min-height: 40px;
      margin-bottom: 0;
      overflow: hidden;
      position: relative;
      border: 0 solid;
    }
    .sidebar-toggle{
      content: "";
      display: block;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      .fa{
        margin: 2px 0;
        padding: 0 5px;
        line-height: 18px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 100%;
        border: 1px solid #BBB;
        position: relative;
        color: #AAA;
        background-color: #FFF;
        text-align: center;
      }
    }
    .nav{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .nav-item{
      display: block;
      position: relative;
      float: none;
      padding: 0;
      border-style: solid;
      border-width: 1px 0 0;
      border-color: #e5e5e5;
    }
    .menu-icon{
      display: inline-block;
      min-width: 30px;
      margin-right: 2px;
      vertical-align: sub;
      text-align: center;
      font-size: 1.4rem;
      font-weight: normal;
    }
  }
</style>
