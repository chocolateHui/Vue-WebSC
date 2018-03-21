<template>
  <div style="height: calc(100%)">
    <navbar></navbar>
    <sidebar style="height: calc(100% - 45px)"></sidebar>
    <div>
      <b-tabs ref="maintabs" small card v-model="activeIndex">
        <!-- Render Tabs -->
        <b-tab ref="tab" @click="tabClick" :title="`Tab ${i.name}`" v-for="i in mainRoutes" :key="i.name">
          <router-view></router-view>
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
<style>

</style>
