<template>
  <div id="sidebar" class="sidebar responsive ace-save-state">
    <div class="sidebar-shortcuts">
      <div style="padding:0 15px" data-toggle="modal" data-target="#rili">
        <div id="oneday" class="oneday" style="font-size:14px!important;"></div>
        <div id="oneyear" class="oneyear" style="font-size:12px!important;"></div>
      </div>
    </div>
    <b-nav vertical>
      <b-nav-item :to="menus[0].route">
        <i class="menu-icon fa fa-list fa-fw"></i>
        <span class="menu-text">{{menus[0].name}}</span>
      </b-nav-item>
      <b-nav-item :to="menus[1].route">
        <i class="menu-icon fa fa-clock-o fa-rotate-90 fa-fw"></i>
        <span class="menu-text">{{menus[1].name}}</span>
      </b-nav-item>
      <b-nav-item :to="menus[2].route">
        <i class="menu-icon fa fa-registered fa-fw"></i>
        <span class="menu-text">{{menus[2].name}}</span>
      </b-nav-item>
      <b-nav-item :to="menus[3].route">
        <i class="menu-icon fa fa-th fa-fw"></i>
        <span class="menu-text">{{menus[3].name}}</span>
      </b-nav-item>
      <b-nav-item :to="menus[4].route">
        <i class="menu-icon fa fa-calendar fa-fw"></i>
        <span class="menu-text">{{menus[4].name}}</span>
      </b-nav-item>
      <b-nav-item :to="menus[5].route">
        <i class="menu-icon fa fa-cog fa-fw"></i>
        <span class="menu-text">{{menus[5].name}}</span>
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
          { route: '/main/caterList', name: '宴会预订列表'},
          { route: '/main/newQuery', name: '新建宴会问询'},
          { route: '/main/newReserve', name: '新建宴会预订'},
          { route: '/main/placeDistribution', name: '宴会场地分布'},
          { route: '/main/saleDiary', name: '销售活动日历'},
          { route: '/main/maint', name: '基础代码维护'}
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
      ])
    }
  }
</script>
<style>
.sidebar{
  background-color: #f2f2f2;
  border-style: solid;
  border-color: #CCC;
  border-width: 0 1px 0 0;
  width: 160px;
  float: left;
  position: static;
  padding-left: 0;
  padding-right: 0;
}
.sidebar .sidebar-shortcuts{
  background-color: #fafafa;
  text-align: center;
  min-height: 40px;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  border: 0 solid;
}
.sidebar .sidebar-toggle{
  content: "";
  display: block;
  border-top: 1px solid #BBB;
  border-bottom: 1px solid #BBB;
}
.sidebar .sidebar-toggle>.fa{
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
.nav-list{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav-list .li{
  display: block;
  position: relative;
  float: none;
  padding: 0;
  border-style: solid;
  border-width: 1px 0 0;
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
</style>
