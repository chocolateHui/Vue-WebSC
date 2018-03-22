<template>
  <div>
    <b-navbar id="navbar" style="background-color:#4c58a4;padding: 1px 14px">
      <b-navbar-brand class="b-class" style="float: left">
        <img src="/static/SCweb-55.png" class="d-inline-block align-middle" style="padding-bottom: 1px" alt="BV">
        宴会与销售系统
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-text class="b-class">{{hotel.descript}}</b-nav-text>
      </b-navbar-nav>
      <b-nav>
        <b-nav-form>
          <b-nav-item style="background-color:#555555!important;">
            <i class="fa fa-expand"></i>
          </b-nav-item>
          <b-nav-item style="background-color:#1e9ec6!important;">
            <i class="fa fa-tasks"></i>
          </b-nav-item>
          <b-nav-item style="background-color:#00c486!important;">
            <i class="fa fa-home"></i>
          </b-nav-item>
        </b-nav-form>
        <b-nav-item-dropdown style="background-color:#6574cf!important;min-width: 50px" extra-toggle-classes="nav-link-custom" right>
          <template slot="button-content">
            <img src="/static/user.jpg" class="nav-user-photo d-inline-block align-middle">
            <span class="user-info">欢迎,
          <a>{{empno.empname}}</a>
          </span>
          </template>
          <b-dropdown-item>
            <i class="fa fa-cog" style="color: black"></i>
            修改密码
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="logout">
            <i class="fa fa-power-off" style="color: black"></i>
            退出系统
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </b-navbar>
  </div>
</template>
<script>
  // 框架相关
  import vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'

  // 组件和参数

  export default {
    name: 'navbar',
    computed: {
      ...mapGetters([
        'groupid',
        'hotel',
        'empno'
      ])
    },
    methods: {
      ...mapMutations([
        'setPassword' // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      ]),
      logout: function () {
        this.$router.push({name:"login"})
      }
    }
  }
</script>
<style lang="scss">
  #navbar{
    .nav-user-photo{
      margin: 0 auto;
      border-radius: 100%;
      border: 2px solid #FFF;
      max-width: 40px;
    }
    .user-info{
      font-size: 0.8rem;
      color: white;
      text-align: left;
      line-height: 15px;
    }
    .b-class{
      color:#FFF!important;
      font-size:1.25em!important;
      font-weight: bold;
      display:inline-block;
      vertical-align:middle
    }
    li a{padding: 0 5px;padding-top: 1px;color: white}
    form li{
      border-right: 0.1rem solid #ffffff;
      a{
        i{
          height: 42px;line-height: 42px;
        }
      }
      .fa{
        font-size: 1.2rem;color: white;width: 40px;text-align: center
      }
    }
    .dropdown-item{
      color: black!important;
    }
  }
</style>
