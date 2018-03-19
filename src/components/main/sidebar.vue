<template>
  <div id="sidebar" class="sidebar responsive ace-save-state">
    <div class="sidebar-shortcuts">
      <div style="padding:0 15px" data-toggle="modal" data-target="#rili">
        <div id="oneday" class="oneday" style="font-size:14px!important;"></div>
        <div id="oneyear" class="oneyear" style="font-size:12px!important;"></div>
      </div>
    </div>
    <b-nav vertical>
      <b-nav-item>
        <i class="menu-icon fa fa-list fa-fw"></i>
        <span class="menu-text"> 宴会订单列表 </span>
      </b-nav-item>
      <b-nav-item>
        <i class="menu-icon fa fa-clock-o fa-rotate-90 fa-fw"></i>
        <span class="menu-text"> 新建宴会问询 </span>
      </b-nav-item>
      <b-nav-item>
        <i class="menu-icon fa fa-registered fa-fw"></i>
        <span class="menu-text"> 新建宴会预订 </span>
      </b-nav-item>
      <b-nav-item>
        <i class="menu-icon fa fa-th fa-fw"></i>
        <span class="menu-text"> 宴会场地分布 </span>
      </b-nav-item>
      <b-nav-item>
        <i class="menu-icon fa fa-calendar fa-fw"></i>
        <span class="menu-text"> 销售活动日历 </span>
      </b-nav-item>
      <b-nav-item>
        <i class="menu-icon fa fa-cog fa-fw"></i>
        <span class="menu-text"> 基础信息维护 </span>
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
    computed: {
      ...mapGetters([
        'groupid',
        'hotel'
      ])
    },
    methods: {
      ...mapMutations([
      ]),
      logout: function () {
      }
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
