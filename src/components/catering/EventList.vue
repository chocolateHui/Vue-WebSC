<template>
  <div id="eventlist">
    <el-table
      id = "eventtable"
      ref = "eventtable"
      :row-key="getRowKeys"
      @expand-change = "expandChange"
      :data="eventlist"
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="eventdiv">
            <b-row id="eventmain">
              <b-col class="main-col4">
                <b-form-group label="事务名称|" :label-cols="4"
                              horizontal>
                  <el-input clearable v-model="expandevent.descript">
                  </el-input>
                </b-form-group>
              </b-col>
              <b-col class="main-col2" >
                <b-form-group label="类型|" :label-cols="4" horizontal>
                  <el-select v-model="expandevent.type">
                    <el-option
                      v-for="item in typeoptions"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value">
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
                    :editable="editable"
                    :picker-options="datepickerOptions">
                  </el-date-picker>
                </b-form-group>
              </b-col>
              <b-col class="main-col4">
                <b-form-group label="时段|" :label-cols="2" horizontal>
                  <TimePicker :steps="[1, 10, 15]" v-model="eventtime" format="HH:mm" type="timerange"></TimePicker>
                  <el-select v-model="stdunit" class="timeselect">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </b-form-group>
              </b-col>
              <b-col class="main-col2" >
                <b-form-group label="状态|" :label-cols="4" horizontal>
                  <el-select v-model="expandevent.sta">
                    <el-option
                      v-for="item in staoptions"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </b-form-group>
              </b-col>
              <b-col class="main-col3">
                <b-form-group label="场地|" horizontal>
                  <el-input class="modalinput" clearable readonly v-model="expandevent.codedes">
                    <i slot="suffix" class="fa fa-list"></i>
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
                          <b-form-input v-model="expandevent.price" class="priceinput" type="text"></b-form-input>
                          <span class="input-separator">/</span>
                          <el-select v-model="expandevent.id" class="priceselect">
                            <el-option
                              v-for="item in priceoptions"
                              :key="item.value"
                              :label="item.text"
                              :value="item.value">
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
                      <b-form-group label="布&#8195;&#8195;局&#8194;|" :label-cols="2"
                                    horizontal>
                        <el-select class="sub-select" v-model="expandevent.layout">
                          <el-option
                            v-for="item in layoutoptions"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group label="门牌信息&#8194;|" :label-cols="2"
                                    horizontal>
                        <b-form-input  type="text" v-model="expandevent.infor"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group label="优先等级&#8194;|" :label-cols="2"
                                    horizontal>
                        <el-select class="sub-select" v-model="expandevent.degree">
                          <el-option
                            v-for="item in degreeoptions"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
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
                  <b-form-checkbox-group stacked v-model="selected" :options="options">
                  </b-form-checkbox-group>
                </b-form-group>
                <b-button size="mini" @click="deleteempno()">完成</b-button>
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
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <b-button size="mini" type="danger" @click="deleteempno()">删除</b-button>
        </template>
      </el-table-column>
      <template slot="append">
        <b-row class="sum-row">
          <label class="sumlabel">合计:</label>
          <label class="sumlabel">5</label>
        </b-row>
      </template>
    </el-table>

    <b-modal id="logmodal" size="lg" title="操作日志" ok-only ok-title="确认">
    </b-modal>
  </div>
</template>

<script>
  // 框架相关
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'
  import methodinfo from '../../config/MethodConst.js'
  import FormatInput from '../FormatInput.vue'
  import {TimePicker} from 'iview'
  import sysLog from  '../../components/syslog.vue'
  import '../../css/iviewpicker.css'
  Vue.use(TimePicker)

  const fildes = [
    {  prop: 'eventid', label:  '事务ID',width:'160',sortable:true,"classname":"text-center" },
    {  prop: 'descript', label:  '事务名称',width:'',sortable:true,showTip:true},
    {  prop: 'codedes', label:  '场地',width:'120',sortable:true,showTip:true,"classname":"text-center" },
    {  prop: 'bdate', label:  '日期',width:'100',sortable:true ,"classname":"text-center"},
    {  prop: 'begintime', label:  '开始',width:'75',sortable:true ,"classname":"text-center"},
    {  prop: 'endtime', label:  '结束',width:'75',sortable:true,"classname":"text-center" },
    {  prop: 'attnum', label:  '人数',width:'75',sortable:true,"classname":"text-right" },
    {  prop: 'income', label:  '预测收入',width:'110',sortable:true ,"classname":"text-right"}
  ]

  export default {
    data () {
      return {
        fildes :fildes,
        expands:'',
        expandevent:{},
        eventtime:[],
        eventflags:[],
        stdunit:'',
        staoptions:[
          { value: '1', text: '预订' },
          { value: '2', text: '确认' },
          { value: '3', text: '登记' }
        ],
        typeoptions:[

        ],
        options: [
          { value: '1', text: '有噪音' },
          { value: '2', text: '不计收入' },
          { value: '3', text: '共享' }
        ],
        // 获取row的key值
        getRowKeys(row) {
          return row.eventid;
        }
      }
    },
    computed: {
      ...mapGetters([
        'caterid',
        'eventlist'
      ])
    },
    methods: {
      deleteempno:function (row) {
        this.$confirm("是否要删除该员工信息？","提示")
      },
      expandChange:function (row, expandedRows) {
        this.eventtime.push(row.begintime,row.endtime)
        this.expandevent=Object.assign({},row);
        if(expandedRows.length>1){
          let index = 0;
          for (let expandrow of expandedRows) {
            if (expandrow.eventid !== row.eventid) {
              expandedRows.splice(index, 1);
            }
            index++;
          }
        }
      }
    },
    components: {
      sysLog,
      FormatInput,
      TimePicker
    }
  }
</script>
<style lang="scss">
  #eventlist{
    font-size: 0.9rem;
    input{
      font-size: 0.9rem;
    }
    .el-date-editor .el-range-separator{
      padding: 0;
    }
    .btn{
      width: 100px;
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
    .sum-row{
      margin-top: 6px;
      .sumlabel{
        padding: 0 10px;
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
          input{
            height: 31.5px;
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
    }
  }
</style>
