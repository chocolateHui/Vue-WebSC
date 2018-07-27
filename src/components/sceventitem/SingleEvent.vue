<template>
  <div id="singleplace">
    <b-container fluid>
      <label>当前选择宴会:{{currentplace}}</label>
      <b-row>
        <b-col sm="2">
        </b-col>
        <b-col sm="5"></b-col>
        <b-col sm="4">
          <b-input v-model="filterValue" placeholder="搜索"></b-input>
        </b-col>
        <b-col sm="1">
          <b-btn @click="refreshData">
            <i class="fa fa-refresh"></i>
          </b-btn>
        </b-col>
      </b-row>
      <el-table
        ref = "singleplacetable"
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
      <b-pagination @input="tableCurrentChange" :total-rows="placecount" :per-page="pageSize" v-model="currentPage" class="my-0" ></b-pagination>
      <b-row class="footer-row">
        <b-col sm="8"></b-col>
        <b-col sm="2">
          <b-btn @click="sigleeventConfirm" variant="primary">确认</b-btn>
        </b-col>
        <b-col sm="2">
          <b-btn @click="exitModal">退出</b-btn>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst.js'

  const fildes = [
    {  prop: 'eventid', label:  '编码',width:'160',sortable:true,"classname":"text-center" },
    {  prop: 'descript', label:  '场地名称',width:'',sortable:true,showTip:true},
    {  prop: 'descript1', label:  '英文名称',width:'',sortable:true,showTip:true},
    {  prop: 'bdate', label:  '日期',width:'120',sortable:true,showTip:true,"classname":"text-center"},
    {  prop: 'stades', label:  '状态',width:'100',sortable:true,showTip:true,"classname":"text-center" },
    {  prop: 'typedes', label:  '类型',width:'100',sortable:true,showTip:true,"classname":"text-center" }
  ]

  export default {
    data () {
      return {
        items: [],
        fildes :fildes,
        filterValue:'',
        pageSize:13,
        currentRow:{},
        currentplace:'',
        currentPage:1,
        pageChange:false,
        isunuse:false,
        placecount:0
      }
    },
    props:{
      eventbdate: {
        type: String
      }
    },
    computed: {
      ...mapGetters([
        'corteventlist',
        'sceventitemeventid',
      ]),
      searchitems:function () {
        let filterValue = this.filterValue;
        if(this.filterValue==='' || !this.filterValue){
          return this.tablePagination(this.items);
        }else{
          return this.tablePagination(this.items.filter(function (item) {
            if (item.eventid.indexOf(filterValue) >= 0) {
              return true;
            } else if (item.descript.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.descript1.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.stades.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.typedes.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.bdate.indexOf(filterValue) >= 0) {
              return true;
            }
          }));
        }
      }
    },
    created(){
      this.refreshData();
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
            this.currentplace = val.descript;
          }else{
            this.currentRow = {};
            this.currentplace = '';
          }
        }else{
          this.pageChange = false;
        }
      },
      tableCurrentChange(){
        this.$refs.singleplacetable.setCurrentRow(this.currentRow);
        this.pageChange = true;
      },
      resetPlace(eventid){
        for(let index=0;index< this.items.length;index++){
          let item = this.items[index];
          if(item.eventid===eventid){
            this.currentPage = Math.ceil(index/13);
            this.$refs.singleplacetable.setCurrentRow(item);
            break;
          }
        }
      },
      clearSelect(){
        this.$refs.singleplacetable.setCurrentRow();
      },
      changeTableType(){
        this.refreshData();
      },
      refreshData(){
        this.items=[];
        this.currentRow = {};
        this.currentplace = '';
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch("getcortEventlist");
        })

      },
      sigleeventConfirm(){
        if(!this.currentRow){
          this.$alert("请选择一个宴会!")
          return
        }
        this.$emit('singleeventConfirm',this.currentRow)
        this.$root.$emit('bv::hide::modal','singleeventmodal')
      },
      exitModal(){
        this.$root.$emit('bv::hide::modal','singleeventmodal')
      }
    },
    watch:{
      corteventlist(val,oldval){
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
<style lang="scss" type="text/scss">
  #singleplace{
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
      padding: 5px 0px;
    }
    .row{
      margin-right: 0;
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
