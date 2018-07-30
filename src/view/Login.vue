<template>
  <div id="login">
      <div class="logo"><img src="/static/SCweb-index-09.png"></div>
      <b-container id="loginContainer">
        <b-row>
          <b-col sm="4" class="col-sm-offset-1">
              <div>
                <h1 class="titletext">西软宴会与销售系统</h1>
              </div>
              <div style="position: relative">
                <div class="widget-body" style="border-radius:3px;background: white">
                  <div style="padding: 30px">
                    <div class="login-title">用户登录</div>
                    <label class="block">
                      <b-input-group>
                        <b-input-group-text slot="append">
                          <i class="appendicon fa fa-user"></i>
                        </b-input-group-text>
                        <FormatInput id="userinput" type="nospecial" v-model="username" @click.native="userclick" text="请输入用户名"></FormatInput>
                      </b-input-group>
                      <label class="errorlabel" v-show="userErrorShow">用户名不能为空!</label>
                    </label>
                    <label class="block">
                      <b-input-group>
                        <b-input-group-text slot="append">
                          <i class="appendicon fa fa-lock"></i>
                        </b-input-group-text>
                        <b-form-input type="password" v-model="password" id="pwdinput" @keyup.native.13="login" maxlength="16" placeholder="请输入密码"></b-form-input>
                      </b-input-group>
                      <label class="errorlabel" v-show="passwordErrorShow">{{loginerror}}</label>
                    </label>
                    <label class="block">
                      <b-input-group>
                        <b-input-group-text slot="append">
                          <i class="appendicon fa fa-toggle-down" @click.native="hotelclick"></i>
                        </b-input-group-text>
                        <b-form-input class="hotel-input" :value="hotel.descript" @click.native="hotelclick" placeholder="请选择酒店" readonly></b-form-input>
                      </b-input-group>
                      <label class="errorlabel" v-show="hotelErrorShow">请先选择酒店!</label>
                    </label>
                    <!--<label class="block">-->
                      <!--<b-form-checkbox id="checkbox1" v-model="empnoType" value="PMS" unchecked-value="SC">-->
                        <!--使用PMS帐号登录-->
                      <!--</b-form-checkbox>-->
                    <!--</label>-->
                    <label class="block">
                      <b-button class="login-button" @click="login">登录</b-button>
                    </label>
                  </div>
                  <hotelDiv id="hoteldiv" v-show="hotelShow">
                  </hotelDiv>
                </div>
              </div>
          </b-col>
        </b-row>
        <b-btn id="helpbtn" title="帮助说明" class="help-btn">
        </b-btn>
        <b-popover target="helpbtn" triggers="click" placement="top" container="loginContainer" ref="popover">
          <li>
            <label v-if="!hasGroupid">1.系统首次登录时</label>
            <label v-else>1.当前登录集团为</label>
            <FormatInput @change="setGroupid" type="nospecial" class="gorupid-input" v-model="groupid" placeholder="请输入集团ID"></FormatInput>
          </li>
          <li v-if="!isFirefox">2.本系统推荐使用火狐浏览器。
            <br>推荐前往：<a href="http://www.firefox.com.cn/"  target="_blank">http://www.firefox.com.cn/</a>下载安装
          </li>
          <li>3.在系统运行中遇到无法解决的问题，请联系西软维护部。<br>
            （☎维护热线：0571-88231188）
          </li>
        </b-popover>
      </b-container>
  </div>
</template>
<script>
    //框架相关
    import Vue from 'vue'
    import { mapGetters, mapActions,mapMutations } from 'vuex'
    import 'font-awesome/css/font-awesome.css'
    //组件和参数
    import hotelDiv from  '../components/login/hoteldiv.vue'

    export default {
        name: 'Login',
        data () {
            return {
              password :'',
              hotelShow:false,
              userErrorShow:false,
              passwordErrorShow:false,
              hotelErrorShow:false,
              hasGroupid:false,
              isFirefox:true,
              hasToken:false,
              empnoType:'SC'
            };
        },
        computed:{
            ...mapGetters([
                'hotel',
                'hotels',
                'empno',
                'loginerror',
                'isHotelChange'
            ]),
          username:{
            get () {
              return this.$store.getters.username
            },
            set (value) {
              this.$store.commit('setUsername', value)
            }
          },
          groupid:{
            get () {
              return this.$store.getters.groupid
            },
            set (value) {
              this.$store.commit('setGroupid', value)
              this.$store.commit('setHotel', {
                hotelid:'',
                descript:''
              })
              this.$store.commit('setHotels', [])
            }
          }
        },
        created(){
          this.hasGroupid = this.groupid!==''
          let userAgent = navigator.userAgent
          this.isFirefox = userAgent.indexOf("Firefox")>=0
        },
        methods:{
          ...mapMutations([
            'setUsername',
            'setGroupid',
          ]),
          updatevalue: function (value) {
            this.password = value;
          },
          userclick: function () {
            this.hotelShow = false;
          },
          inputCheck(){
            if (!this.username) {
              this.userErrorShow = true;
              return false;
            } else {
              this.userErrorShow = false;
            }

            if (!this.password) {
              this.$store.commit('setLoginerror', "请先输入密码!");
              return false;
            } else {
              this.$store.commit('setLoginerror', "");
            }

            return true;
          },
          getToken(){
            return new Promise((resolve, reject)=>{
              let empnoChange = false;
              if (this.username !== this.empno.empno) {
                empnoChange = true;
              }

              if(this.hasToken && !empnoChange){
                resolve();
              }

              let tokenparam = {
                groupid: this.groupid,
                hotelid: this.hotel.hotelid,
                username: this.username,
                password: this.password,
              };
              //获取token
              this.$store.dispatch('gettoken', tokenparam).then(() => {
                //加密token
                this.$store.dispatch('encrypttoken').then(() => {
                  this.hasToken = true;
                  resolve();
                })
              }).catch(()=>{
                reject();
              })
            })
          },
          hotelclick: function () {
            if (!this.groupid || this.groupid === '') {
              this.$root.$emit('bv::show::popover', 'helpbtn');
              return;
            }

            if (!this.inputCheck()) {
              return;
            }

            this.getToken().then(()=>{
              if (!this.hotelShow) {
                this.$store.dispatch('gethotels');
              }
              this.hotelShow = !this.hotelShow;
            })
          },
          login: function () {
            if (!this.groupid || this.groupid === '') {
              this.$root.$emit('bv::show::popover', 'helpbtn');
              return;
            }
            if (!this.inputCheck()) {
              return;
            }
            if (!this.hotel.hotelid) {
              this.hotelErrorShow = true;
              return;
            } else {
              this.hotelErrorShow = false;
            }
            let empnoChange = false;
            if (this.username !== this.empno.empno) {
              empnoChange = true;
            }
            this.getToken().then(()=>{
              //获取工号信息,完成后进行路由
              this.$store.dispatch('getsysempno', this.$store.getters.signature).then(() => {
                if (this.isHotelChange || empnoChange) {
                  this.$store.commit('initTabs');
                  this.$store.commit('setHotelChange', false);
                }
                this.$http.defaults.headers.common['username'] = this.username
                this.$http.defaults.headers.common['hotelid'] = this.hotel.hotelid
                this.$http.defaults.headers.common['groupid'] = this.groupid
                this.$store.dispatch('getAllSysoption')
                this.password = ''
                this.$router.push({path: "/main/index"})
              })
            })
          }
        },
        watch:{
          loginerror(val, oldVal) {
            this.passwordErrorShow = !!val;
          },
          password(val,oldval){
            if(val!==oldval && this.hasToken){
              this.hasToken = false;
            }
          },
          hotel(val,oldval){
            if (val.hotelid) {
              this.hotelErrorShow = false;
            }
          }
        },
        components: {
            hotelDiv
        }
    }
</script>
<style lang="scss"  type="text/scss">
  @import "../css/color";

#login{
  height:calc(100%);
  background-image: url('/static/SCweb-index-05.png');
  background-size: cover;

  #userinput{
    ime-mode:disabled;
    text-transform:uppercase;
  }
  .input-group > .form-control{
    height: 35px;
  }
  .logo{
    position:absolute;
    top:50px;
    left:50px
  }
  .container{
    padding-top:calc( (100vh - 300px)/2 )
  }
  .col-sm-offset-1{
    width: 375px;
    margin: 0 auto;
  }
  .appendicon{
    width: 20px
  }
  .block{
    width: 100%;
    margin-bottom: .9rem;
    .login-button{
      width: 100%;
      background:$color11;
      margin-top: 10px;
      border: none;
    }
    .login-button:focus,.login-button:hover{
      opacity: 0.9;
    }
    .hotel-input{
      cursor: pointer;
    }
    .hotel-input[readonly]{
      background-color: white;
    }
    .errorlabel{
      font-size: 0.9rem;
      color: red;
      padding-left: 5px
    }
  }
  .titletext
  {
    font-size: 1.7rem;
    color: white;
    text-align: center;
    margin-bottom: 25px;
  }
  .login-title{
    font-size:1.2rem;
    color:#4C8FBD;
    padding-bottom:10px;
  }
  .help-btn{
    position: absolute;
    bottom: 5%;
    right: 5%;
    cursor: help;
    color: #4C8FBD;
    background: url(/static/help.png) no-repeat 50% 50%;
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    box-shadow: none;
  }
  .popover{
    max-width: 400px;

  }
  .popover-body{
    li{
      font-size: 0.9rem;
      list-style: none;
      margin-bottom: 5px;
      label{
        display: inline;
      }
    }
    a:not([href]){
      color: #007bff;
    }
    .gorupid-input{
      height: 21px;
      border: none;
      display: inline;
      width: 150px;
      padding: 0;
    }
    .gorupid-input::placeholder{
      color: #007bff;
    }
  }
}
</style>
