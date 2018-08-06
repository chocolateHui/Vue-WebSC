<template>
  <div id="eventlist">
    <el-table
      id = "eventtable"
      ref = "eventtable"
      :row-key="getRowKeys"
      :expand-row-keys="expandRows"
      @expand-change = "expandChange"
      :data="eventlist"
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="eventdiv">
            <b-row id="eventmain">
              <b-col class="main-col4">
                <b-form-group label="事务名称|" :label-cols="4" horizontal>
                  <el-input clearable v-model="expandevent.descript" maxlength="50">
                  </el-input>
                </b-form-group>
              </b-col>
              <b-col class="main-col2" >
                <b-form-group label="类型|" :label-cols="4" horizontal>
                  <el-select v-model="expandevent.type">
                    <el-option
                      v-for="item in typeoptions"
                      :key="item.code"
                      :label="item.descript"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </b-form-group>
              </b-col>
              <b-col class="main-col3">
                <b-form-group label="日期|" horizontal>
                  <el-date-picker
                    class="date-class"
                    v-model="expandevent.bdate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    :clearable="editable"
                    :editable="editable"
                    :picker-options="datepickerOptions">
                  </el-date-picker>
                </b-form-group>
              </b-col>
              <b-col class="main-col4">
                <b-form-group label="时段|" :label-cols="2" horizontal>
                  <TimePicker :steps="[1, 10, 15]" v-model="eventtime" format="HH:mm" type="timerange"></TimePicker>
                  <el-select v-model="stdunit" class="timeselect" @change="timeChange">
                    <el-option
                      v-for="item in timeoptions"
                      :key="item.code"
                      :label="item.descript"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </b-form-group>
              </b-col>
              <b-col class="main-col2" >
                <b-form-group label="状态|" :label-cols="4" horizontal>
                  <el-select v-model="expandevent.sta">
                    <el-option
                      v-for="item in staoptions"
                      :key="item.code"
                      :label="item.descript"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </b-form-group>
              </b-col>
              <b-col class="main-col3">
                <b-form-group label="场地|" horizontal>
                  <el-input @click.native="placeshow" class="modalinput" readonly v-model="expandevent.codedes">
                    <i slot="suffix" @click="placeClear" class="fa fa-list"></i>
                  </el-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="sub-col" sm="10">
                <div id="eventsub">
                  <b-row >
                    <b-col sm="6">
                      <b-form-group label="场&#8195;&#8195;租&#8194;|" :label-cols="2"
                                    horizontal>
                        <b-form inline>
                          <FormatInput class="priceinput" type="float" maxlength="19" :readonly="priceread" v-model="expandevent.price"></FormatInput>
                          <span class="input-separator">/</span>
                          <el-select @change="priceChange" v-model="eventitem" value-key="id" class="priceselect" clearable>
                            <el-option
                              v-for="item in priceoptions"
                              :key="item.code"
                              :label="item.descript"
                              :value="item">
                              <span style="float: left">{{ item.descript }}</span>
                              <span style="float: right;color: #8492a6; font-size: 0.9rem">{{ item.price }}</span>
                            </el-option>
                          </el-select>
                        </b-form>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group label="席&#8195;&#8195;数&#8194;|" :label-cols="2"
                                    horizontal>
                        <b-form inline>
                          <FormatInput class="numinput" type="number" maxlength="5" text="出席数" v-model="expandevent.attnum"></FormatInput>
                          <span class="input-separator">/</span>
                          <FormatInput class="numinput" type="number" maxlength="5" text="备席数" v-model="expandevent.minnum"></FormatInput>
                          <span class="input-separator">/</span>
                          <FormatInput class="numinput" type="number" maxlength="5" text="保底数" v-model="expandevent.bknum"></FormatInput>
                          <span class="input-separator">|</span>
                          <el-select v-model="expandevent.stdunit" class="numselect">
                            <el-option label="人" value="0"></el-option>
                            <el-option label="桌" value="1"></el-option>
                          </el-select>
                        </b-form>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group label="布&#8195;&#8195;局&#8194;|" :label-cols="2" horizontal>
                        <el-select class="sub-select" v-model="expandevent.layout" clearable>
                          <el-option
                            v-for="item in layoutoptions"
                            :key="item.code"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group label="门牌信息&#8194;|" :label-cols="2"
                                    horizontal>
                        <b-form-input  type="text" v-model="expandevent.infor" maxlength="100"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group label="优先等级&#8194;|" :label-cols="2" horizontal>
                        <el-select class="sub-select" v-model="expandevent.degree" clearable>
                          <el-option
                            v-for="item in degreeoptions"
                            :key="item.code"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </b-form-group>
                    </b-col>
                    <b-col class="set-col" sm="3">
                      <b-form-group label="布场耗时&#8194;|" :label-cols="5"
                                    horizontal>
                        <b-input-group>
                          <b-input-group-text slot="append">
                            <span>分钟</span>
                          </b-input-group-text>
                          <FormatInput type="number" maxlength="5" v-model="expandevent.setup"></FormatInput>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col class="set-col" sm="3">
                      <b-form-group label="撤场耗时&#8194;|" :label-cols="5"
                                    horizontal>
                        <b-input-group>
                          <b-input-group-text slot="append">
                            <span>分钟</span>
                          </b-input-group-text>
                          <FormatInput type="number" maxlength="5" v-model="expandevent.setdown"></FormatInput>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
              <b-col sm="2" class="checkcol">
                <b-form-group class="checkgroup">
                  <b-form-checkbox-group stacked v-model="flagselected" :options="flagoptions">
                  </b-form-checkbox-group>
                </b-form-group>
                <b-button size="mini" @click="checkEvent()" v-show="eventEditable">完成</b-button>
              </b-col>
            </b-row>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in fildes"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        :class-name="item.classname"
        :show-overflow-tooltip="item.showTip" :key="item.prop">
      </el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <b-button size="mini" class="Item-button image-btn" title="项目" @click="openEvenitem(scope.row)" type="danger" ></b-button>
          <b-button size="mini" class="Synchronization-button image-btn" @click="eventSync(scope.row)" title="同步" type="danger" ></b-button>
          <b-button size="mini" class="Journal-button image-btn" type="danger" title="备注" @click="showNote(scope.row)">
            <div :class="getNoteClass(scope.row)"></div>
          </b-button>
          <b-button size="mini" class="Log-button image-btn" title="日志" @click="showLog(scope.row)"></b-button>
          <b-button size="mini" class="Cancel-button image-btn" type="danger" title="取消" @click="cancelEvent(scope.row)"></b-button>
        </template>
      </el-table-column>
      <template slot="append">
        <b-row class="sum-row">
          <b-col sm="2">
            <label class="sumlabel">合计:</label>
            <label class="sumlabel">{{eventcount}}</label>
          </b-col>
          <b-col sm="7"></b-col>
          <b-col sm="3">
            <b-form-group>
              <b-form-radio-group id="radios2" v-model="staselected" name="radioSubComponent">
                <b-form-radio value="all">所有</b-form-radio>
                <b-form-radio value="normal">有效</b-form-radio>
                <b-form-radio value="cancel">取消</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>
      </template>
    </el-table>

    <b-modal id="singleplacemodal" ref="singleplacemodal" title="场地列表" size="lg" hide-footer>
      <SinglePlace ref="SinglePlace" @placeConfirm="placeConfirm" :eventbdate="expandevent.bdate"></SinglePlace>
    </b-modal>

    <b-modal @shown="reasonShown" id="reasonmodal" ref="reasonmodal" title="理由列表" hide-footer>
      <Reason ref="Reason" @reasonConfirm="reasonConfirm"></Reason>
    </b-modal>

    <b-modal id="remarkmodal" size="lg" ref="remarkmodal" title="宴会备注" hide-footer>
      <remark></remark>
    </b-modal>
  </div>
</template>

<script>
  // 框架相关
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'
  import methodinfo from '../../config/MethodConst.js'
  import {dateValid,formatDate} from '../../common/date'
  //其他组件
  import SinglePlace from './SinglePlace.vue'
  import {TimePicker} from 'iview'
  import '../../css/imgbtn.scss'
  import '../../css/iviewpicker.css'
  Vue.use(TimePicker)

  const fildes = [
    {  prop: 'eventid', label:  '事务ID',width:'140',sortable:true,"classname":"text-center" },
    {  prop: 'descript', label:  '事务名称',width:'',sortable:true,showTip:true},
    {  prop: 'codedes', label:  '场地',width:'100',sortable:true,showTip:true,"classname":"text-center" },
    {  prop: 'bdate', label:  '日期',width:'100',sortable:true ,"classname":"text-center"},
    {  prop: 'begintime', label:  '开始',width:'72',sortable:true ,"classname":"text-center"},
    {  prop: 'endtime', label:  '结束',width:'72',sortable:true,"classname":"text-center" },
    {  prop: 'stades', label:  '状态',width:'72',sortable:true,showTip:true,"classname":"text-center"},
    {  prop: 'typedes', label:  '类型',width:'72',sortable:true,showTip:true,"classname":"text-center"},
    {  prop: 'attnum', label:  '人数',width:'72',sortable:true,"classname":"text-right" },
    {  prop: 'income', label:  '预测收入',width:'100',sortable:true ,"classname":"text-right"}
  ]

  export default {
    data () {
      return {
        fildes :fildes,
        expandRows:[],
        expandevent:{},
        eventtime:[],
        eventflags:[],
        eventitem:{},
        stdunit:'',
        staoptions:[
          { code: '1', descript: '预订' }
        ],
        flagselected:[],
        flagoptions: [
          { value: 'noise', text: '有噪音' },
          { value: 'income', text: '不计收入' },
          { value: 'share', text: '共享' }
        ],
        staselected:'normal',
        // 获取row的key值
        getRowKeys(row) {
          return row.eventid;
        },
        priceread:false,
        isClear:false,
        editable:false,
        eventEditable:true,
        cancelRow:{},
        datepickerOptions: {
          disabledDate(time) {
            let now =new Date(new Date() - 24 * 60 * 60 * 1000)
            return time.getTime() <now;
          }
        }
      }
    },
    mounted(){
    },
    computed: {
      ...mapGetters([
        'caterid',
        'catering',
        'eventlist',
        'timeoptions',
        'typeoptions',
        'priceoptions',
        'layoutoptions',
        'degreeoptions'
      ]),
      eventcount(){
        if(this.eventlist){
          return this.eventlist.length
        }else{
          return 0
        }
      }
    },
    methods: {
      checkEvent(){
        if(!this.expandevent.descript){
          this.$alert("事务名称不允许为空!")
        }else if(this.eventtime[0]===this.eventtime[1]){
          this.$alert("事务开始时间和结束时间相同,请修改!")
        }else if(!dateValid(this.expandevent.bdate,this.catering.dep)){
          this.$alert("事务日期不允许晚于宴会离开日期!")
        }else{
          this.expandevent.begintime = this.eventtime[0];
          this.expandevent.endtime = this.eventtime[1];
          if(this.flagselected.indexOf('noise')>=0){
            this.expandevent.flag2="T"
          }else{
            this.expandevent.flag2="F"
          }
          if(this.flagselected.indexOf('income')>=0){
            this.expandevent.flag3="T"
          }else{
            this.expandevent.flag3="F"
          }
          if(this.flagselected.indexOf('share')>=0){
            this.expandevent.share="T"
          }else{
            this.expandevent.share="F"
          }
          let event = this.expandevent;
          event.begindate = event.bdate;
          event.enddate = event.bdate;
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
            this.$http.post(methodinfo.checkevent, event).then((response)=> {
              if (response.data.errorCode === '0') {
                this.updateEvent();
              }else if(response.data.errorCode === 'SC101000'){
                this.$confirm(response.data.errorMessage).then(() =>{
                  this.updateEvent();
                })
              }else{
                this.$alert(response.data.errorMessage)
              }
            }).catch(function () {
              this.$alert("事务校验请求异常!")
            })
          })
        }
      },
      updateEvent(){
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
        this.$http.post(methodinfo.updateevent, this.expandevent).then((response)=> {
          if (response.data.errorCode === '0') {
            this.$message({
              message: '事务保存成功!',
              type: 'success'
            })
            this.$store.dispatch("getEventList")
            this.$nextTick(()=>{
              this.expandRows.push(this.expandevent.eventid)
              this.$refs.log.getLogData();
            })
          }else{
            this.$message.error(response.data.errorMessage)
          }
        })
      },
      cancelEvent(row){
        let now = new Date(new Date() - 24 * 60 * 60 * 1000);
        let eventdate = new Date(row.bdate.replace(/-/g,"/"));
        if(now >eventdate){
          this.$alert('本日之前的事务不允许取消!')
        }else if(row.sta==='0'){
          this.$alert('取消的事务不需要再取消!')
        }else{
          this.cancelRow = row;
          this.$refs.reasonmodal.show();
        }
      },
      eventCanEdit(){
        if(this.catering.sta==='0'){
          this.eventEditable =false;
        }else{
          let now = new Date(new Date() - 24 * 60 * 60 * 1000);
          let eventdate = new Date(this.expandevent.bdate.replace(/-/g,"/"));

          this.eventEditable =now <=eventdate;
        }
      },
      //行展开数据加载
      expandChange:function (row,expandRows) {

        if(row.eventid===this.expandRows[0]){
          this.expandRows=[];
        }else{
          this.eventtime=[];
          this.eventtime.push(row.begintime,row.endtime);
          this.flagselected = [];
          this.expandevent=Object.assign({},row);
          this.priceread = this.expandevent.price!==0.00
          if(this.expandevent.flag2==='T'){
            this.flagselected.push("noise")
          }
          if(this.expandevent.flag3==='T'){
            this.flagselected.push("income")
          }
          if(this.expandevent.share==='T'){
            this.flagselected.push("share")
          }

          this.eventCanEdit();

          if(expandRows.length>1){
            this.expandRows=[];
            this.expandRows.push(row.eventid);
          }

          this.$refs.SinglePlace.resetPlace(this.expandevent.code);
          if(this.expandevent.sta==="W"){
            this.staoptions = [{ code: '1', descript: '预订' },{ code: 'W', descript: '候补' }];
          }else if(this.expandevent.sta==="2"){
            this.staoptions = [{ code: '1', descript: '预订' },{ code: '2', descript: '确认' }];
          }else if(this.expandevent.sta==="3"){
            this.staoptions = [{ code: '3', descript: '登记' }];
          }else if(this.expandevent.sta==="0"){
            this.staoptions = [{ code: '0', descript: '取消' }];
            if(this.catering.sta!=='0'){
              this.staoptions.push({ code: '1', descript: '预订' })
            }
          }else{
            this.staoptions = [{ code: '1', descript: '预订' }];
          }
        }
      },
      //场租选择
      priceChange(item){
        this.priceread = item.price !== 0.00;
        this.expandevent.price = item.price;
        this.expandevent.id = item.id;
        this.expandevent.unit = item.descript;
      },
      //常用时间选择
      timeChange(val){
        for(let option of this.timeoptions){
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
      },
      //显示事务备注
      showNote(row){
        let remarkinfo = {
          caterid:this.catering.caterid,
          caterdes:this.catering.name,
          eventid:row.eventid,
          eventdes:row.descript,
          type:2
        };
        this.$store.commit('setNoteParam',remarkinfo);
        this.$refs.remarkmodal.show();
      },
      showLog(row){
        let groupid = this.$store.getters.groupid;
        let hotelid = this.$store.getters.hotel.hotelid;
        let logkey = groupid+"|"+hotelid+"|"+row.eventid;

        this.$store.commit('setLogtype','ScEvent');
        this.$store.commit('setLogKey',logkey);
        this.$root.$emit('bv::show::modal', 'caterlogmodal');
      },
      //显示场地弹窗
      placeshow(){
        if(!this.isClear){
          this.$refs.singleplacemodal.show();
        }else{
          this.isClear =false;
        }
      },
      //展开栏内场地信息清除,同时清除弹窗选择
      placeClear(){
        this.isClear = true;
        this.$refs.SinglePlace.clearSelect();
      },
      //场地确认
      placeConfirm(currentRow){
        this.$set(this.expandevent,'code',currentRow.tableno);
        this.$set(this.expandevent,'codedes',currentRow.descript);
      },
      //显示取消原因
      reasonShown(){
        this.$refs.Reason.clearRow();
      },
      reasonConfirm(reason){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
          this.$http.post(methodinfo.cancelevent, {
            eventid:this.cancelRow.eventid,
            caterid:this.caterid,
            cancelreason:reason.code
          }).then((response)=> {
            if (response.data.errorCode === '0') {
              this.$message({
                message: '事务取消成功!',
                type: 'success'
              })
              this.$store.dispatch("getEventList")
            }else{
              this.$message.error(response.data.errorMessage)
            }
          })
        })
      },
      //事务项目点击
      openEvenitem(row){
        if(row.sta==='0'){
          this.$message.error("取消状态事务不可进行项目编辑!")
          return;
        }
        this.$store.commit('setCaterid',this.caterid);
        this.$store.commit('setEventid',row.eventid);
        this.$router.push({ name: '宴会事务项目'});
      },
      eventSync(row){
        let now = new Date(new Date() - 24 * 60 * 60 * 1000);
        let eventdate = new Date(row.bdate.replace(/-/g,"/"));
        if(now >eventdate){
          this.$alert('本日之前的事务无法进行同步操作!')
          return;
        }

        if(row.istopos==='F'){
          this.$message.error("此类型事务无法创建餐饮订单!")
          return;
        }

        this.$confirm("是否要要将宴会事务同步到餐饮系统？","提示").then(()=>{
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
            this.$http.post(methodinfo.syncSCEvent, {
              caterid:this.caterid,
              eventid:this.cancelRow.eventid,
              name:row.descript,
              code :row.code,
              bdate :row.bdate,
              begintime :row.begintime,
              endtime :row.endtime,
              sta :row.sta,
              type :row.type,
            }).then((response)=> {
              if (response.data.errorCode === '0') {
                this.$message({
                  message: '事务同步成功!',
                  type: 'success'
                })
              }else{
                this.$message.error(response.data.errorMessage)
              }
            })
          })
        })

      },
      getNoteClass(row){
        if(row.hasOwnProperty("isnotes")){
          return "notetip";
        }
      }
    },
    components: {
      TimePicker,
      SinglePlace,
    },
    watch:{
      staselected(val){
        if(val==='all'){
          this.$store.commit('setEventstas','0,1,2,3,W,Q,O');
        }else if(val==='normal'){
          this.$store.commit('setEventstas','1,2,3,W,Q');
        }else {
          this.$store.commit('setEventstas','0');
        }

        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch("getEventList");
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../css/color';

  #eventlist{
    font-size: 0.9rem;
      input{
      font-size: 0.9rem;
    }
    .el-date-editor .el-range-separator{
      padding: 0;
    }
    .el-input__inner{
      height: 36px;
    }
    .text-center{
      text-align: center;
    }
    .text-right{
      text-align: right;
    }
    .el-tabs__content{
      padding: 10px;
    }

    .row{
      margin-right: 0;
      margin-left: 0;
    }
    .el-table__empty-block{
      border-bottom: 1px solid #dee2e6;
    }
    .sum-row{
      .sumlabel{
        margin-top: 5px;
        margin-bottom: 0;
        padding: 0 10px;
      }
      #radios2{
        margin-top: 5px;
        margin-bottom: 0;
      }
    }
    .eventdiv{
      background-color: #eff2f7;
      padding: 5px;
      .form-control{
        border: none;
      }
      .form-group{
        margin: 0;
      }
      .card-body,.card-header{
        padding: 0;
      }
      .el-input__inner {
        padding: 0;
        height: 31.5px;
        border: none;
      }
      .timeselect{
        width: 38%;
      }
      .el-icon-date,.fa-list{
        color: $colorIcon;
      }
      #eventmain{
        .fa{
          padding-top: 8px;
          padding-right: 4px;
        }
        .date-class{
          .el-input__inner{
            padding-left: 25px;
          }
          .el-input__prefix{
            left: 0;
          }
          .el-input__prefix, .el-input__suffix{
            top:-5px;
          }
        }
        .main-col2{
          padding: 0;
          flex: 11.11111111%;
        }
        .main-col3{
          padding: 0;
          flex: 16.66666667%;
        }
        .main-col4{
          padding: 0;
          flex: 22.22222222%;
        }
        .el-date-editor.el-input{
          width: 100%;
        }
        .ivu-date-picker{
          width: 60%;
        }
        .ivu-input-wrapper{
          line-height: 0.9;
        }
        .ivu-select-dropdown{
          top:31px !important;
        }
        .form-row{
          background-color: white;
          border: 1px solid #dcebf7;
          margin: 5px;
          .col-form-label{
            padding-left: 5px;
            padding-right: 0;
          }
        }
      }
      #eventsub{
        background-color: white;
        margin: 5px;
        padding: 5px;
        border: 1px solid #dcebf7;
        .col-sm-6,.col-sm-9,.col-sm-10,.col-sm-12{
          padding: 0;
        }
        .priceinput{
          width: 65%;
        }
        .input-separator{
          padding: 0 5px;
        }
        .priceselect{
          width: 31%;
        }
        .form-row{
          .form-control{
            background-color: #eff2f7;
          }
          background-color: #eff2f7;
          margin: 5px;
        }
        .set-col{
          padding: 0;
        }
        .numinput{
          width: 20%;
        }
        .numselect{
          width: 27%;
        }
        .sub-select{
          width: 100%;
        }
        .el-input__inner {
          background-color: #eff2f7;
        }
        .input-group-text{
          border: none;
          background-color: #eff2f7;
        }
      }
      .sub-col,.checkcol{
        padding: 0;
        .checkgroup{
          .custom-checkbox{
            margin-bottom: 2px;
          }
          height: calc(100% - 49px);
          border: 1px solid #dcebf7;
          margin: 5px !important;
          padding: 15px;
          background-color: white;
        }
        .btn{
          background-color: #87b87f;
          border-color: #87b87f ;
          border-radius: 0;
          margin: 0 5px;
          width: 95%;
        }
      }
    }
    #eventtable{
      font-size: 0.9rem;
      table{
        border-color: #dee2e6;
        th,td{
          padding: 0;
          border-color: #dee2e6;
        }
      }
      .el-table .caret-wrapper{
        width: 20px;
      }
      .el-table__expanded-cell{
        box-shadow: 1px 5px 5px #dee2e6;
      }
      .form-group{
        margin-bottom: 0;
      }
    }
    .notetip{
      top: 2px;
      right: 67px;

    }
    #radios2{
      float: right;
    }
  }
</style>
