<template>
  <div id="reason">
    <b-container fluid>
      <b-row>
        <b-col sm="6"></b-col>
        <b-col sm="5">
          <b-input v-model="filterValue" placeholder="搜索"></b-input>
        </b-col>
        <b-col sm="1">
          <b-btn @click="refreshData">
            <i class="fa fa-refresh"></i>
          </b-btn>
        </b-col>
      </b-row>
      <el-table
        ref = "reasontable"
        :data="searchitems"
        highlight-current-row
        @current-change="handleCurrentChange"
        border
        style="width: 100%">
        <el-table-column
          v-for="item in fildes"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          :class-name="item.classname"
          :show-overflow-tooltip="item.showTip" :key="item.prop">
        </el-table-column>
      </el-table>
      <b-pagination @input="tableCurrentChange" :total-rows="itemcount" :per-page="pageSize" v-model="currentPage" class="my-0" ></b-pagination>
      <b-row class="footer-row">
        <b-col sm="6"></b-col>
        <b-col sm="3">
          <b-btn @click="reasonConfirm" variant="primary">确认</b-btn>
        </b-col>
        <b-col sm="3">
          <b-btn @click="exitModal">退出</b-btn>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst'

  const fildes = [
    {  prop: 'code', label:  '编码',width:'100',sortable:true,"classname":"text-center" },
    {  prop: 'descript', label:  '中文描述',width:'',sortable:true,showTip:true},
    {  prop: 'descript1', label:  '英文描述',width:'',sortable:true,showTip:true}
  ]

  export default {
    data () {
      return {
        items: [],
        fildes :fildes,
        filterValue:'',
        pageSize:13,
        currentPage:1,
        currentRow:{},
        pageChange:false,
        itemcount:0
      }
    },
    computed: {
      ...mapGetters([
        'reasonlist'
      ]),
      searchitems:function () {
        let filterValue = this.filterValue;
        if(this.filterValue==='' || !this.filterValue){
          return this.tablePagination(this.items);
        }else{
          return this.tablePagination(this.items.filter(function (item) {
            if (item.code.indexOf(filterValue) >= 0) {
              return true;
            } else if (item.descript.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.descript1.indexOf(filterValue) >= 0) {
              return true;
            }
          }));
        }
      }
    },
    created(){

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
      handleCurrentChange(val) {
        if(!this.pageChange){
          if(val){
            this.currentRow = val;
          }else{
            this.currentRow = {};
          }
        }else{
          this.pageChange = false;
        }
      },
      tableCurrentChange(){
        this.$refs.reasontable.setCurrentRow(this.currentRow);
        this.pageChange = true;
      },
      refreshData(){
        this.$store.dispatch("getReasonList");
      },
      clearRow(){
        this.currentRow = {};
        this.$refs.reasontable.setCurrentRow();
      },
      reasonConfirm(){
        if(!this.currentRow.code){
          this.$alert("请选择一个取消原因!")
          return
        }
        this.$emit('reasonConfirm',this.currentRow)
        this.$root.$emit('bv::hide::modal','reasonmodal')
        this.$root.$emit('bv::hide::modal','caterReasonmodal')
      },
      exitModal(){
        this.$root.$emit('bv::hide::modal','reasonmodal')
        this.$root.$emit('bv::hide::modal','caterReasonmodal')
      }
    },
    watch:{
      reasonlist(val,oldval){
        if(val){
          this.items = val;
        }
      },
      searchitems(val){
        if(this.filterValue==='' || !this.filterValue){
          this.placecount = this.items.length
        }else{
          this.placecount = this.total
        }
      }
    }
  }
</script>
<style lang="scss">
  #reason{
    -webkit-backface-visibility: hidden;
    .el-table{
      td, th{
        border-color: #dee2e6;
        padding: 0;
      }
      .caret-wrapper{
        width: 20px;
      }
    }
    .text-center{
      text-align: center;
    }
    .pagination{
      float: right;
      padding: 5px 10px;
    }
    .row{
      margin-right: 15px !important;
      margin-bottom: 5px;
    }
    .footer-row{
      width: 100%;
      border-top: 1px solid #e9ecef;
      padding-top: 5px;
      margin-top: 43.5px;
      .btn{
        width: 100px;
      }
    }
  }
</style>
