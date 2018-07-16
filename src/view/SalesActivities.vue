<template>
    <div id="salesContain" class="salesContain">
    <div class="sales_activities">
      <div class="content_right">
        <div class="select">
          <b-form-select v-model="salesId" @input="SalesSelect" class="mb-3" size="sm" >
            <option v-if="role!=='02'&&role!=='03'" value="">全部</option>
            <option v-for="item in salelist" :value="item.code" :key="item.code">{{item.name}}</option>
          </b-form-select>
          <!--<p ref="refsales" @click="salesShow" :data-id="salesId">{{salesName}}</p>-->
          <!--<ul v-if="ifSales">-->
            <!--<li v-if="role!=='02'" @click="btnSalesSelectALL" data-id="">全部</li>-->
            <!--<li @click="btnSalesSelect(item)" v-for="item in salelist"  :data-id="item.code">{{item.name}}</li>-->
          <!--</ul>-->
        </div>
        <div class="task_type"  ref="basetype">
          <p>任务类别</p>
          <ul>
            <li :style="{background:item.bgcolor}" v-for="(item,index) in baseCodeListarc" :key="index" draggable='true' @dragstart='dragstart($event)' :type-name="item.descript" :type-id="item.code">{{item.descript}}</li>
          </ul>
        </div>
      </div>
      <div class="content_left">
        <div class="content_left_tou">
          <ul class="clearfix">
            <li class="fl">
              <button class="btn_left fa fa-caret-left" @click="btnLeft"></button>
              <button class="btn_right fa fa-caret-right" @click="btnRight"></button>
              <span style="position: relative">
                <input type="button" class="btn_today" @click="btnToday"  data-type="1"  v-model="timeType">
              </span>
            </li>
            <li class="fr"><input type="button" class="btn_month" :class="{'current':ifMonth}" value="月" @click="monthNow"><input type="button" class="btn_day"
                                                                                                                                  value="日" @click="dayNow":class="{'current':!ifMonth}"  ></li>
            <li class="tc"><span data-type="1" id="timeData"  ref="refcalendar" @click="ifCalendarShow">{{datetime}}</span>
              <div class="saleCalendar"  ref="refcalendar" v-if="calendarShow">
                <calendar :dataSign="datetimenow" @choseDay="choseDay" ></calendar>
              </div>
            </li>
          </ul>
        </div>
        <div class="content_left_month" v-if="ifMonth">
          <ol class="clearfix">
            <li>星期一</li>
            <li>星期二</li>
            <li>星期三</li>
            <li>星期四</li>
            <li>星期五</li>
            <li>星期六</li>
            <li>星期日</li>
          </ol>
          <ul class="clearfix">
            <li v-for="item in list" v-if="item.otherMonth==-1" :class="{isTodayNow:item.isTodayNow,nextMonth: item.otherMonth}">
              {{item.id}}
            </li>
            <li @drop='monthdrop($event,item.id)' @dragover='allowDrop($event)' v-for="item in list" v-if="!item.otherMonth"  @click="monthPopSaleShow(item)" class="Wselday" :class="{wh_isToday: item.isToday,wh_isMark:item.isMark,todaySelect:item.isTodayNow}">
              <p class="title"> {{item.id}}</p>
              <h1 @click="btnDetail(diaryList)" v-for="diaryList in guestdiarylist" v-if="guestdiarylist?item.id==diaryList.date.substring(8,10):false"><h1 :style="{background:salesTypecontain.bgcolor}" v-for="salesTypecontain in baseCodeListarc" v-if="diaryList.item==salesTypecontain.code"><span v-for="salesType in baseCodeListarc" v-if="diaryList.item==salesType.code">{{salesType.descript}}</span><strong v-for="sales in salelist" v-if="diaryList.saleid==sales.code">{{sales.name}}</strong></h1></h1>
            </li>
            <li v-for="item in list" v-if="item.otherMonth==1" :class="{isTodayNow:item.isTodayNow,nextMonth: item.otherMonth}">
              {{item.id}}
            </li>
          </ul>
        </div>
        <div class="content_left_day" v-if="!ifMonth">
          <ol class="clearfix">
            <li class="navfirst"></li>
            <li class="nav1">上午</li>
            <li class="nav2">下午</li>
            <li class="nav3">晚上</li>
          </ol>
          <ul v-for="item in salelist" class="clearfix" :data-id="item.code">
            <li class="navfirst">{{item.name}}</li>
            <li class="nav1" @click='dayPopSaleShow(item.name,item.code,"AM","上午")' @drop='daydrop($event,item.name,item.code,"AM","上午")' @dragover='allowDrop($event)'>
              <h1 @click="btnDetail(diaryList)" v-for="diaryList in guestdiarylist" v-if="item.code==diaryList.saleid&&diaryList.ctime=='AM'"><h1 :style="{background:salesType.bgcolor}" v-for="salesType in baseCodeListarc" v-if="diaryList.item==salesType.code"><span>{{salesType.descript}}</span></h1></h1>
            </li>
            <li class="nav2" @click='dayPopSaleShow(item.name,item.code,"PM","下午")' @drop='daydrop($event,item.name,item.code,"PM","下午")' @dragover='allowDrop($event)'>
              <h1 @click="btnDetail(diaryList)" v-for="diaryList in guestdiarylist" v-if="item.code==diaryList.saleid&&diaryList.ctime=='PM'"><h1 :style="{background:salesType.bgcolor}" v-for="salesType in baseCodeListarc" v-if="diaryList.item==salesType.code"><span>{{salesType.descript}}</span></h1></h1>
            </li>
            <li class="nav3" @click='dayPopSaleShow(item.name,item.code,"EM","晚上")' @drop='daydrop($event,item.name,item.code,"EM","晚上")' @dragover='allowDrop($event)'>
              <h1 @click="btnDetail(diaryList)" v-for="diaryList in guestdiarylist" v-if="item.code==diaryList.saleid&&diaryList.ctime=='EM'"><h1 :style="{background:salesType.bgcolor}" v-for="salesType in baseCodeListarc" v-if="diaryList.item==salesType.code"><span>{{salesType.descript}}</span></h1></h1>
            </li>
          </ul>
        </div>
      </div>
    </div>
      <b-modal id="logmodal" ref="myModalsale" :no-close-on-backdrop="true" :no-close-on-esc="true" @hidden="onHidden" size="lg" title="销售日记" hide-footer>
         <pop-sales style="padding-left: 100px" :clickdata="clickData" :datadiary="diaryId" :salesFlag="salesFlag" @saveorupdateguestdiary="saveorupdateguestdiary" @btnExit="btnExit" :saletime="popSalesTime" :saletypea="popSalesType" :salesnameid="salesId" :saletypeid="popSalesTypeId" :sellerneme="popSaller" :timedetail="timeDetail" :timedetailid="timeDetailId"></pop-sales>
      </b-modal>
      <div id="layer2"></div>
  </div>
</template>
<script>
  import calendar from '../components/vue-calendar-component/calendar'
  import popSales from '../components/SalesActivities/popSales'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
  import methodinfo from '../config/MethodConst.js'
  import '../css/SalesActivite.scss';
  export default {
    name: "sales-activities",
    data() {
      return {
        status: 'accepted',
        datetime: "",
        today: '',
        ifMonth: true,
        timeType: "本月",
        dataType: '1',
        // 当前月份时间
        dataTime: '',
        myData: [],
        list: [],
        calendarShow:false,
        thisDay:false,
        salesId:'',
        ifSales:false,
        diaryParam:{},
        sameData:false,
        dom:null,
        clickData:'',
        popSalesType:'',
        //销售类型
        popSalesTypeId:'',
        popSalesTime:'',
        diaryId:'0',
        popSaller:'',
        timeDetail:'',
        timeDetailId:'',
        datetimenow:'',
        bgcolorFlag:['#A0A0A0','#82AF6F','#D15B47','#9585BF','#FEE188','#D6487E','#3A87AD'],
        diaryItemList:[],
        baseCodeListarc:[],
        salelist:[],
        salesFlag:1,
        infoName:'11'
      }
    },
    computed: {
      ...mapGetters(['guestdiarylist']),
      ...mapGetters(['guestDiary']),
      ...mapGetters(['isLoading']),
      ...mapGetters(['role']),
    },
    created() {
      this.$store.commit("set_loading",true);
      this.myData = new Date();
    },
    props: {
      markArray: { default: '[]' },
      agoDayHide: { default: '0' },
      futureDayHide: { default: '15181550670000' },
      isHideOtherday: { default: false },
    },
    components: {
      popSales,
      calendar
    },
    methods:{
      btnDetail:function (id) {
         this.diaryId=id.id
        this.$set(this,"salesFlag",this.salesFlag+1);
        this.$refs.myModalsale.show()
      },
      saveorupdateguestdiary:function (param) {
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.saveorupdateguestdiary,param).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                this.SalesSelect()
                this.$refs.myModalsale.hide()
              }else{

              }
            }
          })
        })
      },
      //销售类别拖动
      dragstart:function(event){
        event.dataTransfer.setData("infoName"," ");
        this.dom = event.currentTarget
      },
      allowDrop:function(event){
        event.preventDefault();
      },
      monthdrop:function(event,e){
        event.preventDefault();
        this.popSalesType=this.dom.getAttribute("type-name")
        this.popSalesTypeId=this.dom.getAttribute("type-id")
        this.popSalesTime=this.dataTime+'-'+e
        this.clickData=''
        this.$set(this,"salesFlag",this.salesFlag+1);
        this.$refs.myModalsale.show()
      },
      daydrop:function(event,name,saleid,time,timedetail){
        event.preventDefault();
        this.popSalesType=this.dom.getAttribute("type-name")
        this.popSalesTypeId=this.dom.getAttribute("type-id")
        this.popSalesTime=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10)
        this.popSaller=name
        this.clickData=''
        this.timeDetail=timedetail
        this.timeDetailId=time
        this.$set(this,"salesFlag",this.salesFlag+1);
        this.$refs.myModalsale.show()
      },
      //销售员选择
      salesShow:function () {
        if(this.dataType==1) {
          this.ifSales = !this.ifSales
        }else{
          this.ifSales = false
        }
      },
      SalesSelect:function () {
        if(this.dataType==1){
           this.diaryParam = {
            bdate:this.dataTime+"-01",
            edate:this.dataTime+"-31",
            saleid:this.salesId,
          }
        }else{
          this.diaryParam = {
            bdate:this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10),
            edate:this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10),
            saleid:'',
          }
        };
        this.getDiary()
      },
      // 销售活动查询
      getDiary:function () {
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch('getguestdiarylist',this.diaryParam).then(() => {

          })
        })
      },
      ifCalendarShow:function () {
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
        if(this.dataType=="2"){
          this.datetime=data1[0] + '年' + data1[1] + '月'+data1[2]+"日";
        }else{
          this.datetime=data1[0] + '年' + data1[1] + '月';
        }
        this.datetimenow=data1[0] + '-' + data1[1] + '-'+data1[2]
        this.dataTime=data1[0] + '-' + data1[1];
        this.SalesSelect()
        this.calendarShow=false
      },
      PreMonth: function (date, isChosedDay = true) {
        date = this.dateFormat(date);
        this.myData = this.getPreMonth(this.myData);
        this.getList(this.myData, date, isChosedDay);
      },
      NextMonth: function (date, isChosedDay = true) {
        date = this.dateFormat(date);
        this.myData = this.getNextMonth(this.myData);
        this.$emit('changeMonth', this.dateFormat(this.myData));
        this.getList(this.myData, date, isChosedDay);
      },
      getPreMonth: function (date) {
        var timeArray = this.dateFormat(date).split('/');
        var year = timeArray[0];
        var month = timeArray[1];
        var day = timeArray[2];
        var days = new Date(year, month, 0);
        days = days.getDate();
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
          year2 = parseInt(year2) - 1;
          month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
          day2 = days2;
        }
        if (month2 < 10) {
          month2 = '0' + month2;
        }
        var t2 = year2 + '/' + month2 + '/' + day2;
        return new Date(t2);
      },
      getNextMonth: function (date) {
        var arr = this.dateFormat(date).split('/');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
          year2 = parseInt(year2) + 1;
          month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
          day2 = days2;
        }
        if (month2 < 10) {
          month2 = '0' + month2;
        }

        var t2 = year2 + '/' + month2 + '/' + day2;
        return new Date(t2);
      },
      getNowMonth: function (date) {
        var arr = this.dateFormat(date).split('/');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var t2 = year + '/' + month + '/' + day;
        return new Date(t2);
      },
      getThisMonth:function () {
        var myData=new Date()
        var arr = this.dateFormat(myData).split('/');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var t = year + '/' + month + '/' + day;
        return new Date(t);
      },
      getDaysInOneMonth: function (date) {//天数
        var getyear = date.getFullYear();
        var getmonth = date.getMonth() + 1;
        getmonth = parseInt(getmonth, 10);
        var d = new Date(getyear, getmonth, 0);
        return d.getDate();
      },
      getMonthweek: function (date) {
        var getyear = date.getFullYear();
        var getmonth = date.getMonth() + 1;
        var dateOne = new Date(getyear + '/' + getmonth + '/1');
        return dateOne.getDay() == 0 ? 6 : dateOne.getDay() - 1;
      },
      getList: function (date, chooseDay, isChosedDay = true) {
        var mygetMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var mygetYear=date.getFullYear();
        var nowDate = new Date()
        var mygetYear0=nowDate.getFullYear();
        var mygetMonth0 = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        var mygetDay
        if(mygetMonth==mygetMonth0&&mygetYear0==mygetYear){
          mygetDay= date.getDate()< 10 ? '0' + (date.getDate()) : date.getDate();
        }else{
          mygetDay= "01";
        }
        // this.dateTop = date.getFullYear() + '年' + mygetMonth + '月';
        if(this.dataType=="1"){
          this.datetime=date.getFullYear() + '年' + mygetMonth + '月';
        }else{
          this.datetime=date.getFullYear() + '年' + mygetMonth + '月'+mygetDay+"日";
        }
        var array = [];
        for (var i = 0; i < this.getDaysInOneMonth(date); i++) {
          var nowTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (i + 1);
          if (
            this.dateFormat(new Date()) ==
            this.dateFormat(new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (i + 1)))
          ) {
            array = array.concat({
              id: i + 1,
              date: nowTime,
              isTodayNow: true,
              isToday: true,
              isMark: this.markArray.indexOf(i + 1) >= 0,
              dayHide: new Date(nowTime).getTime() < parseInt(this.agoDayHide) || new Date(nowTime).getTime() > parseInt(this.futureDayHide),
              nextDayShow:
              new Date(nowTime).getTime() >
              new Date().getTime()
            });
            this.$emit(
              'isToday',
              this.dateFormat(new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (i + 1)))
            );
          } else {
            array = array.concat({
              id: i + 1,
              date: nowTime,
              isTodayNow: false,
              isToday: chooseDay == nowTime && isChosedDay,
              isMark: this.markArray.indexOf(i + 1) >= 0,
              dayHide: new Date(nowTime).getTime() < parseInt(this.agoDayHide) || new Date(nowTime).getTime() > parseInt(this.futureDayHide),
              nextDayShow:
              new Date(nowTime).getTime() >
              new Date().getTime()
            });
          }
        }
        var array2 = [];
        var num = this.getDaysInOneMonth(this.getPreMonth(date)) - this.getMonthweek(date) + 1;
        var preDate = this.getPreMonth(date);
        var nextDate = this.getNextMonth(date);
        //上个月多少开始
        for (var i = 0; i < this.getMonthweek(date); i++) {
          var nowTime = preDate.getFullYear() + '/' + (preDate.getMonth() + 1) + '/' + (num + i);
          array2 = array2.concat(
            {
              id: num + i,
              date: nowTime,
              dayHide: new Date(nowTime).getTime() < parseInt(this.agoDayHide) || new Date(nowTime).getTime() > parseInt(this.futureDayHide),
              nextDayShow:
              new Date(nowTime).getTime() >
              new Date().getTime(),
              otherMonth: -1
            });
        }
        array = array2.concat(array);
        var _length = 7 - array.length % 7;
        if (_length < 7) {
          var nowTime = nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1);
          for (let i = 0; i < _length; i++) {
            array.push({
              id: i + 1,
              date: nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1),
              dayHide: new Date(nowTime).getTime() < parseInt(this.agoDayHide) || new Date(nowTime).getTime() > parseInt(this.futureDayHide),
              nextDayShow:
              new Date(nowTime).getTime() >
              new Date().getTime(),
              otherMonth: 1
            });
          }
        }
        this.list = array;
      },
      dateFormat: function (date) {
        date = new Date(date)
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      },
      dayPopSaleShow:function (name,saleid,time,timedetail) {
        this.popSalesTime=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10)
        this.popSaller=name
        this.clickData=''
        this.timeDetail=timedetail
        this.timeDetailId=time
        this.$set(this,"salesFlag",this.salesFlag+1);
        this.$refs.myModalsale.show()
      },
      monthPopSaleShow :function (item) {
        var data=item.id
        if(data<10){
          data="0"+data
        }
          this.clickData=this.dataTime+'-'+data
        this.$set(this,"salesFlag",this.salesFlag+1);
          this.$refs.myModalsale.show()
      },
      btnExit:function(){
        this.diaryId='0'
        this.$refs.myModalsale.hide()
      },
      onHidden:function () {
        this.diaryId='0'
      },
      monthNow:function (date, isChosedDay = true) {
        this.ifMonth=true
        this.timeType="本月"
        this.datetime=this.$options.methods.toMonth().substring(0,4)+"年"+this.$options.methods.toMonth().substring(5,7)+"月"
        this.dataTime=this.$options.methods.toMonth()
        this.datetimenow=this.$options.methods.toDay().substring(0,4)+"-"+this.$options.methods.toDay().substring(5,7)+"-"+this.$options.methods.toDay().substring(8,10)
         this.dataType="1"
        this.SalesSelect()
      },
      adddateday: function(time,n) {
        var date1 = new Date(time);
        date1.setDate(date1.getDate() + n);
        var m,d;
        if(date1.getMonth()<9){m="0"+(date1.getMonth() + 1)}else{m=(date1.getMonth() + 1)}
        if(date1.getDate()<10){d="0"+date1.getDate()}else{d=date1.getDate()}
        var times = date1.getFullYear() + "-" + m + "-" + d;
        return times;
      },
      dayNow:function (date, isChosedDay = true) {
        this.ifMonth=false
        this.timeType="本日"
        this.datetime=this.$options.methods.toDay().substring(0,4)+"年"+this.$options.methods.toDay().substring(5,7)+"月"+this.$options.methods.toDay().substring(8,10)+"日"
        this.dataTime=this.$options.methods.toDay()
        this.dataType="2"
        this.SalesSelect()
        this.datetimenow=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10)
      },

      toMonth:function () {
        var date1 = new Date();
        var m;
        if(date1.getMonth()<9){m="0"+(date1.getMonth() + 1)}else{m=(date1.getMonth() + 1)}
        var times = date1.getFullYear() + "-" + m;
        return times;
      },
      toDay:function () {
        var date1 = new Date();
        var m;
        var d;
        if(date1.getMonth()<9){m="0"+(date1.getMonth() + 1)}else{m=(date1.getMonth() + 1)}
        if(date1.getDate()<10){d="0"+date1.getDate()}else{d=date1.getDate()}
        var times = date1.getFullYear() + "-" + m + "-" + d;
        return times;
      },
      btnLeft:function (date, isChosedDay = true) {
        if(this.dataType=="1"){
             date = this.dateFormat(date);
             var datanow=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7);
            this.myData = this.getPreMonth(datanow);
            this.getList(this.myData, date, isChosedDay);
            this.dataTime=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)
            this.datetimenow=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-01'
            this.SalesSelect()
        }else{
          var data1=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10);
          var dataShow=this.adddateday(data1,-1)
          this.datetime=dataShow.substring(0,4)+'年'+dataShow.substring(5,7)+'月'+dataShow.substring(8,10)+'日';
          this.datetimenow=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10)
          this.SalesSelect()
        }
      },
      btnRight:function (date, isChosedDay = true) {
        if(this.dataType=="1"){
          date = this.dateFormat(date);
          var datanow=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7);
          this.myData = this.getNextMonth(datanow);
          this.getList(this.myData, date, isChosedDay);
          this.dataTime=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)
          this.datetimenow=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-01'
          this.SalesSelect()
        }else{
            var data1=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10);
            var dataShow=this.adddateday(data1,1)
            this.datetime=dataShow.substring(0,4)+'年'+dataShow.substring(5,7)+'月'+dataShow.substring(8,10)+'日';
          this.datetimenow=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10)
            this.SalesSelect()
        }
      },
      btnToday:function (date, isChosedDay = true) {
          date = this.dateFormat(date);
          this.myData = this.getThisMonth(this.myData);
          this.getList(this.myData, date, isChosedDay);
          if(this.dataType=="1"){
            this.dataTime=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)
            this.datetimenow=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-01'
            this.SalesSelect()
          }else{
            this.SalesSelect()
            this.datetimenow=this.datetime.substring(0,4)+'-'+this.datetime.substring(5,7)+'-'+this.datetime.substring(8,10)
          }
      },
      configDefault:function () {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
      },
      getbasecodelist:function () {
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.getbasecodelist, {
            cat:'guest_diary_item'
          }).then((response) => {
              if (response.data.errorCode === '0') {
                if(response.data.hasOwnProperty('basecodes')){
                  this.diaryItemList = response.data.basecodes
                  this.baseCodeListarc = response.data.basecodes
                  this.baseCodeListarc.forEach((item, index)=> {
                    if (typeof item.bgcolor === 'undefined') {
                      this.$set(item, "bgcolor", this.bgcolorFlag[index % 7])
                    }
                  })
                }
              }
          })
        })
      },
    },
    mounted: function () {
      this.$store.commit("set_loading",false);
      this.getList(this.myData);
      this.getbasecodelist()
      this.$store.dispatch("getSale").then(()=>{
        if(['02', '03'].indexOf(this.$store.getters.role) < 0){
          this.SalesSelect()
        }else{
          this.salesId = this.$store.getters.empsale;
        }
        this.salelist = this.$store.getters.salelist;
      });
      this.dataTime=this.toMonth()
       document.addEventListener('click',(e)=>{
         if(this.$refs.refsales){
           if (!this.$refs.refsales.contains(e.target)) {
             this.ifSales = false
           }
         }
         if(this.$refs.refcalendar){
           if (!this.$refs.refcalendar.contains(e.target)) {
             this.calendarShow = false
           }
         }
       })
    },
    watch: {
      markArray(val, oldVal) {
        var list = this.list;
        for (var i = 0; i < list.length; i++) {
          list[i].isMark = false;
          if (list[i].date) {
            for (var n = 0; n < val.length; n++) {
              if (list[i].id == val[n]) {
                list[i].isMark = true;
              }
            }
          }
        }
        this.list = list;
      },
    }
  }
</script>

<style  lang="scss">
  #salesContain{
    .nextMonth{
      color: #DBDCDC;
    }
    .todaySelect{
      background: rgb(255, 255, 204);
    }
    .tc span{
      color: #6FB3E0;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }
    .saleCalendar{
      top: 30px;
      left:50%;
      position: absolute;
      z-index: 22;
    }
  .modal-lg {
    max-width: 780px;
  }
    .modal-header{
      display: none;
    }
    .modal-content{
      background: transparent;
      border:none;
    }
  }
</style>
