<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="scitem">
    <b-container fluid>
      <b-row  style="font-size: 12px">
        <div style="width: 100%">
          <b-input-group prepend="项目类别" id="sel">
            <el-select clearable @change="clear" v-model="selectclasscode">
              <el-option
                v-for="item in localclasscode"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </b-input-group>


          <b-input-group prepend="部门" id="sel2">
            <el-select @change="clear2" v-model="selectbm">
              <el-option
                v-for="item in localbm"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </b-input-group>

          <div class="input-group res">
            <div class="input-group-append" style="height: 33px;">
              <div class="input-group-text" style="border-radius: 0.25rem;background-color: #6FB3E0">
                <i class="fa fa-refresh" @click="refreshdata" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          <b-input-group style="padding-top: 0.5rem;width: 180px;float: right;padding-right: 0.5rem;">
            <b-input-group-text slot="append" style="background-color: #6FB3E0">
              <i class="fa fa-search"></i>
            </b-input-group-text>
            <b-form-input v-model="filterText" placeholder="请输入关键字搜索"></b-form-input>
          </b-input-group>



        </div>
      </b-row>
      <b-row id="rowrow" style="font-size: 1rem">
        <el-table
          ref="multiplacetable"
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
            width="170"
            sortable
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </b-row>
      <b-row  style="font-size: 12px; padding-bottom: 0.5rem;">

        <div style="width: 100%">

            <b-button
              size="sm"
              variant="primary" @click="close()">已选</b-button>
            <b-button
              size="sm"
              variant="warning"  @click="unclose()">未选</b-button>
          <b-button
            style="float: right"
            size="sm"
            @click="addnew()">确定</b-button>
        </div>




      </b-row>
    </b-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst.js'
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
        selectbmdeptno:"",
        localeventdes:"",
        filterText:"",
        selected:{},
        isselected:"",
        currentselect:{},
        change:false,
        first:true,
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

        if(!this.selectclasscode&&!this.selectbmdeptno&&!this.filterText&&!this.isselected){
          return this.localscitem;
        }else{
          return this.localscitem.filter( tableData => {
            var s=false;
            if(this.selectclasscode==tableData.classcode||!this.selectclasscode){
              s = true;
            }
            if(s){
              if(this.selectbmdeptno==tableData.deptno||!this.selectbmdeptno||!tableData.deptno){
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
      ...mapGetters([
        'sceventitemeventid'
      ]),
    },
    watch: {
      filterText(val,oldval){
        if(!this.select){
          this.first = true;
        }
        this.change = true;
        this.selected=Object.assign({},this.currentselect);
      }
    },
    update(){
     console.log("aaaaaaaa");
    },
    components:{
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
        this.first = true;
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
                  let first = true;
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
                      type["value"] = pc.id;
                      type["label"] = pc.descript;
                      type["classcode"] = pc.classcode;
                      this.localbm.push(type);
                      if(first){
                        this.selectbm = pc.id;
                        this.selectbmdeptno = pc.classcode;
                        first = false;
                      }
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
      close:function(){
        this.change = true;

        this.selected=Object.assign({},this.currentselect);
        console.log(this.currentselect);
        this.isselected="T";

      },
      unclose:function(){
        if(!this.select){
          this.first = true;
        }
        this.change = true;

        this.selected=Object.assign({},this.currentselect);
        this.isselected="F";

      },
      clear:function (val) {
        this.isselected="";
        this.selected = {};
        this.first = true;
      },
      clear2:function (val) {
        console.log(val);
        this.isselected="";
        this.selected = {};
        this.first = true;
        for(let option of this.loclbm){
          if(option.value===val){
            this.selectbmdeptno = option.classcode;
            return;
          }
        }
      },
      handleSelectionChange(val) {
        if(this.first){
          this.first = false;
          this.currentselect = {};
          for(let i=0;i<val.length;i++){
            this.currentselect[val[i].id]=true;
          }
        }
        if(this.change){
          this.change = false;
          for(let elm of this.localscitem){
            if(this.selected[elm.id]){
              this.$refs.multiplacetable.toggleRowSelection(elm);
            }
          }
        }
        else{
          console.log(val);
          this.currentselect = {};
          for(let i=0;i<val.length;i++){
            this.currentselect[val[i].id]=true;
          }
        }
      },
      addnew:function () {
        let sel=Object.assign({},this.currentselect);
        let addsel = [];
        for(let elm of this.localscitem){
          if(sel[elm.id]){
            let type = {};
            type["id"] = elm.id;
            type["sta"] = '0';
            type["number"] = elm.number*1.0;
            if(elm.number*1.0<=0){
              this.$message.error({
                message:"数量不能为0或者为负"
              });
              return;
            }
            addsel.push(type);
          }
        }
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.addeventitem, {
            eventid :this.sceventitemeventid,
            id:this.selectbm,
            eventitems:addsel
          }).then((response)=> {
            if(response.data.errorCode==="0"){
              this.$message({
                message: '保存成功!'
              });
              this.refreshdata();
              this.$store.commit('setIsrefresh',"T");
            }
            else{
              this.$message.error({
                message:response.data.errorMessage
              });
            }
          })
        })
      }
      }

  }
</script>
<style lang="scss" type="text/scss">
  #scitem{
    padding-bottom: 0.5rem;
    .container-fluid{
      border: 1px solid #ced4da;
      border-radius: 5px;
      background-color: #F2F2F2;
    }
    #sel{
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
    #sel2{
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
   .btn {
     height: 33px;
     width: 72px;
     margin-left: 5px;
     border-radius: 0.25rem;
     background-color:#6FB3E0;
     color: white;
     border-color: transparent;

    }
    .row{
      margin-right: 0;
      margin-left: 0;
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
      padding-left: 0.5rem;
    }
    .res {
      width: 33px;
      position: relative;
      float: right;
      padding-top:0.5rem ;
    }
    .fa{
      color: white;
    }
    #rowrow{
      padding-bottom: 0.5rem;
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
      .el-checkbox {
        margin-bottom: 0rem;
      }
    }
  }
</style>
