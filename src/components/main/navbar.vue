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
          <b-dropdown-item v-b-modal.passmodal>
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
    <b-modal id="passmodal" ref="passmodal" @hidden="modalhidden" size="sm" title="修改密码" hide-footer>
      <div>
        <b-form @submit="onSubmit" v-if="show">
          <b-form-group label="用户名" horizontal>
            <b-form-input :value="empno.empname" disabled>
            </b-form-input>
          </b-form-group>
          <b-form-group label="旧密码" horizontal>
            <b-form-input type="password"
                          v-model="oldpassword"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="新密码:" horizontal>
            <b-form-input type="password"
                          v-model="newpassword"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="确认密码:" horizontal>
            <b-form-input type="password"
                          v-model="confirmpassword"
                          required>
            </b-form-input>
          </b-form-group>
          <b-row>
            <b-col sm="3">
            </b-col>
            <b-col>
              <b-button type="submit" variant="primary">提交</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>
<script>
  // 框架相关
  import vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'
  import methodinfo from '../../config/MethodConst.js'
  // 组件和参数

  export default {
    name: 'navbar',
    data () {
      return {
        oldpassword:'',
        newpassword:'',
        confirmpassword:'',
        show:true
      }
    },
    computed: {
      ...mapGetters([
        'groupid',
        'hotel',
        'empno'
      ])
    },
    methods: {
      logout: function () {
        this.$router.push({name:"login"})
      },
      onSubmit: function () {
        if (this.newpassword !== this.confirmpassword) {
          this.$alert('两次密码输入不一致,请检查!');
          return;
        }
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
          this.$http.post(methodinfo.modifypassword, {
            username: this.empno.empno,
            newpassword: this.newpassword,
            oldpassword: this.oldpassword
          }).then((response) => {
            if (response.data.errorCode === '0') {
              this.$message({message:"修改成功",type: 'success'});
              let tokenparam = {
                groupid: this.$store.getters.groupid,
                hotelid: this.hotel.hotelid,
                username: this.empno.empno,
                password: this.newpassword
              };
              this.$store.dispatch('gettoken', tokenparam);
              this.$refs.passmodal.hide();
            }else{
              this.$alert(response.data.errorMessage,"修改失败",{type: 'error'})
            }
          })
        })
      },
      modalhidden:function () {
        console.log(this.oldpassword);
        this.oldpassword='';
        this.newpassword='';
        this.confirmpassword='';
        this.show=false;
        this.$nextTick(() => { this.show = true });
      }
    }
  }
</script>
<style lang="scss">
  #navbar{
    .nav-user-photo{
      margin: 0 auto;
      border-radius: 100%;
      border: 2px solid white;
      max-width: 40px;
    }
    .user-info{
      font-size: 0.8rem;
      color: white;
      text-align: left;
      line-height: 15px;
    }
    .b-class{
      color:white!important;
      font-size:1.25em!important;
      font-weight: bold;
      display:inline-block;
      vertical-align:middle
    }
    li a{padding: 0 5px;padding-top: 1px;color: white}
    form li{
      border-right: 0.1rem solid white;
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

  #passmodal{
    .btn{
      width: 100px;
    }
  }
</style>
