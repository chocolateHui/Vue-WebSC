<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="CaterListpanel" >


        <el-date-picker
          v-model="timechose"
          style="width:365px;"
          class="datea"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      <el-select v-model="arrdep"  class="datea" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-tabs type="border-card" class="width100 height100" @tab-click="tabClick">
        <el-tab-pane label="当前宴会订单">
          <b-row>
            <b-col>
              <b-form inline>
                <b-form-checkbox v-model="allSelected"
                                 :indeterminate="indeterminate"
                                 aria-describedby="flavours"
                                 aria-controls="flavours"
                                 @change="toggleAll"
                >
                  {{ allSelected ? '所有' : '所有' }}
                </b-form-checkbox>
                <b-form-checkbox-group
                  v-model="selected"
                  name="flavs"
                  :options="flavours"
                  class="ml-4"
                ></b-form-checkbox-group>
              </b-form>
            </b-col>
            <b-col>
              <i class="fa fa-refresh refresh" aria-hidden="true"></i>
            </b-col>
          </b-row>
          <b-row>
            <el-table
              :data="searchitems"
              border
              stripe
              style="width: 100%">
              <el-table-column
                v-for="item in fildes"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :sortable="item.sortable"
                :show-overflow-tooltip="item.showTip" :key="item.prop">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <b-form inline class="paddingleft0 paddingbottom0">
                    <b-button
                      size="sm"
                      variant="primary" @click="openCateringInfo(scope.row)">编</b-button>
                    <b-button
                      size="sm"
                       variant="warning" @click="deleteempno()">同</b-button>
                    <b-button
                      size="sm"
                     @click="remarkshow(scope.row)">备</b-button>
                  </b-form>
                </template>
              </el-table-column>
            </el-table>
          </b-row>




        </el-tab-pane>
        <el-tab-pane label="历史宴会订单">
          <b-row>
            <b-col>
              <b-form inline>

                <b-form-checkbox v-model="HallSelected"
                                 :indeterminate="Hindeterminate"
                                 aria-describedby="jflavours"
                                 aria-controls="flavours"
                                 @change="HtoggleAll"
                >
                  {{ HallSelected ? '所有' : '所有' }}
                </b-form-checkbox>
                <b-form-checkbox-group
                  v-model="Hselected"
                  name="Hflavs"
                  :options="flavours"
                  class="ml-4"
                ></b-form-checkbox-group>
              </b-form>
            </b-col>
            <b-col>
              <i class="fa fa-refresh refresh" aria-hidden="true"></i>
            </b-col>
          </b-row>
          <b-row>
            <el-table
              :data="searchHitems"
              border
              stripe

              style="width: 100%">
              <el-table-column
                v-for="item in fildes"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :sortable="item.sortable"
                :show-overflow-tooltip="item.showTip" :key="item.prop">
              </el-table-column>
              <el-table-column
                label="操作"
                width="55">
                <template slot-scope="scope">
                  <b-form inline class="paddingleft0 paddingbottom0">
                    <b-button
                      size="sm"
                      variant="primary" @click="deleteempno()">编</b-button>
                  </b-form>
                </template>
              </el-table-column>
            </el-table>
          </b-row>
        </el-tab-pane>



      </el-tabs>
      <b-modal id="logmodal" ref="myModalRef2"  size="lg" title="宴会备注" hide-footer>
        <sysLog @onhide="onhide"></sysLog>
      </b-modal>
  </div>
</template>

<script>
  import {dateValid}  from '../common/date.js'
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import {datevalid}  from '../common/date.js'
  import methodinfo from '../config/MethodConst.js'
  import 'font-awesome/css/font-awesome.css'
  import sysLog from  '../components/remark.vue'

  const fildes = [
    {  prop: 'caterid', label:  '账号',width:'160',sortable:true,showTip: true},
    {  prop: 'name', label:  '宴会名称',width:'',sortable:true,showTip: true},
    {  prop: 'stades', label:  '状态',width:'80',sortable:true,showTip: true},
    {  prop: 'eventnum', label:  '事务数',width:'90',sortable:true ,showTip: true},
    {  prop: 'arr', label:  '到达时间',width:'',sortable:true,showTip: true },
    {  prop: 'dep', label:  '离开时间',width:'',sortable:true,showTip: true},
    {  prop: 'blockid', label:  '团队账号',width:'120',sortable:true,showTip: true },
    {  prop: 'contactor', label:  '联系人',width:'',sortable:true,showTip: true },
    {  prop: 'cusno_des', label:  '协议单位',width:'',sortable:true,showTip: true},
    {  prop: 'remark', label:  '备注',width:'',sortable:true }
  ]
  const re = {  caterid: '',caterdes:'',
    eventid:"",
    itemid:"",
    type:"",
    eventdes:"",
    title:"",
    seq:"",
    date0:"",
    content:"",
    flag:"F"}
  export default {

    data () {

      return {
        options: [{
          value: '1',
          label: '按到达时间'
        }, {
          value: '2',
          label: '按离开时间'
        }],
        fildes :fildes,
        tableData: [],
        HtableData: [],
        timechose:"",
        arrdep:"1",
        flavours: [
          {text: '问询', value: 'Q'},
          {text: '预订', value: '1'},
          {text: '确认', value: '2'},
          {text: '登记', value: '3'},
          {text: '结账', value: 'O'},
          {text: '取消', value: '0'},
        ],
        selected: ["1","2","3"],
        allSelected: false,
        indeterminate: true,
        Hselected: ["1","2","3"],
        HallSelected: false,
        Hindeterminate: true,
        ishistory:"",
        num:0,
        remark:re
      }
    },
    mounted() {
      this.gettable1data();
    },
    methods: {
      toggleAll (checked) {
        if(checked){
          this.selected =  [];
          for(let key of this.flavours){
            this.selected.push(key.value)
          }
        }
        else{
          this.selected =  [];
        }
        console.log(this.selected);
      },
      HtoggleAll (checked) {
        if(checked){
          this.Hselected =  [];
          for(let key of this.flavours){
            this.Hselected.push(key.value)
          }
        }
        else{
          this.Hselected =  [];
        }
      },
      tabClick(targetName) {
        console.log(targetName.paneName);
        if(targetName.paneName==="0"){
          if(this.ishistory==="H"){
            this.timechose = "";
          }
          this.gettable1data();
          this.ishistory="";
        }
        if(targetName.paneName==="1"){
          if(this.ishistory===""){
            this.timechose = "";
          }
          this.getHtable1data();
          this.ishistory = "H";
        }

      },
      gettable1data(){
        let sta = this.selected.slice(0).toString();
        this.getNowcateringlist(sta);

      },
      getHtable1data(){
        let sta = this.Hselected.slice(0).toString();
        this.getHcateringlist(sta);

      },
      getHcateringlist(sta){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.gethistorycateringlist, {
            sta:sta
          }).then((response)=> {
            if (response.status === 200) {
              this.HtableData = [];
              if(typeof(response.data.caterings) !== "undefined"){
                for(let caterings of response.data.caterings){
                  let types = {};
                  types["caterid"]=caterings.caterid;
                  types["name"]=caterings.name;
                  types["stades"]=caterings.stades;
                  types["eventnum"]=caterings.eventnum;
                  types["arr"]=caterings.arr.substring(0,10);
                  types["dep"]=caterings.dep.substring(0,10);
                  types["blockid"]=caterings.blockid;
                  types["contactor"]=caterings.contactor;
                  types["cusno_des"]=caterings.cusno_des;
                  types["remark"]=caterings.remark;
                  this.HtableData.push(types);
                }
                // this.tableData3 = response.data.caterings;
              }

            }
          })
        })
      },
      getNowcateringlist(sta){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getcateringlist, {
            sta:sta
          }).then((response)=> {
            if (response.status === 200) {
              this.tableData = [];
              if(typeof(response.data.caterings) !== "undefined"){
                for(let caterings of response.data.caterings){
                  let types = {};
                  types["caterid"]=caterings.caterid;
                  types["name"]=caterings.name;
                  types["stades"]=caterings.stades;
                  types["eventnum"]=caterings.eventnum;
                  types["arr"]=caterings.arr.substring(0,10);
                  types["dep"]=caterings.dep.substring(0,10);
                  types["blockid"]=caterings.blockid;
                  types["contactor"]=caterings.contactor;
                  types["cusno_des"]=caterings.cusno_des;
                  types["remark"]=caterings.remark;
                  this.tableData.push(types);
                }
                // this.tableData3 = response.data.caterings;
              }

            }
          })
        })
      },
      openCateringInfo(row){
        this.$router.push({ name: '宴会预订详情', params: { caterid: row.caterid }});
      },
      onhide() {
        this.$refs.myModalRef2.hide()
      },

      remarkshow:function (row) {
        var caterinfo = {};
        caterinfo["caterid"] = row.caterid;
        caterinfo["type"] = "1";
        // caterinfo["caterdes"] = row.name;
        this.$store.commit('setCaterdes',row.name);
        this.$store.commit('setCaterinfo',caterinfo);
        // this.$set(this.remark,"caterid",row.caterid);
        // this.$set(this.remark,"caterdes",row.name);
        this.$refs.myModalRef2.show()
      },
    },
    computed: {
      searchitems:function () {
        if(!this.timechose){
          return this.tableData;
        }else{
          return this.tableData.filter( tableData => {
            let btime = this.timechose.slice(0)[0];
            let etime = this.timechose.slice(0)[1];
            if(this.arrdep==="1"){
              if (dateValid(btime,tableData.arr)&&dateValid(tableData.arr,etime)){
                return tableData;
              }
            }
            else{
              if (dateValid(btime,tableData.dep)&&dateValid(tableData.dep,etime)){
                return tableData;
              }
            }
          });
        }
      },
      searchHitems:function () {
        if(!this.timechose){
          return this.HtableData;
        }else{
          return this.HtableData.filter( HtableData => {
            let btime = this.timechose.slice(0)[0];
            let etime = this.timechose.slice(0)[1];
            if(this.arrdep==="1"){
              if (dateValid(btime,HtableData.arr)&&dateValid(HtableData.arr,etime)){
                return HtableData;
              }
            }
            else{
              if (dateValid(btime,HtableData.dep)&&dateValid(HtableData.dep,etime)){
                return HtableData;
              }
            }
          });
        }
      }
    },
    components: {
      sysLog,
    },
    watch: {
      selected(newVal, oldVal) {
        if (newVal.length === 0) {
          this.indeterminate = false
          this.allSelected = false
        } else if (newVal.length === this.flavours.length) {
          this.indeterminate = false
          this.allSelected = true
        } else {
          this.indeterminate = true
          this.allSelected = false
        }
        let sta = newVal.slice(0).toString();
        this.timechose = "";
        this.getNowcateringlist(sta);

      },
      Hselected(newVal, oldVal) {
        if (newVal.length === 0) {
          this.Hindeterminate = false
          this.HallSelected = false
        } else if (newVal.length === this.flavours.length) {
          this.Hindeterminate = false
          this.HallSelected = true
        } else {
          this.Hindeterminate = true
          this.HallSelected = false
        }
        let sta = newVal.slice(0).toString();
        this.getHcateringlist(sta);
      }
    }

  }
</script>
<style lang="scss"  type="text/scss">
  #CaterListpanel{
    .el-tabs__content{
      overflow: hidden!important;
    }
    .el-tabs {
      padding-top: 0px!important;
    }
    .router-template2 {
      color: #000;
      font-size: 15px;
      font-weight: 400;
      height: 100%;
    }
    .template-wrap2 {
      height: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: left;
    }
    .width100{
      width: 100%;
    }
    .width99{
      width: 99%;
    }

    .height100{
      height: 90%;
    }

    .paddingleft0{
      padding-left: 0px!important;
    }
    .paddingbottom0{
      padding-bottom:  0px!important;
    }
    .marginbottom15{
      margin-bottom: 15px;
    }
    .card-header {
      padding: 0.3rem 1.25rem 0.3rem!important;
    }
    .container {
      width: 100%!important;
      max-width: 97%!important;
      padding-right: 0px;
      padding-left: 0px;
      margin-right: 0px;
      margin-left: 0px;
    }
    .refresh {
      float: right;
      padding-top: 4px;
    }
    .is-disabled {
      float: right;
      border: none;
      padding-right: 5px;
      padding-left: 5px;
    }
    .el-date-editor .el-range-separator {
      padding: 0 5px;
      line-height: 32px;
      width: 7%;
      color: #303133;
    }
    .el-tabs__nav {
      float: none;
    }
    .form-inline {
      padding-bottom: 10px;
      padding-left: 15px;
      width: 100%;
    }
    table{
      border-color: #dee2e6;
      th,td{
        padding: 0;
        border-color: #dee2e6;
      }
      .el-input__inner{
        height: 36px;
      }
      .el-table .caret-wrapper{
        width: 20px;
      }
      .el-table__expanded-cell{
        padding: 5px!important;
        box-shadow: 1px 5px 5px #dee2e6;
      }
    }

    .datea{
      position: relative;
      z-index: 99;
      margin-right: 17px;
      margin-top: 1px;
      float: right;
      height: 39px;

      .el-input__inner{
        height: 39px;
      }
    }
  }

</style>
