<template>
  <div class="pop_place" id="pop_place">
    <div class="pop_place_tou">
      <i class="fa fa-close" @click="closeChoose"></i>
      <ul>
        <li class="title">新建选择</li>
        <li class="time">日期：<span>{{newChooseTime}}</span></li>
        <li class="site">场地：<span>{{newChooseAddr}}</span></li>
      </ul>
    </div>
    <div class="content">
      <div class="content_right">
        <h1>起止时间</h1>
        <el-select v-model="timebegin" @change="btntimehide" filterable>
          <el-option
            v-for="item in timechoose"
            :key="item.code"
            :label="item.descript"
            :value="item.code">
          </el-option>
        </el-select>
        <ul>
          <li>
            <TimePicker :steps="[1, 30, 15]" v-model="eventtime" format="HH:mm" type="timerange"></TimePicker>
          </li>
        </ul>
         <button type="button" class="btn_addThing" @click="addThing">新建事务</button>
        <button type="button" class="btn_addInquiry" @click="addInquiry">新建宴会问询</button>
        <button type="button" class="btn_addBook" @click="addBook">新建宴会预订</button>
        <button type="button" class="btn_cancel" @click="closeChoose">退出</button>
       </div>
      <div class="content_left">
        <ol>
          <li>订单号</li>
          <li>宴会名称</li>
          <li>状态</li>
          <li>销售员</li>
          <li>抵达日期</li>
        </ol>
        <ul>
          <li v-for="list in cateringitem" @click="btnCatering(list)" :class="{'caterCurrent':ifCaterChoose==list.caterid}">
            <span class="nav1" v-for="colorlist in headlist" :class="colorlist.liStyle" v-if="colorlist.dataid==list.sta"></span>
            <span class="nav2">{{list.caterid}}</span>
            <span class="nav3">{{list.name}}</span>
            <span class="nav4">{{list.stades}}</span>
            <span class="nav5">{{list.saleid_name}}</span>
            <span class="nav6">{{list.arr.substring(0,10)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import '../../css/PlaceDistribute.scss';
  import methodinfo from '../../config/MethodConst.js'
  //时间组件
  import {TimePicker} from 'iview'
  import '../../css/iviewpicker.css'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
  Vue.use(TimePicker)
    export default {
        name: "new-choose",
      data(){
          return{
            timebegin:'',
            iftimeselect:false,
            ifpintime:false,
            ifpouttime:false,
            ifCaterChoose:'',
            catersta:'',
            startTime: '',
            endTime: '',
            eventtime:[],
            cateringitem:[],
          }
      },
      created(){
        this.cateringitem = Object.assign([],this.cateringlist2);
      },
      components:{
        TimePicker,
      },
      watch:{
        cateringlist2:function (val,oldval) {
          this.firsttimedata()
        },
      },
      computed:{
        ...mapGetters(['cateringlist2']),
        ...mapGetters(['timechoose']),
      },
      props:['newChooseTime','newChooseAddr','headlist','newChooseAddrNo'],
      methods:{
          firsttimedata:function () {
            this.timebegin=this.timechoose[0].descript
            this.$set(this.eventtime,0,this.timechoose[0].exts1)
            this.$set(this.eventtime,1,this.timechoose[0].exts2)
            this.cateringitem = Object.assign([],this.cateringlist2);
          },
        configDefault:function () {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
        },
        closeChoose:function () {
          this.$emit('closeChoose')
        },
        btnCatering(list){
          this.ifCaterChoose=list.caterid
        },
        addThing:function () {
          if(this.ifCaterChoose==''){
            this.$message({
              message: "请选择宴会",
              type: "warning"
            });
          }else{
            var paramNewEvent={
              begindate:this.newChooseTime,
              enddate:this.newChooseTime,
              begintime:this.pintime,
              endtime:this.pouttime,
              place:this.newChooseAddrNo,
              placedes:this.newChooseAddr
            }
            console.log(this.ifCaterChoose)
            this.$store.commit('setCaterid',this.ifCaterChoose);
            this.$emit('closeChoose')
            this.$router.push({ name: '宴会预订详情'})
          }
        },
        addInquiry:function () {
          var paramNewEvent={
            begindate:this.newChooseTime,
            enddate:this.newChooseTime,
            begintime:this.eventtime[0],
            endtime:this.eventtime[1],
            place:this.newChooseAddrNo,
            placedes:this.newChooseAddr
          };
          var paramNewCatering={
            begindate:this.newChooseTime,
            enddate:this.newChooseTime,
          };
          this.catersta='Q'
          this.$emit('closeChoose')
          this.$router.push({name:'新建宴会问询'})
        },
        addBook:function () {
          var paramNewEvent={
            begindate:this.newChooseTime,
            enddate:this.newChooseTime,
            begintime:this.eventtime[0],
            endtime:this.eventtime[1],
            place:this.newChooseAddrNo,
            placedes:this.newChooseAddr
          }
          var paramNewCatering={
            begindate:this.newChooseTime,
            enddate:this.newChooseTime,
          }
          this.catersta='R'
          this.$emit('closeChoose')
          this.$router.push({name:'新建宴会预订'})
        },
         btntimehide:function (val) {
          for(let option of this.timechoose){
            if(option.code===val){
              if(option.exts1){
                this.$set(this.eventtime,0,option.exts1)
              }else{
                this.$set(this.eventtime,0,'00:00')
              }
              if(option.exts2){
                this.$set(this.eventtime,1,option.exts2)
              }else{
                this.$set(this.eventtime,1,'00:00')
              }
              return;
            }
          }
          this.pintime=item.exts1
          this.pouttime=item.exts2
          this.iftimeselect=false
        },
      },
      mounted:function () {
      }
    }
</script>

<style lang="scss">
  #pop_place{
    .content_left{
      ol{
        border-right: 1px solid #DBDCDC;
      }
      ul{
        border-right: 1px solid #DBDCDC;
      }
    }
    .caterCurrent{
      background: #F5F5F5;
    }
    .el-input__inner{
      padding-left: 5px;
      border-radius: 0;
      height: 30px;
      line-height: 30px;
    }
    .ivu-input{
      padding: 0 0.75rem !important;
      line-height: 30px;
      height: 30px;
      border: 1px solid #DBDCDC;
    }
  }
</style>
