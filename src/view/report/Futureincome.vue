<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="Lossstatistics">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col sm="4" class="my-1">
          <el-date-picker
            v-model="reportdate"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </b-col>
        <b-col sm="4" class="my-1">

        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-group class="mb-0">
            <b-button @click="getreportdata" variant="primary">查询</b-button>
            <b-button @click="exportexcel" variant="success">导出</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <label v-if="!reportdate">请选择报表开始和结束日期</label>
      <label v-else>
        <span>开始日期:{{reportdate[0]}}</span>
        <span> 结束日期:{{reportdate[1]}}</span>
      </label>
      <el-table
        id="datatable"
        ref="datatable"
        :data="searchitems"
        border
        show-summary
        :summary-method="getSummaries"
        :row-class-name="tableRowClassName"
        @row-dblclick="tableDbEdit"
        style="width: 100%" :max-height="tableHeight">
        <!--:span-method="arraySpanMethod"-->
        <el-table-column
          v-for="item in fi"
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
    {  prop: 'date', label:  '日期',width:'138',sortable:false ,showTip:true},
    {  prop: 'saleid', label:  '销售员',width:'',sortable:false,showTip:true},
  ]

  export default {
    data () {
      return {
        items:[],
        fi :fildes,
        totalRows: items.length,
        sortBy: null,
        sortDesc: false,
        eloptions: [],
        reportdate: '',
        sums: [],
        tableHeight: document.body.clientHeight-190,//减去header的190px
      }
    },
    computed: {
      ...mapGetters([
      ]),
      searchitems:function () {
          return this.items;
      }
    },
    methods: {
      exportexcel:function () {
        //跳过json的key,手工添加输出标题
        let sheetopt = {skipHeader:true};
        let exportitems = this.items.slice(0);
        let fia = {};
        for(let items of this.fi ){
          fia[items.prop] = items.label;
        }
        let sums = {};
        let i=0;
        for(let key in fia ){
          sums[key] = this.sums[i];
          i++;
        }
        exportitems.push(sums);
        exportitems.unshift(fia);
        //json转换为表格
        let worksheet = XLSX.utils.json_to_sheet(exportitems,sheetopt);
        worksheet['!cols'] = [{width:10},{width:30}]
        let new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet, "Sheet1");
        /* generate file and force a download*/
        XLSX.writeFile(new_workbook, "sheetjs.xlsx");
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
              this.$http.post(methodinfo.getincomereportlist, {
                bdate:bdate,
                edate:edate
              }).then((response)=> {
                if (response.data.errorCode=="0") {

                    if(typeof(response.data.fileds) != "undefined"){
                      this.items = [];
                      this.fi = Object.assign([],fildes);
                      for(let items of response.data.fileds){
                        let types = {};

                        types["prop"]=items.props;
                        if(items.props===""){
                          types["prop"] = "zzzz";
                        }
                        types["label"]=items.label;
                        if(items.label===""){
                          types["label"] = items.props;
                        }
                        this.fi.push(types);
                      }
                      let types = {};
                      types["prop"]="heji";
                      types["label"]="合计";
                      this.fi.push(types);
                      for(let items of response.data.incomes){
                        let types = {};
                        types["date"]=items.date;
                        types["salemane"]=items.salemane;
                        types["saleid"]=items.saleid;

                        types["heji"]=items.heji;
                        let m = JSON.parse(items.incomejson);
                        for(let s in m){
                          if(s===""){
                            types["zzzz"]=m[s];
                          }
                          else{
                            types[s]=m[s];
                          }

                        }
                        this.items.push(types)
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
      getSummaries(param) {

        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 1) {
            sums[index] =data.length;;
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '';
          } else {
            sums[index] = 'N/A';
          }
        });
        this.sums = sums;
        return sums;
      },
      tableRowClassName({row, rowIndex}) {
        if (row.caterid === '小计') {
          return 'warning-row';
        } else if (row.caterid === '合计') {
          return 'success-row';
        }
        return '';
      },
      tableDbEdit(row, event) {
        let sale = row.saleid;
        let begin = row.date;
        this.$router.push({name: "分类预测明细表", params: {sale: sale,begin:begin}})
      },
    },
    watch:{

    },
    created(){

    }
  }
</script>
<style lang="scss"  type="text/scss">
  #Lossstatistics{
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
  }
</style>
