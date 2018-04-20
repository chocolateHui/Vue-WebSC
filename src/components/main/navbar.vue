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
          <b-nav-item @click="setFullscreen" style="background-color:#555555!important;">
            <i class="fa" :class="ScreenClass"></i>
          </b-nav-item>
          <b-nav-item v-popover:msgpop style="background-color:#00c486!important;">
            <i class="fa fa-bell">
              <b-badge variant="danger" v-show="message">14</b-badge>
            </i>
          </b-nav-item>
          <el-popover
            ref="msgpop"
            placement="bottom"
            title="消息"
            trigger="click">
            <b-list-group>
              <b-list-group-item href="#">This is a default list group item</b-list-group-item>
              <b-list-group-item href="#" variant="primary">This is a primary list group item</b-list-group-item>
              <b-list-group-item href="#" variant="secondary">This is a secondary list group item</b-list-group-item>
              <b-list-group-item href="#" variant="success">This is a success list group item</b-list-group-item>
              <b-list-group-item href="#" variant="danger">This is a danger list group item</b-list-group-item>
              <b-list-group-item href="#" variant="warning">This is a warning list group item</b-list-group-item>
              <b-list-group-item href="#" variant="info">This is a info list group item</b-list-group-item>
              <b-list-group-item href="#" variant="light">This is a light list group item</b-list-group-item>
              <b-list-group-item href="#" variant="dark">This is a dark list group item</b-list-group-item>
            </b-list-group>
          </el-popover>
          <b-nav-item v-b-modal.aboutmodal style="background-color:#1e9ec6!important;">
            <i class="fa fa-tasks"></i>
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

    <b-modal id="aboutmodal" ref="aboutmodal" title="关于西软云宴会销售系统" hide-footer>
      <b-container fluid>
        <div>
          <p class="p-style version"><strong>Ver 1.2.0</strong></p>
          <p class="p-style font">本产品使用权属于：</p>
          <p class="p-style">{{hotel.descript}}</p>
          <p class="p-style">本软件为杭州西软信息技术有限公司所有，受到著作权法和国际公约的保护。未经杭州西软信息技术有限公司许可，任何单位及个人均不得复制、传播本程序的部分或全部，否则可能遭到严厉的法律诉讼及制裁。</p>
          <p class="p-style">请访问我们的网站，他将提供给您最新的软件版本信息，和周到的用户服务！</p>
          <p class="p-style">Copyright@   1993-2018 杭州西软信息技术有限公司</p>
          <p class="p-style">杭州文一西路1218号恒生科技园28号楼 0571-88231188</p>
          <p class="p-style"><a href="http://www.foxhis.com">http://www.foxhis.com</a></p>
          <p class="p-style">保持联系，携手共进。</p>
        </div>
      </b-container>
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
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
        show: true,
        message: true,
        screensize:'normal',
        ScreenClass:'fa-expand'
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
        this.$router.push({name: "login"})
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
              this.$message({message: "修改成功", type: 'success'});
              let tokenparam = {
                groupid: this.$store.getters.groupid,
                hotelid: this.hotel.hotelid,
                username: this.empno.empno,
                password: this.newpassword
              };
              this.$store.dispatch('gettoken', tokenparam);
              this.$refs.passmodal.hide();
            } else {
              this.$alert(response.data.errorMessage, "修改失败", {type: 'error'})
            }
          })
        })
      },
      modalhidden: function () {
        console.log(this.oldpassword);
        this.oldpassword = '';
        this.newpassword = '';
        this.confirmpassword = '';
        this.show = false;
        this.$nextTick(() => { this.show = true });
      },
      /**
       * [setFullscreen 设置全屏]
       * @param {domElement} element [DOM节点对象(可选)]
       */
      setFullscreen() {
        if (this.screensize === "normal") {
          let el =document.documentElement;
          let rfs = el.requestFullscreen ||
            el.webkitRequestFullscreen ||
            el.mozRequestFullScreen ||
            el.msRequestFullscreen;
          if (rfs) {
            rfs.call(el);
          } else if (window.ActiveXObject) {
            let ws = new ActiveXObject("WScript.Shell");
            ws && ws.SendKeys("{F11}");
          }
        } else {
          let efs = document.exitFullscreen ||
            document.webkitExitFullscreen ||
            document.mozCancelFullScreen ||
            document.msExitFullscreen;
          if (efs) {
            efs.call(document);
          } else if (window.ActiveXObject) {
            let ws = new ActiveXObject("WScript.Shell");
            ws && ws.SendKeys("{F11}");
          }
        }
      }
      , reseticon() {
        if (this.screensize === "normal") {
          this.screensize = "fullscreen";
          this.ScreenClass = "fa-compress";
        } else {
          this.screensize = "normal";
          this.ScreenClass = "fa-expand";
        }
      }
    },
    mounted(){
      document.addEventListener('fullscreenchange', this.reseticon);
      document.addEventListener('webkitfullscreenchange', this.reseticon);
      document.addEventListener('mozfullscreenchange', this.reseticon);
      document.addEventListener('MSFullscreenChange', this.reseticon);
    }
  }
</script>
<style lang="scss">
  #navbar {
    .nav-user-photo {
      margin: 0 auto;
      border-radius: 100%;
      border: 2px solid white;
      min-width: 40px;
    }
    .user-info {
      font-size: 0.8rem;
      color: white;
      text-align: left;
      line-height: 15px;
    }
    .b-class {
      color: white !important;
      font-size: 1.25em !important;
      font-weight: bold;
      display: inline-block;
      vertical-align: middle
    }
    .badge {
      margin-left: 5px;
      border-radius: 100%;
      font-size: 12px;
    }
    li a {
      padding: 0 5px;
      padding-top: 1px;
      color: white
    }
    form li {
      border-right: 0.1rem solid white;
      a {
        i {
          height: 42px;
          line-height: 42px;
        }
      }
      .fa {
        font-size: 1.2rem;
        color: white;
        width: 45px;
        text-align: center
      }
    }
    .dropdown-item {
      color: black !important;
    }
  }

  #aboutmodal{
    header{
      background-color: #4C58A4;
    }
    .modal-title,.close{
      color: white;
    }
    .p-style{
      margin: 0;
      font-size: 0.9rem;
    }
    .version{
      font-size: 1.2rem;
      color: blue;
    }
  }

  #passmodal {
    .btn {
      font-size: 1.2rem;
      width: 100px;
    }
  }
</style>
