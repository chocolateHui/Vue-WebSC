<template>
  <b-container id="caterinfo" fluid>
    <b-card header-tag="header">
      <b-row slot="header">
        <b-col sm="1" class="my-1 catertitle">
          <span class="title">宴会信息</span>
        </b-col>
        <b-col sm="2" class="my-1">
          <span v-if="!isNew" class="title">订单号:{{catering.caterid}}</span>
        </b-col>
        <b-col sm="9" class="my-1 titleInfo">
          <span v-if="!isNew" class="title" v-show="caterclose">&#8195;| 宴会名称:&#8195;{{catering.name}}</span>
          <span v-if="!isNew" class="title" v-show="caterclose">&#8195;| 销售员:&#8195;{{localcatering.saleid_name}}</span>
        </b-col>
        <b-col class="my-1 icondiv">
          <a v-if="!isNew">
            <el-tooltip class="item" effect="dark" content="日志" placement="top">
              <i @click="showLog" class="fa fa-sticky-note titleIcon"></i>
            </el-tooltip>
          </a>
          <a v-if="!isNew">
            <el-tooltip class="item" effect="dark" content="EO单" placement="top">
              <i @click="EOShare" class="fa fa-print titleIcon"></i>
            </el-tooltip>
          </a>
          <a v-if="!isNew">
            <el-tooltip class="item" effect="dark" content="刷新" placement="top">
              <i @click="refreshData" class="fa fa-refresh titleIcon"></i>
            </el-tooltip>
          </a>
          <a>
            <i v-b-toggle="'cater'" @click="toggleclick" class="fa toggleclass" :class="toggleclass"></i>
          </a>
        </b-col>
      </b-row>
      <b-collapse visible id="cater">
        <b-row id="catermain">
          <b-col sm="1" class="my-1">
            <div class="Sta">
              <img :src="staFont"/>
              <!--<label class="StaFont">{{staFont}}</label>-->
            </div>
          </b-col>
          <b-col sm="3" class="my-1">
            <b-form>
              <b-form-group class="required" label="宴会名称:" horizontal>
                <b-form-input v-model="localcatering.name" type="text" maxlength="50"></b-form-input>
              </b-form-group>
              <b-form-group class="required" label="抵离日期:" horizontal>
                <el-date-picker
                  v-model="caterdate"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  :clearable="editable"
                  :editable="editable"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="datepickerOptions">
                </el-date-picker>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col sm="3" class="my-1">
            <b-form>
              <b-form-group label="联系人:" horizontal>
                <b-form-input  type="text" v-model="localcatering.contactor" maxlength="10"></b-form-input>
              </b-form-group>
              <b-form-group label="销售员:" horizontal>
                <el-select v-model="sale" value-key="code" clearable filterable placeholder="请输入销售员名称">
                  <el-option
                    v-for="item in saleoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right;color: #8492a6; font-size: 0.9rem">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col sm="3" class="my-1">
            <b-form>
              <b-form-group label="联系电话:" horizontal>
                <FormatInput type="number" maxlength="15" v-model="localcatering.contact_mobile"></FormatInput>
              </b-form-group>
              <b-form-group label="宴会类型:" horizontal>
                <el-select v-model="localcatering.type" placeholder="请选择">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.code"
                    :label="item.descript"
                    :value="item.code">
                  </el-option>
                </el-select>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col sm="2" class="my-1" v-if="!isHistory">
            <div class="btndiv" v-if="!isNew">
              <div>
                  <transition @before-enter="btnenter" @after-leave="btnleave" name="fade" mode="out-in">
                    <b-button v-if="catersta==='Q'||catersta==='0'" key="reserve" class="reservebtn" :class="btnWidth" @click="updateCateringSta('1')">预订</b-button>
                    <b-button v-if="catersta==='1'" key="confirm" class="confirmbtn" @click="updateCateringSta('2')">确认</b-button>
                  </transition>
                  <b-button v-if="catersta!=='0'" key="cancel" class="cancelbtn" :class="btnWidth" @click="cancelCatering">取消</b-button>
              </div>
              <div>
                <b-button v-if="catersta!=='0'" class="savebtn" @click="updateCatering">保存</b-button>
              </div>
            </div>
            <div class="btndiv" v-if="isNew">
              <b-button class="savebtn newbtn" @click="saveCatering">保存</b-button>
            </div>
          </b-col>
        </b-row>
        <b-row id = "catersub">
          <b-row style="width: 100%">
            <b-form-group class="numinput" :label-cols="6" label="房&#8195;&#8195;数"
                          horizontal>
              <FormatInput type="number" maxlength="5" v-model="localcatering.rmnum"></FormatInput>
            </b-form-group>
            <b-form-group class="numinput" :label-cols="6" label="入住人数"
                          horizontal>
              <FormatInput type="number" maxlength="5" v-model="localcatering.attends"></FormatInput>
            </b-form-group>
            <b-form-group class="normalput" :label-cols="4" label="协议单位" horizontal>
              <el-input @click.native="profileShow" @clear="profileClear" class="modalinput" clearable readonly v-model="localcatering.cusno_des">
                <i slot="prefix" class="fa fa-list"></i>
              </el-input>
            </b-form-group>
            <b-form-group class="normalput" :label-cols="4" label="跟进时间" horizontal>
              <el-date-picker
                v-model="localcatering.join_date"
                value-format="yyyy-MM-dd"
                type="date"
                :editable="editable"
                :picker-options="datepickerOptions">
              </el-date-picker>
            </b-form-group>
            <b-form-group class="normalput" :label-cols="4" label="确认期限"
                          horizontal>
              <el-date-picker
                v-model="localcatering.confirm_date"
                value-format="yyyy-MM-dd"
                type="date"
                :editable="editable"
                :picker-options="datepickerOptions">
              </el-date-picker>
            </b-form-group>
            <b-form-group class="normalput" label="现场联系人" :label-cols="5" horizontal>
              <b-form-input type="text" v-model="localcatering.contacter" maxlength="10"></b-form-input>
            </b-form-group>
          </b-row>
          <b-row style="width: 100%">
            <b-form-group class="longinput" :label-cols="1" label="迎&#8194;宾&#8194;词" horizontal>
              <b-form-input  type="text" v-model="localcatering.subject" maxlength="100"></b-form-input>
            </b-form-group>
          </b-row>
          <b-row style="width: 100%">
            <b-form-group class="longinput" :label-cols="1" label="备&#8195;&#8195;注" horizontal>
              <b-form-input  type="text" v-model="localcatering.remark" maxlength="200"></b-form-input>
            </b-form-group>
          </b-row>
        </b-row>
      </b-collapse>
    </b-card>

    <b-modal @shown="reasonShown" id="caterReasonmodal" ref="caterReasonmodal" title="理由列表" hide-footer>
      <Reason ref="caterReason" @reasonConfirm="reasonConfirm"></Reason>
    </b-modal>

    <el-dialog title="宾客档案查询" id="profilemodal" ref="profilemodal" :visible.sync="poparch">
      <pop-archives ref="refarch" @btnArchClose="btnArchClose"  @btnArchOk="btnArchOk" @btnChooseName="btnChooseName" :ifunit="profileType"></pop-archives>
    </el-dialog>

    <b-modal id="remarkmodal" ref="remarkmodal" size="lg" title="宴会备注" hide-footer>
      <remark></remark>
    </b-modal>

    <b-modal id="EOSharemodal" ref="EOSharemodal" title="宴会EO单" hide-footer>
      <EOShare></EOShare>
    </b-modal>
  </b-container>
</template>
<script>
  // 框架相关
  import vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'
  import methodinfo from '../../config/MethodConst.js'
  import {dateValid,formatDate} from '../../common/date'
  import archivesMixins from './../SalesActivities/archivesMixins'
  // 组件和参数
  import popArchives from '../SalesActivities/popArchives.vue'
  import EOShare from '../catering/EOShare.vue'

  const staPath = {
    Q:"../../../static/SC-Q.png",
    R:"../../../static/SC-R.png",
    C:"../../../static/SC-C.png",
    X:"../../../static/SC-X.png",
    I:"../../../static/SC-I.png",
    O:"../../../static/SC-O.png",
  }

  export default {
    name: 'CateringInfo',
    data () {
      return {
        caterdate:[],
        toggleclass:'fa-angle-up ',
        caterclose:false,
        editable:false,
        localcatering:{
          type:'1'
        },
        profileType:[
        {name:'公司',id:'C'},
        {name:'旅行社',id:'A'}
        ],
        //宴会类型
        typeOptions: [
          { code: '1', descript: '宴席' },
          { code: '2', descript: '会议' },
          { code: '3', descript: '活动' },
          { code: '4', descript: '其他' }
        ],
        //销售员列表
        saleoptions:[],
        sale:{},
        btnWidth:'halfbtn-width',
        dialogVisible:false,
        logkey:'',
        isClear:false
      }
    },
    props:{
      isNew :{
        type:Boolean,
        default:false
      },
    },
    mixins: [archivesMixins],
    computed: {
      ...mapGetters([
        'caterid',
        'catersta',
        'saleid',
        'catering',
        'salelist',
        'newCateringParam',
        'isHistory'
      ]),
      minDate() {
        if(!this.isNew){
          let arr = new Date(this.localcatering.arr.replace(/-/g,"/"))
          let now =  new Date(new Date() - 24 * 60 * 60 * 1000)
          if(arr > now){
            return now
          }else{
            return arr
          }
        }else{
          return new Date(new Date() - 24 * 60 * 60 * 1000)
        }
      },
      datepickerOptions() {
       return {
         disabledDate:this.getDisableDate
       }
      },
      staFont(){
        let val = this.catersta;
        if(val==='1'){
          return staPath.R;
        } else if(val==='2'){
          return staPath.C;
        } else if(val==='3'){
          return staPath.I;
        } else if(val==='0'){
          return staPath.X;
        } else if(val==='Q'){
          return staPath.Q;
        } else{
          return staPath.O;
        }
      }
    },
    methods: {
      saveCatering(){
        if(!this.localcatering.name){
          this.$alert("宴会名称不允许为空!")
          return;
        }else if(!this.caterdate[0]){
          this.$alert("抵离日期不允许为空!")
          return;
        }
        this.localcatering.sta = this.catersta;
        this.localcatering.arr = this.caterdate[0];
        this.localcatering.dep = this.caterdate[1];
        this.localcatering.saleid = this.sale.code;
        this.localcatering.saleid_name = this.sale.name;
        this.$emit('saveCatering',this.localcatering);
      },
      updateCatering(){
        if(this.catersta==='0'){
          this.$alert("请先恢复预订再进行保存!")
          return;
        }
        if(!this.localcatering.name){
          this.$alert("宴会名称不允许为空!")
          return;
        }
        this.localcatering.arr = this.caterdate[0];
        this.localcatering.dep = this.caterdate[1];
        this.localcatering.saleid = this.sale.code;
        this.localcatering.saleid_name = this.sale.name;
        let now = new Date(new Date() - 24 * 60 * 60 * 1000);
        if(dateValid(this.caterdate[1],now.toString())){
          this.$alert("宴会离开日期不能早于当前日期!")
          return;
        }

        this.$emit('updateCatering',this.localcatering);
      },
      updateCateringSta(sta){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
          this.$http.post(methodinfo.updatecateringsta, {
            caterid: this.localcatering.caterid,
            sta: sta
          }).then((response)=>{
            if (response.data.errorCode === '0') {
              this.$message('宴会保存成功')
              this.localcatering.sta = sta;
              this.$store.commit('setCatering', this.localcatering)
              this.$store.commit('setCatersta', sta)
              this.$store.dispatch("getEventList");
            } else {
              this.$alert(response.data.errorMessage)
            }
          });
        })
      },
      cancelCatering(){
        this.$refs.caterReasonmodal.show();
      },
      reasonShown(){
        this.$refs.caterReason.clearRow();
      },
      reasonConfirm(reason){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
          this.$http.post(methodinfo.updatecateringsta, {
            caterid: this.localcatering.caterid,
            sta: '0',
            cancelreason:reason.code
          }).then(()=>{
            this.localcatering.sta = '0';
            this.$store.commit('setCatering', this.localcatering)
            this.$store.commit('setCatersta', '0')
            this.$store.dispatch("getEventList");
          })
        })
      },
      profileShow(){
        if(!this.isClear){
          this.poparch = true;
          this.$refs.refarch.clearAll()
        }else{
          this.isClear =false;
        }
      },

      profileClear(){
        this.localcatering.cusno = '';
        this.localcatering.cusno_des = '';
        this.isClear =true;
      },
      getDisableDate(time){
        return time<this.minDate;
      },
      toggleclick(){
        if(!this.caterclose){
          this.toggleclass = "fa-angle-down";
        }else{
          this.toggleclass = "fa-angle-up";
        }
        this.caterclose=!this.caterclose;
      },
      btnenter(el){
        if(this.catersta!=='0'){
          this.btnWidth = 'halfbtn-width'
        }
      },
      btnleave(el){
        this.btnWidth = 'maxbtn-width'
      },
      showNote(){
        let caterinfo = {
          caterid:this.caterid,
          caterdes:this.catering.name,
          type:1
        };
        this.$store.commit('setNoteParam',caterinfo);
        this.$refs.remarkmodal.show();
      },
      showLog(){
        this.$store.commit('setLogtype','ScCatering');
        this.$store.commit('setLogKey',this.logkey);
        this.$root.$emit('bv::show::modal', 'caterlogmodal');
      },
      EOShare(){
        this.$refs.EOShare.getEOPrintRecord();
        this.$refs.EOSharemodal.show();
      },
      refreshData(){
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        setTimeout(() => {
          loading.close();
        }, 500);
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch('getCateringInfo');
          this.$store.dispatch('getEventList');
          this.$store.dispatch("getRoomList");
        })
      },
      clearData(){
        this.localcatering = {};
        this.caterdate = [];
      }
    },
    components: {
      popArchives,
      EOShare
    },
    created(){
      if(this.newCateringParam.hasOwnProperty('arr')){
        let param = this.newCateringParam
        this.localcatering = Object.assign({},param);
        this.caterdate.push(param.arr,param.dep)
        this.$store.commit('setNewCateringParam',{});
      }
    },
    watch: {
      catering(val,oldval){
        if(!this.isNew){
          this.localcatering = Object.assign({},val);
          this.caterdate = [];
          this.sale = { code:val.saleid,name:val.saleid_name};
          let groupid = this.$store.getters.groupid;
          let hotelid = this.$store.getters.hotel.hotelid;
          this.logkey = groupid +'|'+ hotelid +'|'+ this.localcatering.caterid ;
        }
        if(val.hasOwnProperty('arr')){
          this.caterdate.push(val.arr,val.dep)
        }
      },
      newCateringParam(val){
        if(val.hasOwnProperty('arr')){
          this.localcatering = Object.assign({},val);
          this.caterdate = [];
          this.caterdate.push(val.arr,val.dep)
          this.$store.commit('setNewCateringParam',{});
        }
      },
      salelist(val){
        if(val){
          this.saleoptions = val;
        }
      },
      catersta(val,oldval){
        if(val==='0'){
          this.btnWidth = 'maxbtn-width'
        }else if(oldval ==='0'){
          this.btnWidth = 'halfbtn-width'
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../css/color';
  #caterinfo{
    font-size: 0.9rem;
    margin-bottom: 1rem;
    .row{
      margin: 0;
    }
    .card-header,.card-body{
      padding: 0;
    }
    .card-header{
      height: 29px;
    }
    .catertitle{
      border-right: 1px solid $colorBorder;
    }
    .icondiv{
      border-left: 1px solid $colorBorder;
      padding-top: 3px;
    }
    input{
      font-size: 0.9rem;
    }
    .titleIcon{
      color: $colorIcon;
      font-size: 18px;
      cursor: pointer;
      padding: 0 2px;
    }
    .toggleclass{
      float: right;
      font-size: 20px;
      cursor: pointer;
      margin-top: -3px;
    }
    .el-input__inner{
      height: 33px;
      border-radius: 0;
    }
    .el-range-separator{
      padding: 0;
      width: 15px;
    }
    .el-range__close-icon{
      display: none;
    }
    .option-main{
      float: left;
    }
    .option-sub{
      float: right; color: #8492a6; font-size: 0.9rem
    }

    .titleInfo{
      flex: 0 0 65%;
    }
    //宴会主单主要信息
    #catermain{
      .el-icon-date,.fa{
        color: $colorIcon;
      }
      .Sta{
        width: 75px;
        height: 65px;
        border-radius: 5px;
        margin-top: 6px;
        /*.StaFont{*/
          /*padding-top: 3px;*/
          /*font-size: 3.5rem;*/
          /*color: white;*/
          /*height: 55px;*/
          /*line-height: 55px;*/
        /*}*/
      }
      .required{
        .col-form-label{
          font-weight: bold;
        }
      }
      .form-group{
        margin-bottom: 2px;
      }
      .form-row{
        margin-bottom: 1px;
      }
      .col-sm-1,.col-sm-2{
        padding: 0 10px;
      }
      .form-control{
        border: none;
        border-bottom: 1px solid $colorBorder;
        border-radius: 0;

      }
      .el-input__inner{
        width: 100%;
        padding: 0;
        border: none;
        border-bottom: 1px solid $colorBorder;
      }
      .el-input__inner:focus{
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }
      .el-select{
        width: 100%;
        .el-input__inner{
          padding: 0.375rem 0.75rem;
        }
      }
      .btn{
        border: none;
      }
      .btndiv{
        padding: 5px 0;
      }
      .reservebtn{
        width: 48.5%;
        background-color: $colorQuitBtn;
      }
      .confirmbtn{
        width: 48.5%;
        background-color: $colorQuitBtn;
      }
      .halfbtn-width{
        width: 48.5%;
      }
      .maxbtn-width{
        width: 99%;
      }
      .cancelbtn{
        background-color: $color8;
        transition:width .5s;
        -moz-transition:width .5s; /* Firefox 4 */
        -webkit-transition:width .5s; /* Safari and Chrome */
        -o-transition:width .5s; /* Opera */
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
      .savebtn {
        width: 99%;
        background-color: $colorSaveBtn;
        margin-top: 0.25rem;
      }
      .newbtn{
        margin-top: 20px;
        margin-bottom: 15px;
      }

    }
    //宴会主单附加信息
    #catersub{
      .el-icon-date,.fa{
        color: $colorIcon;
      }
      .modalinput{
        i{
          padding-top: 9px;
          padding-left: 5px;
        }
        .el-input__inner{
          padding-right: 25px;
        }
      }
      .form-control:focus{
        box-shadow: none;
      }
      margin-bottom: 10px;
      .form-group{
        margin: 0;
      }
      .form-row{
        margin: 0;
      }
      .row{
        padding: 0 10px;
      }
      .form-control{
        border-radius: 0;
        border-color:$colorForm;
        line-height:1.7;
      }
      .el-input{
        width: 100% !important;
        .el-input__icon{
          margin-top: -4px;
        }
      }
      .el-input__inner{
        width: 101%;
        border-color: $colorForm;
      }
      .col-form-label{
        padding-top: calc(0.375rem + 2px);
      }
      .numinput{
        flex:0 0 12%;
        div{
          padding: 0;
        }
      }
      .normalput {
        flex:0 0 19%;
        div {
          padding: 0;
        }
      }
      //备注和迎宾词输入框
      .longinput{
        div{
          padding: 0;
          flex: 0 0 94%;
          max-width: 100%
        }
        .form-control{
          border-top: none;
        }
        //文本和上面对齐
        legend{
          flex: 0 0 6%;
        }
      }
      legend{
        background-color: $colorForm;
        font-size: 0.85rem;
        padding-left: 10px;
      }
      .longinput{
        width: 100%;
      }
    }
    .el-dialog{
      width: 800px;
      margin: 0 auto;
      margin-top: 10px !important;
    }
    .el-dialog__header{
      border-bottom: 1px solid $colorBorder;
    }
    .el-dialog__body{
      padding: 30px 10px;
    }
  }
</style>
