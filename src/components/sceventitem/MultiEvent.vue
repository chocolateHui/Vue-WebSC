<template>
  <div id="multiplace">
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
        ref = "multiplacetable"
        :data="searchitems"
        @selection-change="handleSelectionChange"
        @row-click="tableRowClick"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          <b-btn @click="placeConfirm" variant="primary">确认</b-btn>
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
        pageSize:10,
        currentPage:1,
        pageChange:false,
        isunuse:false,
        placecount:0,
        currentplace:'',
        currentselect:[],
        allselect:[],
        hash:{},
      }
    },
    props:{
      eventbdate: {
        type: Array
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
      },
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
      //页面切换数据处理
      handleSelectionChange(val) {
        if(this.pageChange){
          //换页时清空当前选择并重新赋值
          this.pageChange=false;
          this.currentselect=[];
          for(let elem of this.allselect){
            this.$refs.multiplacetable.toggleRowSelection(elem);
          }
        }else{
          //取消选择时要把当前所有选择里面的对应值去掉
          if(val.length<this.currentselect.length){
            for(let i =0;i < this.currentselect.length;i++){
              if(val.indexOf(this.currentselect[i])<0){
                let allindex = this.allselect.indexOf(this.currentselect[i]);
                if(allindex>0){
                  this.allselect.splice(allindex,1)
                }
              }
            }
          }
          this.currentselect = val;
        }
        this.currentplace = '';
        for(let elem of this.currentselect){
          this.currentplace = this.currentplace + elem.descript + ',';
        }
        this.currentplace = this.currentplace.substr(0,this.currentplace.length-1)
      },
      tableCurrentChange(){
        for(let elem of this.currentselect){
          if (!this.hash[elem.eventid]) {
            this.allselect.push(elem);
            this.hash[elem.eventid] = true;
          }
        }
        this.pageChange = true;
      },
      tableRowClick(row){
        this.$refs.multiplacetable.toggleRowSelection(row);
      },
      clearSelect(){
        this.hash = {};
        this.allselect=[];
        this.$refs.multiplacetable.clearSelection();
      },
      changeTableType(){

        this.refreshData();
      },
      refreshData(){
        this.items=[];
        this.allselect=[];
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch("getcortEventlist");
        })
      },
      placeConfirm(){
        for(let elem of this.currentselect){
          if (!this.hash[elem.eventid]) {
            this.allselect.push(elem);
            this.hash[elem.eventid] = true;
          }
        }
        console.log(this.currentselect);
        console.log(this.allselect);
        console.log(this.hash);
        this.$emit('placeConfirm',this.allselect)
        this.$root.$emit('bv::hide::modal','multieventmodal')
      },
      exitModal(){
        this.$root.$emit('bv::hide::modal','multieventmodal')
      }
    },
    watch:{
      corteventlist(val,oldval){
        this.items = val;
      },
      sceventitemeventid(val,oldval){
        this.refreshData();
      },
      searchitems(val,oldval) {
        if(this.filterValue===''||!this.filterValue){
          this.placecount = this.items.length;
        }
        else{
          this.placecount =  this.total;
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  #multiplace{
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
    .el-table__expanded-cell{
      padding: 5px!important;
      box-shadow: none!important;
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
