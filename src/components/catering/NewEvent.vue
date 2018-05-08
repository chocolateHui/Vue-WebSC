<template>
  <b-container fluid>
    <b-collapse :visible="eventshow" id="newevent">
      <b-card header-tag="header">
        <b-row slot="header">
          <b-col sm="1" class="my-1 eventtitle">
            <span>事务信息</span>
          </b-col>
          <b-col sm="6" class="my-1"></b-col>
          <b-col sm="4" class="my-1"></b-col>
          <b-col sm="1" class="my-1 icondiv">
            <a>
              <i v-b-toggle="'newevent'" v-show="toggleshow" @click="toggleclick" class="fa toggleclass" :class="toggleclass"></i>
            </a>
          </b-col>
        </b-row>
        <div class="eventdiv">
          <b-row>
            <b-col sm="10">
              <b-row id="eventmain">
                <b-col sm="4">
                  <b-form>
                    <b-form-group label="事务名称&#8194;|" horizontal>
                      <el-input class="eventname" v-model="newEvent.descript"></el-input>
                    </b-form-group>
                    <b-form-group label="时&#8195;&#8195;段&#8194;|" horizontal>
                      <TimePicker :steps="[1, 10, 15]" v-model="eventtime" format="HH:mm" type="timerange" placeholder="Select time"></TimePicker>
                      <el-select class="timeselect" v-model="stdunit" @change="timeChange" placeholder="请选择">
                        <el-option
                          v-for="item in timeoptions"
                          :key="item.code"
                          :label="item.descript"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </b-form-group>
                  </b-form>
                </b-col>
                <b-col sm="4">
                  <b-form>
                    <b-form-group label="类型&#8194;|" :label-cols="2" horizontal>
                      <el-select v-model="newEvent.type" filterable>
                        <el-option
                          v-for="item in typeoptions"
                          :key="item.code"
                          :label="item.descript"
                          :value="item.code">
                          <span style="float: left">{{ item.descript }}</span>
                          <span style="float: right;color: #8492a6; font-size: 0.9rem">{{ item.cycle }}</span>
                        </el-option>
                      </el-select>
                    </b-form-group>
                    <b-form-group label="状态&#8194;|" :label-cols="2" horizontal>
                      <el-select v-model="newEvent.sta">
                        <el-option
                          v-for="item in staoptions"
                          :key="item.code"
                          :label="item.descript"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </b-form-group>
                  </b-form>
                </b-col>
                <b-col sm="4">
                  <b-form>
                    <b-form-group label="日期&#8194;|" :label-cols="2" horizontal>
                      <el-date-picker
                        v-model="eventbdate"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        :editable="editable"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="datepickerOptions">
                      </el-date-picker>
                    </b-form-group>
                    <b-form-group label="场地&#8194;|" :label-cols="2" horizontal>
                      <el-input @clear="placeClear" @click.native="placeshow" class="modalinput" clearable readonly v-model="newEvent.codedes">
                        <i slot="prefix" class="fa fa-list"></i>
                      </el-input>
                    </b-form-group>
                  </b-form>
                </b-col>
              </b-row>
              <div id="eventsub">
                <b-row>
                  <b-col sm="6">
                    <b-form-group label="场&#8195;&#8195;租&#8194;|" :label-cols="2" horizontal>
                      <b-form inline>
                        <FormatInput class="priceinput" type="float" maxlength="19" :readonly="priceread" v-model="newEvent.price"></FormatInput>
                        <span class="input-separator">/</span>
                        <el-select @change="priceChange" v-model="newEvent.unit" class="priceselect">
                          <el-option
                            v-for="item in priceoptions"
                            :key="item.code"
                            :label="item.descript"
                            :value="item.code">
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
                        <FormatInput class="numinput" type="number" maxlength="5" text="出席数" v-model="newEvent.attnum"></FormatInput>
                        <span class="input-separator">/</span>
                        <FormatInput class="numinput" type="number" maxlength="5" text="备席数" v-model="newEvent.minnum"></FormatInput>
                        <span class="input-separator">/</span>
                        <FormatInput class="numinput" type="number" maxlength="5" text="保底数" v-model="newEvent.bknum"></FormatInput>
                        <span class="input-separator">|</span>
                        <el-select v-model="newEvent.stdunit" class="numselect">
                          <el-option label="人" value="0"></el-option>
                          <el-option label="桌" value="1"></el-option>
                        </el-select>
                      </b-form>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group label="布&#8195;&#8195;局&#8194;|" :label-cols="2"
                                  horizontal>
                      <el-select class="sub-select" v-model="newEvent.layout">
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
                      <b-form-input  type="text" v-model="newEvent.infor"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group label="优先等级&#8194;|" :label-cols="2"
                                  horizontal>
                      <el-select class="sub-select" v-model="newEvent.degree">
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
                    <b-form-group label="布场耗时&#8194;|" :label-cols="4"
                                  horizontal>
                      <b-input-group>
                        <b-input-group-text slot="append">
                          <span>分钟</span>
                        </b-input-group-text>
                        <FormatInput type="number" maxlength="5" v-model="newEvent.setup"></FormatInput>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                  <b-col class="set-col" sm="3">
                    <b-form-group label="撤场耗时&#8194;|" :label-cols="4"
                                  horizontal>
                      <b-input-group>
                        <b-input-group-text slot="append">
                          <span>分钟</span>
                        </b-input-group-text>
                        <FormatInput type="number" maxlength="5" v-model="newEvent.setdown"></FormatInput>
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
            </b-col>
          </b-row>
        </div>
      </b-card>
    </b-collapse>
    <b-modal id="multiplacemodal" ref="multiplacemodal" title="场地列表" size="lg" hide-footer>
      <MultiPlace ref="MultiPlace" @placeConfirm="placeConfirm" :eventbdate="eventbdate"></MultiPlace>
    </b-modal>
  </b-container>
</template>
<script>
  // 框架相关
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'
  import methodinfo from '../../config/MethodConst.js'
  import FormatInput from '../FormatInput.vue'
  import MultiPlace from './MultiPlace.vue'
  import {TimePicker} from 'iview'
  import '../../css/iviewpicker.css'
  Vue.use(TimePicker)
  // 组件和参数

  export default {
    name: 'EventInfo',
    data () {
      return {
        newEvent:{
          sta:'1',
          stdunit:'0'
        },
        eventbdate:[],
        eventtime: ['00:00', '00:00'],
        stdunit:'',
        flagselected:[],
        flagoptions: [
          { value: '1', text: '有噪音' },
          { value: '2', text: '不计收入' },
          { value: '3', text: '共享' }
        ],
        staoptions:[
          { code: 'Q', descript: '问询' },
          { code: '1', descript: '预订' }
        ],
        timeoptions:[],
        typeoptions:[],
        priceoptions:[],
        layoutoptions:[],
        degreeoptions:[],
        toggleclass:'fa-chevron-up',
        isClear:false,
        priceread:true,
        editable:false,
        datepickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        }
      }
    },
    props:{
      eventshow :{
        type:Boolean,
        default:true
      },
      toggleshow:{
        type:Boolean,
        default:false
      },
    },
    computed: {
      ...mapGetters([
        'caterid',
        'catersta',
        'event'
      ])
    },
    created(){
      //界面生成时加载数据
      let degrees = this.degreeoptions;
      let timeunits = this.timeoptions;
      let lyaouts = this.layoutoptions;
      let types = this.typeoptions;
      let priceitems = this.priceoptions;

      this.$store.dispatch('encrypttoken').then(() => {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
        this.$http.post(methodinfo.getbasecodelist, {
          cat: 'sc_event_type'
        }).then(function (response) {
          if (response.data.errorCode==='0') {
            for(let option of response.data.basecodes){
              if(option.exts2==='0'){
                option.cycle = '无'
              }else if(option.exts2==='1'){
                option.cycle = '月'
              }else if(option.exts2==='2'){
                option.cycle = '季'
              }else if(option.exts2==='3'){
                option.cycle = '半年'
              }else if(option.exts2==='4'){
                option.cycle = '年'
              }
              types.push(option)
            }
          }
        })
        this.$http.post(methodinfo.getbasecodelist, {
          cat: 'sc_event_degree'
        }).then(function (response) {
          if (response.data.errorCode==='0') {
            for(let option of response.data.basecodes){
              degrees.push(option)
            }
          }
        })
        this.$http.post(methodinfo.getbasecodelist, {
          cat: 'sc_time_unit'
        }).then(function (response) {
          if (response.data.errorCode==='0') {
            for(let option of response.data.basecodes){
              timeunits.push(option)
            }
          }
        })
        this.$http.post(methodinfo.getbasecodelist, {
          cat: 'layout'
        }).then(function (response) {
          if (response.data.errorCode==='0') {
            for(let option of response.data.basecodes){
              lyaouts.push(option)
            }
          }
        })
        this.$http.post(methodinfo.getitemlist, {
          type: '4'
        }).then(function (response) {
          if (response.data.errorCode==='0') {
            for(let option of response.data.items){
              priceitems.push(option)
            }
          }
        })
      })
    },
    methods: {
      eventCheck(catering){
        let newEvent = this.newEvent;
        if(newEvent.code||this.eventbdate[0]){
          console.log(newEvent)
          if(!newEvent.descript){
            this.$alert("事务名称不允许为空!")
          }else if(!newEvent.type){
            this.$alert("事务类别不允许为空!")
          }else if(!this.eventbdate[0]){
            this.$alert("事务日期不允许为空!")
          }else if(!this.eventtime[0]){
            this.$alert("事务时间不允许为空!")
          }else if(this.eventtime[0]===this.eventtime[1]){
            this.$alert("事务开始时间和结束时间相同,请修改!")
          }else if(!newEvent.sta){
            this.$alert("事务状态不允许为空!")
          }else if(!newEvent.code){
            this.$alert("事务场地不允许为空!")
          }
        }else{
          return true;
        }
        console.log(catering)
        return false;

      },
      priceChange(val){
        for(let option of this.priceoptions){
          if(option.code===val){
            this.priceread = option.price !== 0.00;
            this.newEvent.price = option.price;
            this.newEvent.id = option.id;
            this.newEvent.unit = option.descript;
            return;
          }
        }
      },
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
      toggleclick(){
        if(!this.eventshow){
          this.toggleclass = "fa-chevron-down";
        }else{
          this.toggleclass = "fa-chevron-up";
        }
        this.eventshow=!this.eventshow;
      },
      placeshow(){
        if(!this.isClear){
          this.$refs.multiplacemodal.show();
        }else{
          this.isClear =false;
        }

      },
      placeClear(){
        this.isClear = true;
        this.$refs.MultiPlace.clearSelect();
      },
      placeConfirm(allselect){
        console.log(allselect);
        let eventcode = '';
        let eventcodedes='';
        for(let elem of allselect){
          eventcode = eventcode + elem.tableno + ',';
          eventcodedes = eventcodedes + elem.descript + ',';
        }
        eventcode=eventcode.substr(0,eventcode.length-1)
        eventcodedes=eventcodedes.substr(0,eventcodedes.length-1)
        this.$set(this.newEvent,'code',eventcode);
        this.$set(this.newEvent,'codedes',eventcodedes);
      }
    },

    components: {
      FormatInput,
      TimePicker,
      MultiPlace
    }
  }
</script>
<style lang="scss">
  #newevent {
    font-size: 0.9rem;
    input{
      font-size: 0.9rem;
    }
    .row{
      margin: 0;
    }
    .card-body,.card-header{
      padding: 0;
    }
    .option-sub{
      color: #8492a6; font-size: 0.9rem
    }
    .card-header{
      background-color: #99a2f5;
      color: white;
    }
    .col-sm-6,.col-sm-9,.col-sm-10,.col-sm-12{
      padding: 0;
    }
    .eventdiv{
      background-color: #eff2f7;
      padding: 5px;
    }
    .el-input__inner {
      padding: 0;
      height: 31.5px;
      border: none;
    }
    .el-select,.el-date-editor--daterange.el-input__inner{
      width: 100%;
    }
    .modalinput{
      padding-left: 30px;
      padding-right: 25px;
      .el-input__prefix{
        left: 0;
      }
    }
    .el-icon-date,.fa{
      color: #fcac6f;
    }
    #eventmain{
      .fa{
        padding-top: 8px;
      }
      .date-class{
        .el-input__inner{
          padding-left: 30px;
        }
        .el-input__prefix, .el-input__suffix{
          top:-5px;
        }
      }
      .col-sm-4,.col-sm-5{
        padding: 0;
      }
      .form-row{
        background-color: white;
        border: 1px solid #dcebf7;
        margin: 5px;
      }
      .eventname{
        padding-left: 0.75rem;
        padding-right: 30px;
      }
      .el-range-separator {
        padding: 0;
        width: 15px;
      }
    }
    #eventsub{
      background-color: white;
      margin: 5px;
      padding: 5px;
      border: 1px solid #dcebf7;

      .priceinput{
        width: 65%;
        padding-left: 0;
        padding-right: 0;
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
    .checkcol{
      padding: 0;
    }
    .checkgroup{
      .custom-controls-stacked{
        padding-top: 20px;
      }
      height: calc(100% - 10px);
      border: 1px solid #dcebf7;
      margin: 5px !important;
      padding: 15px;
      background-color: white;
      .custom-checkbox{
        font-size: 1rem;
        margin-bottom: 35px;
      }
    }

    .form-control{
      border: none;
    }
    .form-group{
      margin: 0;
    }
    .ivu-date-picker{
      width: 60%;
    }
    .ivu-input-wrapper{
      width: 80%;
      line-height: 0.9;
    }
    .timeselect{
      width: 38%;
    }
  }
</style>
