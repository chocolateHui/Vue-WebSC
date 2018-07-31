<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template title="营业点维护">
  <div id="pccodeinfo">
    <b-container>
      <b-row id="rowrow">
        <b-col   class="paddingright0 paddingtop5 maxwidth20">
          <el-table
            ref="aaa"
            :data="pccodedata"
            border
            stripe
            highlight-current-row
            @current-change="handleCurrentChange"
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              v-for="item in pccodefildes"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :sortable="item.sortable"
              :show-overflow-tooltip="item.showTip" :key="item.prop">
            </el-table-column>
          </el-table>
          <div class="btng green">
            <b-button class="side-btn" :disabled="btnshow.new" @click="newp" variant="primary">新建营业点</b-button>
            <b-button class="side-btn" :disabled="btnshow.delete" @click="deletep" variant="primary">删除营业点</b-button>
          </div>
        </b-col >
        <b-col   class="maxwidth70 paddingright0 paddingleft15">
          <b-row  style="font-size: 12px">
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="编码" class="mb-0 bold">
                <FormatInput   type="number" maxlength="3"
                  v-model="pcinfo.pccode"
                  required
                  :disabled="changeshow.pccodedisabled"
                  placeholder="">
                </FormatInput>
              </b-form-group>
            </b-col>
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="中文描述" class="mb-0 bold">
                <b-form-input
                  maxlength="32"
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
                  maxlength="32"
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
                  maxlength="32"
                  type="text"
                  v-model="pcinfo.descript2"
                  :disabled="changeshow.descript2disabled"
                  required
                  placeholder="">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="所属类型" class="mb-0 bold">
                <b-form-input
                  type="text"
                  v-model="pcinfo.kinddes"
                  :disabled="changeshow.kinddesdisabled"
                  required
                  placeholder="">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4" class="my-1 paddingright0">
              <b-form-group horizontal label="场地数" class="mb-0">
                <b-form-input
                  type="text"
                  v-model="pcinfo.tables"
                  :disabled="changeshow.tablesdisabled"
                  required
                  placeholder="">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="btng green">
            <b-button :disabled="btnshow.modify" @click="modifyp" variant="primary">修改营业点</b-button>
            <b-button :disabled="btnshow.savep" @click="savep" variant="primary">保存</b-button>
            <b-button :disabled="btnshow.cancelp" @click="cancel" variant="primary">取消</b-button>
          </div>
          <el-table
            ref="bbbb"
            :data="placedata"
            border
            stripe
            :height="tableH"
            @cell-click="tableDbEdit"
            style="width: 100%;font-size: 12px">
            <el-table-column
              prop="tableno"
              label="场地代码"
              width="80"
              sortable
              show-overflow-tooltip>
              <template slot-scope="scope" >
                <div  v-if="scope.row.add === 'T'">
                  <FormatInput  @focus="changesta()" class="el-input__inner" type="number" maxlength="6" @change="changeplace(scope)" v-model="scope.row.tableno" placeholder=""></FormatInput>
                </div>
                <div v-else>
                  <el-input disabled v-model="scope.row.tableno" placeholder=""></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input @focus="changesta()" @change="changeplace(scope)" v-model="scope.row.descript" maxlength="32" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="descript1"
              label="英文描述"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input  @focus="changesta()" @change="changeplace(scope)" v-model="scope.row.descript1" maxlength="32" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="descript2"
              label="第三描述"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input @focus="changesta()" @change="changeplace(scope)" v-model="scope.row.descript2" maxlength="32" placeholder=""></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop="cover"
              label="人数"
              width="60"
              show-overflow-tooltip>
              <template slot-scope="scope" >
                <FormatInput  @focus="changesta()" class="el-input__inner" type="number" maxlength="5" @change="changeplace(scope)" v-model="scope.row.cover" placeholder=""></FormatInput>
                <!--<el-input @change="changeplace(scope)" v-model="scope.row.cover" placeholder=""></el-input>-->
              </template>
            </el-table-column>
            <el-table-column
              prop="toplace"
              label="从属场地"
              width="160"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作"
              width="70">
              <template slot-scope="scope">

                  <b-form inline>
                    <b-button size="mini" title="删除" class="Delete-button image-btn" type="danger" @click="deletel(scope.row)"></b-button>
                    <b-button size="mini" title="日志" class="Journal-button image-btn" type="danger" @click="log(scope)"></b-button>
                  </b-form>

              </template>
            </el-table-column>
          </el-table>
          <div class="btng green btng-l">
            <b-button :disabled="btnshow.place" @click="addplace" variant="primary">新建场地</b-button>
            <b-button :disabled="btnshow.save" @click="savep" variant="primary">保存</b-button>
            <b-button :disabled="btnshow.cancel" @click="cancel" variant="primary">取消</b-button>
          </div>
          <div class="btng btng-r">
            <b-button  @click="expand" variant="primary">扩展属性</b-button>
            <b-button  @click="log2" variant="primary">日志</b-button>
          </div>
        </b-col>

      </b-row>
      <b-modal id="multiplacemodal" ref="multiplacemodal" title="场地列表" size="lg" hide-footer>
        <MultiPlace ref="MultiPlace" @placeConfirm="placeConfirm" :pccode="pccode" :placestr="topplacestr"></MultiPlace>
      </b-modal>
      <b-modal id="placeexpandmodal" ref="placeexpandmodel" size="lg" title="扩展属性" hide-footer>
        <placeexpand :pccode="pcinfo.pccode"></placeexpand>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
  import methodinfo from '../../config/MethodConst.js'
  import placeexpand from '../maint/placeexpand.vue'
  import MultiPlace from '../../components/pccode/MultiPlace.vue'

  const show = {  pccodedisabled: true, descriptdisabled:  true,descript1disabled:true,descript2disabled:true ,kinddesdisabled:true,tablesdisabled:true}
  const newshow = {  pccodedisabled: false, descriptdisabled:  false,descript1disabled:false,descript2disabled:false ,kinddesdisabled:true,tablesdisabled:true}
  const modifyshow = {  pccodedisabled: true, descriptdisabled:  false,descript1disabled:false,descript2disabled:false ,kinddesdisabled:true,tablesdisabled:true}

  const pccodemoren = {  pccode: "", descript:""  ,descript1:"",descript2:"" ,kinddes:"宴会",kind:"3",tables:"0"}
  const placemoren = {  tableno: "", descript:""  ,descript1:"",descript2:"" ,layout:"",cover:"0",topplace:"",add:"T",layoutarr:[]}

  const pccodefildes = [
    {  prop: 'pccode', label:  '编号',width:'70',sortable:true },
    {  prop: 'descript', label:  '名称',width:'',sortable:true,showTip:true},
  ]
  const topplacefildes = [
    {  prop: 'tableno', label:  '场地代码',width:'100',sortable:true },
    {  prop: 'descript', label:  '名称',width:'300',sortable:true,showTip:true},
  ]
  const basefildes = [
    {  prop: 'code', label:  '场地代码',width:'100',sortable:true },
    {  prop: 'descript', label:  '名称',width:'300',sortable:true,showTip:true},
  ]

  const placefildes = [
    {  prop: 'tableno', label:  '场地代码',width:'100',sortable:true,showTip:true },
    {  prop: 'descript', label:  '中文描述',width:'',sortable:true,showTip:true},
    {  prop: 'descript1', label:  '英文描述',width:'',sortable:true,showTip:true},
    {  prop: 'descript2', label:  '第三描述',width:'',sortable:true ,showTip:true},
    {  prop: 'cover', label:  '人数',width:'65',sortable:true ,showTip:true},
    {  prop: 'layout', label:  '布局',width:'70',sortable:true ,showTip:true},
    {  prop: 'toplace', label:  '从属场地',width:'',sortable:true,showTip:true }
  ]

  const btnshow = {  new: false, modify:  false,delete:false,place:false ,save:true,cancel:true,savep:true,cancelp:true}
  const btnnewshow ={  new: true, modify:  true,delete:true,place: true,save:true,cancel:true,savep:false,cancelp:false}
  const btnmodifyshow ={  new: true, modify:  true,delete:true,place:true ,save:false,cancel:false,savep:true,cancelp:true}

  export default {
    data () {
      return {
        pccodedata:[],
        placedata:[],
        tableData3:[],
        pccodefildes :pccodefildes,
        placefildes :placefildes,
        topplacefildes:topplacefildes,
        basefildes:basefildes,
        showchange:'',
        btnshow :btnshow,
        placesavetype: '',
        pcinfo: pccodemoren,
        changedplaceinfo:{},
        oldcurrentRow:null,
        pccodesavetype:"",
        seachplace:"",
        seachlayout:"",
        // 获取row的key值
        getRowKeys(row) {
          return row.empno;
        },
        currentRow: null,
        placeRow: null,
        tableH: document.body.clientHeight-293,//减去header的278px
        tableHeight:document.body.clientHeight-174,
        num:0,
        change:"",
        pccode:"",
        topplacestr:"",
      }
    },
    mounted() {
      this.getpccodedata();
      this.getlayoutdata();
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
      getpccodedata(rows){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getpccodelist, {
            isall: "T",
            kind: "3"
          }).then((response)=> {

            if (response.data.errorCode=="0") {

              // this.pccodedata = [];
              if(typeof(response.data.pccodes) != "undefined"){

                this.pccodedata = response.data.pccodes;

                if(typeof(rows) == "undefined"||rows==null){
                  this.$nextTick(function(){
                    this.$refs.aaa.setCurrentRow( this.pccodedata[0]);
                    this.oldcurrentRow = null;
                    this.showchange = '';
                  })
                }
                else{
                  for(let pc of response.data.pccodes){
                    if(pc.pccode == rows.pccode){
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
      getlayoutdata(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getbasecodelist, {
            cat: "layout",
            halt: "F"
          }).then((response)=> {

            if (response.data.errorCode=="0") {
              this.tableData3 = [];
              if(typeof(response.data.basecodes) != "undefined"){
                for(let basecodes of response.data.basecodes){
                  var types = {};
                  types["value"]=basecodes.code;
                  types["label"]=basecodes.descript;
                  this.tableData3.push(types);
                }

              }
            }
          })
        })
      },
      getplacedata(pccode){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getplacelist, {
            pccode: pccode
          }).then((response)=> {
            if (response.data.errorCode=="0") {
              this.placedata = [];
              if(typeof(response.data.places) != "undefined"){
                for(let places of response.data.places){
                  var types = {};

                  types = places;
                  if(!places.layout){
                    types["layoutarr"] = [];
                  }
                  else{
                    types["layoutarr"] = places.layout.split(',');
                  }
                  this.placedata .push(types);
                }
              }
            }
          })
        })
      },
      handleCurrentChange(val,oldval) {
        if(this.placesavetype==="update"){
          this.$confirm("修改了信息未保存，确认切换营业点吗", "提示", {
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
      deletepccode(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.deletepccode, {
            pccode:this.pcinfo.pccode
          }).then((response)=> {
            if (response.data.errorCode=="0") {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getpccodedata();
            }
            else{
              this.$message.error({
                type: 'shanchu',
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
          this.$http.post(methodinfo.deleteplace, {
            tableno:row.tableno
          }).then((response)=> {
            if (response.data.errorCode=="0") {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getplacedata(this.currentRow.pccode);
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
      savepccode(url,item){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(url, {
            pccode:item.pccode,
            descript:item.descript,
            descript1:item.descript1,
            descript2:item.descript2,
            kind:item.kind,
            tables:item.tables
          }).then((response)=> {
            if(response.data.errorCode=="0"){
              this.$message({
                type: '保存',
                message: '保存成功!'
              });
              this.getpccodedata(this.pcinfo);
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
        var pccode = this.currentRow.pccode;
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.updateplaces, {
            pccode:pccode,
            places:item
          }).then((response)=> {

            if(response.data.errorCode=="0"){
              this.$message({
                type: '保存',
                message: '保存成功!'
              });
              this.getplacedata(pccode);
              this.changedplaceinfo = {};
              this.placesavetype = ""
              this.change="T";

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

            this.changedplaceinfo[scope.row.tableno] = scope.row;
            this.placesavetype="update";
            this.oldcurrentRow = Object.assign({},this.currentRow);

          }
        }
        else{

          if(scope.row.tableno){

            for(var i=0;i<this.placedata.length;i++){
              var types = this.placedata[i];
              if(scope.row.tableno==types.tableno&&scope.$index!=i){
                this.$message.error('桌号不能重复');
                scope.row.tableno="";
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
          this.deletepccode();
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
        this.pcinfo = Object.assign({},pccodemoren);
        this.oldcurrentRow = Object.assign({},this.currentRow);
        this.placedata = [];
        this.pccodesavetype ="new";
        this.btnshow = btnnewshow;
      },
      modifyp:function () {
        this.showchange =  Object.assign({},modifyshow);
        this.oldcurrentRow = Object.assign({},this.currentRow);
        this.pccodesavetype ="update";
        this.btnshow = btnnewshow;
      },
      cancel:function () {
        this.changedplaceinfo = {};
        this.showchange = Object.assign({},show);
        this.getpccodedata(this.oldcurrentRow);
        this.btnshow = btnshow;
        this.placesavetype="";
      },
      addplace:function () {
        var newplace =  Object.assign({},placemoren);
        this.placedata.push(newplace);
        this.placesavetype = "update";
        this.$nextTick(function(){
          this.$refs.bbbb.bodyWrapper.scrollTop = this.$refs.bbbb.bodyWrapper.scrollHeight;
        })
      },
      savep:function () {

        if(this.pccodesavetype){
          var url = "";
          if(!this.pcinfo.pccode){
            this.$message.error('营业点编号不能为空');
            return
          }
          if(!this.pcinfo.descript){
            this.$message.error('营业点描述不能为空');
            return
          }
          if(!this.pcinfo.descript1){
            this.pcinfo.descript1 = this.pcinfo.descript;
          }
          if(this.pccodesavetype =="new"){
            url = methodinfo.newpccode;
          }
          if(this.pccodesavetype =="update"){
            url = methodinfo.updatepccode;
          }
          this.savepccode(url,this.pcinfo);
        }
        if(this.placesavetype){
          var url =methodinfo.updateplaces;
          var copydata = Object.assign([],this.changedplaceinfo)
          for(let pl of this.placedata){
            var data = pl;
            if(data.add=="T"){
              copydata.push(data);
            }
          }

          var finnaldata = [];
          for(var cd in copydata){

            if(!copydata[cd].tableno){
              this.$message.error('桌号不能为空');
              return
            }
            if(!copydata[cd].descript){
              this.$message.error('桌号描述不能为空');
              return
            }
            finnaldata.push(copydata[cd]);
          }
          this.saveplace(finnaldata);
        }
      },
      showModal () {
        this.$refs.multiplacemodal.show()
      },

      hideModal () {
        this.$refs.multiplacemodal.hide()
      },
      placeConfirm(val){
        let str = "";
        for(let elem of val){
          str = str + elem.tableno + ',';
        }
        str=str.substr(0,str.length-1)
        this.$set(this.placeRow,"toplace",str);

        this.$nextTick(function(){
          this.placesavetype = "update";
          if(this.placeRow.add!="T"){
            this.changedplaceinfo[this.placeRow.tableno] = this.placeRow;
            this.placesavetype="update";
            this.oldcurrentRow = Object.assign({},this.currentRow);
          }
        })
        this.hideModal();
      },
      tableDbEdit(row, column, cell, event) {
        if (column.property ==="toplace") {
          this.placeRow = row;
          this.showModal();
          this.isClear = true;
          this.$refs.MultiPlace.clearSelect();
          this.pccode = this.currentRow.pccode;
          this.topplacestr = row.toplace;
          this.$refs.MultiPlace.resetPlace(this.topplacestr);

        };
      },
      expand:function () {
        this.$refs.placeexpandmodel.show()
      },
      log(scope){
        let row = scope.row;
        let logkey =this.$store.getters.hotel.hotelid +'|'+ row.tableno +'|'+this.$store.getters.groupid;
        this.$store.commit('setLogtype','PosTblsta');
        this.$store.commit('setLogKey',logkey);
        this.$root.$emit('bv::show::modal', 'maintLogModal');
      },
      log2(){

        let logkey =this.$store.getters.hotel.hotelid +'|'+ this.pcinfo.pccode +'|'+this.$store.getters.groupid;
        this.$store.commit('setLogtype','PosPccode');
        this.$store.commit('setLogKey',logkey);
        this.$root.$emit('bv::show::modal', 'maintLogModal');
      },
    },
    components: {
      placeexpand,
      MultiPlace
    },
    watch: {
      currentRow(newVal, oldVal) {

        this.pcinfo =Object.assign({},newVal);
        if(typeof(newVal) != "undefined"&&newVal!=null){
          this.getplacedata(newVal.pccode);
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

    }
  }
</script>
<style lang="scss" type="text/scss">
  #pccodeinfo{
    .el-date-editor .el-range-separator{
      padding: 0;
    }
    .container {
      padding-right: 0px;
      padding-left: 0px;
      max-width: 100%;
    }
    .paddingright0{
      padding-right: 0px;
    }
    .maxwidth20{
      -ms-flex: 0 0 21%;
      flex: 0 0 21%;
      max-width: 21%;
    }
    .maxwidth70{
      -ms-flex: 0 0 78.5%;
      flex: 0 0 78.5%;
      max-width: 78.5%;
    }
    .maxwidth15{
      -ms-flex: 0 0 10%;
      flex: 0 0 10%;
      max-width: 10%;
    }
    .paddingleft15{
      padding-left: 15px;
      .row{
        .form-control{ height: 30.5px;}
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
          }
        }
      }
    }
    .paddingtop5{
      padding-top: 5px;
      flex: 1;
      display: flex;
      flex-direction: column;
      .el-table{
        flex: 1;
        display: flex;
        flex-direction: column;
      }
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
    .el-table .caret-wrapper{
      width: 20px;
    }
    .el-table__expanded-cell{
      padding: 5px!important;
      box-shadow: 1px 5px 5px #dee2e6;
    }
    .side-btn{
      padding: 0.375rem 0.55rem;
    }
    .row{
      margin-right: 2px;
      .bold{
        .col-form-label{
          font-weight: bold;
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
      .btn.disabled, .btn:disabled{
        background-color: #c8c9ca!important;
        border-color: #c8c9ca!important;
      }
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
      table {
        font-size: 12px!important;
      }
    }
    #placemodal{
      .modal-dialog{
        .modal-body{
          .row{
            width: 150px;
            .btn{
              width: 45% ;
              &:first-child{ margin-right: 15px}
            }
          }
        }
      }
      .el-table {
        overflow: auto;
      }

    }

    #layputmodal {
      .el-table {
        overflow: auto;
      }
    }
  }
</style>
