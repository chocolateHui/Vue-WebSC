<template>
  <div id="multiplace">
    <b-container fluid>
      <label>当前选择场地:{{currentplace}}</label>
      <b-row>
        <b-col sm="2">
        </b-col>
        <b-col sm="5"></b-col>
        <b-col sm="4">
          <b-input v-model="filterValue" placeholder="搜索"></b-input>
        </b-col>
        <b-col sm="1">
          <b-btn @click="refreshData('F')">
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
    {  prop: 'tableno', label:  '编码',width:'100',sortable:true,"classname":"text-center" },
    {  prop: 'descript', label:  '场地名称',width:'',sortable:true,showTip:true},
    {  prop: 'descript1', label:  '英文名称',width:'',sortable:true,showTip:true},
    {  prop: 'kind', label:  '类别',width:'100',sortable:true,showTip:true,"classname":"text-center" }
  ]

  export default {
    data () {
      return {
        pospccode:"",
        tablenoaaa:"",
        items: [],
        fildes :fildes,
        filterValue:'',
        pageSize:10,
        currentPage:1,
        pageChange:false,
        isunuse:false,
        usebtndes:'查看空闲场地',
        currentplace:'',
        currentselect:[],
        allselect: new Set(),
        placecount:0
      }
    },
    props:{
      pccode: {
        type: String
      },
    },
    computed: {
      ...mapGetters([
      ]),
      searchitems:function () {
        let filterValue = this.filterValue;

        if(this.filterValue==='' || !this.filterValue){
          return this.tablePagination(this.items);
        }else{
          return this.tablePagination(this.items.filter(function (item) {
            if (item.tableno.indexOf(filterValue) >= 0) {
              return true;
            } else if (item.descript.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.descript1.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.pccodedes.indexOf(filterValue) >= 0) {
              return true;
            }else if (item.kind.indexOf(filterValue) >= 0) {
              return true;
            }
          }));
        }
      }
    },
    beforeMount(){
          this.refreshData("T");
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
        if(this.pageChange&&this.allselect.size>0){
          this.pageChange=false;
          //换页时清空当前选择并重新赋值
          this.currentselect=[];
          for(let elem of this.allselect){
            this.$refs.multiplacetable.toggleRowSelection(elem);
          }
        }else{
          //取消选择时要把当前所有选择里面的对应值去掉
          if(val.length<this.currentselect.length){
            for(let i =0;i < this.currentselect.length;i++){
              if(val.indexOf(this.currentselect[i])<0){
                this.allselect.delete(this.currentselect[i])
              }
            }
          }
          this.currentselect = val;
        }
        this.pageChange=false;
        this.currentplace = '';
        for(let elem of this.currentselect){
          this.currentplace = this.currentplace + elem.descript + ',';
        }
        this.currentplace = this.currentplace.substr(0,this.currentplace.length-1)
      },
      tableCurrentChange(){
        for(let elem of this.currentselect){
          this.allselect.add(elem);
        }
        this.pageChange = true;
      },
      tableRowClick(row){
        this.$refs.multiplacetable.toggleRowSelection(row);
      },
      resetPlace(tableno){
        this.tablenoaaa = tableno;
        let top = tableno.split(",");
        let select = [];
        for(let tp of Object.assign([],top)) {
          for(let index=0;index< this.items.length;index++){
            let item = this.items[index];
            if(item.tableno===tp){
              select.push(item);
            }
          }
        };
        this.$nextTick(()=>{
          for(let elem of select){
            this.$refs.multiplacetable.toggleRowSelection(elem);
          }
        })

      },
      clearSelect(){
        this.allselect=new Set();
        this.$refs.multiplacetable.clearSelection();
      },
      changeTableType(){
        this.refreshData("F");
      },
      refreshData(flag){
        this.filterValue = '';
        this.items=[];
        this.allselect=new Set();
        // let eventbdate =this.eventbdate
        let items = this.items;
        let tbl = this.tablenoaaa;
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
          this.$http.post(methodinfo.getplacelist, {
            pccode: this.pccode
          }).then((response)=> {
            if (response.data.errorCode==='0') {
              for(let option of response.data.places){
                items.push(option);
              }
              if(flag==="F"){
                let top =  tbl.split(",");
                let select = [];
                for(let tp of Object.assign([],top)) {
                  for(let index=0;index< items.length;index++){
                    let item = items[index];
                    if(item.tableno===tp){
                      select.push(item);
                    }
                  }
                };
                this.$nextTick(()=>{
                  for(let elem of select){
                    this.$refs.multiplacetable.toggleRowSelection(elem);
                  }
                })
              }

            }
          })
        })

      },
      placeConfirm(){
        for(let elem of this.currentselect){
          this.allselect.add(elem);
        }
        this.$emit('placeConfirm',this.allselect)
        this.$root.$emit('bv::hide::modal','multiplacemodal')
      },
      exitModal(){
        this.$root.$emit('bv::hide::modal','multiplacemodal')
      }
    },
    watch:{
      pccode(val,oldval){
        this.pospccode = val;

      },
      pospccode(val,oldval){
        this.refreshData("F");
      },
      placelist(val,oldval){
        this.items = val;
      },
      searchitems(val){
        if(this.filterValue==='' || !this.filterValue){
          this.placecount = this.items.length
        }else{
          this.placecount = this.total
        }
      },
      filterValue(val){
        if(this.currentselect.length>0) {
          let select = [];
          for (let elem of this.currentselect) {
            select.push(elem);
          }
          this.$nextTick(()=>{
            for(let elem of select){
              this.$refs.multiplacetable.toggleRowSelection(elem);
            }
          })
        }

      }
    }
  }
</script>
<style lang="scss">
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
      .el-checkbox__input{
        margin-top: 5px
      }
      .form-control{
        height: 33.5px;
      }
      .el-checkbox{
        margin-bottom: 0;
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
