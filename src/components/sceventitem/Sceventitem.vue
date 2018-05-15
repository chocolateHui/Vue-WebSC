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
            v-for="item in fildes"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sortable="item.sortable"
            :show-overflow-tooltip="item.showTip" :key="item.prop">
          </el-table-column>

          <el-table-column
            prop="number"
            label="数量"
            width=""
            sortable
            show-overflow-tooltip>
            <template slot-scope="scope">
              <Numberinput class="el-input__inner" type="float"  v-model="scope.row.number" placeholder=""></Numberinput>
              <!--<el-input @change="changeplace(scope)" v-model="scope.row.cover" placeholder=""></el-input>-->
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="70"
            sortable
            show-overflow-tooltip>
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
   const fildes = [
    {  prop: 'code', label:  '项目编号',width:'110',sortable:true,showTip: true},
    {  prop: 'descript', label:  '宴会名称',width:'',sortable:true,showTip: true},
    {  prop: 'helpcode', label:  '帮助码',width:'',sortable:true,showTip: true},
    {  prop: 'unit', label:  '单位',width:'70',sortable:true ,showTip: true},
    {  prop: 'price', label:  '单价',width:'',sortable:true,showTip: true },

  ]

  export default {

    data () {
      return {
        fildes:fildes,
        localscitem:[],
        localclasscode:[],
        localbm:[],
        selectclasscode:"",
        selectbm:"",
        localeventdes:"",
        filterText:"",
        selected:{},
        isselected:"",
      }
    },
    props:{

    },
    created(){
     this.refreshdata();
     this.getclasscode();
    },
    computed:{
      searchitems:function () {

        if(!this.selectclasscode&&!this.selectbm&&!this.filterText&&!this.isselected){
          return this.localscitem;
        }else{
          return this.localscitem.filter( tableData => {
            console.log(this.selected);
            var s=false;
            if(this.selectclasscode==tableData.classcode||!this.selectclasscode){
              s = true;
            }
            if(s){
              if(this.selectbm==tableData.deptno||!this.selectbm||!tableData.deptno){
                s = true;
              }
              else{
                s = false;
              }
            }
            if(s){
              if(!this.filterText){
                s = true;
              }
              else{
                if(tableData.code.indexOf(this.filterText)>=0||tableData.descript.indexOf(this.filterText)>=0
                  ||tableData.helpcode.indexOf(this.filterText)>=0||tableData.helpcode.indexOf(this.unit)>=0
                  ||tableData.helpcode.indexOf(this.price)>=0 ||tableData.helpcode.indexOf(this.remark)>=0
                ){
                  s = true;
                }
                else{
                  s=false
                }
              }
            }
            if(s){
              // console.log(this.isselected);
              // console.log(this.selected);
              if(!this.isselected){
                s = true;
              }
              else{
                if(this.isselected==="T"){
                  if(this.selected[tableData.id]){
                    s = true;
                  }
                  else{
                    s = false;
                  }
                }
                else{
                    if(!this.selected[tableData.id]){
                      s = true;
                    }
                    else{
                      s = false;
                    }
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
        this.isselected="";
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getitemlist, {
            type:"1,2,3",
            halt:"F"
          }).then((response)=> {
            if(response.data.errorCode==="0"){
              if(typeof(response.data.items) != "undefined"){
                  this.localscitem = [];
                  this.localbm = [];
                  for(let pc of response.data.items) {
                    if(pc.type!="3"){
                      var type={};
                      type = pc;
                      if(typeof (pc.helpcode) == "undefined"){
                        type["helpcode"]="";
                      }
                      type["number"]=1;
                      this.localscitem.push(type);
                    }
                    if(pc.type==="3"){
                      var type={};
                      type["value"] = pc.code;
                      type["label"] = pc.descript;
                      this.localbm.push(type);
                    }
                  }
                }
            }
          })
        })
      },
      getclasscode(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getitemclasslist, {

          }).then((response)=> {
            if(response.data.errorCode==="0"){
              if(typeof(response.data.itemclass) != "undefined"){
                for(let pc of response.data.itemclass) {
                  if(pc.type!=3&&pc.type!=4&&pc.type!=5){
                    var type={};
                    type["value"] = pc.classcode;
                    type["label"] = pc.descript;
                    this.localclasscode.push(type);
                  }

                }
              }
            }
          })
        })
      },

      get(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch("getScNotots").then(() => {
          }).catch(function (errorMessage) {
          })
         });
        },
      close:function(){
        this.$store.commit('setSceventitem',{});
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
