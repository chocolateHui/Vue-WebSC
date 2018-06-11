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
        :row-class-name="tableRowClassName"
        style="width: 100%" :max-height="tableHeight">
        <!--:span-method="arraySpanMethod"-->
        <el-table-column
          v-for="item in fildes"
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
    {  prop: 'bdate', label:  '日期',width:'138',sortable:false ,showTip:true},
    {  prop: 'saleid', label:  '销售员',width:'',sortable:false,showTip:true},
  ]

  export default {
    data () {
      return {
        items:[],
        fildes :fildes,
        totalRows: items.length,
        sortBy: null,
        sortDesc: false,
        eloptions: [],
        reportdate: '',
        tableHeight: document.body.clientHeight-190,//减去header的60px
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
        exportitems.unshift({caterid: '订单编号', name:  '订单名称'});
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
                    let s = []
                    for(let items of response.data.fileds){
                      var types = {};
                      types["prop"]=items.props;
                      types["label"]=items.label;
                      s.push(types);
                    }
                    this.fildes = Object.assign(fildes,s);
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
        console.log(columnIndex);
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
