<template>
  <div id="basecode">
    <b-container fluid>
      <b-row>
        <b-col sm="8">
          <b-btn @click="addRow"><i class="fa fa-plus" aria-hidden="true"></i>新增</b-btn>
          <b-btn @click="saveBaseCode"><i class="fa fa-floppy-o" aria-hidden="true"></i>保存</b-btn>
        </b-col>
        <b-col sm="3">
        </b-col>
        <b-col sm="1">
          <b-btn class="refreshBtn" @click="refreshData">
            <i class="fa fa-refresh"></i>
          </b-btn>
        </b-col>
      </b-row>
      <el-table
        ref = "basecodetable"
        :data="items"
        :height="bodyHeight"
        border
        style="width: 100%">
        <el-table-column prop="code" label="编码" width="50" align="center">
          <template slot-scope="scope" >
            <Numberinput @change="rowChange(scope)" v-if="cat==='sc_event_type' | cat==='sc_event_degree'" :disabled="scope.row.add !== 'T'"  class="el-input__inner" type="number" maxlength="1" v-model="scope.row.code" placeholder=""></Numberinput>
            <el-input @change="rowChange(scope)" v-else :disabled="scope.row.add !== 'T'" :maxlength="codelength" v-model="scope.row.code" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="descript" label="中文描述" align="center">
          <template slot-scope="scope">
            <el-input @change="rowChange(scope)" :readonly="!scope.row.editable" maxlength="50" v-model="scope.row.descript" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="descript1" label="英文描述" align="center">
          <template slot-scope="scope">
            <el-input @change="rowChange(scope)" :readonly="!scope.row.editable" maxlength="50" v-model="scope.row.descript1" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="descript2" label="其他描述" align="center">
          <template slot-scope="scope">
            <el-input @change="rowChange(scope)" :readonly="!scope.row.editable" maxlength="50" v-model="scope.row.descript2" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="grp" label="类别" width="60" align="center">
          <template slot-scope="scope">
            <el-input @change="rowChange(scope)" :readonly="!scope.row.editable" maxlength="10" v-model="scope.row.grp" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column v-if="cat==='sc_event_type'" prop="exts1" label="同步" width="75" align="center">
          <template slot-scope="scope">
            <el-select @change="rowChange(scope)" :disabled="!scope.row.editable" v-model="scope.row.exts1" placeholder="">
              <el-option label="同步" value="T"></el-option>
              <el-option label="不同步" value="F"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column v-if="cat==='sc_event_type'" prop="exts2" label="周期" width="65" align="center">
          <template slot-scope="scope">
            <el-select @change="rowChange(scope)" :disabled="!scope.row.editable" v-model="scope.row.exts2" placeholder="">
              <el-option label="无" value="0"></el-option>
              <el-option label="月" value="1"></el-option>
              <el-option label="季" value="2"></el-option>
              <el-option label="半年" value="3"></el-option>
              <el-option label="年" value="4"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column  v-if="cat==='sc_time_unit'"  width="65" prop="exts1" label="开始" align="center">
          <template slot-scope="scope">
            <TimePicker @on-change="rowChange(scope)" :disabled="!scope.row.editable" :steps="[1, 10, 15]" v-model="scope.row.exts1" format="HH:mm" placeholder=""></TimePicker>
          </template>
        </el-table-column>
        <el-table-column  v-if="cat==='sc_time_unit'"  width="65" prop="exts2" label="结束" align="center">
          <template slot-scope="scope">
            <TimePicker @on-change="rowChange(scope)" :disabled="!scope.row.editable" :steps="[1, 10, 15]" v-model="scope.row.exts2" format="HH:mm" placeholder=""></TimePicker>
          </template>
        </el-table-column>
        <el-table-column prop="share" label="共享" width="75" align="center">
          <template slot-scope="scope">
            <el-select @change="rowChange(scope)" :disabled="!scope.row.editable" v-model="scope.row.share" placeholder="">
              <el-option label="共享" value="T"></el-option>
              <el-option label="不共享" value="F"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="seq" label="排序" width="60" align="center">
          <template slot-scope="scope">
            <Numberinput @input.native="rowChange(scope)" :readonly="!scope.row.editable" class="el-input__inner" type="number" maxlength="4" v-model="scope.row.seq" placeholder=""></Numberinput>
          </template>
        </el-table-column>
        <el-table-column prop="halt" label="停用" width="65" align="center">
          <template slot-scope="scope">
            <el-select @change="rowChange(scope)" :disabled="!scope.row.editable" v-model="scope.row.halt" placeholder="">
              <el-option label="启用" value="F"></el-option>
              <el-option label="停用" value="T"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="60" prop="cby" label="修改人" align="center"></el-table-column>
        <el-table-column width="130" prop="changed" label="修改时间" align="center"></el-table-column>
        <el-table-column label="操作" width="50" align="center">
          <template slot-scope="scope">
            <b-button size="mini" class="Cancel-button image-btn" type="danger" @click="deleteBasecode(scope)"></b-button>
          </template>
        </el-table-column>
      </el-table>
    </b-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst'
  import Numberinput from  '../../components/FormatInput.vue'
  import {TimePicker} from 'iview'
  import '../../css/iviewpicker.css'
  Vue.use(TimePicker)

  export default {
    data () {
      return {
        items: [],
        editRows:[],
        codelength:5,
        pageSize:12,
        currentPage:1,
        pageChange:false,
        bodyHeight: document.body.clientHeight-168,
      }
    },
    props:['cat'],
    created(){
      this.refreshData();
    },
    methods: {
      refreshData(){
        this.editRows=[];
        this.items=[];
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.getbasecodelist, {
              cat:this.cat
            }).then((response)=> {
              if (response.data.errorCode === "0") {
                for(let elem of response.data.basecodes){
                  elem.editable = elem.hotelid.indexOf('G') < 0;
                  this.items.push(elem);
                }
              }
            })
        })
      },
      rowChange(scope){
        let row = scope.row
        if(row.add==='T'){
          for(let i=0;i<this.items.length;i++){
            let item = this.items[i];
            if(row.code===item.code&&scope.$index!==i){
              this.$message.error('对应的基础代码已存在!');
              row.code="";
              return;
            }
          }
        }
        if(this.editRows.length===0){
          this.editRows.push(row)
        }else{
          for(let i=0;i<this.editRows.length;i++){
            if(this.editRows[i].code = row.code){
              this.editRows[i] = row;
              return
            }
          }
          this.editRows.push(row)
        }
      },
      deleteBasecode(scope){
        let row = scope.row;
        let index = scope.$index;
        this.$confirm("是否要删除该基础代码？","提示").then(()=>{
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.deletebasecode, {
              cat:this.cat,
              code:row.code
            }).then((response)=>{
              if(response.data.errorCode==='0'){
                this.$message({
                  message: '基础代码删除成功!',
                  type: 'success'
                })
                this.items.splice(index,1);
              }else{
                this.$message.error(response.data.errorMessage)
              }
            })
          })
        }).catch()

      },
      saveBaseCode(){
        for(let elem of this.editRows){
          if(!elem.hasOwnProperty('code')||!elem.code){
            this.$message.error("编码不能为空!")
            return
          }
          if(!elem.hasOwnProperty('descript')||!elem.descript){
            this.$message.error("中文描述不能为空!")
            return
          }
          if(!elem.hasOwnProperty('descript1')||!elem.descript1){
            this.$message.error("英文描述不能为空!")
            return
          }
          if(this.cat==='sc_time_unit'){
            if(elem.exts1>elem.exts2){
              this.$message.error("开始时间不能晚于结束时间!")
              return
            }
          }
        }
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.updatebasecodes, {
            cat:this.cat,
            basecodes:this.editRows
          }).then((response)=>{
            if(response.data.errorCode==='0'){
              this.$message({
                message: '基础代码保存成功!',
                type: 'success'
              })
              this.refreshData();
            }else{
              this.$message.error(response.data.errorMessage)
            }
          })
        })
      },
      addRow(){
        let newRow = {
          add:'T',
          editable:true
        }
        this.items.push(newRow)
        if(this.items.length>this.currentPage*this.pageSize){
          this.currentPage = this.currentPage + 1;
        }
      }
    },
    components: {
      Numberinput,
      TimePicker
    },
    watch:{
      cat(val,oldval){
        if(val!==oldval){
          this.refreshData();
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  #basecode{
    font-size: 0.9rem;
    .container-fluid{
      padding: 0;
      .btn{
        .fa{ margin-right: 3px}
      }
    }
    -webkit-backface-visibility: hidden;
    .el-table{
      thead{
        th,td{
          background: linear-gradient(#fff, #F4F5F6);
        }
      }
      td, th{
        border-color: #dee2e6;
        padding: 0;
      }
      .caret-wrapper{
        width: 20px;
      }
    }
    .cell{
      font-size: 0.9rem;
      line-height: 24px;
      padding: 3px;
    }
    .el-table__row{
      .cell{
        padding: 0;
      }
      input{
        border-radius: 0;
        border:none;
        font-size: 0.9rem;
      }
      .el-input__inner{
        padding: 0 10px;
        height: 33px;
        background: none;
        color: #606266;
      }
      .ivu-input{
        height: 33px;
        padding: 0 0.75rem;
      }
    }
    .refreshBtn{
      float: right;
    }
    .text-center{
      text-align: center;
    }
    .pagination{
      float: right;
      padding: 5px 10px;
    }
    .row{
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
    .ivu-input{
      margin: 0;
    }
    .image-btn{
      margin: 2px 5px;
    }
  }
</style>
