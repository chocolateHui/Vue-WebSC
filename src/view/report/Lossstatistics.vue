<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="Lossstatistics">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row style="margin-bottom:5px">
        <b-col sm="5" class="my-1">
          <b-input-group prepend="报表日期" id="sel">
          <el-date-picker
            v-model="reportdate"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          </b-input-group>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-input-group prepend="销售员" id="sel">
            <el-select v-model="saleid" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in eloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </b-input-group>
        </b-col>
        <b-col sm="3" class="my-1">
          <b-form-group class="mb-0">
            <b-button @click="getreportdata" variant="primary">查询</b-button>
            <b-button @click="exportexcel" variant="success">导出</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <!--<label v-if="!reportdate">请选择报表开始和结束日期</label>-->
      <!--<label v-else>-->
        <!--<span>开始日期:{{reportdate[0]}}</span>-->
        <!--<span> 结束日期:{{reportdate[1]}}</span>-->
        <!--<span>销售员:{{saleid}}</span>-->
      <!--</label>-->
      <el-table
        id="datatable"
        ref="datatable"
        :span-method="arraySpanMethod"
        :data="searchitems"
        border
        :row-class-name="tableRowClassName"
        style="width: 100%" :max-height="tableHeight">
        <el-table-column
          v-for="item in fildes"
          header-align="center"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.showTip" :key="item.prop">
        </el-table-column>
      </el-table>
    </b-container>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst'

  var items = []
  const fildes = [
    {  prop: 'caterid', label:  '订单编号',width:'138',sortable:false ,showTip:true},
    {  prop: 'name', label:  '订单名称',width:'',sortable:false,showTip:true},
    {  prop: 'cusnodes', label:  '协议单位',width:'',sortable:false,showTip:true},
    {  prop: 'eventid', label:  '事务ID',width:'150',sortable:false,showTip:true },
    {  prop: 'place', label:  '事务场地',width:'100',sortable:false,showTip:true },
    {  prop: 'eventtype', label:  '事务类型',width:'100',sortable:false ,showTip:true},
    {  prop: 'ostades', label:  '原状态',width:'70',sortable:false ,showTip:true},
    {  prop: 'reason', label:  '取消理由',width:'100',sortable:false ,showTip:true},
    {  prop: 'salename', label:  '销售员',width:'90',sortable:false ,showTip:true},
    {  prop: 'cby', label:  '操作员',width:'80',showTip:true },
    {  prop: 'changed', label:  '操作时间',width:'140',showTip:true }
  ]

  export default {
    data () {
      return {
        items:[],
        fildes :fildes,
        totalRows: items.length,
        sortBy: null,
        sortDesc: false,
        saleid: '',
        eloptions: [],
        reportdate: '',
        tableHeight: document.body.clientHeight-190,//减去header的190px
      }
    },
    computed: {
      ...mapGetters([
        'salelist',
      ]),
      searchitems:function () {
        if(!this.saleid){
          return this.items;
        }else{
          return this.items.filter( item => {
              if (item.salename===this.saleid){
                return item;
              }
            }
          );
        }
      }
    },
    methods: {
      exportexcel:function () {
        //跳过json的key,手工添加输出标题
        let sheetopt = {skipHeader:true};
        let exportitems = this.items.slice(0);
        let fia = {};
        for(let items of this.fildes ){
          fia[items.prop] = items.label;
        }
        exportitems.unshift(fia);
        let worksheet = XLSX.utils.json_to_sheet(exportitems,sheetopt);
        worksheet['!cols'] = [{width:10},{width:30}]
        let new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet, "Sheet1");
        /* generate file and force a download*/
        XLSX.writeFile(new_workbook, "sheetjs.xlsx");
      },
      getsaleid(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch("getSale");
        });
      },
      getreportdata(){
        if(!this.reportdate){
          this.$message.error({
            message:"请选择日期"
          });
        }
        else{
          let bdate = this.reportdate[0];
          let edate = this.reportdate[1];
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.getbtrevocationlist, {
              bdate:bdate,
              edate:edate
            }).then((response)=> {
              if (response.data.errorCode=="0") {
                if(typeof(response.data.btrevocations) != "undefined"){
                  this.items = [];
                  for(let items of response.data.btrevocations){
                    var types = {};
                    types["caterid"]=items.caterid;
                    if(items.caterid==="xj"){
                      types["caterid"] = "小计"
                    }
                    else if(items.caterid==="hj"){
                      types["caterid"] = "合计"
                    }
                    types["name"]=items.mdesc;
                    types["cusnodes"]=items.gedesc;
                    types["eventid"]=items.eventid;
                    if(typeof(items.typedes) != "undefined"){
                      types["eventtype"]=items.typedes;
                    }
                    else{
                      types["eventtype"]="";
                    }
                    types["salename"]=items.salename;
                    types["ostades"]=items.ostades;
                    types["reason"]=items.cancelreason;
                    types["cby"]=items.cby;
                    types["changed"]=items.changed;
                    this.items.push(types);
                  }
                }
              }
              else{
                this.items = [];
              }
            })
          })
        }
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (row.caterid === '小计'||row.caterid === '合计') {
            return {
              rowspan: 1,
              colspan: 6
            };
          } else {
            return {
              rowspan: 1,
              colspan: 1
            };
          }
        }
        if (columnIndex >=1&&columnIndex <=5) {
          if (row.caterid === '小计'||row.caterid === '合计') {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      // getSummaries(param) {
      //
      //   const { columns, data } = param;
      //   const sums = [];
      //   columns.forEach((column, index) => {
      //     if (index === 0) {
      //       sums[index] = '合计';
      //       return;
      //     }
      //     if (index === 1) {
      //       sums[index] =data.length;;
      //       return;
      //     }
      //     const values = data.map(item => Number(item[column.property]));
      //     if (!values.every(value => isNaN(value))) {
      //       sums[index] = values.reduce((prev, curr) => {
      //         const value = Number(curr);
      //         if (!isNaN(value)) {
      //           return prev + curr;
      //         } else {
      //           return prev;
      //         }
      //       }, 0);
      //       sums[index] += '';
      //     } else {
      //       sums[index] = 'N/A';
      //     }
      //   });
      //   this.sums = sums;
      //   return sums;
      // },
      tableRowClassName({row, rowIndex}) {
        if (row.caterid === '小计') {
          return 'warning-row';
        } else if (row.caterid === '合计') {
          return 'success-row';
        }
        return '';
      }
    },
    watch:{
      salelist(val,oldval){
        for(let elm of val ){
          let type = {};
          type["value"] = elm.name;
          type["label"] = elm.name;
          this.eloptions.push(type);
        }
      }
    },
    created(){
      this.getsaleid();
      let data = new Date();
      var d = new Date()
      d.setMonth(d.getMonth()+1);
      this.reportdate=[data,d];
      this. getreportdata();
    }
  }
</script>
<style lang="scss"  type="text/scss">
  #Lossstatistics{
    .el-input--suffix .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .el-date-editor{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .el-input_icon{
      margin-top: -2px;
    }
    .el-date-editor .el-range-separator{
      padding: 0;
    }
    caption{
      caption-side: top;width: 100%;
      span{
        padding-left:5px
      }
    }
    .btn{
      width: 100px;
    }
    .table{
      border-color: #dee2e6;
      th{
        border-color: #dee2e6;
      }
    }
    .el-input__inner{
      height: 36px;
    }
    .el-table td, .el-table th{
      padding: 0;
    }
    .el-table__header-wrapper.el-table td, .el-table th{
      padding: 0;
      background: linear-gradient(#fff, #F4F5F6);
    }
    .el-table .caret-wrapper{
      width: 20px;
    }
    .row{
      margin-right: 0;
    }
    .el-table .warning-row {
      background: #e5e5e5;
    }

    .el-table .success-row {
      background: #CCC;
    }
    .el-date-editor .el-range-separator {
      padding: 0 5px;
      line-height: 28px;
      width: 7%;
      color: #303133;
    }
    .el-date-editor .el-range__icon {
      font-size: 14px;
      margin-left: -5px;
      color: #c0c4cc;
      float: left;
      line-height: 25px;
    }
  }
</style>
