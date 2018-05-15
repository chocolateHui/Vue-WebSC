<template>
  <div class="Notesmodal" id="reasonmodal" tabindex="-1" role="dialog" aria-labelledby="reasonmodal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" style="padding:10px!important;">
          <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
          <h4 class="modal-title">取消原因</h4>
        </div>
        <div class="modal-body" style="padding:5px!important;">
          <b-input-group style="padding: 4px">
            <b-input-group-text slot="append">
              <i class="fa fa-search"></i>
            </b-input-group-text>
            <b-form-input @input="updatevalue" placeholder="请输入查询条件"></b-form-input>
          </b-input-group>
          <input type="hidden" id="reason" name="id" value="" v-model="reason">
          <!--<table id="tb_reason"></table>-->
          <el-table
            ref="singleTable"
            :data="searchtable"
            highlight-current-row
            @current-change="handleCurrentChange"
            height="400"
            style="width: 100%">
            <el-table-column
              height="40"
              prop="code"
              label="代码"
              width="100">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              width="190">
            </el-table-column>
            <el-table-column
              prop="descript1"
              label="英文描述">
            </el-table-column>
          </el-table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-ok" @click="reasonconfirm">确认</button>
          <button type="button" class="btn btn-quit" data-dismiss="modal" @click="resonCancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../css/PlaceDistribute.scss';
  import '../../css/allcss.scss';
  import methodinfo from '../../config/MethodConst.js'
  import pinyin from 'pinyin'
    export default {
        name: "reasonmodal",
      data(){
        return{
          tableData:[],
          reason:'',
          currentRow:{},
          searchtext:'',
        }
      },
      props:['remarklist'],
      computed:{
        searchtable:function () {
          if(this.searchtext==='' || !this.searchtext){
            return this.tableData;
          }else{
            var search = this.searchtext.toUpperCase();
            return this.tableData.filter(function (item) {
              if (item.descript.indexOf(search) >= 0) {
                return true;
              } else if (item.descript1.indexOf(search) >= 0) {
                return true;
              }else if (item.code.indexOf(search) >= 0) {
                return true;
              }else {
                let pydes = pinyin(item.descript,{style:pinyin.STYLE_FIRST_LETTER}).toString().replace(new RegExp(/(,)/g),'').toUpperCase();
                let pydes1=pinyin(item.descript1,{style:pinyin.STYLE_FIRST_LETTER}).toString().replace(new RegExp(/(,)/g),'').toUpperCase();
                return pydes.indexOf(search) >= 0||pydes1.indexOf(search) >= 0;
              }
            });
          }
        }
      },
      methods:{
        configDefault:function () {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
        },
        getTableData(){
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            return new Promise((resolve, reject) => {
              this.configDefault()
              this.$http.post(methodinfo.getbasecodelist, {
                cat:"sc_cancel_reason",
                halt:"F"
              }).then((response) => {
                if (response.status === 200) {
                  this.tableData=response.data.basecodes
                }
              })
            })
          })
        },
        handleCurrentChange(val) {
          this.currentRow = val;
        },
        reasonconfirm:function () {
          var current=JSON.stringify(this.currentRow)
          if( current== "{}"){
            this.$message({
              message:"请选择取消理由!",
              type: "warning"
            });
          }else{
            this.reason=this.currentRow.code
            this.$emit('reasonsure',this.reason)
          }
        },
        resonCancel:function () {
          this.$emit('resonCancel')
        },
        updatevalue:function (value) {
          this.searchtext=value;
        },
      },
      mounted:function () {
        this.getTableData()

      }
    }
</script>

<style scoped lang="scss">
  .Notesmodal{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1050;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    .modal-dialog{
      top: 100px;
      margin: auto;
    }
    .modal-title{
      font-size: 1.1rem!important;
    }
    .modal-footer {
      padding-top: 12px;
      padding-bottom: 14px;
      border-top-color: #e4e9ee;
      -webkit-box-shadow: none;
      box-shadow: none;
      background-color: #eff3f8;
    }
  }

</style>
<style lang="scss">
  .Notesmodal{
  .el-table{
    th{
      background:#f4f4f4 !important;
      padding: 6px;
    }
    td{
      padding: 4px;
      font-size: 12px;
    }
  }
  .input-group{
    width: 50%;
    float: right;
  }
  .el-table{
    border: 1px solid #ebeef5;
    border-bottom: none;
  }
  }
</style>
