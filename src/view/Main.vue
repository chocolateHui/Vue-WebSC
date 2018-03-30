<template>
  <div id="scmain">
    <navbar></navbar>
    <sidebar @barclose="barclose"></sidebar>
    <div :style="mainstyle">
      <b-tabs id="tabs" card v-model="activeIndex">
        <!-- Render Tabs -->
        <b-tab ref="tab" @click="tabClick" v-for="i in mainRoutes" :key="i.name">
          <template slot="title">
            <span>{{i.name}}</span>
            <b v-show="i.route!=='/main'" @click="tabRemove(i)">X</b>
          </template>
          <keep-alive>
            <router-view :style="{height: screenHeight + 'px'}" v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view :style="{height: screenHeight + 'px'}" v-if="!$route.meta.keepAlive"></router-view>
        </b-tab>
      </b-tabs>
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
          'margin-left':"148px"
        },
        screenHeight: document.body.clientHeight-105,//减去header的60px
      }
    },
    computed: {
      ...mapGetters([
        'groupid',
        'hotel',
        'empno',
        'mainRoutes',
      ]),
      activeIndex:{
        get () {
          return this.$store.getters.activeIndex
        },
        set (value) {
          this.$store.commit('set_active_index', value)
        }
      }
    },
    methods: {
      ...mapMutations([
        'delete_tabs'
      ]),
      tabClick: function () {
        let routeinfo = this.mainRoutes[this.activeIndex];
        this.$router.push({path: routeinfo.route});
      },
      tabRemove: function (item) {
        if(item.route==="/main"){
          return
        }
        this.$store.commit('delete_tabs', item.route);
      },
      barclose:function (isclose) {
        console.log(isclose)
        if(isclose){
          this.mainstyle= {
            'margin-left':"148px"
          }
        }else{
          this.mainstyle= {
            'margin-left':"60px"
          }
        }
      }
    },
    watch: {
      //路由监听,侧边栏进行路由跳转后在这里新增tab页,把路由目标转到新的tab页上
      '$route'(to) {
        let flag = false;
        for (let option of this.mainRoutes) {
          if (option.name === to.name) {
            flag = true;
            this.$store.commit('set_active_index', this.mainRoutes.indexOf(option));
            break
          }
        }
        if (!flag) {
          this.$store.commit('add_tabs', {route: to.path, name: to.name});
          //等待渲染完毕后调用设置当前页方法
          this.$nextTick(function(){
            this.$store.commit('set_active_index', this.mainRoutes.length-1);
          })
        }
      }
    },
    components: {
      sidebar,
      navbar
    }
  }
</script>
<style lang="scss">
  #scmain{
    height: calc(100%);
    #tabs{
      .card-body{
        padding-bottom: 0;
      }
      .fa-fw{
        font-size: 1rem;
      }
      .card-header{
        padding: 0.3rem 1.25rem 0.75rem;
      }
      b{
        border-radius: 100%;
        padding: 0 4px;
      }
      b:hover,b:focus{
        background-color: #e9ecef
      }
      .tab-content{
        overflow-y: auto;
      }
    }
  }
</style>
