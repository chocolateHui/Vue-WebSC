<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="syslog">
    <b-container fluid>
      <el-table
        ref = "logtable"
        :data="searchitems"
        border
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <b-card>
              <ul>
                <li v-for="item in props.row.logdata" :key="item.item">{{ item.item }}: {{item.newval}} -> {{item.oldval}}</li>
              </ul>
            </b-card>
          </template>
        </el-table-column>
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
    {  code: 'FOX',cby:'FOX', changed:  '2018-04-08 12:00:00',items:'工号,姓名',logdata:[{item:'工号',newval:'FOX',oldval:'FOX1',},{item:'姓名',newval:'FOX',oldval:'FOX1'}] },
    {  code: 'FOX',cby:'TEST1', changed: '2018-04-08 13:00:00',items:'工号,姓名',logdata:[{item:'工号',newval:'TEST1',oldval:'FOX',},{item:'姓名',newval:'FOX',oldval:'FOX1'}] },
  ]
  const fildes = [
    {  prop: 'code', label:  '代码',width:'100' },
    {  prop: 'cby', label:  '操作员',width:'100',sortable:true,showTip:true},
    {  prop: 'changed', label:  '操作时间',width:'160',sortable:true,showTip:true},
    {  prop: 'items', label:  '项目',width:'',sortable:true,showTip:true }
  ]

  export default {
    data () {
      return {
        items: items,
        fildes :fildes,
        eloptions: []
      }
    },
    prop:{
      pkid: {
        type: String
      },
    },
    computed: {
      searchitems:function () {
        return this.items;
//        if(!this.saleid){
//        }else{
//          return this.items.filter( item => (~item.name.indexOf(this.saleid)));
//        }
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss">
  #syslog{
    .el-table{
      td, th{
        border-color: #dee2e6;
        padding: 0;
      }
      .caret-wrapper{
        width: 20px;
      }
    }
    .el-table__expanded-cell{
      padding: 5px!important;
      box-shadow: 0 !important;
    }
    .row{
      margin-right: 0;
    }
  }
</style>
