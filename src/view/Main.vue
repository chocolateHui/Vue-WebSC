<template>
  <div id="scmain">
    <navbar></navbar>
    <sidebar @barclose="barclose"></sidebar>
    <div :style="mainstyle">
      <el-tabs v-model="activeIndex" type="card" closable @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane
          :key="item.key"
          v-for="(item , index) in mainRoutes"
          :label="item.name"
          :name="item.name">
          <div v-if="isLoading">
            <loading></loading>
          </div>
          <div v-if="!isLoading" :style="{height: screenHeight + 'px'}">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </el-tab-pane>
      </el-tabs>
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
  import loading from '../components/loading.vue'
  // 组件和参数

  export default {
    name: 'Main',
    data() {
      return {
        mainstyle:{
          'margin-left':"150px"
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
        'isLoading'
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
        for (let option of this.mainRoutes) {
          if (option.name === this.activeIndex) {
            this.$router.push({path: option.route});
            break;
          }
        }
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
        if(this.activeIndex===name){
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
        this.$store.commit('delete_tabs', index);
      },
      barclose:function (isclose) {
        console.log(isclose)
        if(isclose){
          this.mainstyle= {
            'margin-left':"150px"
          }
        }else{
          this.mainstyle= {
            'margin-left':"50px"
          }
        }
      }
    },
    watch: {
      //路由监听,侧边栏进行路由跳转后在这里新增tab页,把路由目标转到新的tab页上
      '$route'(to) {
        if(to.path.indexOf("/maint/")>0){
          return;
        }
        if(to.name==='新建宴会问询'){
          this.$store.commit('setCatersta', 'Q');
        }else if(to.name==='新建宴会预订'){
          this.$store.commit('setCatersta', 'R');
        }

        if(to.path.indexOf("/catering/")>0){
          let index = 0;
          for (let option of this.mainRoutes) {
            if (option.name === this.activeIndex) {
              break;
            }
            index++;
          }
          this.$store.commit('delete_tabs', index);
        }

        let flag = false;
        for (let option of this.mainRoutes) {
          if (option.name === to.name) {
            flag = true;
            this.$store.commit('set_active_index', option.name);
            break
          }
        }
        if (!flag) {
          this.$store.commit('add_tabs', {route: to.path, name: to.name});
          //等待渲染完毕后调用设置当前页方法
          this.$nextTick(function(){
            this.$store.commit('set_active_index', to.name);
          })
        }
      }
    },
    components: {
      sidebar,
      navbar,
      loading
    }
  }
</script>
<style lang="scss">
  #scmain{
    height: calc(100%);
    #tab-首页{
      .el-icon-close{
       display: none;
      }
    }
    #tabs{
      .container-fluid{
        padding: 0;
      }
      .card-body{
        padding: 0.5rem;
      }
      .fa-fw{
        font-size: 1rem;
      }
    }
    .el-tabs__header{
      margin-bottom: 0;
    }
    .el-tabs__content{
      padding-top: 15px;
      overflow: auto;
    }
    .el-tabs{
      padding-top: 4px;
    }
    .el-tabs__item{
      height: 36px;
      line-height: 36px;
    }
  }
</style>
