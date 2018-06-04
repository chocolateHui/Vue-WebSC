<template>
  <div id="syslog">
    <b-container fluid>
      <b-row>
        <b-col sm="7"></b-col>
        <b-col sm="4">
          <b-input v-model="filterValue" placeholder="搜索"></b-input>
        </b-col>
        <b-col sm="1">
          <b-btn @click="getLogData">
            <i class="fa fa-refresh"></i>
          </b-btn>
        </b-col>
      </b-row>
      <el-table
        ref = "logtable"
        :data="searchitems"
        border
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <b-card>
              <ul v-if="props.row.contextkey!=='新建'||props.row.contextkey!=='删除'">
                <li v-for="item in props.row.logdata" :key="item.field">
                  <span>{{ item.field }}:</span>
                  <span>&#8194;{{item.oldvalue}}&#8194;</span>
                  <i class="fa fa-arrow-right"></i>
                  <span>&#8194;{{item.newvalue}}</span>
                </li>
              </ul>
              <ul v-else>
                <li>{{ props.row.context }}</li>
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
      <b-pagination @input="tableCurrentChange" :total-rows="totalrows" :per-page="pageSize" v-model="currentPage" class="my-0" ></b-pagination>
    </b-container>
  </div>
</template>
<script>
  import methodinfo from '../config/MethodConst.js'
  import { mapGetters, mapMutations } from 'vuex'

  const items = []
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
        filterValue:'',
        pageSize:13,
        currentPage:1,
        totalrows:0
      }
    },
    computed: {
      searchitems:function () {
        let filterValue = this.filterValue;
        if(this.filterValue==='' || !this.filterValue){
          return this.tablePagination(this.items);
        }else{
          return this.tablePagination(this.items.filter(function (item) {
            if (item.empno.indexOf(filterValue) >= 0) {
              return true;
            } else if (item.contextkey.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.context.indexOf(filterValue) >= 0) {
              return true;
            }
          }));
        }
      },
      ...mapGetters([
        'logtype',
        'logkey'
      ]),
    },
    methods: {
      tablePagination(data=[]){
        /**
         * 表格数据分页的方法
         */
        let array = [], startNum=0, endNum = 0;
        this.total = data.length;
        startNum = (this.currentPage-1)*this.pageSize;
        if(this.currentPage*this.pageSize<this.total){
          endNum = this.currentPage*this.pageSize;
        } else {
          endNum = this.total;
        }
        array = data.slice(startNum, endNum);
        return array;
      },
      tableCurrentChange(){
        this.getLogData();
      },
      getLogData(){
        this.items =[];
        this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
            this.$http.post(methodinfo.getSCEntityLog, {
              key:this.logkey,
              type:this.logtype
            }).then((response)=>{
              if(response.data.errorCode==='0'){
                for(let elem of response.data.logs){
                  if(elem.contextkey==='新建'||elem.contextkey==='删除'){

                  }else{
                    let logdata =[];
                    let logarray = JSON.parse(elem.context);
                    for(let logcontext of logarray){
                      logdata.push(JSON.parse(logcontext))
                    }
                    elem['logdata'] = logdata;
                  }
                  this.items.push(elem)
                }
                this.totalrows = this.items.length
              }
            })
        })
      }
    },
    watch:{
      logkey(val,oldval){
        if(val!==oldval){
          this.currentPage = 1;
          this.getLogData();
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
      .card{
        margin-bottom: 0;
      }
      .card-body{
        padding: 1rem;
      }
    }
    .row{
      margin-right: 0;
      margin-left: 0;
      margin-bottom: 5px;
    }
    ul{
      margin-bottom:0
    }
    .pagination{
       float: right;
      margin-top: 5px !important;
    }
  }
</style>
