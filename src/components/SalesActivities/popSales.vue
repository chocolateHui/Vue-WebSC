<template>
  <div>
  <div id="pop_sales" class="pop_sales">
    <div class="pop_sales_tou">销售日记<i class="fa fa-close" @click="popExit"></i></div>
    <ul class="clearfix">
      <li><label class="title1 saleBlod">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</label><input type="text" v-model="popunit" class="unit" @click="btnUnit" readonly="readonly"></li>
      <li><label class="title2 saleBlod">宾客</label><input type="text" class="guests" @click="btnGuests" v-model="popguest" readonly="readonly"></li>
      <li><label class="title1 nofb">单位联系人</label>
        <input type="text" v-model="contact" class="contact" maxlength="25"></li>
      <li><label class="title2 nofb">单位联系方式</label>
        <FormatInput type="number" maxlength="11" v-model="contactinfor" class="contactinfor"></FormatInput>
       </li>
      <li><label class="title1">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</label>
        <el-date-picker
          :clearable="false"
          v-model="datetime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </li>
      <li><i class="fa" :class="{'fa-check':ifcheck,'bgSales':!ifcheck}" id="instructions"></i>是否已批示</li>
      <li style="padding-left: 15px;width: 258px">
        <b-form-group label="销售类型&#8194;" class="boldgroup" horizontal>
          <el-select v-model="popsaletypeid" clearable filterable>
            <el-option
              v-for="item in diaryItemList"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
        </b-form-group>
      </li>
      <li class="timestyle">
        <b-form-group label="时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间" horizontal>
          <el-select v-model="dayNowId" filterable>
            <el-option
              v-for="item in todayList"
              :key="item.id"
              :label="item.time"
              :value="item.id">
            </el-option>
          </el-select>
        </b-form-group>
      </li>
      <li><label class="title2 saleBlod">金额</label>
        <!--<input type="text" id="amount" v-model.trim="amount" maxlength="20">-->
        <FormatInput type="float" maxlength="10" v-model="amount" id="amount"></FormatInput>
      </li>
      <li><label class="title1 nofb">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label><textarea id="remarks" v-model="remarks" maxlength="200"></textarea></li>
      <li><label class="title1 nofb">结&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;果</label><textarea id="result" v-model="result" maxlength="200"></textarea></li>
      <li class="signstyle">
        <b-form-group label="标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;志" horizontal>
          <el-select v-model="signId" filterable>
            <el-option
              v-for="item in signList"
              :key="item.id"
              :label="item.status"
              :value="item.id">
            </el-option>
          </el-select>
        </b-form-group>
      </li>
      <li class="signstyle">
        <b-form-group class="boldgroup" label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售员" horizontal>
          <el-select v-model="salesId" :disabled="ifbgSales" clearable filterable>
            <el-option
              v-for="item in salelist"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </b-form-group>
      </li>
      <li><label class="title2">修改</label><input type="text" class="modify_name" v-model="modifyName" disabled="disabled"><input type="text" v-model="modifyTime" class="modify_time" disabled="disabled"></li>
    </ul>
    <h1><input type="button" v-if="datadiary!='0'" @click="btnInstruct" class="btn_instructions" value="批示"><input type="button" class="btn_save" @click="btnSave" value="保存"><input type="button" class="btn_saveas" @click="btnSaveas" value="另存"><input type="button" class="btn_exit" @click="popExit" value="退出"></h1>
  </div>
    <el-dialog
      title="宾客档案查询"
      :visible.sync="poparch"
      width="100%"
      :modal-append-to-body.sync="ifInstruct"
    >
      <pop-archives ref="refarch" @btnArchClose="btnArchClose" :archFlag="archFlag" @btnArchOk="btnArchOk" :ifunit="ifUnit?unit:guests" @btnChooseName="btnChooseName"></pop-archives>
    </el-dialog>
    <el-dialog
      title="批示内容"
      :visible.sync="ifInstructions"
      width="100%"
      :modal-append-to-body.sync="ifInstruct"
      >
      <pop-instructions :instructtext="instructText" :instruFlag="instruFlag" :instructtime="instructTime" :instructperson="instructPerson" @InstructOk="InstructOk" @InstructClose="InstructClose"></pop-instructions>
    </el-dialog>
  </div>
</template>
<script>
  import methodinfo from '../../config/MethodConst.js'
  import popArchives from './popArchives'
  import popInstructions from './popInstructions'
  import calendar from '../../components/vue-calendar-component/calendar'
  import '../../css/SalesActivite.scss'
  import archivesMixins from './archivesMixins'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
    export default {
        name: "pop-sale",
      data() {
        return {
          ifInstruct:false,
          datetime: "",
          today:'',
          popsaletypeid:'',
          dayNowId:'AM',
          todayList:[
            {time:'上午',id:'AM'},
            {time:'下午',id:'PM'},
            {time:'晚上',id:'EM'}
          ],
          signId:'1',
          signList:[
            {status:'有效',id:'1'},
            {status:'待确认',id:'2'},
            {status:'确认',id:'3'},
            {status:'取消',id:'4'},
          ],
          salesId:'',
          unit:[
            {name:'公司',id:'C'},
            {name:'旅行社',id:'A'}
          ],
          guests:[{
            name:'宾客',
            id:'F'
          }],
          ifUnit:true,
          popunit:'',
          popguest:'',
          popunitno:'',
          popguestno:'',
          amount:'',
          contact:'',
          contactinfor:'',
          remarks:'',
          result:'',
          ifInstructions:false,
          modifyName:'',
          modifyTime:'',
          ifbgSales:false,
          ifcheck:false,
          instructPerson:'',
          instructTime:'',
          instructText:'',
          archFlag:1,
          instruFlag:1,
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
          },
        };
      },
      mixins: [archivesMixins],
      props:['clickdata','saletypea','datadiary','saletypeid','saletime','salesnameid','timedetailid','salesFlag'],
      components:{
        calendar,
        popArchives,
        popInstructions,
      },
      watch:{
        salesFlag:function (val,oldval) {
           this.popSaleData()
        },
        datetime:function (val,oldval) {
           this.datetime=this.dateFormat(this.datetime)
        },
      },
      computed: {
        ...mapGetters(['diaryItemList']),
        ...mapGetters(['salelist']),
        ...mapGetters(['guestDiary']),
      },
      created(){

      },
      methods:{
        dateFormat: function (date) {
          date = new Date(date)
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },
        configDefault:function () {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
        },
        InstructOk:function (text) {
          var insId=this.datadiary
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            this.$http.post(methodinfo.updatememorandum, {
              id:insId,
              memorandum:text
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode == '0') {
                  this.ifInstructions=false
                  this.ifcheck=true
                  this.instructText=response.data.memorandum
                  this.instructPerson=response.data.cby
                  this.instructTime=response.data.changed
                }else {
                  this.$message({
                    message:response.data.errorMessage,
                    type: "warning"
                  });
                }
              }
            })
          })
        },
        btnInstruct:function () {
          this.ifInstructions=true
          this.$set(this,"instruFlag",this.instruFlag+1);
        },
        btnSaveas:function () {
          var money=/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,9})?)$/;
          if(this.popunit==''&&this.popguest==''){
            this.$message({
              message: "单位和宾客至少填写一项",
              type: "warning"
            });
          } else if(this.amount==''||this.amount<=0||!money.test(this.amount)){
            this.$message({
              message: "请填写正确金额",
              type: "warning"
            });
          }else if(this.salesId==''){
            this.$message({
              message: "请选择销售员",
              type: "warning"
            });
          }else{
            var json={
              amount:parseFloat(this.amount)*1.0,
              applname:this.contact,
              appltel:this.contactinfor,
              ctime:this.dayNowId,
              cusno:this.popunitno,
              cusnodes:this.popunit,
              no:this.popguestno,
              nodes:this.popguest,
              date:this.datetime,
              feedback:this.result,
              item:this.popsaletypeid,
              memorandum:this.instructText,
              memsta:'F',
              saleid:this.salesId,
              ref:this.remarks,
              tag:this.signId
            }
            this.$emit('saveorupdateguestdiary',json)
          }
        },
        btnSave:function () {
          var money=/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,9})?)$/;
          if(this.popunit==''&&this.popguest==''){
            this.$message({
              message: "单位和宾客至少填写一项",
              type: "warning"
            });
          }else if(this.popsaletypeid==''){
            this.$message({
              message: "请选择销售类型",
              type: "warning"
            });
          }else if(this.amount==''||this.amount<=0||!money.test(this.amount)){
            this.$message({
              message: "请填写正确金额",
              type: "warning"
            });
          }else if(this.salesId==''){
            this.$message({
              message: "请选择销售员",
              type: "warning"
            });
          }
          else{
            var json={
              amount:parseFloat(this.amount)*1.0,
              applname:this.contact,
              appltel:this.contactinfor,
              ctime:this.dayNowId,
              cusno:this.popunitno,
              cusnodes:this.popunit,
              no:this.popguestno,
              nodes:this.popguest,
              date:this.datetime,
              feedback:this.result,
              id:this.datadiary,
              item:this.popsaletypeid,
              memorandum:this.instructText,
              memsta:this.ifcheck?'T':'F',
              saleid:this.salesId,
              ref:this.remarks,
              tag:this.signId
            }
           this.$emit('saveorupdateguestdiary',json)
          }
        },
        InstructClose:function () {
          this.ifInstructions=false
        },
        popExit:function(){
          this.$emit('btnExit')
        },
        btnUnit:function () {
          this.$set(this,"archFlag",this.archFlag+1);
          this.ifUnit=true
          this.poparch=true;
        },
        btnGuests:function () {
          this.$set(this,"archFlag",this.archFlag+1);
          this.ifUnit=false
          this.poparch=true;
        },
        popSaleData:function () {
          this.ifInstructions=false
          this.poparch=false
          if(this.clickdata==''){
            this.datetime=this.saletime
          }else{
            this.datetime=this.clickdata
          }
          if(this.salesnameid=='0'){
            this.ifbgSales=false
          }else{
            console.log(this.salesnameid)
            this.ifbgSales=true
          }
          var _this=this
          if(this.datadiary!='0'){
            this.$store.dispatch('encrypttoken').then(() => {
              this.$store.dispatch('getguestdiary',this.datadiary).then(() => {
                this.$nextTick(function(){
                  _this.popunit=this.guestDiary.cusnodes
                  _this.popunitno=this.guestDiary.cusno
                  _this.popguest=this.guestDiary.nodes==''?this.guestDiary.no:this.guestDiary.nodes
                  _this.popguestno=this.guestDiary.no
                  _this.amount=this.guestDiary.amount
                  _this.contact=this.guestDiary.applname
                  _this.contactinfor=this.guestDiary.appltel
                  _this.datetime=this.guestDiary.date
                  if(this.guestDiary.memsta=="T"){
                    _this.ifcheck=true
                  }else{
                    _this.ifcheck=false
                  }
                  _this.popsaletypeid=this.guestDiary.item
                  _this.dayNowId=this.guestDiary.ctime
                  _this.remarks=this.guestDiary.ref
                  _this.result=this.guestDiary.feedback
                  _this.signId=this.guestDiary.tag
                  _this.salesId=this.guestDiary.saleid
                  _this.modifyName=this.guestDiary.cby
                  _this.modifyTime=this.guestDiary.changed
                  _this.instructPerson=this.guestDiary.memby,
                    _this.instructTime=this.guestDiary.memdate,
                    _this.instructText=this.guestDiary.memorandum
                })
              })
            })
          }else{
            _this.popunit=''
            _this.popunitno=''
            _this.popguest=''
            _this.popguestno=''
            _this.amount=''
            _this.contact=''
            _this.contactinfor=''
            _this.ifcheck=false
            _this.modifyName=''
            _this.modifyTime=''
            _this.instructPerson=''
              _this.instructTime=''
              _this.instructText=''
            _this.remarks=''
            _this.result=''
            _this.signId=this.signList[0].id
            this.salesId=this.salesnameid=='0'?'':this.salesnameid
            if(this.timedetailid!=''&&this.timedetailid){
              this.dayNowId=this.timedetailid
            }else{
              this.dayNowId=this.todayList[0].id
            }
            if(this.diaryItemList.length>0){
              if(this.saletypeid!=''){
                this.popsaletypeid=this.saletypeid
              } else{
                this.popsaletypeid=this.diaryItemList[0].code
              }
            }
          }
        },
      },
      mounted:function () {
      }
    }
</script>

<style lang="scss">
  #pop_sales{
    .saleBlod{
      font-weight: bold;
    }
    .boldgroup legend{
      font-weight: bold;
      padding-top: 3px;
    }
    .bgSales{
      background-color: #F5F5F5!important;
    }
    .el-input__icon{
      line-height:25px;
    }
    .el-date-editor.el-input{
      width: 112px;
    }
    .el-input__inner{
      border-radius: 0!important;
      padding: 0 0px 0 30px;
    }
    .el-select .el-input__inner{
      padding: 0 5px;
      height: 24px!important;
    }
    .col-sm-3 {
      flex: 0 0 23%;
      max-width: 23% !important;
      padding-right: 0!important;
      padding-left: 0;
    }
    .col-sm-9 {
      flex: 0 0 77%;
      max-width: 77% !important;
      padding: 0!important;
    }
    .timestyle{
      width: 193px;
      .col-sm-3 {
        flex: 0 0 39%;
        max-width: 39% !important;
        padding-right: 0!important;
        padding-left: 0;
      }
      .col-sm-9 {
        flex: 0 0 61%;
        max-width: 61% !important;
        padding: 0!important;
      }
    }
    .signstyle{
      width: 147px;
      .col-sm-3 {
        flex: 0 0 50%;
        max-width: 50% !important;
        padding-right: 0!important;
        padding-left: 0;
      }
      .col-sm-9 {
        flex: 0 0 50%;
        max-width: 50% !important;
        padding: 0!important;
      }
    }
    .col-form-label{
      padding-top: 2px;
    }
    .form-row{
      margin-left: 0;
    }
    .form-group {
       margin-bottom: 0;
    }
    .el-select{
      width: 100%;
    }
    .el-select .el-input.is-disabled .el-input__inner{
      height: 24px!important;
    }
  }
  .el-dialog__wrapper{
    left: -20px;
    overflow: visible !important;
    .el-dialog__header{
      border-bottom: 1px solid #d9d9d9;
    }
    .el-dialog{
      margin: 0 auto;
      margin-top: -10px !important;
    }
    .el-dialog__body {
      padding: 30px 10px;
    }
  }
</style>
