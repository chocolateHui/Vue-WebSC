<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="Lossstatistics">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col sm="4" class="my-1">
          <el-date-picker
            v-model="value6"
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
      <caption v-if="!value6">请选择报表开始和结束日期</caption>
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
    {  age: 40, name:  '销售员1' },
    {  age: 21, name: '销售员1' },
    {  age: 9, name: 'Mini'},
    {  age: 89, name: 'Geneva' },
    {  age: 38, name: 'Jami' },
    {  age: 27, name: 'Essie' },
    {  age: 40, name: 'Thor' },
    {  age: 87, name: 'Larsen'},
    {  age: 26, name: 'Mitzi' },
    {  age: 22, name: 'Genevieve' },
    {  age: 38, name: 'John' },
    {  age: 29, name: 'Dick' },
    {  age: 26, name: 'Mitzi' },
    {  age: 22, name: 'Genevieve' },
    {  age: 38, name: 'John' },
    {  age: 29, name: 'Dick' },
    {  age: 26, name: 'Mitzi' },
    {  age: 22, name: 'Genevieve' }
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

  var docjson = {"doc":"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"};

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
        value6: '',
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
      exportword:function () {
        let bytes = window.atob(docjson.doc);
        let ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        let blob = new Blob([ab], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = 'test1.docx'; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      },
      exportexcel:function () {
        let worksheet = XLSX.utils.json_to_sheet(this.items);
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
