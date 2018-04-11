<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="Lossstatistics">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col sm="4" class="my-1">
          <el-date-picker
            v-model="reportdate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-group horizontal label="销售员" class="mb-0">
            <el-select v-model="saleid" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in eloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-group class="mb-0">
            <b-button variant="primary">查询</b-button>
            <b-button @click="exportexcel" variant="success">导出</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <caption v-if="!reportdate">请选择报表开始和结束日期</caption>
      <caption v-else>销售员:{{saleid}}</caption>
      <el-table
        :data="searchitems"
        border
        show-summary
        style="width: 100%" :max-height="tableHeight">
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

  const items = [
    {  caterid: 40, name:  '销售员1' },
    {  caterid: 21, name: '销售员1' },
    {  caterid: 9, name: 'Mini'},
    {  caterid: 89, name: 'Geneva' },
    {  caterid: 38, name: 'Jami' },
    {  caterid: 27, name: 'Essie' },
    {  caterid: 40, name: 'Thor' },
    {  caterid: 87, name: 'Larsen'},
    {  caterid: 26, name: 'Mitzi' },
    {  caterid: 22, name: 'Genevieve' },
    {  caterid: 38, name: 'John' },
    {  caterid: 29, name: 'Dick' }
  ]
  const fildes = [
    {  prop: 'caterid', label:  '订单编号',width:'120',sortable:true },
    {  prop: 'name', label:  '订单名称',width:'',sortable:true,showTip:true},
    {  prop: 'cusnodes', label:  '协议单位',width:'',sortable:true,showTip:true},
    {  prop: 'eventid', label:  '事务ID',width:'90',sortable:true },
    {  prop: 'place', label:  '事务场地',width:'100',sortable:true },
    {  prop: 'eventtype', label:  '事务类型',width:'100',sortable:true },
    {  prop: 'osta', label:  '原状态',width:'90',sortable:true },
    {  prop: 'reason', label:  '取消理由',width:'100',sortable:true },
    {  prop: 'saleid', label:  '销售员',width:'90',sortable:true },
    {  prop: 'cby', label:  '操作员',width:'80' },
    {  prop: 'changed', label:  '操作时间',width:'80' },
  ]

  export default {
    data () {
      return {
        items: items,
        fildes :fildes,
        totalRows: items.length,
        sortBy: null,
        sortDesc: false,
        saleid: '',
        eloptions: [{
          value: '销售员1',
          label: '黄金糕'
        }, {
          value: '销售员2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        reportdate: '',
        tableHeight: document.body.clientHeight-190,//减去header的60px
      }
    },
    computed: {
      searchitems:function () {
        if(!this.saleid){
          return this.items;
        }else{
          return this.items.filter( item => (~item.name.indexOf(this.saleid)));
        }
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
      }
    }
  }
</script>
<style lang="scss">
  #Lossstatistics{
    .el-date-editor .el-range-separator{
      padding: 0;
    }
    caption{
      caption-side: top;width: 100%
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
  }
</style>
