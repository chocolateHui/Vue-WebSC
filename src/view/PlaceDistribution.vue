<template>
<div class="place_contain" id="place_contain" ref="contain">
  <div class="place_head clearfix">
    <ul>
      <li class="all" @click="btnAllCheck"><i class="fa" :class="{'fa-check':ifAllCheck}"></i>所有</li>
      <li @click="btnCheck(index)" v-for="(list, index)  in headList" :class="list.liStyle" ><i class="fa" :class="[list.iStyle, { 'fa-check': list.checked}]"></i>{{list.name}}</li>
    </ul>
    <ol>
      <li @click="listChange"><i class="fa fa-list"></i>列表</li>
      <li class="current"><i class="fa fa-bar-chart"></i>图表</li>
    </ol>
    <button class="btn_refresh" @click="btnrefresh"><i class="fa fa-refresh"></i>刷新</button>
  </div>
  <div class="place_content">
    <div class="place_content_tou" ref="placehead">
      <ul class="clearfix">
        <li><button class="btn_left fa fa-caret-left" @click="btnLeft"></button><button class="btn_right fa fa-caret-right" @click="btnRight"></button><input type="button" class="btn_today" data-type="1" @click="chooseDay" v-model="ifToday" ></li>

        <li class="select_banquet">
          <span data-id="1" @click="chooseThingType" ref="refchooseThing">选择事务类型</span>
          <div class="bomb2" v-if="ifThingType" ref="refchooseThing">
            <p><span>事务类型</span><strong><i class="fa" :class="{'fa-check':ifTypeCheckAll}" @click="typeCheckAll"></i>全选</strong></p>
            <ol>
              <li data-id="1" v-for="(item,index) in basecodeslist"><i class="fa" :class="{'fa-check':typeof item.ifTypeCheck=='undefined'?true:item.ifTypeCheck}" @click="typeCheck(item)"></i>{{item.descript}}</li>
            </ol>
            <input type="button" class="btn_ok" ref="reftypeok" value="确定" @click="thingTypeOk" />
          </div>
        </li>
        <li><span class="el-icon-date" @click="btnDataTime" ref="refcalen">{{datatime}}</span>
          <div class="calendarShow" ref="refcalen" v-if="calenShow">
               <calendar-lun  :datalunsign="datatime.substring(0,10)" @choseDayLun="choseDayLun"></calendar-lun>
          </div>
        </li>
      </ul>
    </div>
    <div class="place_content_items" v-if="!todayNow">
      <div class="item_tou">
        <ul class="clearfix">
          <li class="select_tyle nav1">
            <span @click="pccodeshow" ref="refpccode">{{pccode}}</span>
            <ol v-if="ifpccode">
              <p @click="pccodehide(list)" v-for="list in pccodelist">{{list.descript}}</p>
            </ol>
          </li>
          <li v-for="item in formdata">
            {{item.data}}<br/>{{item.dataLun}}
          </li>
        </ul>
      </div>
      <div class="item">
        <ul v-for="(placeitem,index1) in placeslist" class="clearfix">
          <li class="nav1" style="position: relative">
            <span :dataid="placeitem.tableno">{{placeitem.descript}}</span>
            <div v-for="(tolist,indexto) in gettolist">
                  <strong  v-for="(listc,indexc) in gettolist[indexto].places" v-if="tolist.tableno==placeitem.tableno&&indexc<3">{{listc.toplacedes}}</strong>
                  <strong  v-for="(listc,indexc) in gettolist[indexto].places" v-if="tolist.tableno==placeitem.tableno&&indexc==3"  @mouseenter="gettochildShow(placeitem.tableno,$event)" @mouseleave="gettochildHide">更多 </strong>
             </div>
            <div v-for="(tolist,indexto) in gettolist" class="gettochild" v-if="gettocurrent==placeitem.tableno">
              <span v-for="(listc,indexc) in gettolist[indexto].places" v-if="tolist.tableno==placeitem.tableno&&indexc>=3">&nbsp;{{listc.toplacedes}}&nbsp;</span>
            </div>
          </li>
          <li v-for="(timelist,index2) in timeList" @mouseenter="thingsShow(index1,index2,timelist,$event)" @mouseleave="thingsHide">
              <h1 v-for="(item,indexdetail) in timeAll">
                <label>{{item.time}}</label>
                <p>
                  <span v-for="items in timeAll[indexdetail].content" >
                    <span v-for="(infolist1,infoindex1) in placesinfo1" v-if="infolist1.tableno==placeitem.tableno">
                        <span v-for="infolist in (placesinfo1[infoindex1].bdates)" v-if="timelist==infolist.bdate&&((items.dataid>infolist.begintime.substring(11,13)&&items.dataid<infolist.endtime.substring(11,13)) || ( items.dataid==infolist.begintime.substring(11,13)&& ((infolist.begintime.substring(14,16)<30)||(infolist.begintime.substring(14,16)>=30&&items.datait=='2')) ) ||(items.dataid==infolist.endtime.substring(11,13)&&(infolist.endtime.substring(14,16)>0&&infolist.endtime.substring(14,16)<=30)&&items.datait=='1'))">
                            <span v-for="typeitem in typeList" v-if="iftypelist||(typeitem==infolist.eventtype)">
                               <span v-for="colorlist in headList" class="bgtime" :class="[colorlist.liStyle, { 'borderleft': (items.dataid==12||items.dataid==18)&&infolist.eventtype=='POS'}]" v-if="colorlist.dataid==infolist.sta"  :data-id="items.dataid" :data-it="items.datait"></span>
                            </span>
                          </span>
                      </span>
                   </span>
                </p>
              </h1>
            <div class="todayThings" lastChild="refthings" v-show="activeIndex===index1+'-'+index2" :class="{'thingsLeft':isleft,'thingsRight':!isleft,'thingsBottom':isBottom,'thingsTop':!isBottom}">
              <today-things :ifadd="ifadd" :headListp="headList" :placeslistp="placeitem.tableno" :timelistthing1="timelist" :datatimeid="datatimeid" @addThings="addThings"></today-things>
            </div>
           </li>
        </ul>
      </div>
    </div>
    <div class="place_content_items2" v-if="todayNow">
      <div class="item_tou">
        <ul class="clearfix">
          <li class="select_tyle nav1">
            <span @click="pccodeshow" :data="pccode" ref="refpccode">{{pccode}}</span>
            <ol v-if="ifpccode">
              <p @click="pccodehide(list)" v-for="list in pccodelist">{{list.descript}}</p>
            </ol>
          </li>
          <li class="nav2">
            <span v-for="itemH in todayHour">{{itemH}}</span>
          </li>
        </ul>
      </div>
      <div class="item">
        <ul class="clearfix" v-for="(placeitem,index1) in placeslist">
          <li class="nav1" style="position: relative">
            <span :dataid="placeitem.tableno">{{placeitem.descript}}</span>
            <div v-for="(tolist,indexto) in gettolist">
              <strong  v-for="(listc,indexc) in gettolist[indexto].places" v-if="tolist.tableno==placeitem.tableno&&indexc<3">{{listc.toplacedes}}</strong>
              <strong  v-for="(listc,indexc) in gettolist[indexto].places" v-if="tolist.tableno==placeitem.tableno&&indexc==3"  @mouseenter="gettochildShow(placeitem.tableno,$event)" @mouseleave="gettochildHide">更多 </strong>
            </div>
            <div v-for="(tolist,indexto) in gettolist" class="gettochild" v-if="gettocurrent==placeitem.tableno">
              <span v-for="(listc,indexc) in gettolist[indexto].places" v-if="tolist.tableno==placeitem.tableno&&indexc>=3">&nbsp;{{listc.toplacedes}}&nbsp;</span>
            </div>
          </li>
          <li class="nav2"  @mouseenter="thingsShow(index1,'0',datatime.substring(0,10),$event)" @mouseleave="thingsHide">
             <span v-for="items in timeToday">
                <span v-for="(infolist1,infoindex1) in placesinfo1" v-if="infolist1.tableno==placeitem.tableno">
                  <span v-for="(infolist,infoindex) in placesinfo1[infoindex1].bdates">
                    <span v-for="typeitem in typeList"  v-if="iftypelist||(typeitem==infolist.eventtype)">
                       <span v-for="colorlist in headList" class="bgtime2" :class="[colorlist.liStyle, { 'borderleft': (items.dataid==12||items.dataid==18)&&infolist.eventtype=='POS'}]" v-if="colorlist.dataid==infolist.sta&&( (items.dataid>infolist.begintime.substring(11,13)&&items.dataid<infolist.endtime.substring(11,13)) || ( items.dataid==infolist.begintime.substring(11,13)&& ((infolist.begintime.substring(14,16)<30)||(infolist.begintime.substring(14,16)>=30&&items.datait=='2')) ) ||(items.dataid==infolist.endtime.substring(11,13)&&(infolist.endtime.substring(14,16)>0&&infolist.endtime.substring(14,16)<=30)&&items.datait=='1'))"  :data-id="items.dataid" :data-it="items.datait"></span>
                    </span>
                  </span>
                </span>
             </span>
            <div class="todayThings" lastChild="refthings" v-show="activeIndex1==index1" :class="{'thingsLeft':isleft,'thingsRight':!isleft,'thingsBottom':isBottom,'thingsTop':!isBottom}">
              <today-things :ifadd="ifadd" :headListp="headList" :placeslistp="placeitem.tableno" :timelistthing1="datatime.substring(0,10)" :datatimeid="datatimeid" @addThings="addThings"></today-things>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <b-modal id="logmodal" ref="myModalchoose" size="lg" title="销售日记" hide-footer>
    <new-choose :headlist="headList" :newChooseAddr="newChooseAddr" :newChooseAddrNo="newChooseAddrNo" :newChooseTime="newChooseTime" @closeChoose="closeChoose" ></new-choose>
  </b-modal>
</div>
</template>
<script>
  import Vue from 'vue'
  import '../css/PlaceDistribute.scss';
  import calendarLun from '../components/vue-calendar-component/calendarLun';
  import todayThings from '../components/PlaceDistribution/todayThings';
  import newChoose from '../components/PlaceDistribution/newChoose';
  import methodinfo from '../config/MethodConst.js'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
  import calendarjs from './../common/calendar'
  let loading
    export default {
        name: "place-distribution",
      data(){
          return{
            ifToday:'查看今天',
            todayNow:false,//今天和七天切换
            headList: [
              { liStyle: 'inquiries',iStyle: 'font_inquiries', name: '问询',checked:true,dataid:'Q'},
              { liStyle: 'reserve',iStyle: ' font_reserve', name: '预订',checked:true,dataid:'1'},
              { liStyle: 'confirm',iStyle: 'font_confirm', name: '确认',checked:true,dataid:'2'},
              { liStyle: 'register',iStyle: 'font_register', name: '登记',checked:false,dataid:'3'},
              { liStyle: 'alternate',iStyle: 'font_alternate', name: '候补',checked:false,dataid:'W'},
              { liStyle: 'checkout',iStyle: 'font_checkout', name: '结账',checked:false,dataid:'O'},
              { liStyle: 'cancel',iStyle: 'font_cancel', name: '取消',checked:false,dataid:'0'}
            ],
            calenShow:false,
            datatime:'',
            datatimeid:'',
            dataNow:'',
            flagdata:0,
            formdata:[],
            //前七天时刻点
            timeAll: [
              {
                time: "上午",
                content: []
              },
              {
                time: "下午",
                content: []
              },
              {
                time: "晚上",
                content: []
              }
            ],
            timeList:[],
            //当前时间点
            timeToday:[],
            todayHour:[],
            activeIndex:-1,
            activeIndex1:-1,
            showtime:null,
            isleft:true,
            test1:0,
            tingsHigh:0,
            isBottom:false,
            ifThingType:false,
            ifTypeCheckAll:true,
            ifNewChoose:false,
            // 获取营业点
            pccodelist:[],
            pccode:'所有',
            pccodeid:'',
            ifpccode:false,
            placeslist:[],
            gettolist:[],
            placeinfoparam:{},
            basecodeslist:[],
            typeList:['1'],
            iftypelist:true,
            gettocurrent:'',
            ifAllCheck:false,
            ifadd:false,
            newChooseTime:'',
            newChooseAddr:'',
            newChooseAddrNo:'',
            sta:'',
            placesinfo1:[]
          }
      },
      filters:{
        formatInfoData:function(value){
          return value.reverse()
        }
      },
      components: {
        calendarLun,
        todayThings,
        newChoose
      },
      computed: {
        ...mapGetters(['placesinfo']),
        ...mapGetters(['isLoading']),
      },
      created(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch('getTimeUnit')
        })
        loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
          for(var num=8;num<=22;num++) {
            if (num <= 12) {
              var dataId = num
              if (dataId < 10) {
                dataId = "0" + dataId
              }
              for (var m = 1; m <= 2; m++) {
                var content1 = {
                  dataid: dataId,
                  datait: m,
                }
                this.timeToday.push(content1)
                this.timeAll[0].content.push(content1)
              }
              this.todayHour.push(dataId+':00')
            } else if (num <= 17 && num > 12) {
              for (var m = 1; m <= 2; m++) {
                var content1 = {
                  dataid: num,
                  datait: m,
                }
                this.timeToday.push(content1)
                this.timeAll[1].content.push(content1)
              }
              this.todayHour.push(num+':00')
            } else if (num <= 22 && num > 17) {
              for (var m = 1; m <= 2; m++) {
                var content1 = {
                  dataid: num,
                  datait: m,
                }
                this.timeToday.push(content1)
                this.timeAll[2].content.push(content1)
              }
              this.todayHour.push(num+':00')
            }
          }
      },
      methods: {
        // 查询事物
        getbasecodelist:function () {
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
              this.configDefault()
              this.$http.post(methodinfo.getbasecodelist, {
                cat:"sc_event_type",
                halt:'F'
              }).then((response) => {
                if (response.status === 200) {
                  if (response.data.errorCode=="0") {
                    _this.basecodeslist=response.data.basecodes
                  }
                }
              })
          })
        },
        pccodeshow:function () {
          this.ifpccode=true
        },
        pccodehide:function (list) {
          this.ifpccode=false
          this.pccode=list.descript
          this.pccodeid=list.pccode
          this.getplacelist()
        },
        configDefault:function () {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
        },
        getpccodelist:function(){
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            // 获取营业点
            this.$http.post(methodinfo.getpccodelist, {
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                  if(response.data.pccodes!=null){
                    var pccodedata=response.data.pccodes
                    var pccodeall=[
                      {descript:'所有',pccode:''}
                    ]
                    _this.pccodelist=pccodedata.concat(pccodeall)
                    _this.pccode=response.data.pccodes[0].descript
                    _this.pccodeid=response.data.pccodes[0].pccode
                  }
                }
                this.getplacelist()
              }
            })
          })
        },
        // 查询场地
        getplacelist:function () {
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
              // 获取营业点
            this.$http.post(methodinfo.getplacelist, {
              pccode:_this.pccodeid
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                  _this.placeslist=response.data.places
                }
                this.getplaceusedinfo()
                this.gettoplacelist()
              }
            })
          })
        },
        // 选项判断
        placechoose:function () {
          this.sta=''
          let id = this.$route.params.index;
          var ifcheckedallf=false
          for(var i=0;i<this.headList.length;i++){
            if(this.headList[i].checked==true){
              ifcheckedallf=true
            }
          }
          if(this.allChecked==true||ifcheckedallf==false){
            for(var i=0;i<this.headList.length;i++){
              this.sta+=this.headList[i].dataid+','
            }
          }else{
            for(var i=0;i<this.headList.length;i++){
              if(this.headList[i].checked==true){
                this.sta+=this.headList[i].dataid+','
              }
            }
          }
        },
        // 查询场地状态
        getplaceusedinfo:function () {
          var _this=this
          this.placechoose()
          if( this.todayNow==true){
            this.placeinfoparam={
              pccode:_this.pccodeid,
              begindate:_this.datatime.split('至')[0],
              enddate:_this.datatime.split('至')[0],
              sta:this.sta.substring(0,this.sta.length-1)
            }
          }else{
            this.placeinfoparam={
              pccode:_this.pccodeid,
              begindate:_this.datatime.split('至')[0],
              enddate:_this.datatime.split('至')[1],
              sta:this.sta.substring(0,this.sta.length-1)
            }
          }
         this.placeusedinfodata()
        },
        placeusedinfodata:function () {
          this.$store.dispatch('encrypttoken').then(() => {
            //获取工号信息,完成后进行路由
            this.$store.dispatch('getplaceusedinfo',this.placeinfoparam).then(() => {
              this.placesinfo1 = Object.assign({},this.placesinfo);
              loading.close();
            })
          })
        },
        // 查询今天场地状态
        getplaceusedinfo2:function () {
          var _this=this
          this.placechoose()
          this.placeinfoparam={
            pccode:_this.pccodeid,
            begindate:_this.datatime.split('至')[0],
            enddate:_this.datatime.split('至')[0],
            sta:this.sta.substring(0,this.sta.length-1)
          }
          this.placeusedinfodata()
        },
        // 场地从属
        gettoplacelist:function () {
          var _this=this
          this.$http.post(methodinfo.gettoplacelist, {
            pccode:_this.pccodeid,
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                _this.gettolist=response.data.places
              }
            }
          })
        },
        closeChoose:function () {
          this.$refs.myModalchoose.hide()
        },
        addThings:function (time,addr) {
          this.newChooseTime=time
          var newParam={
            begindate:time,
            enddate:time,
            flag:'T',
            sta:'1,2,3,W,Q',
          }
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            this.$store.dispatch('getcateringlist',newParam)
          })
          for(var t=0;t<this.placeslist.length;t++){
             if(addr==this.placeslist[t].tableno){
               this.newChooseAddr=this.placeslist[t].descript
               this.newChooseAddrNo=this.placeslist[t].tableno
             }
          }
          this.$refs.myModalchoose.show()
        },
        typeCheckAll:function () {
          this.ifTypeCheckAll=!this.ifTypeCheckAll
          var _this=this;
          this.basecodeslist.forEach(function(item,index){
            if(typeof item.ifTypeCheck=='undefined'){
              _this.$set(item,"ifTypeCheck",_this.ifTypeCheckAll)
            }else{
              item.ifTypeCheck=_this.ifTypeCheckAll;
            }
          })
        },
        typeCheck:function (item) {
          var flag=true;
          var _this=this
          if(typeof item.ifTypeCheck =="undefined"){
            Vue.set(item,"ifTypeCheck",false);//使用vue监听一个不存在的变量
          }else{
            item.ifTypeCheck=!item.ifTypeCheck;
          }
          this.basecodeslist.forEach(function(items,index){
            if(items.ifTypeCheck==false){
              flag=false
            }
          })
          if(flag==true){
            this.ifTypeCheckAll=true
          }else{
            this.ifTypeCheckAll=false
          }
        },
        chooseThingType:function () {
          this.ifThingType=true
        },
        thingTypeOk:function () {
          this.iftypelist=false
          this.typeList=[]
          for (var i=0;i<this.basecodeslist.length;i++){
            if(typeof this.basecodeslist[i].ifTypeCheck !="undefined") {
              if (this.basecodeslist[i].ifTypeCheck == true) {
                this.typeList.push(this.basecodeslist[i].code)
              }
            }else{
              this.typeList.push(this.basecodeslist[i].code)
            }
          }
          this.ifThingType=false
        },
        thingsShow:function (index1,index2,timedata,event) {
          var _this=this;
          var placeHeadW=this.$refs.placehead.offsetWidth;
          if( this.todayNow==true){
            var palceLeft=event.offsetX+350
          }else{
            var palceLeft=event.currentTarget.offsetLeft+30
          }
          var palceTop=event.currentTarget.offsetTop
          var bodyH=this.$refs.contain.offsetHeight;
          var thingsH=100;
          var current=event.currentTarget
          _this.showtime=setTimeout(function(){
            var todaytime=new Date(_this.today());
            if(todaytime<=new Date(timedata)){
              this.ifadd=true
            }
            _this.activeIndex=index1+'-'+index2
            _this.activeIndex1=index1
            if(placeHeadW-palceLeft<450){
              _this.isleft=false
            }else{
              _this.isleft=true
            }
            if(bodyH-palceTop<thingsH-90){
              _this.isBottom=true
            }else{
              _this.isBottom=false
            }
          },1000)
        },
        gettochildShow:function (no,event) {
           this.gettocurrent=no
        },
        gettochildHide:function () {
          this.gettocurrent=''
        },
        thingsHide:function () {
          clearTimeout(this.showtime);
          this.activeIndex=-1
          this.activeIndex1=-1
        },
        formData:function (datanow) {
          this.formdata=[]
          for(var i=0;i<7;i++){
            var data1=this.adddateday(datanow,i)
            var data2=this.adddateday(datanow,i).substring(5,10);
            var dataS=data1.split("-")
            var lunar1=calendarjs.solar2lunar( dataS[0], dataS[1],dataS[2])
            var formL={
              data:data2,
              dataAll:data1,
              dataLun:lunar1.IMonthCn+lunar1.IDayCn
            }
            this.formdata.push(formL)
          }
        },
        btnLeft:function () {
          loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
          if( this.todayNow==true){
            this.flagdata=this.flagdata-1;
            this.datatime=this.adddateday(this.dataNow,this.flagdata)
            this.formdata=[]
            this.formData(this.adddateday(this.dataNow,this.flagdata))
            this.getplaceusedinfo2()
          }else{
            this.flagdata=this.flagdata-6;
            this.datatime=this.adddateday(this.dataNow,this.flagdata)+" 至 "+this.adddateday(this.dataNow,this.flagdata+6)
            this.formdata=[]
            this.formData(this.adddateday(this.dataNow,this.flagdata))
            this.timeList=[]
            for(var t=0;t<7;t++){
              this.timeList.push(this.formdata[t].dataAll)
            }
            this.getplaceusedinfo()
          }
        },
        btnRight:function () {
          loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
          if (this.todayNow == true) {
            this.flagdata = this.flagdata + 1;
            this.formdata = []
            this.formData(this.adddateday(this.dataNow, this.flagdata))
            this.datatime = this.adddateday(this.dataNow, this.flagdata)
            this.getplaceusedinfo2()
          } else {
            this.flagdata = this.flagdata + 6;
            this.datatime = this.adddateday(this.dataNow, this.flagdata) + " 至 " + this.adddateday(this.dataNow, this.flagdata + 6)
            this.formdata = []
            this.formData(this.adddateday(this.dataNow, this.flagdata))
            this.timeList = []
            for (var t = 0; t < 7; t++) {
              this.timeList.push(this.formdata[t].dataAll)
            }
            this.getplaceusedinfo()
          }
        },
        btnrefresh:function () {
          if( this.todayNow==true){
            this.getplaceusedinfo2()
          }else{
            this.getplaceusedinfo()
          }
        },
        chooseDay: function () {
          loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
          this.flagdata=0
          if(this.ifToday=="查看今天"){
            this.ifToday="最近七天"
            this.todayNow=true
            this.datatime=this.datatime.substring(0,10)
            this.formdata=[]
            this.formData(this.adddateday(this.dataNow,0))
            this.timeList=[]
            for(var t=0;t<7;t++){
              this.timeList.push(this.formdata[t].dataAll)
            }
            this.getplaceusedinfo2()
          }else{
            this.ifToday="查看今天"
            this.todayNow=false
            this.datatime=this.datatime.substring(0,10)+" 至 "+this.adddateday(this.datatime.substring(0,10),6)
            this.formdata=[]
            this.formData(this.adddateday(this.dataNow,0))
            this.timeList=[]
            for(var t=0;t<7;t++){
              this.timeList.push(this.formdata[t].dataAll)
            }
            this.getplaceusedinfo()
          }
        },
        listChange:function () {
          this.$router.push({path:'/main/place/placeList/0'})
        },
        btnCheck:function (idx) {
          loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
          var check = this.headList[idx].checked;
          this.headList[idx].checked = check === true ? false : true;
          var ifcheckedall=true
          for(var i=0;i<this.headList.length;i++){
            if(this.headList[i].checked==false){
              ifcheckedall=false
            }
          }
          if(ifcheckedall==true){
            this.ifAllCheck=true
          }else{
            this.ifAllCheck=false
          }
          if( this.todayNow==true){
            this.getplaceusedinfo2()
          }else{
            this.getplaceusedinfo()
          }
        },
        btnAllCheck:function () {
          loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
          this.ifAllCheck=!this.ifAllCheck
          var _this=this
          for(var i=0;i<this.headList.length;i++){
            this.headList[i].checked=false
            this.sta+=this.headList[i].dataid+','
          }
          if( this.todayNow==true) {
            this.placeinfoparam = {
              pccode: _this.pccodeid,
              begindate: _this.datatime.split('至')[0],
              enddate: _this.datatime.split('至')[0],
              sta: this.sta.substring(0, this.sta.length - 1)
            }
          }else{
            this.placeinfoparam = {
              pccode: _this.pccodeid,
              begindate: _this.datatime.split('至')[0],
              enddate: _this.datatime.split('至')[1],
              sta: this.sta.substring(0, this.sta.length - 1)
            }
          }
          this.placeusedinfodata()
        },
        btnDataTime:function () {
          this.calenShow=true
        },
        choseDayLun(data) {
          loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
          var data1=data.split("/")
          if(data1[1]<10){
            data1[1]='0'+data1[1]
          }
          if(data1[2]<10){
            data1[2]='0'+data1[2]
          }
          var dataL=data1[0] + '-' + data1[1] + '-'+data1[2]
          this.dataNow=dataL
          this.flagdata=0
          if( this.todayNow==true){
            this.datatime=dataL
            this.formData(this.adddateday(this.dataNow,this.flagdata))
            this.getplaceusedinfo2()
          }else{
            this.datatime=dataL+"至"+this.adddateday(dataL,6)
            this.formData(this.datatime.substring(0,10))
            this.timeList = []
            for (var t = 0; t < 7; t++) {
              this.timeList.push(this.formdata[t].dataAll)
            }
            this.getplaceusedinfo()
          }
          this.calenShow=false
        },
        //获取今天的时间
        today:function(){
          var date1 = new Date();
          var day,month;
          day=date1.getDate();
          month=date1.getMonth()+1;
          if(day<10){day="0"+day;}
          if(month<10){month="0"+month;}
          var times = date1.getFullYear() + "-" + month + "-" + day;
          return times;
        },
        //获取几天之后的时间
        adddateday:function(time,n) {
          var date1 = new Date(time);
          var day,month;
          date1.setDate(date1.getDate() + n);
          day=date1.getDate();
          month=date1.getMonth()+1;
          if(day<10){day="0"+day;}
          if(month<10){month="0"+month;}
          var times = date1.getFullYear() + "-" + month + "-" + day;
          return times;
        }
      },
      mounted: function () {
        this.getbasecodelist()
        this.datatimeid=this.today()
        this.getpccodelist()
        this.datatime=this.today()+" 至 "+this.adddateday(this.today(),6)
        this.dataNow=this.today()
        this.formData(this.dataNow)
        for(var t=0;t<7;t++){
          this.timeList.push(this.formdata[t].dataAll)
        }
        document.addEventListener('click',(e)=> {
          if (this.$refs.refpccode) {
            if (!this.$refs.refpccode.contains(e.target)) {
              this.ifpccode = false
            }
          }
          if (this.$refs.refcalen) {
            if (!this.$refs.refcalen.contains(e.target)) {
              this.calenShow = false
            }
          }
          if (this.$refs.refchooseThing) {
            if (!this.$refs.refchooseThing.contains(e.target)) {
              this.ifThingType = false
            }
          }
        })
      },
    }
</script>

<style  lang="scss">
  #place_contain{
    .calendarShow{
      position: absolute;
      z-index: 22;
      top: 30px;
      left: 50%;
      margin-left: -90px;
    }
    .thingsLeft{
      left:0;
      right:inherit;
    }
    .thingsRight{
      left:inherit;
      right:0;
    }
    .thingsBottom{
      bottom:75px;
      top:inherit
    }
    .thingsTop{
      bottom:inherit;
      top:70px
    }
    .bgtime{
      float: left;
      height: 13px;
      width: 100%;
    }
    .bgtime2{
      float: left;
      height: 24px;
      width: 100%;
    }
    .todayThings{
      background: #fff;
      position: absolute;
      min-height: 100px;
      padding-bottom: 10px;
      width: 470px;
      z-index: 9;
      border-radius:3px;
      box-shadow:0 0 15px #C1C1C1;
    }
    .borderleft{border-left: 2px solid #fff;}
    .gettochild{
      position: absolute;
      width: auto;
      display: inline-block;
      background: #ffffff;
      z-index: 22;
      left: 60%;
      top: 82px;
      border: 1px solid #4C4C4C;
      span{
        width: auto !important;
        margin-bottom: 0 !important;
      }
    }
    .modal-content{
      background: transparent;
      border:none;
    }
    .modal-header{
      display: none;
    }
    .modal-dialog{
      margin: 1.75rem auto;
      padding: 10px!important;
    }
    .modal-lg {
      max-width: 700px;
    }
  }

</style>
