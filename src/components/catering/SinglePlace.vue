<template>
  <div id="signleplace">
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
  const items = []
  const fildes = [
    {  prop: 'code', label:  '代码',width:'100',sortable:true },
    {  prop: 'descript', label:  '场地名称',width:'',sortable:true,showTip:true},
    {  prop: 'descript1', label:  '英文名称',width:'100',sortable:true,showTip:true},
    {  prop: 'pccodedes', label:  '营业点',width:'160',sortable:true,showTip:true},
    {  prop: 'kind', label:  '类别',width:'100',sortable:true,showTip:true }
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
  #signleplace{
    .el-table{
      td, th{
        border-color: #dee2e6;
        padding: 0;
      }
      .caret-wrapper{
        width: 20px;
      }
    }
    .el-pagination{
      float: right;
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
