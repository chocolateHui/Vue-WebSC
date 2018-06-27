<template>
  <div>
    <div class="place_contain">
      <div class="placelist">
        <div class="placelist_head" >
          <ul>
            <router-link tag="li" :to="{path:'/main/place/placeList/'+item.num}" v-for="item,index in placeHeadList" :key="index" active-class="current">{{item.name}}</router-link>
          </ul>
        </div>
        <div class="placelist_content">
          <div class="placelist_content_head">
            <ul>
              <li class="all" @click="btnAllCheck"><i class="fa" :class="{ 'fa-check': allChecked}"></i>所有</li>
              <li  @click="btnCheck(index)" v-for="(list, index)  in placeList" :class="list.liStyle" ><i class="fa" :class="[list.iStyle, { 'fa-check': list.checked}]"></i>{{list.name}}</li>
            </ul>
            <ol>
              <li class="current"><i class="fa fa-list"></i>列表</li>
              <li @click="listChange"><i class="fa fa-bar-chart"></i>图表</li>
            </ol>
          </div>
          <table class="placelist_content_list" id="placelist_table">
            <thead>
            <tr>
              <th class="nav1">事务名称</th>
              <th class="nav2">日期</th>
              <th class="nav3">状态</th>
              <th class="nav4">类型</th>
              <th class="nav5">开始时间</th>
              <th class="nav6">结束时间</th>
              <th class="nav7">场地</th>
              <th class="nav8" data-sort="num">预测收入</th>
              <th class="nav9">优先级</th>
              <th class="nav10" data-sort="num">出席数</th>
              <th class="nav11" data-sort="num">保底数</th>
              <th class="nav12">宴会名称</th>
              <th class="nav13"><a class="icon1"></a><a class="icon2"></a><a class="icon3"></a><a class="icon4"></a><a class="icon5"></a></th>
            </tr>
            </thead>
            <tbody id="placelist">
                <tr v-for="list in eventlist" data-eventid="'+data.events[i].eventid+'" data-istopos="'+data.events[i].istopos+'" data-caterid="'+data.events[i].caterid+'">
                  <td class="nav1">{{list.descript}}</td>
                  <td class="nav2">{{list.bdate}}</td>
                  <td class="nav3" v-for="placeitem in placeList " v-if="placeitem.dataid==list.sta">{{placeitem.name}}</td>
                  <td class="nav4">{{list.typedes}}</td>
                  <td class="nav5" >{{list.begintime}}</td>
                  <td class="nav6">{{list.endtime}}</td>
                  <td class="nav7" >{{list.codedes}}</td>
                  <td class="nav8" >{{list.income}}</td>
                  <td class="nav9" >{{list.degreedes}}</td>
                  <td class="nav10">{{list.attnum}}</td>
                  <td class="nav11" >{{list.minnum}}</td>
                  <td class="nav12">{{list.catername}}</td>
                  <td class="nav13"><a class="icon1" @click="btnItem(list)" title="项目"></a><a class="icon2" @click="btnSync(list)" title="同步"></a><a class="icon3" title="备注" @click="remark(list)"></a><a class="icon4" @click="placeCancel(list)" title="取消"></a></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
       </div>
    <b-modal @shown="reasonShown" id="reasonmodal" size="lg" ref="reasonmodal" title="理由列表" hide-footer>
      <Reason ref="Reason" @reasonConfirm="reasonConfirm"></Reason>
    </b-modal>
    <b-modal id="remarkmodal" ref="remarkmodal" size="lg" title="宴会备注" hide-footer>
      <remark></remark>
    </b-modal>
  </div>
</template>
<script>
  import methodinfo from '../../config/MethodConst.js'
  import '../../css/PlaceDistribute.scss';
    export default {
        name: "place-distribution-single",
      data(){
          return{
            placeList: [
              {iStyle: 'font_inquiries',liStyle: 'font_inquiries', name: '问询',checked:true,dataid:'Q'},
              {iStyle: ' font_reserve',liStyle: ' font_reserve', name: '预订',checked:true,dataid:'1'},
              {iStyle: 'font_confirm',liStyle: 'font_confirm', name: '确认',checked:true,dataid:'2'},
              {iStyle: 'font_register',liStyle: 'font_register', name: '登记',checked:false,dataid:'3'},
              {iStyle: 'font_alternate',liStyle: 'font_alternate', name: '候补',checked:false,dataid:'W'},
              {iStyle: 'font_checkout',liStyle: 'font_checkout', name: '结账',checked:false,dataid:'O'},
              {iStyle: 'font_cancel',liStyle: 'font_cancel', name: '取消',checked:false,dataid:'0'}
            ],
            placeHeadList:[
              { name: '本日事务',num:0},
              { name: 'waiting',num:1},
              { name: '所有',num:2}
            ],
            allChecked:false,
            eventlist:[],
            paramevent:{},
            syncparam:{},
            remarklist:{},
            ifnotechecked:false,
            ifreson:false,
            cancelid:'',
            sta:'',
          }
      },
      components:{
      },
      created(){
          this.getListHead()
      },
      watch:{
        $route(){
          // 路径发生变化，$route会重新赋值，监控了这个属性，会执行这个函数
          this.getListHead()
        }
      },
      beforeRouteEnter  (to, from, next) {
        next(vm => vm.refreshData())
      },
      methods: {
        refreshData(){
          this.$store.dispatch("getReasonList");
        },
        configDefault:function () {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
        },
        reasonShown(){
          this.$refs.Reason.clearRow();
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
        todayeventlist:function () {
          for(var t=0;t<this.placeList.length;t++){
            if(this.placeList[t].checked==true){
              this.sta+=this.placeList[t].dataid+','
            }
          }
          this.paramevent={
            begindate:this.today(),
            enddate:this.today(),
            sta:this.sta.substring(0,this.sta.length-1)
          }
          this.geteventlist(this.paramevent)
        },
        othereventlist:function () {
          for(var t=0;t<this.placeList.length;t++){
            if(this.placeList[t].checked==true){
              this.sta+=this.placeList[t].dataid+','
            }
          }
          this.paramevent={
            sta:this.sta.substring(0,this.sta.length-1)
          }
          this.getothereventlist(this.paramevent)
        },
        getothereventlist:function (param) {
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            // 获取营业点
            this.$http.post(methodinfo.geteventlist, {
              sta:param.sta
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                    this.eventlist=response.data.events
                }
              }
            })
          })
        },
        geteventlist:function (param) {
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            // 获取营业点
            this.$http.post(methodinfo.geteventlist, {
              begindate:param.begindate,
              enddate:param.enddate,
              sta:param.sta
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                    this.eventlist=response.data.events
                }
              }
            })
          })
        },
        getListHead(){
          this.sta=''
          let id = this.$route.params.index;
          this.placeList.filter(item => item.checked).map(item => item.checked=false)
          this.allChecked=false
          if( id==0){
            this.placeList[0].checked=true
            this.placeList[1].checked=true
            this.placeList[2].checked=true
            this.todayeventlist()
          }else if(id==1){
            this.placeList[4].checked=true
            for(var t=0;t<this.placeList.length;t++){
              if(this.placeList[t].checked==true){
                this.sta+=this.placeList[t].dataid+','
              }
            }
            this.paramevent={
              sta:this.sta.substring(0,this.sta.length-1)
            }
            this.getothereventlist(this.paramevent)
          }else if(id==2){
            this.allChecked=true
            for(var t=0;t<this.placeList.length;t++){
              this.sta+=this.placeList[t].dataid+','
            }
            this.paramevent={
              sta:this.sta.substring(0,this.sta.length-1)
            }
            this.getothereventlist(this.paramevent)
          }
        },
        listChange:function () {
          this.$router.push({name:'宴会场地分布'})
        },
        btnCheck:function (idx) {
          this.sta=''
          var check = this.placeList[idx].checked;
          this.placeList[idx].checked = check === true ? false : true;
          var ifcheckedall=true
          for(var i=0;i<this.placeList.length;i++){
            if(this.placeList[i].checked==false){
              ifcheckedall=false
            }
          }
          if(ifcheckedall==true){
            this.allChecked=true
          }else{
            this.allChecked=false
          }
          let id = this.$route.params.index;
          if(id==0){
            this.todayeventlist()
          }else{
            this.othereventlist()
          }
        },
        btnAllCheck:function () {
          this.sta=''
          this.allChecked=!this.allChecked
          var _this=this
          for(var i=0;i<this.placeList.length;i++){
            this.placeList[i].checked=false
            this.sta+=this.placeList[i].dataid+','
          }
          let id = this.$route.params.index;
          if(id==0){
            this.todayeventlist()
          }else{
            this.othereventlist()
          }
        },
        syncPost(paramdata,async){
          var _this=this
          var responseMsg = { "errorCode": "9999","errorMessage":"后台请求异常"};
          this.$store.dispatch('encrypttoken').then(() => {
             return new Promise((resolve, reject) => {
              this.configDefault()
                this.$http.post(methodinfo.syncSCEvent, {
                  caterid:paramdata.caterid,
                  eventid:paramdata.eventid,
                  name:paramdata.descript,
                  code:paramdata.code,
                  bdate:paramdata.bdate,
                  begintime:paramdata.begintime,
                  endtime:paramdata.endtime,
                  sta:paramdata.sta,
                  type:paramdata.type,
                }).then((response) => {
                  if (response.status === 200) {
                    if(response.data.errorCode=='0'){
                      this.$message({
                        message:"事务同步成功",
                        type: "success"
                      });
                    }else{
                      responseMsg = response.data;
                      this.$message({
                        message:responseMsg.errorMessage,
                        type: "warning"
                      });
                    }
                  }
                })
             })
          })
        },
        btnSync(list){
          if(list.istopos==''||list.istopos=='F'){
            this.$message({
              message:"此类型事务无法创建餐饮订单",
              type: "warning"
            });
            return;
          }else{
            this.syncparam = {
              caterid:list.caterid,
              eventid:list.eventid,
              name:list.descript,
              code:list.code,
              bdate:list.bdate,
              begintime:list.begintime,
              endtime:list.endtime,
              sta:list.sta,
              type:list.type,
            };
            this.syncPost(this.syncparam,false)
          }
        },
        remark(list){
          let remarkinfo = {
            caterid:list.caterid,
            caterdes:list.catername,
            eventid:list.eventid,
            eventdes:list.descript,
            type:2
          };
          this.$store.commit('setNoteParam',remarkinfo);
          this.$refs.remarkmodal.show()
        },
        btnItem:function (list) {
          // this.caternameC=list.catername
          this.$store.commit('setCaterid',list.caterid);
          this.$store.commit('setEventid',list.eventid);
          this.$router.push({ name: '宴会事务项目'});
        },
        btnsave1:function (param,severmethods,ifcheck) {
          this.syncpost1(param,severmethods,false,ifcheck);
        },
        syncpost1:function (paramdata,servermethod,async,ifcheck) {
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            return new Promise((resolve, reject) => {
              this.configDefault()
              this.$http.post(servermethod, {
                caterid:paramdata.caterid,
                eventid:paramdata.eventid,
                itemid:paramdata.itemid,
                type:paramdata.type,
                seq:paramdata.seq,
                title:paramdata.title,
                content:paramdata.content,
                uuid:paramdata.uuid,
              }).then((response) => {
                if (response.status === 200) {
                  if(response.data.errorCode==='0'){
                    this.$message({
                      message:"保存成功",
                      type: "success"
                    });
                    this.$refs.myModalRef.hide()
                  }else{
                    this.$message({
                      message:response.data.errorMessage,
                      type: "warning"
                    });
                  }
                }
              })
            })
          })
        },
        btnNoteChecked:function () {
          this.ifnotechecked=!this.ifnotechecked
        },
        placeCancel:function (row) {
          let now = new Date(new Date() - 24 * 60 * 60 * 1000);
          let eventdate = new Date(row.bdate.replace(/-/g,"/"));
          if(now >eventdate){
            this.$alert('本日之前的事务不允许取消!')
          }else if(row.sta==='0'){
            this.$alert('取消的事务不需要再取消!')
          }else {
              var eventid = row.eventid;
              this.setreasontype("event", eventid);
          }
        },
        setreasontype:function(type,id) {
          this.cancelid = id;
          this.$refs.reasonmodal.show();
        },
        syncPost3(paramdata,updatamethod){
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            return new Promise((resolve, reject) => {
              this.configDefault()
              this.$http.post(updatamethod, {
                caterid:paramdata.caterid,
                eventid:paramdata.eventid,
                cancelreason:paramdata.cancelreason,
              }).then((response) => {
                if (response.status === 200) {
                  if(response.data.errorCode==='0'){
                    let id = this.$route.params.index;
                    if(id==0){
                      _this.todayeventlist()
                    }else{
                      _this.othereventlist()
                    }
                  }
                }
              })
            })
          })
        },
        //取消事务
      cancelEvent(eventid,reason) {
        var params ={
          eventid:eventid,
          caterid:this.remarklist.caterid,
          cancelreason:reason
        }
        var cancelevent=methodinfo.cancelevent
          this.syncPost3(params,cancelevent);
        },
        reasonConfirm:function (reason) {
            this.cancelEvent(this.cancelid,reason.code);
        },
      },
      mounted:function () {

      }
    }
</script>

<style scoped lang="scss">
  .place_contain{
    height: calc(100% - 76px);
    overflow-y: auto;
  }
</style>

