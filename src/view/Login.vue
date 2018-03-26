<template>
  <div id="login">
      <div class="logo"><img src="/static/SCweb-index-09.png"></div>
      <b-container>
        <b-row>
          <b-col sm="4" class="col-sm-offset-1">
              <div>
                <h1 class="titletext">西软宴会与销售系统</h1>
              </div>
              <div style="position: relative">
                <div class="widget-body" style="border-radius:5px;background: white">
                  <div style="padding: 12px">
                    <div class="login-title">用户登录</div>
                    <label class="block">
                      <b-input-group>
                        <b-input-group-text slot="append">
                          <i class="appendicon fa fa-user"></i>
                        </b-input-group-text>
                        <b-form-input id="userinput" :value="username" @input="setUsername" @click.native="userclick" maxlength="10" placeholder="请输入用户名"></b-form-input>
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
                        <b-form-input :value="hotel.descript" @click.native="hotelclick" placeholder="请选择酒店" readonly></b-form-input>
                      </b-input-group>
                      <label class="errorlabel" v-show="hotelErrorShow">请先选择酒店!</label>
                    </label>
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

    var logindata = {
        password :'',
        hotelShow:false,
        userErrorShow:false,
        passwordErrorShow:false,
        hotelErrorShow:false,
    };
    export default {
        name: 'Login',
        data () {
            return logindata;
        },
        computed:{
            ...mapGetters([
                'groupid',
                'username',
                'hotel',
                'hotels',
                'empno',
                'loginerror'
            ])
        },
        methods:{
            ...mapMutations([
                'setUsername',
            ]),
            updatevalue:function (value) {
                this.password = value;
            },
            hotelclick:function () {
                if(!this.hotelShow) {
                    this.$store.dispatch('gethotels');
                }
                this.hotelShow = !this.hotelShow;
            },
            userclick:function () {
                this.hotelShow = false;
            },
            login:function () {
                if(!this.username){
                    this.userErrorShow = true;
                    return;
                }else{
                    this.userErrorShow = false;
                }
                if(!this.password){
                    this.$store.commit('setLoginerror',"密码不能为空");
                    return;
                }else{
                    this.$store.commit('setLoginerror',"");
                }

                if(!this.hotel){
                    this.hotelErrorShow = true;
                    return;
                }else{
                    this.hotelErrorShow = false;
                }

                var tokenparam = {
                    groupid:this.groupid,
                    hotelid:this.hotel.hotelid,
                    username:this.username,
                    password:this.password,
                };
                //获取token
                this.$store.dispatch('gettoken',tokenparam).then(() => {
                    //加密token
                    this.$store.dispatch('encrypttoken',this.username).then(() => {
                        //获取工号信息,完成后进行路由
                        this.$store.dispatch('getsysempno',this.$store.getters.signature).then(() => {
                          this.password = ''
                          this.$router.push({path:"/main"})
                        })
                    })
                }).catch(function () {

                })
            }
        },
        watch:{
            loginerror:function (val, oldVal) {
                this.passwordErrorShow = !!val;
            }
        },
        components: {
            hotelDiv
        }
    }
</script>
<style lang="scss">
  @import "../css/color";

#login{
  height:calc(100%);
  background-image: url('/static/SCweb-index-05.png');
  background-size: cover;

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
    width: 100%
  }
  .titletext
  {
    font-size: 2rem;
    color: white;
    text-align: center;
    margin-bottom: 10px;
  }
  .login-title{
    font-size:1.5rem;
    color:#4C8FBD;
    padding-bottom:5px
  }
  .login-button{
    width: 100%;
    background:$color11
  }
  .errorlabel{
    font-size: 0.9rem;
    color: red;
    padding-left: 5px
  }
}
</style>
