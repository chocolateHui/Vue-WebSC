<template>
  <div id="scmain">
    <navbar @screenChange = "screenChange"></navbar>
    <sidebar @barclose="barclose"></sidebar>
    <div :style="mainstyle">
      <!--<el-tabs v-model="activeIndex" type="card" closable @tab-click="tabClick" @tab-remove="tabRemove">-->
        <!--<el-tab-pane-->
          <!--v-for="(item , index) in mainRoutes"-->
          <!--:key="item.name"-->
          <!--:label="item.name"-->
          <!--:name="item.name">-->
        <!--</el-tab-pane>-->
      <!--</el-tabs>-->
      <b-row>
        <i @click="tabLeftClick" class="fa fa-angle-left tabicon"></i>
        <div id="nav" ref="nav" class="navdiv" :style="{width: bodyWidth + 'px'}">
          <b-nav id="navTab" ref="navTab" tabs :style="navStyle">
            <b-nav-item @click="tabClick($event,item)" :active="getTabActive(item)" v-for="item in mainRoutes" :key="item.name" append>
              <i v-if="item.name==='首页'" class="fa fa-home"></i>
              <span>{{item.name}}</span>
              <i v-if="item.name!=='首页'" @click="tabRemove(item.name)" class="el-icon-close"></i>
            </b-nav-item>
          </b-nav>
        </div>
        <i @click="tabRightClick" class="fa fa-angle-right tabicon"></i>
      </b-row>
      <div class="viewDiv" :style="{height: screenHeight + 'px'}">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  // 框架相关
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'
  import navbar from '../components/main/navbar.vue'
  import sidebar from '../components/main/sidebar.vue'
  // 组件和参数

  export default {
    name: 'Main',
    data() {
      return {
        mainstyle:{
          'margin-left':"150px"
        },
        navStyle:{
          transform:"translateX(0px)"
        },
        bodyWidth: document.body.clientWidth-186,//减去header的60px
        screenHeight: document.body.clientHeight-85,//减去header的60px
        isTabChange:false,
        isTabRemove:false,
        navTransform:0
      }
    },
    computed: {
      ...mapGetters([
        'groupid',
        'hotel',
        'empno',
        'mainRoutes',
        'isLoading'
      ])
    },
    methods: {
      ...mapMutations([
        'delete_tabs'
      ]),
      getTabActive(item){
        if(this.$route.path.indexOf("/maint/")>0&&item.name==='基础代码维护'){
          return true;
        }else{
          return this.$route.name===item.name;
        }
      },
      tabClick: function ($event,item) {
        if(!this.isTabRemove){
          this.isTabChange = true;
          this.$router.push({path: item.route});
        }
        this.isTabRemove = false
      },
      tabRemove: function (name) {
        if(name==="首页"){
          return
        }
        let index = 0;
        for (let option of this.mainRoutes) {
          if (option.name === name) {
            break;
          }
          index++;
        }
        //查找对应tab位置，如果是最后一个则将路由设置倒数第二个上,如果是当前标签则路由到下一个
        if(this.$route.name===name){
          if(index === this.mainRoutes.length-1){
            this.$router.push({path: this.mainRoutes[index-1].route});
          }else{
            this.$router.push({path: this.mainRoutes[index+1].route});
          }
        }else{
          if(index === this.mainRoutes.length-1){
            this.$router.push({path: this.mainRoutes[index-1].route});
          }
        }
        this.isTabRemove = true
        this.$store.commit('delete_tabs', index);
      },
      tabLeftClick(){
        this.navStyle = {
          transform:"translateX(0px)"
        }
      },
      tabRightClick(){
        let translateX = 0
        let navwidth = this.$refs.nav.clientWidth;
        let navTabwidth = this.$refs.navTab.clientWidth
        if(navTabwidth>navwidth){
          translateX = navTabwidth - navwidth;
        }
        this.navStyle = {
          transform:"translateX(-"+translateX+"px)"
        }
      },
      barclose:function (isclose) {
        if(isclose){
          this.mainstyle= {
            'margin-left':"150px"
          }
          this.bodyWidth = document.body.clientWidth-186
        }else{
          this.mainstyle= {
            'margin-left':"50px"
          }
          this.bodyWidth = document.body.clientWidth-86
        }
      },
      screenChange(){
        this.screenHeight = document.body.clientHeight-85
      }
    },
    watch: {
      //路由监听,侧边栏进行路由跳转后在这里新增tab页,把路由目标转到新的tab页上
      '$route'(to,from) {
        let routename = from.name;
        if(to.path.indexOf("/maint/")>0){
          let index = 0;
          for (let option of this.mainRoutes) {
            if (option.name === '基础代码维护') {
              break;
            }
            index++;
          }
          let newRoute ={
            index:index,
            route:to.path
          }
          this.$store.commit('set_tab_route', newRoute);
          return;
        }
        if(to.name==='新建宴会问询'){
          this.$store.commit('setCatering', {});
          this.$store.commit('setCatersta', 'Q');
        }else if(to.name==='新建宴会预订'){
          this.$store.commit('setCatering', {});
          this.$store.commit('setCatersta', '1');
        }

        //如果是从新建宴会跳转到宴会详情，关闭新建界面
        if(!this.isTabChange){
          if(to.path.indexOf("/catering/")>0){
            if(routename==='新建宴会预订'||routename==='新建宴会问询'){
              let index = 0;
              for (let option of this.mainRoutes) {
                if (option.name === routename) {
                  break;
                }
                index++;
              }
              this.$store.commit('delete_tabs', index);
            }
          }
        }

        let flag = false;
        for (let option of this.mainRoutes) {
          if (option.name === to.name) {
            flag = true;
            break
          }
        }
        if (!flag) {
          this.$store.commit('add_tabs', {route: to.path, name: to.name});
        }
        this.isTabChange = false;
      }
    },
    components: {
      sidebar,
      navbar
    }
  }
</script>
<style lang="scss"  type="text/scss">
  @import '../css/color';
  #scmain{
    height: calc(100%);
    /*#tab-首页{*/
      /*.el-icon-close{*/
       /*display: none;*/
      /*}*/
    /*}*/
    .navdiv{
      overflow: hidden;
      border-bottom: 1px solid $colorBorder;
    }
    .nav-tabs{
      width: auto;
      white-space: nowrap;
      position: relative;
      transition: transform .3s;
      display: block;
      float: left;
      margin-top: 3px;
      border: 1px solid $colorBorder;
      border-bottom: none;
      border-radius: 4px 4px 0 0;
      li{
        position: relative;
        list-style: none;
        display: inline-block;//使li对象显示为一行
      }
      .container-fluid{
        padding: 0;
      }
      .card-body{
        padding: 0.5rem;
      }
      .fa-fw{
        font-size: 1rem;
      }
      .nav-item{
        .nav-link{
          color: #495057;
          border-left: 1px solid $colorBorder;
          border-radius: 0;
        }
        .nav-link.active{
          color: #007bff;
          border: none;
          border-left: 1px solid $colorBorder;
          .el-icon-close{
            display: inline-block;
          }
        }
      }
      .nav-item:first-child{
        .nav-link{
          border-left: none;
        }
        .nav-link.active{
          border-left: none;
          border-radius: 4px 4px 0 0;
        }
      }
      .nav-item:hover{
        .el-icon-close{
          display: inline-block;
        }
      }
      .el-icon-close{
        color: #909399;
        border-radius: 100%;
        display: none;
      }
      .el-icon-close:hover{
        color: white;
        background-color: #909399;
      }
    }
    .tabicon{
      font-size: 20px;
      padding: 10px 5px;
      cursor: pointer;
      border-bottom: 1px solid $colorBorder;
    }
    .viewDiv{
      padding-top: 0.75rem;
      overflow: auto;
    }
  }
</style>
