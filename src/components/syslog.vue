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
      <b-pagination @input="tableCurrentChange" :total-rows="totalrow" :per-page="pageSize" v-model="currentPage" class="my-0" ></b-pagination>
    </b-container>
  </div>
</template>
<script>
  import methodinfo from '../config/MethodConst.js'

  const items = [
    {  contexttype : 'FOX',empno :'FOX', create :  '2018-04-08 12:00:00',contextkey :'工号,姓名',context :[{item:'工号',newval:'FOX',oldval:'FOX1',},{item:'姓名',newval:'FOX',oldval:'FOX1'}] },
    {  contexttype: 'FOX',empno :'TEST1', create : '2018-04-08 13:00:00',contextkey :'工号,姓名',context :[{item:'工号',newval:'TEST1',oldval:'FOX',},{item:'姓名',newval:'FOX',oldval:'FOX1'}] },
  ]
  const fildes = [
    {  prop: 'contexttype', label:  '日志类别',width:'100' },
    {  prop: 'empno', label:  '操作员',width:'100',sortable:true,showTip:true},
    {  prop: 'create', label:  '操作时间',width:'160',sortable:true,showTip:true},
    {  prop: 'contextkey', label:  '日志项目',width:'',sortable:true,showTip:true }
  ]

  export default {
    data () {
      return {
        items: items,
        fildes :fildes,
        filtervalue:'',
        pageSize:10,
        currentPage:1,
      }
    },
    prop:{
      logtype: {
        type: String
      },
      logkey: {
        type: String
      },
    },
    computed: {
      searchitems:function () {
        if(this.filtervalue){
          return this.items.filter( item => (~item.contexttype.indexOf(this.filtervalue)));
        }else{
          return this.items;
        }
      }
    },
    methods: {
      tableCurrentChange(){
        for(let elem of this.currentselect){
          if (!this.hash[elem.tableno]) {
            this.allselect.push(elem);
            this.hash[elem.tableno] = true;
          }
        }
        this.pageChange = true;
      },
      getLogData(){
        this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
            this.$http.post(methodinfo.updatecateringsta, {

            })
        })
      }
    },
    watch:{
      logkey(val,oldval){
        if(val!==oldval){

        }
      }
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
