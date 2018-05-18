<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="classcodeinfo">
    <b-container>
      <b-row id="rowrow">
        <b-col   class="paddingright0 paddingtop5 maxwidth20">
          <el-table
            ref="aaa"
            :data="classcodedata"
            border
            stripe
            highlight-current-row
            @current-change="handleCurrentChange"
            max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              v-for="item in classcodefildes"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :sortable="item.sortable"
              :show-overflow-tooltip="item.showTip" :key="item.prop">
            </el-table-column>
          </el-table>
        </b-col >
        <b-col   class="maxwidth70 paddingright0 paddingleft5">
          <b-row  style="font-size: 12px">
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="编码" class="mb-0">
                <b-form-input
                  type="text"
                  v-model="pcinfo.classcode"
                  required
                  :disabled="changeshow.classcodedisabled"
                  placeholder="">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="中文描述" class="mb-0">
                <b-form-input
                  type="text"
                  v-model="pcinfo.descript"
                  required
                  :disabled="changeshow.descriptdisabled"
                  placeholder="">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="英文描述" class="mb-0">
                <b-form-input
                  type="text"
                  v-model="pcinfo.descript1"
                  required
                  :disabled="changeshow.descript1disabled"
                  placeholder="">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row  style="font-size: 12px">
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="第三描述" class="mb-0">
                <b-form-input
                  type="text"
                  v-model="pcinfo.descript2"
                  :disabled="changeshow.descript2disabled"
                  required
                  placeholder="">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="项目属性" class="mb-0">
                <el-select v-model="pcinfo.type">
                  <el-option
                    :disabled="changeshow.kinddesdisabled"
                    v-for="item in typearry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </b-form-group>
            </b-col>
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="排序码" class="mb-0">
                <b-form-input
                  type="text"
                  v-model="pcinfo.seq"
                  :disabled="changeshow.tablesdisabled"
                  required
                  placeholder="">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <el-table
            id="itemtable"
            :data="placedata"
            border
            stripe
            :height="tableHeight"
            style="width: 100%;font-size: 12px">
            <el-table-column
            prop="code"
            label="代码"
            width="55"
            sortable
            show-overflow-tooltip>
              <template slot-scope="scope" >
                <div @change="changeplace(scope)" v-if="scope.row.add === 'T'">
                  <el-input  v-model="scope.row.code" placeholder=""></el-input>
                </div>
                <div v-else>
                  <el-input disabled v-model="scope.row.code" placeholder=""></el-input>
                </div>
              </template>
          </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              sortable
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input @change="changeplace(scope)" v-model="scope.row.descript" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="descript1"
              label="英文描述"
              sortable
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input  @change="changeplace(scope)" v-model="scope.row.descript1" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="单价"
              width="55"
              sortable
              show-overflow-tooltip>
              <template slot-scope="scope">
                <Numberinput class="el-input__inner" type="float" @change="changeplace(scope)" v-model="scope.row.price" placeholder=""></Numberinput>
                <!--<el-input @change="changeplace(scope)" v-model="scope.row.cover" placeholder=""></el-input>-->
              </template>
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              width="45"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input  @change="changeplace(scope)" v-model="scope.row.unit" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              width="50"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input  @change="changeplace(scope)" v-model="scope.row.remark" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="deptno"
              label="执行部门"
              sortable
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="scope.row.deptno"  @change=" handlelaySelectionChange(scope)">
                  <el-option
                    v-for="item in tableData3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="flag1"
              label="可改名称"
              sortable
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="scope.row.flag1"  @change=" handlelaySelectionChange(scope)">
                  <el-option
                    v-for="item in confirm"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="flag2"
              label="是否外借"
              sortable
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="scope.row.flag2"  @change=" handlelaySelectionChange(scope)">
                  <el-option
                    v-for="item in confirm"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="55">
              <template slot-scope="scope">
                <b-form inline class="paddingleft0 paddingbottom0">
                  <b-button
                    size="sm"
                    variant="primary" @click="deletel(scope.row)" style="margin-top:0px">删</b-button>
                </b-form>
              </template>
            </el-table-column>
          </el-table>
        </b-col>
        <b-col class="paddingright0 paddingleft5 maxwidth15">
          <div>
            <b-button-group vertical>
              <b-button @click="newp" variant="primary">新建类别</b-button>
              <b-button @click="modifyp" variant="primary">修改类别</b-button>
              <b-button @click="deletep" variant="primary">删除类别</b-button>
              <b-button @click="addplace" variant="primary">新建项目</b-button>
              <b-button @click="savep" variant="primary">保存</b-button>
              <b-button @click="cancel" variant="primary">取消</b-button>
            </b-button-group>
          </div>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import Numberinput from  '../../components/FormatInput.vue'
  import methodinfo from '../../config/MethodConst.js'
  const show = {  classcodedisabled: true, descriptdisabled:  true,descript1disabled:true,descript2disabled:true ,kinddesdisabled:true,tablesdisabled:true}
  const newshow = {  classcodedisabled: false, descriptdisabled:  false,descript1disabled:false,descript2disabled:false ,kinddesdisabled:false,tablesdisabled:false}
  const modifyshow = {  classcodedisabled: true, descriptdisabled:  false,descript1disabled:false,descript2disabled:false ,kinddesdisabled:false,tablesdisabled:false}

  const classcodemoren = {  classcode: "", descript:""  ,descript1:"",descript2:"" ,type:"3",seq:"0"}
  const placemoren = {  code: "", descript:""  ,descript1:"",descript2:"" ,price:0,unit:"",remark:"",deptno:"",flag1:"",flag2:"",classcode:"",halt:"F",type:"",add:"T"}

  const classcodefildes = [
    {  prop: 'classcode', label:  '编号',width:'70',sortable:true },
    {  prop: 'descript', label:  '名称',width:'',sortable:true,showTip:true},
  ]

  const confirm = [
    { value: 'T', label: '是' },
    { value: 'F', label: '否' },
  ]
  const typearry = [
    { value: '1', label: '内部项目' },
    { value: '2', label: '赠送项目' },
    { value: '3', label: '部门' },
    { value: '4', label: '场租' },
  ]

  export default {
    data () {
      return {
        classcodedata:[],
        placedata:[],
        tableData3:[],
        classcodefildes :classcodefildes,
        confirm:confirm,
        showchange:'',
        placesavetype: '',
        pcinfo: classcodemoren,
        typearry:typearry,
        changedplaceinfo:{},
        oldcurrentRow:null,
        classcodesavetype:"",
        // 获取row的key值
        getRowKeys(row) {
          return row.empno;
        },
        currentRow: null,
        placeRow: null,
        // 要展开的行，数值的元素是row的key值
        tableHeight: document.body.clientHeight-205,//减去header的60px
        num:0,
      }
    },
    mounted() {
       this.getclasscodedata();
       this.getbm();
    },
    computed: {
      changeshow:function () {
        if(!this.showchange){
          return show;
        }else{
          return this.showchange
        }
      },
    },
    methods: {
      getclasscodedata(rows){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getitemclasslist, {
            kind: "3"
          }).then((response)=> {

            if (response.data.errorCode=="0") {

              // this.pccodedata = [];
              if(typeof(response.data.itemclass) != "undefined"){

                this.classcodedata = response.data.itemclass;

                if(typeof(rows) == "undefined"||rows==null){
                  this.$nextTick(function(){
                    this.$refs.aaa.setCurrentRow( this.classcodedata[0]);
                    this.oldcurrentRow = null;
                    this.showchange = '';
                  })
                }
                else{
                  // console.log(rows);
                  for(let pc of response.data.itemclass){
                    if(pc.classcode == rows.classcode){
                      this.$nextTick(function(){
                        this.$refs.aaa.setCurrentRow( pc);
                        this.oldcurrentRow = null;

                      })
                    }
                  }

                }

              }
            }
          })
        })
      },
      getbm(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getitemlist, {
            type: "3",
          }).then((response)=> {

            if (response.data.errorCode==="0") {
              this.tableData3 = [];
              if(typeof(response.data.items) != "undefined"){
                for(let items of response.data.items){
                  var types = {};
                  types["value"]=items.code;
                  types["label"]=items.descript;
                  this.tableData3.push(types);
                }
              }
            }
          })
        })
      },
      getplacedata(classcode){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getitemlist, {
            classcode: classcode
          }).then((response)=> {
            if (response.data.errorCode=="0") {
              this.placedata = [];
              if(typeof(response.data.items) != "undefined"){
                for(let items of response.data.items){
                  var types = {};
                  types = items;
                  this.placedata .push(types);
                }

              }
            }
          })
        })
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      setCurrent(row) {
        this.$refs.aaa.setCurrentRow(row);
      },
      deleteclasscode(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.deletescitemclass, {
            classcode:this.pcinfo.classcode
          }).then((response)=> {
            if (response.data.errorCode=="0") {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getclasscodedata();
            }
            else{
              this.$message.error({
                type: '删除',
                message:response.data.errorMessage
              });
            }
          })
        })
      },
      deleteplace(row){
        console.log(row.id);
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.deletescitem, {
            id:row.id
          }).then((response)=> {
            if (response.data.errorCode=="0") {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getplacedata(this.currentRow.classcode);
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
      saveclasscode(url,item){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(url, {
            classcode:item.classcode,
            descript:item.descript,
            descript1:item.descript1,
            descript2:item.descript2,
            type:item.type,
            seq:item.seq
          }).then((response)=> {

              if(response.data.errorCode=="0"){
                this.$message({
                  type: '保存',
                  message: '保存成功!'
                });
                this.getclasscodedata(this.pcinfo);
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
      saveplace(item){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.savescitemlist, {
            scitems:item
          }).then((response)=> {

              if(response.data.errorCode=="0"){
                this.$message({
                  type: '保存',
                  message: '保存成功!'
                });
                this.getplacedata(classcode);
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
      changeplace(scope) {
        if(scope.row.add!="T"){
          this.changedplaceinfo[scope.row.code] = scope.row;
          this.placesavetype="update";
        }
        else{
          if(scope.row.code){

            for(var i=0;i<this.placedata.length;i++){
              var types = this.placedata[i];
              if(scope.row.code==types.code&&scope.$index!=i){
                this.$message.error('桌号不能重复');
                scope.row.code="";
              }
            }
          }

        }
      },
      deletep:function () {
        this.$confirm('此操作将永久删除'+this.currentRow.descript+'该营业点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteclasscode();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      deletel:function (row) {
        this.$confirm('此操作将永久删除'+row.descript+'该场地, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this. deleteplace(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      newp:function () {
        this.showchange = Object.assign({},newshow);
        this.pcinfo = Object.assign({},classcodemoren);
        this.oldcurrentRow = Object.assign({},this.currentRow);
        this.placedata = [];
        this.classcodesavetype ="new";
      },
      modifyp:function () {
        this.showchange =  Object.assign({},modifyshow);
        this.oldcurrentRow = Object.assign({},this.currentRow);
        this.classcodesavetype ="update";
      },
      cancel:function () {
        this.showchange = Object.assign({},show);
        this.getclasscodedata(this.oldcurrentRow);
      },
      addplace:function () {
        var newplace =  Object.assign({},placemoren);
        this.placedata.push(newplace);
        this.placesavetype = "update";
      },
      savep:function () {
        console.log(this.placesavetype);
        if(this.classcodesavetype){
          var url = "";
          if(!this.pcinfo.classcode){
            this.$message.error('项目类别不能为空');
            return
          }
          if(!this.pcinfo.descript){
            this.$message.error('项目类别描述不能为空');
            return
          }
          if(!this.pcinfo.descript1){
            this.pcinfo.descript1 = this.pcinfo.descript;
          }
          if(this.classcodesavetype =="new"){
            url = methodinfo.savescitemclass;
          }
          if(this.classcodesavetype =="update"){
            url = methodinfo.updatescitemclass;
          }
          this.saveclasscode(url,this.pcinfo);
        }
        if(this.placesavetype){
          var url =methodinfo.savescitemlist;
          var copydata = Object.assign([],this.changedplaceinfo)
          for(let pl of this.placedata){
            var data = pl;
            if(data.add=="T"){
              copydata.push(data);
            }
          }
          console.log(copydata);
          var finnaldata = [];
          for(var cd in copydata){
            console.log(cd);
            if(!copydata[cd].code){
              this.$message.error('项目不能为空');
              return
            }
            if(!copydata[cd].descript){
              this.$message.error('项目描述不能为空');
              return
            }
            finnaldata.push(copydata[cd]);
          }
          this.saveplace(finnaldata);
        }
      },
      handlelaySelectionChange(val) {
        console.log(val);
        if(val.row.add!="T"){
          this.changedplaceinfo[val.row.code] = val.row;
          this.placesavetype="update";
        }
      },
    },
    components: {
      Numberinput
    },
    watch: {
      currentRow(newVal, oldVal) {

        this.pcinfo =Object.assign({},newVal);
        if(typeof(newVal) != "undefined"&&newVal!=null){
          this.getplacedata(newVal.classcode);
          this.showchange = '';

        }
      },
      classcodedata(newVal, oldVal){

      },

    }
  }
</script>
<style lang="scss" type="text/scss">
  #classcodeinfo{
    .el-date-editor .el-range-separator{
      padding: 0;
    }
    .btn{
      width: 90px;
      margin-top:5px ;
      border-radius: 0.25rem;
    }
    .container {
      padding-right: 0px;
      padding-left: 0px;
    }
    .paddingright0{
      padding-right: 0px;
    }
    .maxwidth20{
      flex: 0 0 18%;
      max-width: 18%;
    }
    .maxwidth70{
      flex: 0 0 72%;
      max-width: 72%;
    }
    .maxwidth15{
      flex: 0 0 10%;
      max-width: 10%;
    }
    .paddingleft5{
      padding-left: 5px;
    }
    .paddingtop5{
      padding-top: 5px;
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
      }
      .el-input__inner{
        height: 36px;
      }
      .el-table .caret-wrapper{
        width: 20px;
      }
      .el-table__expanded-cell{
        padding: 5px!important;
        box-shadow: 1px 5px 5px #dee2e6;
      }
    .row{
      margin-right: 2px;
    }
    .form-row > .col, .form-row > [class*="col-"] {
       padding-right: 0px;
    }
    .modal-body {
      padding: 0.5rem;
    }
    .el-input__prefix {
      padding-bottom: 0.5rem;
    }
    #itemtable{
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
      table {
        font-size: 12px!important;
      }
    }



  }
</style>
