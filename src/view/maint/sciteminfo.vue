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
            :max-height="tableHeight"
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
          <div class="btng green">
            <b-button class="side-btn" :disabled="btnshow.new" @click="newp" variant="primary">新建类别</b-button>
            <b-button class="side-btn" :disabled="btnshow.delete" @click="deletep" variant="primary">删除类别</b-button>
          </div>
        </b-col >
        <b-col   class="maxwidth70 paddingright0 paddingleft5">
          <b-row  style="font-size: 12px">
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="编码" class="mb-0">
                <FormatInput
                  type="number" maxlength="4"
                  v-model="pcinfo.classcode"
                  required
                  :disabled="changeshow.classcodedisabled"
                  placeholder="">
                </FormatInput>
              </b-form-group>
            </b-col>
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="中文描述" class="mb-0">
                <b-form-input
                  type="text"
                  maxlength="32"
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
                  maxlength="50"
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
                <b-form-group horizontal label="报表数据" class="mb-0">
                  <!--<b-form-input-->
                  <!--type="text"-->
                  <!--v-model="pcinfo.tocode"-->
                  <!--:disabled="changeshow.descript2disabled"-->
                  <!--required-->
                  <!--placeholder="">-->
                  <!--</b-form-input>-->
                  <el-select clearable v-model="pcinfo.tocode" :disabled="changeshow.descript2disabled">
                    <el-option

                      v-for="item in namedef"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                </b-form-group>
            </b-col>
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="项目属性" class="mb-0">
                <el-select v-model="pcinfo.type" :disabled="changeshow.kinddesdisabled">
                  <el-option
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
          <div class="btng green">
            <b-button :disabled="btnshow.modify"  @click="modifyp" variant="primary">修改类别</b-button>
            <b-button :disabled="btnshow.savep" @click="savep" variant="primary">保存</b-button>
            <b-button :disabled="btnshow.cancelp" @click="cancel" variant="primary">取消</b-button>
          </div>
          <el-table
            ref="bbbb"
            id="itemtable"
            :data="placedata"
            border
            stripe
            :height="tableH"
            style="width: 100%;font-size: 12px">
            <el-table-column
              prop="code"
              label="代码"
              width="60"
              sortable
              :show-overflow-tooltip="true">
              <template slot-scope="scope" >
                <div  v-if="scope.row.add === 'T'">
                  <FormatInput @focus="changesta()" type="number" maxlength="6" @change="changeplace(scope)" v-model="scope.row.code" placeholder=""></FormatInput>
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
                <el-input @focus="changesta()" @change="changeplace(scope)" v-model="scope.row.descript" maxlength="32" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="descript1"
              label="英文描述"
              sortable
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input @focus="changesta()" @change="changeplace(scope)" v-model="scope.row.descript1" maxlength="32" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="单价"
              width="55"
              sortable
              show-overflow-tooltip>
              <template slot-scope="scope">
                <FormatInput class="el-input__inner" type="float" @focus="changesta()" @change="changeplace(scope)" v-model="scope.row.price" placeholder=""></FormatInput>
                <!--<el-input @change="changeplace(scope)" v-model="scope.row.cover" placeholder=""></el-input>-->
              </template>
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              width="45"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input  @focus="changesta()" @change="changeplace(scope)" v-model="scope.row.unit" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              width="50"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input  @focus="changesta()" @change="changeplace(scope)" v-model="scope.row.remark" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="deptno"
              label="执行部门"
              sortable
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div  v-if="pcinfo.type === '3'">
                 <el-select v-model="scope.row.deptno"  @change=" handlelaySelectionChange(scope)">
                  <el-option
                    v-for="item in deptarry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                <div v-else>
                  <el-select v-model="scope.row.deptno"  @change=" handlelaySelectionChange(scope)">
                    <el-option
                      v-for="item in tableData3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
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
              width="70">
              <template slot-scope="scope">
                <b-form inline >
                  <b-button size="mini" title="删除" class="Delete-button image-btn" type="danger" @click="deletel(scope.row)"></b-button>
                  <b-button size="mini" title="日志" class="Journal-button image-btn" type="danger" @click="log(scope)"></b-button>
                </b-form>
              </template>
            </el-table-column>
          </el-table>
          <div class="btng green btng-l">
            <b-button :disabled="btnshow.place" @click="addplace" variant="primary">新建项目</b-button>
            <b-button :disabled="btnshow.save" @click="savep" variant="primary">保存</b-button>
            <b-button :disabled="btnshow.cancel" @click="cancel" variant="primary">取消</b-button>
          </div>
          <div class="btng btng-r">
            <b-button  @click="log2" variant="primary">日志</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
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

  const btnshow = {  new: false, modify:  false,delete:false,place:false ,save:true,cancel:true,savep:true,cancelp:true}
  const btnnewshow ={  new: true, modify:  true,delete:true,place: true,save:true,cancel:true,savep:false,cancelp:false}
  const btnmodifyshow ={  new: true, modify:  true,delete:true,place:true ,save:false,cancel:false,savep:true,cancelp:true}

  const confirm = [
    { value: 'T', label: '是' },
    { value: 'F', label: '否' },
  ]
  const typearry = [
    { value: '1', label: '内部项目' },
    { value: '2', label: '赠送项目' },
    { value: '3', label: '部门' },
    { value: '4', label: '场租' },
    { value: '5', label: '餐饮' },
  ]
  const deptarry = [
    { value: 'GM', label: '总经理办公室' },
    { value: 'HR', label: '人力资源部' },
    { value: 'AC', label: '财务部' },
    { value: 'FB', label: '餐饮部' },
    { value: 'HSKP', label: '客房部' },
    { value: 'FG', label: '工程部' },
    { value: 'ENT', label: '康乐部' },
    { value: 'FO', label: '前厅部' },
    { value: 'SM', label: '销售部' },
  ]

  export default {
    data () {
      return {
        namedef:[],
        classcodedata:[],
        placedata:[],
        tableData3:[],
        deptarry:deptarry,
        classcodefildes :classcodefildes,
        confirm:confirm,
        showchange:'',
        placesavetype: '',
        btnshow :btnshow,
        pcinfo: classcodemoren,
        typearry:typearry,
        changedplaceinfo:{},
        oldcurrentRow:null,
        classcodesavetype:"",

        currentRow: null,
        placeRow: null,
        tableH: document.body.clientHeight-295,//减去header的278px
        tableHeight: document.body.clientHeight-176,
        num:0,
        change:""
      }
    },
    mounted() {
      this.getclasscodedata();
      this.getbm();
      this.getnamedef();
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
      getnamedef(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getnamedeflist, {
          }).then((response)=> {

            if (response.data.errorCode==="0") {
              this.tableData3 = [];
              if(typeof(response.data.namedefs) != "undefined"){
                for(let items of response.data.namedefs){
                  var types = {};
                  types["value"]=items.code;
                  types["label"]=items.descript;
                  this.namedef.push(types);
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
        if(this.placesavetype==="update"){
          this.$confirm("修改了信息未保存，确认切换项目类别吗", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.currentRow = val;
            this.change="T";
            this.btnshow = btnshow;
            this.placesavetype=""
          }).catch(()=>{
            this.placesavetype = "next";
            this.$nextTick(function(){
              this.$refs.aaa.setCurrentRow(oldval);
            })

          })

        }
        else{
          this.currentRow = val;
          this.change="T";
          this.btnshow = btnshow;
          if( this.placesavetype ==="next"){
            this.placesavetype ="update"
          }
        }
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
            seq:item.seq,
            tocode:item.tocode
          }).then((response)=> {

            if(response.data.errorCode=="0"){
              this.$message({
                type: '保存',
                message: '保存成功!'
              });
              this.getclasscodedata(this.pcinfo);
              this.btnshow = btnshow;
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
              this.getplacedata(this.currentRow.classcode);
              this.changedplaceinfo = {};
              this.change="T";
              this.placesavetype="";
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
      changesta(){
        this.change="";
      },
      changeplace(scope) {
        if(scope.row.add!="T"){

          if(this.change==="T"){
          }
          else{
            this.changedplaceinfo[scope.row.code] = scope.row;
            this.placesavetype="update";
            this.oldcurrentRow = Object.assign({},this.currentRow);
          }
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
        this.btnshow = btnnewshow;
      },
      modifyp:function () {
        this.showchange =  Object.assign({},modifyshow);
        this.oldcurrentRow = Object.assign({},this.currentRow);
        this.classcodesavetype ="update";
        this.btnshow = btnnewshow;
      },
      cancel:function () {
        this.changedplaceinfo = {};
        this.showchange = Object.assign({},show);
        this.getclasscodedata(this.oldcurrentRow);
        this.btnshow = btnshow;
        this.placesavetype="";
      },
      addplace:function () {
        let newplace =  Object.assign({},placemoren);
        newplace["classcode"] = this.currentRow.classcode;
        this.placedata.push(newplace);
        this.placesavetype = "update";
        this.$nextTick(function(){
          this.$refs.bbbb.bodyWrapper.scrollTop = this.$refs.bbbb.bodyWrapper.scrollHeight;
        })
      },
      savep:function () {

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

          var finnaldata = [];
          for(var cd in copydata){

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

        if(val.row.add!="T"){
          this.changedplaceinfo[val.row.code] = val.row;
          this.placesavetype="update";
        }
      },
      log(scope){
        let row = scope.row;
        let logkey = row.id+'|'+ this.$store.getters.hotel.hotelid +'|'+this.$store.getters.groupid;
        this.$store.commit('setLogtype','ScItem');
        this.$store.commit('setLogKey',logkey);
        this.$root.$emit('bv::show::modal', 'maintLogModal');
      },
      log2(){

        let logkey =this.pcinfo.classcode +'|'+ this.$store.getters.hotel.hotelid +'|'+this.$store.getters.groupid;
        this.$store.commit('setLogtype','ScItemclass');
        this.$store.commit('setLogKey',logkey);
        this.$root.$emit('bv::show::modal', 'maintLogModal');
      },
    },
    components: {
    },
    watch: {
      currentRow(newVal, oldVal) {
        this.pcinfo =Object.assign({},newVal);
        if(typeof(newVal) != "undefined"&&newVal!=null){
          this.getplacedata(newVal.classcode);
          this.showchange = '';
        }
      },
      placesavetype(newVal, oldVal){
        if(newVal==="update"){
          this.btnshow = btnmodifyshow;
        }
        else{
          this.btnshow = btnshow;
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
    #btng{
      .btn{
        margin-top:5px ;
        border-radius: 0.25rem;
      }
    }
    .container {
      padding-right: 0px;
      padding-left: 0px;
    }
    .paddingright0{
      padding-right: 0px;
    }
    .maxwidth20{
      -ms-flex: 0 0 19.5%;
      flex: 0 0 19.5%;
      max-width: 19.5%;
    }
    .maxwidth70{
      -ms-flex: 0 0 80%;
      flex: 0 0 80%;
      max-width: 80%;
    }
    .maxwidth15{
      -ms-flex: 0 0 10%;
      flex: 0 0 10%;
      max-width: 10%;
    }
    .paddingleft5{
      padding-left: 5px;
      .row{
        .form-control{
          height: 30.5px;
        }
      }
      .el-table{
        .el-table__body-wrapper{
          td{
            height: 30px;
            .cell{
              .el-input{
                .el-input__inner{
                  height: 30px;
                }
              }
              .el-select{
                height: 25px;
                .el-input{

                  input{ height: 25px!important;}
                }
              }
            }
            /*display: inline-block;*/
          }
        }
      }
    }
    .paddingtop5{
      padding-top: 5px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    table{
      border-color: #dee2e6;
      thead{
        th,td{
          background: linear-gradient(#fff, #F4F5F6);
        }
      }
      th,td{
        padding: 0;
        border-color: #dee2e6;
        text-align: center;
      }
      .cell {
        padding-left: 5px;
        padding-right: 5px;
        cursor: pointer;
        .form-inline{
          .btn:not(:last-child){ margin-right: 3px; }
        }
      }
    }
    .el-input__inner{
      height: 31px!important;
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
        .col-sm-4:first-child,.col-sm-4:nth-child(2){
          .col-sm-9{
            padding-left: 10px!important;
            padding-right: 0px;
          }
        }
      .btng{
        margin: 8px 0 7px;
        .btn:not(:last-child){margin-right: 5px;}
      }
      .green{
        .btn:not(:first-child) {
          background-color: #89C5BF;
          border-color: #89C5BF;
        }
      }
      .btng-r{float: right;}
      .btng-l{float: left;}
    }
    .btn.disabled, .btn:disabled{
      background-color: #c8c9ca!important;
      border-color: #c8c9ca!important;
    }
    .side-btn{
      padding: 0.375rem 0.8rem;
    }

    .form-row > .col, .form-row > [class*="col-"] {
      padding-left: 0px;
      text-align: right;
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
