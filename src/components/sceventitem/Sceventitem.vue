<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="sceventitem">
    <b-container fluid>
      <div style="width: 100%">
        <b-input-group prepend="部门" id="sel">
        <el-select clearable  v-model="selectbm">
          <el-option
            v-for="item in localbm"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </b-input-group>


        <div>
          <i class="fa fa-refresh refresh" @click="refreshdata" aria-hidden="true"></i>
        </div>
        <b-form inline class="forma" >
          <b-button
            size="sm"
            variant="primary" @click="close()">复制</b-button>
          <b-button
            size="sm"
            variant="warning" @click="unclose()">转移</b-button>
          <b-button style="float: right"
                    size="sm"
                    @click="close()">部门备注</b-button>
        </b-form>
        <b-input-group style="padding-top: 0.5rem;width: 180px;float: right">
          <b-input-group-text slot="append">
            <i class="fa fa-search"></i>
          </b-input-group-text>
          <b-form-input v-model="filterText" placeholder="请输入关键字搜索"></b-form-input>
        </b-input-group>
      </div>



      <b-row id="rowrow" style="font-size: 1rem;width:101%">
        <el-table
          :data="searchitems"
          border
          stripe
          height="160"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="inumber"
            label="流水号"
            width="80"
            sortable
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="descript"
            width="120"
            label="项目名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            show-overflow-tooltip>
            <template slot-scope="scope">
            <Numberinput class="el-input__inner" type="number" maxlength="5"  v-model="scope.row.number" placeholder=""></Numberinput>
             </template>
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="60"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="总价"
            width="85"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="135"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            width="85">
            <template slot-scope="scope">
              <b-form inline class="paddingleft0 paddingbottom0">
                <b-button
                  size="sm"
                  variant="primary" @click="deletel(scope.row)" style="margin-top:0px">删</b-button>
                <b-button
                  size="sm"
                  variant="primary" @click="deletel(scope.row)" style="margin-top:0px">存</b-button>
              </b-form>
            </template>
          </el-table-column>
        </el-table>
      </b-row>
      <b-modal id="multiplacemodal" ref="multiplacemodal" title="场地列表" size="lg" hide-footer>
        <MultiEvent ref="MultiPlace" ></MultiEvent>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst.js'
  import Numberinput from  '../../components/FormatInput.vue'
  import MultiEvent from  '../../components/sceventitem/MultiEvent.vue'


  export default {

    data () {
      return {
        localsceventitem:[],
        localbm:[],
        selectbm:"",
        filterText:"",
      }
    },
    props:{

    },
    created(){

    },
    computed:{
      ...mapGetters([
        'sceventitemeventid',
        'sceventitemlist'
      ]),
      searchitems:function () {

        if(!this.selectbm&&!this.filterText){
          console.log(this.localsceventitem)
          return this.localsceventitem;
        }else{
          return this.localsceventitem.filter( tableData => {

            var s=false;
            if(this.selectbm==tableData.inumber1||!this.selectbm){
              s = true;
            }
            if(s){
              if(!this.filterText){
                s = true;
              }
              else{
                if(tableData.inumber.indexOf(this.filterText)>=0||tableData.descript.indexOf(this.filterText)>=0
                  ||tableData.number.indexOf(this.filterText)>=0||tableData.unit.indexOf(this.filterText)>=0
                  ||tableData.amount.indexOf(this.filterText)>=0 ||tableData.remark.indexOf(this.filterText)>=0
                ){
                  s = true;
                }
                else{
                  s=false
                }
              }
            }
            if(s){
              return tableData
            }
          });
        }
      },
    },
    watch: {
      sceventitemeventid(val,oldvalue){
        console.log("watcha");
        this.refreshdata();
      },
      sceventitemlist(val,oldvalue){
        console.log("watch");
        let bm = [];
        let item = [];
        for(let elm of val){
          if(elm.type=="3"){
            var type={};
            type["value"] = elm.inumber;
            type["label"] = elm.descript;
            bm.push(type);
          }
          if(elm.type=="1"||elm.type=="2"){
            item.push(elm);
          }
        }
        this.localsceventitem = item;
        this.localbm = bm;
        console.log(this.localbm);
      },

    },
    components:{
      Numberinput,
      MultiEvent
    },
    methods: {
      updateValue(event) {
        if(!event.isComposing){
          return event.data;
        }else{
          event.preventDefault();
        }
      },
      refreshdata(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch("getsceventitem").then(() => {
          }).catch(function (errorMessage) {
          })
        });
      },

      close:function(){
        this.$refs.multiplacemodal.show()
      },
      unclose:function(){
        this.isselected="F";
      },
      updatescnotes(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.updatescnoteinfo, {
            uuid: this.localscnotes.uuid,
            title: this.localscnotes.title,
            content:this.localscnotes.content,
            type:this.localscnotes.type,
            sta:this.localscnotes.sta,
            eoprinted:this.localscnotes.eoprinted
          }).then((response)=> {
              if(response.data.errorCode==="0"){
                this.$message({
                  type: '保存',
                  message: '保存成功!'
                });
               this.getremark()
              }
              else{
                this.$message.error({
                  type: '保存',
                  message:response.data.errorMessage
                });
              }
          })
        })
      },
      newscnotes(){
        if(!this.localscnotes.title){
          this.$message.error({
            type: '保存',
            message:"标题不能为空"
          });
          return;
        }
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.newscnoteinfo, {
            blockid: this.localscnotes.blockid,
            caterid: this.localscnotes.caterid,
            eventid: this.localscnotes.eventid,
            itemid: this.localscnotes.itemid,
            type:this.localscnotes.type,
            title: this.localscnotes.title,
            content:this.localscnotes.content,
            date0:formatDate(new Date(),"yyyy-MM-dd hh:mm:ss"),
            flag:this.localscnotes.flag,
            seq:this.localscnotes.seq
          }).then((response)=> {
              if(response.data.errorCode==="0"){
                this.$message({
                  type: '新建',
                  message: '新建成功!'
                });
                this.getremark()
              }
              else{
                this.$message.error({
                  type: '保存',
                  message:response.data.errorMessage
                });
              }

          })
        })
      },
      savescnotes:function(){
        var url = "";
        if(this.localscnotes.isnew==="F"){
          this.updatescnotes();
        }
        else{
          this.newscnotes();
        }

      },

      handleSelectionChange(val) {
        // this.selected = {};
        for(var i=0;i<val.length;i++){
          this.selected[val[i].id]=true;
        }
      },
      }

  }
</script>
<style lang="scss" type="text/scss">
  #sceventitem{
    #sel{
      margin-left: -15px;
      padding-top: 0.5rem;
      width: 300px;
      float: left;
      .el-input--suffix .el-input__inner {
        padding-right: 30px;
        flex: 1 1 auto;
        height: 34px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .forma{
      float: right;
      padding-top: 0.5rem;
      padding-right: 0.5rem;
    }
    table{
      border-color: #dee2e6;
      th,td{
        padding: 0;
        border-color: #dee2e6;
        text-align: center;
      }
      .cell {
        padding-left: 5px;
        padding-right: 5px;
      }
      .el-input__inner{
        height: 25px;
      }
      .el-table .caret-wrapper{
        width: 20px;
      }
      .el-table__expanded-cell{
        padding: 5px!important;
        box-shadow: 1px 5px 5px #dee2e6;
      }

    }
    .el-table .caret-wrapper{
      width: 20px;
    }
    .el-table__expanded-cell{
      padding: 5px!important;
      box-shadow: 1px 5px 5px #dee2e6;
    }
    .paddingright0 {
      padding-right: 0px;
      padding-left: 0px;
    }
    .forma{
      .btn {
        height: 34px;
        width: 72px;
        margin-left: 5px;
        border-radius: 0.25rem;
      }
    }

    .row{
      margin-right: 0;
    }
    .custom-control {
      min-height: 0.6rem;
    }
    .form-row > .col, .form-row > [class*="col-"] {
      padding-right: 0px;
    }
    .refresh {
      float: right;
      font-size: 14px;
      padding-top: 1.2rem;
      padding-bottom: 0.5rem;
      margin-right: 0.5rem;
    }
    #rowrow{
      .el-input__inner {
        background-color: transparent;
        border: none;
        padding: 0px;
        /*box-shadow:transparent !important;*/
      }
      .el-input__inner:focus{
        background-color: transparent;
        border: none;
        padding: 0px;
        box-shadow:none;
      }
    }
  }
</style>
