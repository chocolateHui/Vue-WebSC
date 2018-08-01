<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="sceventitem">
    <b-container fluid>
      <b-row>
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

          <div class="input-group res">
            <div class="input-group-append" style="height: 33px;">
              <div class="input-group-text" style="border-radius: 0.25rem;background-color: #6FB3E0">
                <i class="fa fa-refresh" @click="refresh1" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          <b-form inline class="forma" >
            <b-button
              v-if="!isHistory"
              size="sm"
              @click="close()">复制</b-button>
            <b-button
              v-if="!isHistory"
              size="sm"
               @click="unclose()">转移</b-button>
            <b-button style="float: right"
                      size="sm"
                      @click="remarkshow()">部门备注</b-button>
          </b-form>
          <b-input-group style="padding-top: 0.5rem;width: 180px;float: right">
            <b-input-group-text slot="append" style="background-color: #6FB3E0">
              <i class="fa fa-search"></i>
            </b-input-group-text>
            <b-form-input  v-model="filterText" placeholder="请输入关键字搜索"></b-form-input>
          </b-input-group>
        </div>
      </b-row>




      <b-row id="rowrow" style="font-size: 1rem;width:100%;padding-bottom: 0.5rem">
        <el-table
          :data="searchitems"
          border
          stripe
          :height="th"
          style="width: 100%">
          <el-table-column
            align="center"
            header-align="center"
            prop="inumber"
            label="流水号"
            width="80"
            sortable
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="left"
            header-align="center"
            prop="descript"
            width="120"
            label="项目名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="right"
            header-align="center"
            prop="number"
            label="数量"
            width="100"
            show-overflow-tooltip>
            <template slot-scope="scope">
            <FormatInput style="text-align: right" class="el-input__inner" type="float"  v-model="scope.row.number" placeholder=""></FormatInput>
             </template>
          </el-table-column>
          <el-table-column
            align="left"
            header-align="center"
            prop="unit"
            label="单位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="right"
            header-align="center"
            prop="price"
            label="单价"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="right"
            header-align="center"
            prop="amount"
            label="总价"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="left"
            header-align="center"
            prop="remark"
            label="备注"
            width=""
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
                <b-button size="mini"  v-if="!isHistory" title="取消" class="Cancel-button image-btn" type="danger" @click="deletel(scope.row)"></b-button>
                <b-button size="mini"  v-if="!isHistory" title="保存" class="Save-button image-btn" type="danger" @click="saveitem(scope.row)"></b-button>
                <b-button size="mini" title="日志" class="Journal-button image-btn" type="danger" @click="log2(scope)"></b-button>
            </template>
          </el-table-column>
        </el-table>
      </b-row>
      <b-modal id="multieventmodal" ref="multieventmodal" title="场地列表" size="lg" hide-footer>
        <MultiEvent ref="MultiPlace" @placeConfirm="placeConfirm" ></MultiEvent>
      </b-modal>
      <b-modal id="singleeventmodal" ref="singleeventmodal" title="场地列表" size="lg" hide-footer>
        <SingleEvent ref="SingleEvent" @singleeventConfirm="singleeventConfirm" ></SingleEvent>
      </b-modal>
      <b-modal id="remarkmodal" ref="remarkmodal"  size="lg" title="宴会备注" hide-footer>
        <remark></remark>
      </b-modal>
      <b-modal id="logmodal" size="lg" title="操作日志" ok-only ok-title="退出">
        <Syslog></Syslog>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst.js'
  import MultiEvent from  '../../components/sceventitem/MultiEvent.vue'
  import SingleEvent from  '../../components/sceventitem/SingleEvent.vue'
  import '../../css/imgbtn.scss'

  export default {

    data () {
      return {

        localsceventitem:[],
        localbm:[],
        selectbm:"",
        filterText:"",
        sceventitemlist:[],
        th: (document.body.clientHeight-272)/2
      }
    },

    created(){
      if(this.isHistory){
        this.th = (document.body.clientHeight-168);
      }
      this.refreshdata();
    },
    computed:{
      ...mapGetters([
        'isHistory',
        'sceventitemeventid',
        'catering',
        'eventdes',
        'isrefresh'
      ]),
      searchitems:function () {

        if(!this.selectbm&&!this.filterText){
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
                if((tableData.inumber+"").indexOf(this.filterText)>=0||tableData.descript.indexOf(this.filterText)>=0
                  ||(tableData.number+"").indexOf(this.filterText)>=0||tableData.unit.indexOf(this.filterText)>=0
                  ||(tableData.amount+"").indexOf(this.filterText)>=0 ||tableData.remark.indexOf(this.filterText)>=0
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
        this.selectbm="";
        this.refreshdata();
      },
      sceventitemlist(val,oldvalue){
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
        this.localsceventitem =  item.slice(0);
        this.localbm = bm;
      },
      isrefresh(val,oldvalue){
        if(val==="T"){
          this.selectbm="";
          this.refreshdata();
        }
      }

    },
    components:{
      SingleEvent,
      MultiEvent,
    },
    methods: {
      updateValue(event) {
        if(!event.isComposing){
          return event.data;
        }else{
          event.preventDefault();
        }
      },
      refresh1(){
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        setTimeout(() => {
          loading.close();
        }, 500);
        this.refreshdata();
      },
      refreshdata(){
        let isH="F";
        if(this.isHistory){
          isH="T";
        }
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.geteventitemlist, {
            eventid: this.sceventitemeventid,
            sta:"0",
            isH:isH,
          }).then((response)=> {
            if (response.data.errorCode==='0') {

              if(typeof(response.data.eventitems) != "undefined")
              {
                let type =[];
                for(let elm of response.data.eventitems){
                  let event = {};
                  event =  elm;
                  if(typeof(elm.descript1) == "undefined"){
                    event["descript1"] = "";
                  }
                  type.push(event);
                }
                this.sceventitemlist=type;
              }
              else{
                this.sceventitemlist= [];
              }
              this.$store.commit('setIsrefresh',"F");
            }else{

            }
          })
        })
      },
      close:function(){
        this.$refs.multieventmodal.show()
      },
      unclose:function(){
        this.$refs.singleeventmodal.show()
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

      deleteitem(row){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.deleteeventitem, {
            eventid: this.sceventitemeventid,
            inumber: parseInt(row.inumber),
          }).then((response)=> {
            if(response.data.errorCode==="0"){
              this.$message({
                type: '保存',
                message: '删除成功!'
              });
              this.refreshdata();
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

      saveitem:function(row){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.updateeventitem, {
            eventid: this.sceventitemeventid,
            inumber: parseInt(row.inumber),
            remark:row.remark,
            price:row.price*1.0,
            number:row.number*1.0,
            flag5:"F",
          }).then((response)=> {
            if(response.data.errorCode==="0"){
              this.$message({
                type: '保存',
                message: '更新成功!'
              });
              this.refreshdata();
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

      remarkshow:function () {
        if(!this.selectbm){
          this.$message.error({
            message:"请选择一个部门"
          });
          return;
        }
        let remarkinfo = {
          caterid:this.catering.caterid,
          caterdes:this.catering.name,
          eventid:this.sceventitemeventid,
          eventdes:this.eventdes,
          itemid:parseInt(this.selectbm),
          type:"3"
        };
        this.$store.commit('setNoteParam',remarkinfo);
        this.$refs.remarkmodal.show()
      },

      deletel:function (row) {
        this.$confirm('此操作将永久删除'+row.descript+'该宴会项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteitem(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      placeConfirm(currentRow){

        let inumbers = [];
        if(!this.selectbm){
          for(let elm of this.localbm){
            let type = {};
            type["inumber"] = elm.value;
            inumbers.push(type)
          }
        }
        else{
          let type = {};
          type["inumber"] = this.selectbm;
          inumbers.push(type)
        }
       let copye = [];
       for(let elm of currentRow){
         let type = {};
         type["eventid"] = elm.eventid;
         copye.push(type)
       }
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.copyeventitem, {
            eventid: this.sceventitemeventid,
            copyevents:copye,
            inumbers:inumbers,
          }).then((response)=> {
            if(response.data.errorCode==="0"){
              this.$message({
                type: '保存',
                message: '更新成功!'
              });
              this.refreshdata();
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

      singleeventConfirm(currentRow){
        let inumbers = [];
        if(!this.selectbm){
          for(let elm of this.localbm){
            let type = {};
            type["inumber"] = elm.value;
            inumbers.push(type)
          }
        }
        else{
          let type = {};
          type["inumber"] = this.selectbm;
          inumbers.push(type)
        }
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.sendeventitem, {
            eventid: this.sceventitemeventid,
            transfereventid:currentRow.eventid,
            inumbers:inumbers,
          }).then((response)=> {
            if(response.data.errorCode==="0"){
              this.$message({
                type: '保存',
                message: '更新成功!'
              });
              this.refreshdata();
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
      log2(scope){
        let row  = scope.row;
        let logkey =row.inumber+'|'+row.eventid  +'|'+ this.$store.getters.hotel.hotelid+'|'+this.$store.getters.groupid;
        this.$store.commit('setLogtype','ScEventitem');
        this.$store.commit('setLogKey',logkey);
        this.$root.$emit('bv::show::modal', 'logmodal');
      },
    }

  }
</script>
<style lang="scss" type="text/scss">
  #sceventitem{
    #Syslog {
      .container-fluid {
        border: none!important;
        background-color: white!important;
      }
    }
    #singleplace {
      .container-fluid {
        border: none!important;
        background-color: white!important;
      }
    }
    #multiplace {
      .container-fluid {
        border: none!important;
        background-color: white!important;
      }
    }
    #remark {
      .container-fluid {
        border: none!important;
        background-color: white!important;
      }
    }
    .container-fluid{
      border: 1px solid #ced4da;
      border-radius: 5px;
      background-color: #F2F2F2;
    }
    .fa{
      color: white;
    }
    #sel{
      padding-top: 0.5rem;
      width: 290px;
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
      .btn {
        height: 33px;
        width: 72px;
        margin-left: 5px;
        border-radius: 0.25rem;
        background-color:#6FB3E0;
        color: white;
        border-color: transparent;
      }
    }
    table{
      border-color: #dee2e6;
      th,td{
        padding: 0;
        border-color: #dee2e6;
        /*text-align: center;*/
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
    .res {
      width: 33px;
      position: relative;
      float: right;
      padding-top:0.5rem ;
    }

    #rowrow{

      .el-input__inner {
        background-color: transparent;
        border: none;
        padding: 0px;
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
