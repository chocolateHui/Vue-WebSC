<template>
  <div id="roominfo">
    <b-container fluid>
      <el-table
        ref = "roomtable"
        :data="rooms"
        border
        style="width: 100%">
        <el-table-column
          v-for="item in fildes"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.showTip" :key="item.prop">
        </el-table-column>
        <template slot="append">
          <b-row class="sum-row">
            <b-col sm="2">
              <label class="sumlabel">合计:</label>
              <label class="sumlabel">{{roomcount}}</label>
            </b-col>
            <b-col sm="7"></b-col>
          </b-row>
        </template>
      </el-table>
    </b-container>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'

  const fildes = [
    {  prop: 'sta', label:  '状态',width:'72',sortable:true,"classname":"text-center" },
    {  prop: 'roomtypedes', label:  '房类',width:'',sortable:true,showTip:true},
    {  prop: 'number ', label:  '房数',width:'72',sortable:true,"classname":"text-right" },
    {  prop: 'cover', label:  '人数',width:'72',sortable:true ,"classname":"text-right"},
    {  prop: 'sdate ', label:  '抵达日期',width:'110',sortable:true ,"classname":"text-center"},
    {  prop: 'edate', label:  '离开日期',width:'110',sortable:true,"classname":"text-center" },
    {  prop: 'days', label:  '天数',width:'72',sortable:true,"classname":"text-right"},
    {  prop: 'price ', label:  '定价',width:'72',sortable:true,"classname":"text-right"},
    {  prop: 'pkgdes ', label:  '包价',width:'150',sortable:true,showTip:true},
    {  prop: 'remark', label:  '备注',width:'',sortable:true,showTip:true},
    {  prop: 'accnt', label:  '团队帐号',width:'110',sortable:true ,"classname":"text-right"}
  ]

  export default {
    data () {
      return {
        rooms: [],
        fildes :fildes,
      }
    },
    prop:{
      pkid: {
        type: String
      },
    },
    computed: {
      ...mapGetters([
        'caterid',
        'roomlist'
      ]),
      roomcount(){
        if (this.rooms) {
          return this.rooms.length
        } else {
          return 0
        }
      }
    },
    methods: {
    },
    watch:{
      roomlist(val,oldval){
        if(val){
          this.rooms = val;
        }
      }
    }
  }
</script>
<style lang="scss">
  #roominfo{
    .el-table{
      td, th{
        border-color: #dee2e6;
        padding: 0;
      }
      .caret-wrapper{
        width: 20px;
      }
    }
    .container-fluid{
      padding: 0;
    }
    .sum-row{
      border-top: 1px solid #dee2e6;
      margin-top: 6px;
      .sumlabel{
        margin-top: 5px;
        margin-bottom: 0;
        padding: 0 10px;
      }
      #radios2{
        margin-top: 5px;
        margin-bottom: 0;
      }
    }
    .row{
      margin-right: 0;
    }
  }
</style>
