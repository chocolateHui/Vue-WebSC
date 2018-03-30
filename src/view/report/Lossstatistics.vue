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
        tableHeight: document.body.clientHeight-195,//减去header的60px
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

    }
  }
</script>
<style lang="scss">
  #Lossstatistics{
    .el-date-editor .el-range-separator{
      padding: 0;
    }
    .container-fluid{
      padding: 0;
    }
    caption{
      caption-side: top;width: 100%
    }
    .table{
      border-color: #dee2e6;
      th{
        border-color: #dee2e6;
      }
    }
    .el-table td, .el-table th{
      padding: 0;
    }
    .el-table .caret-wrapper{
      width: 20px;
    }
  }
</style>
