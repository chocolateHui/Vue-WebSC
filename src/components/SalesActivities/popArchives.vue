<template>
  <div class="pop_archives" id="pop_archives">
    <div class="search">
      <ul>
        <li><label>名称</label><input type="text" class="text_input" v-model.trim="name" maxlength="20" id="archivesname"></li>
        <li><label>手机</label>
           <FormatInput type="number" maxlength="15" v-model="mobile" class="text_input"id="archivesphone"></FormatInput>
        </li>
        <li><label>档案号</label>
           <FormatInput type="number" maxlength="15" v-model="no" class="text_input"id="archivesno"></FormatInput>
        </li>
        <li><label>联系人</label><input type="text" class="text_input" v-model.trim="contacter" maxlength="20" id="archivesContacts"></li>
        <li class="saleChoose">
           <b-form-group label="&#8194;销售员" horizontal>
            <el-select v-model="salesId" filterable>
              <el-option
                v-for="item in popSalesList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </b-form-group>
        </li>
        <li class="poptype">
          <b-form-group label="&#8194;类型" horizontal>
            <el-select v-model="archTypeId" filterable :disabled="!bgUnit">
              <el-option
                v-for="item in ifunit"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </b-form-group>
        </li>
      </ul>
      <input type="button" class="btn_query" @click="btnQuery" value="查询" />
    </div>
    <div class="list_archives">
      <h1>档案列表</h1>
      <ol>
        <li class="nav1">名称</li>
        <li class="nav2">档案号</li>
        <li class="nav3">类型</li>
        <li class="nav4">手机号</li>
        <li class="nav5">联系人</li>
        <li class="nav6">签单人</li>
        <li class="nav7">销售员</li>
        <li class="nav8">城市</li>
      </ol>
      <ul>
        <li :class="{'proCurrent':ifproCurrent==proList.prono}" @click="getHistoryList(proList)" @dblclick="chooseType(proList)" v-for="proList in profileslist">
          <span class="nav1">{{proList.proname}}</span>
          <span class="nav2">{{proList.prono}}</span>
          <span class="nav3">{{proList.txt}}</span>
          <span class="nav4">{{proList.mobile}}</span>
          <span class="nav5">{{proList.contacter}}</span>
          <span class="nav6"></span>
          <span class="nav7"></span>
          <span class="nav8"></span>
        </li>
      </ul>
    </div>
    <div class="list_book">
      <h1>预订历史</h1>
      <ol>
        <li class="nav1">宴会名称</li>
        <li class="nav2">抵达时间</li>
        <li class="nav3">离开时间</li>
        <li class="nav4">手机号</li>
        <li class="nav5">联系人</li>
        <li class="nav6">销售员</li>
      </ol>
      <ul>
        <li v-if="cateringlist" v-for="caterList in cateringlist"><span class="nav1">{{caterList.name}}</span><span class="nav2">{{caterList.arr.substring(0,10)}}</span><span class="nav3">{{caterList.dep.substring(0,10)}}</span><span class="nav4">{{caterList.contact_mobile}}</span><span class="nav5">{{caterList.contactor}}</span><span class="nav6">{{caterList.saleid_name}}</span></li>
      </ul>
    </div>
    <div class="tr"><input type="button" class="btn_ok" @click="archOk" value="确定"><input type="button" class="btn_quit" @click="archClose" value="退出"></div>
  </div>
</template>
<script>
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
  import methodinfo from '../../config/MethodConst.js'
    export default {
        name: "pop-archives",
      data(){
          return{
            archTypeId:'',
            salesAll:[{
              "name":"所有",
              "code":"",
            }],
            popSalesList:[],
            salesId:'',
            bgUnit:false,
            ifTypeShow:false,
            proParam:{},
            name:'',
            mobile:'',
            no:'',
            contacter:'',
            caterParam:{},
            ifproCurrent:'',
            proName:'',
            proNo:'',
            cateringlist:[]
          }
      },
      computed: {
        ...mapGetters(['salelist']),
        ...mapGetters(['profileslist']),
      },
      watch:{
        archFlag:function (val,oldval) {
          this.poparchdata()
        },
      },
      components:{
      },
      created:function () {
        this.poparchdata()
      },
      props:['ifunit','archFlag'],
      methods: {
        poparchdata:function () {
          this.clearAll()
          this.archTypeId=this.ifunit[0].id
          if( this.archTypeId=='F'){
            this.bgUnit=false
          }else{
            this.bgUnit=true
          }
          var salesList=this.salelist
          this.popSalesList=this.salesAll.concat(salesList)
          this.salesId=this.salesAll[0].code
        },
        chooseType:function (popType) {
          this.$emit('btnChooseName', popType.proname,this.prono,this.archTypeId);
          this.clearAll()
        },
        clearAll:function () {
          this.name=''
          this.mobile=''
          this.no=''
          this.contacter=''
          this.salesId=''
          this.$store.commit("setProfilesNull")
          this.cateringlist=[]
          console.log(this.cateringlist +'hhh')
        },
        archClose: function () {
          this.$emit('btnArchClose')
          this.clearAll()
        },
        archOk: function () {
          this.$emit('btnArchOk',this.ifproCurrent,this.proName,this.proNo,this.archTypeId)
        },
        /*档案搜索*/
        btnQuery:function () {
          this.$store.commit("setProfilesNull")
          if(this.mobile==''&&this.name==''&&this.no==''&&this.contacter==''){
            this.$message({
              message: "名称、手机号、档案号、联系人至少填写一个",
              type: "warning"
            });
          }else{
            this.proParam = {
              saleid:this.salesId,
              mobile:this.mobile,
              no:this.no,
              name:this.name,
              contacter:this.contacter,
              ischeck:"T",
              type:this.archTypeId,
            };
            this.getProfilesList()
          }
        },
        //预定历史搜索
        getHistoryList:function (proList) {
          let _this = this;
          this.proName = proList.proname
          this.proNo = proList.prono
          this.ifproCurrent = proList.prono
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
            this.$http.post(methodinfo.getcateringlist, {
              no: proList.prono,
            }).then(function (response) {
              if (response.data.errorCode === '0') {
                _this.cateringlist =[];
                if(response.data.caterings){
                  _this.cateringlist = response.data.caterings;
                }
              }
            })
          })
        },
        getProfilesList:function () {
          this.$store.dispatch('encrypttoken').then(() => {
            this.$store.dispatch('getProfiles',this.proParam).then(() => {
            })
          })
        },
      },
      mounted:function () {

      }
    }
</script>

<style lang="scss">
  @import '../../css/color';
  #pop_archives{background: $colorWhite;width: 780px;
    .pop_archives_tou{background: $colorF5;border-bottom: 1px solid $colorGray; color: $colorD0;font-size: 16px;height: 54px;line-height: 54px;padding: 0 35px;margin-bottom: 20px;
      i{color: #9E9E9F;cursor: pointer;display: inline-block;float: right;height: 14px;line-height: 14px;margin-top:24px;text-align: center;width: 14px;}
    }
    .search{padding: 0 35px;
      ul{display: inline-block;width: 620px;padding-left: 0;
        >li{float: left;margin-right: 12px; margin-bottom: 10px;list-style: none;}
        li{
          label{ color: #595757;display: inline-block; font-size: 13px;height:22px;line-height:22px;width: 50px;float: left}
          .text_input{background: $colorWhite;border:1px solid $colorGray; color: #9E9E9F;font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif ;height: 22px;line-height: 22px;padding: 0 3px;border-radius: 0}
          .select{border: 1px solid $colorGray; display:inline-block;height: 22px;position: relative;
            p{cursor:pointer;padding: 0 10px;position: relative;
              &::after{color: #888; content: '\f107'; font: normal normal normal 14px/1 FontAwesome;display: inline-block;position: absolute;right: 5px;top: 2px;}
            }
            ol{background: $colorWhite;border: 1px solid $colorGray; position: absolute;left: 0;top: 20px;width: 100%; overflow: auto !important;max-height: 150px;
              li{padding: 0 10px;
              }
            }
          }
          #archivesname{width: 120px;}
          #archivesphone{width: 120px;}
          #archivesno{width: 190px;display: inline-block}
          #archivesContacts{width: 120px;}
          #archivessale{width: 120px;}
          #archivestype{width: 190px; background: $colorF5;}
        }
      }
      .btn_query{background: $colorHeadBtn;border: none;color: $colorWhite;cursor: pointer;float: right; font-size: 14px;height: 28px;line-height: 28px;text-align: center;width: 80px;}
    }
    .list_archives{padding: 0 35px 15px;
      h1{color: $colorD0; font-size: 14px; margin-bottom: 8px;}
      ol{background: #F8F8F8; overflow: hidden;border-left: 1px solid $colorGray;border-top: 1px solid $colorGray;padding-left: 0;
        li{float: left; border-bottom: 1px solid $colorGray;border-right: 1px solid $colorGray; color: #595757;height: 32px;line-height: 32px; text-align: center;list-style: none;}
      }
      .nav1{width: 130px;}
      .nav4{width: 129px;}
      .nav3,.nav2,.nav5,.nav6,.nav7,.nav8{width: 75px;}
      ul{ height: 135px; overflow: auto !important; width: 730px;padding-left: 0;
        li{border-left: 1px solid $colorGray;overflow: hidden; height: 28px;line-height: 27px; width: 710px;padding-left: 0;
          &:nth-child(2n){background: $colorF5;}
          &.current{background: #E1EDF7;}
          span{border-bottom: 1px solid $colorGray;border-right: 1px solid $colorGray;float: left; display: inline-block;height: 28px; padding: 0 5px;text-align: center;}
        }
      }
    }
    .list_book{padding: 0 35px 15px;
      h1{color: $colorD0; font-size: 14px; margin-bottom: 8px;}
      ol{background: #F8F8F8; overflow: hidden;border-left: 1px solid $colorGray;border-top: 1px solid $colorGray;padding-left: 0;
        li{float: left; border-bottom: 1px solid $colorGray;border-right: 1px solid $colorGray; color: #595757;height: 32px;line-height: 32px; text-align: center;list-style: none;}
      }
      .nav1{width: 167px;}
      .nav2{width: 140px;}
      .nav3{width: 140px;}
      .nav4{width: 112px;}
      .nav5{width: 75px;}
      .nav6{width: 75px;}
      ul{ height: 108px; overflow: auto !important; width: 730px;padding-left: 0;
        li{border-left: 1px solid $colorGray;overflow: hidden; height: 27px;line-height: 26px; width: 710px;padding-left: 0;
          &:nth-child(2n){background: $colorF5;}
          span{text-align: center;border-bottom: 1px solid $colorGray;border-right: 1px solid $colorGray;float: left; display: inline-block;height: 27px; padding: 0 5px;}
        }
      }
    }
    .tr{
      text-align: right;
    }
    .btn_ok{background: $colorQuitBtn;border: none;color: $colorWhite;font-size: 14px;height: 28px;line-height: 28px;text-align: center;width: 80px;}
    .btn_quit{background: $colorSaveBtn;border: none;color: $colorWhite;font-size: 14px;height: 28px;line-height: 28px;margin-left:10px; margin-right:35px;text-align: center;width: 80px;}
    .bgSales{
      background: #ffffff !important;
    }
    .proCurrent{
      background: #e1edf7!important;
    }
    .saleChoose{
      width: 170px;
      .col-sm-3 {
        flex: 0 0 30%;
        max-width: 53% !important;
        padding-right: 0!important;
        padding-left: 0;
      }
      .col-sm-9 {
        flex: 0 0 68%;
        max-width: 77% !important;
        padding: 0!important;
      }
    }
    .poptype{
      width: 240px;
      .col-sm-3 {
        flex: 0 0 22%;
        max-width: 53% !important;
        padding-right: 0!important;
        padding-left: 0;
      }
      .col-sm-9 {
        flex: 0 0 76%;
        max-width: 77% !important;
        padding: 0!important;
      }
      .el-select .el-input.is-disabled .el-input__inner{
        height: 23px;
      }
    }
    .el-input__inner{
      border-radius: 0!important;
      padding: 0 5px;
      height: 23px !important;
    }
    .el-input__icon{
      line-height: normal;
    }
    .col-form-label{
      padding-top: 0;
    }
    .form-group{
      margin-bottom: 0;
    }
    .el-select{
      width: 100%;
      .el-input__suffix-inner{
        position: absolute;
        right: 0px;
        bottom: 0.2rem;
      }
    }
    ol, ul, dl{
      margin-bottom: 0;
    }
  }
</style>
