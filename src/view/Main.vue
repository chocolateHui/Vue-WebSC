<template>
  <div>
    <navbar></navbar>
    <sidebar style="height: calc(100%)"></sidebar>
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
        'hotels',
        'empno'
      ])
    },
    methods: {
      ...mapMutations([
        'setPassword' // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      ]),
      updatevalue: function (value) {
        this.$store.commit('setUsername', value.toUpperCase())
      },
      logout: function () {
        this.$router.push({name:"login"})
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
