<template>
  <div id="choosehotel">
    <b-container fluid>
      <b-row>
        <b-col sm="6"></b-col>
        <b-col sm="5" class="search">
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
        @selection-change="handleCurrentChange"
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
  import methodinfo from '../../config/MethodConst'
  const fildes = [
    {  prop: 'hotelid', label:  '编码',width:'100',sortable:true,"classname":"text-center" },
    {  prop: 'descript', label:  '酒店描述',width:'',sortable:false,showTip:true},
    {  prop: 'descript1', label:  '英文描述',width:'',sortable:false,showTip:true},
    {  prop: 'descript2', label:  '其他描述',width:'',sortable:false,showTip:true}
  ]
  export default {
    data () {
      return {
        items: [],
        fildes :fildes,
        filterValue:'',
        pageSize:10,
        currentPage:1,
        currentRow:[],
        pageChange:false,
        itemcount:0,
        hotellist:'',
        allselect: new Set(),
      }
    },
    props:['hotelData'],
    computed: {
      searchitems:function () {
        let filterValue = this.filterValue;
        if(this.filterValue==='' || !this.filterValue){
          return this.tablePagination(this.items);
        }else{
          return this.tablePagination(this.items.filter(function (item) {
            if (item.hotelid.indexOf(filterValue) >= 0) {
              return true;
            } else if (item.descript.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.descript1.indexOf(filterValue) >= 0) {
              return true;
            }
            else if (item.descript2.indexOf(filterValue) >= 0) {
              return true;
            }
          }));
        }
      }
    },
    created(){
    },
    methods: {
      configDefault:function () {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
      },
      gethotellist:function () {
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          // 获取营业点
          this.$http.post(methodinfo.gethotellist, {
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                _this.items=response.data.hotels
                var test=this.hotellist
                this.items=this.items.filter(function (item) {
                  if (test.indexOf(item.hotelid)==-1) {
                    return true;
                  }
                })
              }
            }
          })
        })
      },
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
        if(this.pageChange&&this.allselect.size>0){
          this.pageChange=false;
          //换页时清空当前选择并重新赋值
          this.currentRow=[];
          for(let elem of this.allselect){
            this.$refs.reasontable.toggleRowSelection(elem);
          }
        }else{
          //取消选择时要把当前所有选择里面的对应值去掉
          if(val.length<this.currentRow.length){
            for(let i =0;i < this.currentRow.length;i++){
              if(val.indexOf(this.currentRow[i])<0){
                this.allselect.delete(this.currentRow[i])
              }
            }
          }
          this.currentRow = val;
        }
      },
      tableCurrentChange(){
        for(let elem of this.currentRow){
          this.allselect.add(elem);
        }
         this.pageChange = true;
      },
      refreshData(){
        this.gethotellist()
        this.currentPage=1
      },
      clearRow(){
        this.currentRow = [];
        this.$refs.reasontable.setCurrentRow();
      },
      reasonConfirm(){
        this.$emit('reasonConfirm',this.currentRow)
        this.$root.$emit('bv::hide::modal','myModalhotel')
      },
      exitModal(){
        this.$root.$emit('bv::hide::modal','myModalhotel')
      },
      hotelDatashow:function () {
        this.hotellist=''
        if(this.hotelData.length>0){
          for(var t=0;t<this.hotelData.length;t++){
            this.hotellist+=this.hotelData[t].hotelid+','
          }
        }
        this.gethotellist()
        this.currentPage=1
      },
    },
    watch:{
      searchitems(val){
        if(this.filterValue==='' || !this.filterValue){
          this.itemcount = this.items.length
        }else{
          this.itemcount = this.total
        }
      },
    }
  }
</script>
<style lang="scss">
  #choosehotel{
    -webkit-backface-visibility: hidden;
    .search{
      width: 100%;
      .col-sm-1{
        padding-left: 0 !important;
      }
    }
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
      .col-sm-3{
        flex: 0 0 15%;
        max-width: 15%;
      }
      .col-sm-6{
        flex: 0 0 70%;
        max-width: 70%;
      }
    }
    .el-table {
      overflow: auto;
    }
    .col-sm-1{
      padding-left: 0 !important;
      padding-right: 0 !important;
      flex: 0 0 6%;
      max-width: 6%;
    }
  }
</style>
