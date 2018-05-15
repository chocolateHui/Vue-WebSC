<template>
  <div>
  <div class="pop_sales">
    <div class="pop_sales_tou">销售日记<i class="fa fa-close" @click="popExit"></i></div>
    <ul class="clearfix">
      <li><label class="title1">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</label><input type="text" v-model="popunit" id="unit" @click="btnUnit" readonly="readonly"></li>
      <li><label class="title2">宾客</label><input type="text" id="guests" @click="btnGuests" v-model="popguest" readonly="readonly"></li>
      <li><label class="title1 nofb">单位联系人</label><input type="text" v-model="contact" id="contact"></li>
      <li><label class="title2 nofb">单位联系方式</label><input type="text" id="contactinfor" v-model="contactinfor" maxlength="20"></li>
      <li><label class="title1">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</label><input ref="calendar" type="text" :value="datetime" @click="dataShow" id="date" readonly="readonly">
        <div class="saleCalendar" v-if="calendarShow">
        <calendar @choseDay="choseDay"></calendar>
        </div>
      </li>
      <li><i class="fa" :class="{'fa-check':ifcheck}" id="instructions"></i>是否已批示</li>
      <li>
        <label class="title2">销售类型</label><div class="select" id="type">
        <p :data-id="popsaletypeid" ref="reftype" @click="typeShow">{{saletype}}</p>
        <ol v-if="salesTypeShow">
          <li v-for="saleList in baseCodeList" :data-id="saleList.code" @click="btnTypeSelect(saleList)">{{saleList.descript}}</li>
        </ol>
      </div>
      </li>
      <li>
        <label class="title1">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间</label><div class="select" id="time">
        <p :data-id="dayNowId" @click="dayNowShow" ref="reftoday">{{dayNow}}</p>
        <ol v-if="ifTimeNow">
          <li v-for="item in todayList" :data-id="item.id" @click="dayNowHide(item)">{{item.time}}</li>
        </ol>
      </div>
      </li>
      <li><label class="title2">金额</label><input type="number" id="amount" v-model="amount" maxlength="10"></li>
      <li><label class="title1 nofb">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label><textarea id="remarks" v-model="remarks"></textarea></li>
      <li><label class="title1 nofb">结&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;果</label><textarea id="result" v-model="result"></textarea></li>
      <li>
        <label class="title1">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;志</label><div class="select" id="sign">
        <p :data-id="signId" @click="btnSignShow" ref="refsign">{{signStatus}}</p>
        <ol v-if="signShow">
          <li v-for="list in signList" :data-id="list.id" @click="btnSignHide(list)">{{list.status}}</li>
        </ol>
      </div>
      </li>
      <li>
        <label class="title2">销售员</label>
        <input type="text" id="seller" @click="btnSalesShow" ref="refsales" :class="{'bgSales':ifbgSales}" :disabled="ifbgSales" :data-id="salesId" :value="salesName" readonly="readonly">
        <ol class="seller_select" v-if="salesShow">
          <li v-for="list in salelist" :data-id="list.code" @click="btnSalesHide(list)">{{list.name}}</li>
        </ol>
      </li>
      <li><label class="title2">修改</label><input type="text" id="modify_name" v-model="modifyName" disabled="disabled"><input type="text" v-model="modifyTime" id="modify_time" disabled="disabled"></li>
    </ul>
    <h1><input type="button" v-if="datadiary!=''" @click="btnInstruct" class="btn_instructions" value="批示"><input type="button" class="btn_save" @click="btnSave" value="保存"><input type="button" class="btn_saveas" @click="btnSaveas" value="另存"><input type="button" class="btn_exit" @click="popExit" value="退出"></h1>
  </div>
    <pop-archives @btnArchClose="btnArchClose" @btnArchOk="btnArchOk" :ifunit="ifUnit?unit:guests" v-if="poparch" @btnChooseName="btnChooseName"></pop-archives>
  <pop-instructions v-if="ifInstructions" :instructtext="instructText" :instructtime="instructTime" :instructperson="instructPerson" @InstructOk="InstructOk" @InstructClose="InstructClose"></pop-instructions>

  </div>
</template>
<script>
  import methodinfo from '../../config/MethodConst.js'
  import popArchives from './popArchives'
  import popInstructions from './popInstructions'
  import calendar from '../../components/vue-calendar-component/calendar'
  import '../../css/SalesActivite.scss'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
    export default {
        name: "pop-sale",
      data() {
        return {
          // dateList: [],
          datetime: "",
          today:'',
          calendarShow:false,
          salesTypeShow:false,
          popsaletypeid:'',
          saletype:'',
          ifTimeNow:false,
          dayNowId:'AM',
          dayNow:'上午' ,
          todayList:[
            {time:'上午',id:'AM'},
            {time:'下午',id:'PM'},
            {time:'晚上',id:'EM'}
          ],
          signId:'1',
          signStatus:'有效',
          signList:[
            {status:'有效',id:'1'},
            {status:'待确认',id:'2'},
            {status:'确认',id:'3'},
            {status:'取消',id:'4'},
          ],
          signShow:false,
          salesName:'',
          salesId:'',
          salesShow:false,
          poparch: false,
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
          instructText:''
        }
      },
      props:['clickdata','saletypea','datadiary','saletypeid','saletime','salesnameid','sellerneme','timedetail','timedetailid'],
      components:{
        calendar,
        popArchives,
        popInstructions
      },
      computed: {
        ...mapGetters(['baseCodeList']),
        ...mapGetters(['salelist']),
        ...mapGetters(['guestDiary']),
      },
      created(){
          if(this.clickdata==''){
            this.datetime=this.saletime
          }else{
            this.datetime=this.clickdata
          }
        if(this.salesnameid==''){
            this.ifbgSales=false
        }else{
            this.ifbgSales=true
        }
      },
      methods:{
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
        },
        btnSaveas:function () {
          if(this.popunit==''&&this.popguest==''){
            this.$message({
              message: "单位和宾客至少填写一项",
              type: "warning"
            });
          }else if(this.amount==''||this.amount<=0){
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
              memsta:this.ifcheck?'T':'F',
              saleid:this.salesId,
              ref:this.remarks,
              tag:this.signId
            }
            this.$emit('saveorupdateguestdiary',json)
          }
        },
        btnSave:function () {
          if(this.popunit==''&&this.popguest==''){
            this.$message({
              message: "单位和宾客至少填写一项",
              type: "warning"
            });
          }else if(this.amount==''||this.amount<=0){
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
        btnArchOk:function (param,popType,popno,archTypeId) {
          if(param==''){
            this.$message({
              message: "请选择档案",
              type: "warning"
            });
          }else{
            this.poparch=false;
            if(archTypeId=='A'||archTypeId=='C'){
              this.popunit=popType
              this.popunitno=popno
            }else{
              this.popguest=popType
              this.popguestno=popno
            }
          }
        },
        btnChooseName:function (popType,popno,archTypeId) {
          this.poparch=false;
          if(archTypeId=='A'||archTypeId=='C'){
            this.popunit=popType
            this.popunitno=popno
          }else{
            this.popguest=popType
            this.popguestno=popno
          }
        },
        btnArchClose:function () {
          this.poparch=false;
        },
        InstructClose:function () {
          this.ifInstructions=false
        },
        popExit:function(){
          this.$emit('btnExit')
        },
        btnUnit:function () {
          this.ifUnit=true
          this.poparch=true;
        },
        btnGuests:function () {
          this.ifUnit=false
          this.poparch=true;
        },
        dataShow:function () {
          this.calendarShow=true
        },
        choseDay(data) {
          var data1=data.split("/")
          if(data1[1]<10){
            data1[1]='0'+data1[1]
          }
          if(data1[2]<10){
            data1[2]='0'+data1[2]
          }
          this.datetime=data1[0] + '-' + data1[1]+'-'+data1[2];
          this.calendarShow=false
        },
        typeShow:function () {
          this.salesTypeShow=true
        },
        btnTypeSelect:function(item){
          this.saletype=item.descript
          this.popsaletypeid=item.code
          this.salesTypeShow = false
        },
        dayNowShow:function () {
          this.ifTimeNow=true
        },
        dayNowHide:function (item) {
          this.dayNow=item.time
          this.dayNowId=item.id
          this.ifTimeNow = false
        },
        btnSignShow:function () {
          this.signShow=true
        },
        btnSignHide:function (item) {
          this.signId=item.id
          this.signStatus=item.status
          this.signShow = false
        },
        btnSalesShow:function () {
          this.salesShow=true
        },
        btnSalesHide:function (item) {
          this.salesName=item.name
          this.salesId=item.code
          this.salesShow = false
        }
      },
      mounted:function () {
        if(this.datadiary!='0'){
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            //获取工号信息,完成后进行路由
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
                }
                _this.popsaletypeid=this.guestDiary.item
                _this.dayNowId=this.guestDiary.ctime
                var dayname=this.guestDiary.ctime
                _this.todayList.map(function (item) {
                  if(item.id==dayname){
                    dayname=item.time
                  }
                })
                _this.dayNow=dayname
                _this.remarks=this.guestDiary.ref
                _this.result=this.guestDiary.feedback
                _this.signId=this.guestDiary.tag
                var signstatusname=this.guestDiary.tag
                _this.signList.map(function (item) {
                  if(item.id==signstatusname){
                    signstatusname=item.status
                  }
                })
                _this.signStatus=signstatusname
                _this.salesId=this.guestDiary.saleid
                var salesname=this.guestDiary.saleid
                _this.salelist.map(function (item) {
                  if(item.code==salesname){
                    salesname=item.name
                  }
                })
                _this.salesName=salesname
                _this.modifyName=this.guestDiary.cby
                _this.modifyTime=this.guestDiary.changed
                var saletypename=this.guestDiary.item
                _this.baseCodeList.map(function (item) {
                  if(item.code==saletypename){
                    saletypename=item.descript
                  }
                })
                _this.saletype=saletypename
                _this.instructPerson=this.guestDiary.memby,
                _this.instructTime=this.guestDiary.memdate,
                _this.instructText=this.guestDiary.memorandum
              })
            })
          })
        }else{
           this.salesName=this.sellerneme
          this.salesId=this.salesnameid
          this.dayNowId=this.timedetailid
          this.dayNow=this.timedetail
          if(this.baseCodeList){
            if(this.saletypea!=''){
              this.saletype=this.saletypea
              this.popsaletypeid=this.saletypeid
            } else{
              this.saletype=this.baseCodeList[0].descript
              this.popsaletypeid=this.baseCodeList[0].code
            }
          }
        }
        document.addEventListener('click',(e)=>{
          if(this.$refs.reftype){
            if (!this.$refs.reftype.contains(e.target)) {
              this.salesTypeShow = false
            }
          }
          if(this.$refs.reftoday) {
            if (!this.$refs.reftoday.contains(e.target)) {
              this.ifTimeNow = false
            }
          }
          if(this.$refs.refsign) {
            if (!this.$refs.refsign.contains(e.target)) {
              this.signShow = false
            }
          }
          if(this.$refs.calendar) {
            if (!this.$refs.calendar.contains(e.target)) {
              this.calendarShow = false
            }
          }
          if(this.$refs.refsales) {
            if (!this.$refs.refsales.contains(e.target)) {
              this.salesShow = false
            }
          }
        })
      }
    }
</script>

<style scoped lang="scss">
  .saleCalendar{
    top: 35px;
    left: 75px;
    position: absolute;
    z-index: 22;
  }
  .bgSales{
    background-color: #F5F5F5!important;
  }
</style>
