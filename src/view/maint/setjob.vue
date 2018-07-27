<template>
  <div id="setjob">
    <b-container>
      <b-row>
        <b-col class="widthleft">
          <p>岗位</p>
          <b-input-group class="search">
            <b-input-group-text slot="append">
              <i class="fa fa-search"></i>
            </b-input-group-text>
            <b-form-input v-model="filterValue" placeholder="搜索"></b-form-input>
          </b-input-group>
          <el-table
            :data="searchitems"
            ref="refjob"
            border
            stripe
            highlight-current-row
            :height="jobheight"
            @current-change="handleCurrentChange"
            style="width: 100%;margin: 15px 0 20px!important;">
            <el-table-column
              v-for="item in jobfildes"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :sortable="item.sortable"
              :show-overflow-tooltip="item.showTip" :key="item.prop">
            </el-table-column>
            <el-table-column
              label="操作"
              width="70">
              <template slot-scope="scope">
                <b-form inline >
                  <b-button
                    size="sm"
                    variant="primary"  style="margin-top:0px"  @click="deletejob(scope.row)">删</b-button>
                </b-form>
              </template>
            </el-table-column>
          </el-table>
          <b-form>
            <b-form-group label="编&#8194;&#8194;&#8194;&#8194;码:" horizontal style="font-weight: bold">
              <b-form-input
                type="text"
                v-model="jobInfo.code "
                maxlength="20"
                :disabled='ifdisabled'
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="中文描述:" horizontal style="font-weight: bold">
              <b-form-input
                type="text"
                v-model="jobInfo.descript "
                maxlength="30"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="英文描述:" horizontal>
              <b-form-input
                type="text"
                v-model="jobInfo.descript1"
                maxlength="100"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="繁体描述:" horizontal>
              <b-form-input
                type="text"
                v-model="jobInfo.descript2 "
                maxlength="100"
              >
              </b-form-input>
            </b-form-group>
          </b-form>
          <b-button @click="btnAdd">新增</b-button>
          <b-button @click="btnSave">保存</b-button>
        </b-col>
        <b-col class="widthright">
          <p>选择酒店</p>
          <b-form>
            <el-table
              :data="hotelData"
              border
              stripe
              style="width: 100%;margin: 15px 0!important;"
              :height="hotelheight"
            >
              <el-table-column
                v-for="item in hotelfildes"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :sortable="item.sortable"
                :show-overflow-tooltip="item.showTip" :key="item.prop">
              </el-table-column>
              <el-table-column
                label="操作"
                width="70">
                <template slot-scope="scope">
                  <b-form inline >
                    <b-button
                      size="sm"
                      variant="primary" @click="deletehotel(scope.row)" style="margin-top:0px">删</b-button>
                  </b-form>
                </template>
              </el-table-column>
            </el-table>
          </b-form>
          <b-button @click="choosehotel">选择酒店</b-button>
          <b-button @click="showlog">日志</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="myModalhotel" @show="chooseShow" ref="myModalhotel" size="lg" title="选择酒店" hide-footer>
      <choosehotel :hotelData="hotelData" :indexchoose="indexchoose" ref="refchoose" @reasonConfirm="reasonConfirm"></choosehotel>
    </b-modal>
  </div>
</template>

<script>
  import methodinfo from '../../config/MethodConst.js'
  import choosehotel from './choosehotel'
  export default {
    name: "setjob",
    data(){
      return{
        jobfildes:[
          {  prop: 'code', label:  '代码',width:'100',sortable:true,showTip:true },
          {  prop: 'descript', label:  '中文描述',width:'',sortable:false,showTip:true },
        ],
        jobInfo:{},
        hotelfildes:[
          {  prop: 'hotelid', label:  '代码',width:'',sortable:true,showTip:true },
          {  prop: 'descript', label:  '中文描述',width:'',sortable:false,showTip:true },
          {  prop: 'descript1', label:  '英文描述',width:'',sortable:false,showTip:true },
          {  prop: 'descript2', label:  '繁体描述',width:'',sortable:false,showTip:true },
        ],
        hotelData:[],
        filterValue:'',
        jobData:[],
        jobheight:document.body.clientHeight-443,
        hotelheight:document.body.clientHeight-220,
        dept:'',
        ifdisabled:true,
        addflag:false,
        logkey:'',
        flag:0,
        indexchoose:0,
      }
    },
    created(){
    },
    components:{
      choosehotel,
    },
    computed: {
      searchitems:function () {
        let filterValue = this.filterValue;
        if(this.filterValue==='' || !this.filterValue){
          return this.jobData;
        }else{
          return this.jobData.filter(function (item) {
            if (item.code.indexOf(filterValue) >= 0) {
              return true;
            } else if (item.descript.indexOf(filterValue) >= 0) {
              return true;
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
      getdeptlist:function () {
        var _this=this
        return new Promise((resolve, reject) => {
        this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            this.$http.post(methodinfo.getdeptlist, {
              hotelid:this.$store.getters.hotel.hotelid
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                  _this.jobData=response.data.depts
                  if( _this.jobData.length>0){
                    if(this.flag==2){
                      _this.dept=_this.jobInfo.code
                      this.$nextTick(function(){
                        for(var i=0;i<_this.searchitems.length;i++){
                          if(_this.searchitems[i].code==_this.jobInfo.code ){
                            this.$refs.refjob.setCurrentRow(this.searchitems[i])
                          }
                        }
                      })
                    }else{
                      _this.dept=_this.jobData[0].code
                      _this.jobInfo={
                        code:_this.jobData[0].code,
                        descript:_this.jobData[0].descript,
                        descript1:_this.jobData[0].descript1,
                        descript2:_this.jobData[0].descript2
                      }
                      this.$nextTick(function(){
                        this.$refs.refjob.setCurrentRow(this.searchitems[0])
                      })
                    }

                    resolve();
                  }
                }else{
                  _this.jobData=[]
                }
              }
            })
          })
        })
      },
      gethotelbydept:function () {
        var _this=this
        return new Promise((resolve, reject) => {
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.gethotelbydept, {
            deptcode:_this.dept
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                _this.hotelData=response.data.hotelids
              }else{
                _this.hotelData=[]
              }
              resolve();
            }
          })
            })
        })
      },
      handleCurrentChange(val){
        if(val==null){
          return
        }
        this.flag=0
        this.ifdisabled=true
        this.addflag=false
        var _this=this
        _this.dept=val.code
        _this.jobInfo={
          code:val.code,
          descript:val.descript,
          descript1:val.descript1,
          descript2:val.descript2
        }
      },
      choosehotel:function () {
        this.indexchoose++
        this.$refs.myModalhotel.show()
      },
      reasonConfirm:function (row) {
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          if(this.flag!=1){
          row.forEach((item)=>{
            this.$http.post(methodinfo.adddepthotel, {
              authhtl :item.hotelid,
              deptcode:_this.dept,
              sign:item.sign
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                     this.gethotelbydept()
                }
              }
            })
          })
          }else{
             _this.hotelData=row
          }
        })
      },
      deletehotel:function (item) {
        var _this=this
        this.$confirm('此操作将永久删除'+item.descript+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if(_this.hotelData.length<=1){
            this.$message({message: "请删除岗位", type: 'warning'});
          }else{
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            this.$http.post(methodinfo.deletedepthotel, {
              authhtl :item.hotelid,
              deptcode:_this.dept,
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                  this.$message({message: "删除成功", type: 'success'});
                  this.gethotelbydept()
                }else{
                  this.$message({message: response.data.errorMessage, type: 'warning'});
                }
              }
            })
          })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });

        });
      },
      deletejob:function (item) {
        var _this=this
        this.$confirm('此操作将永久删除'+item.descript+'该岗位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            this.$http.post(methodinfo.deletehtldept, {
              code:item.code,
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                  this.$refs.refjob.bodyWrapper.scrollTop =0
                  this.$message({message: "删除成功", type: 'success'});
                  this.getdeptlist()
                }else{
                  this.$message({message:response.data.errorMessage, type: 'success'});
                }
              }
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      jobchange:function () {
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
            return new Promise((resolve, reject) => {
          this.configDefault()
          this.$http.post(methodinfo.addhtldept, {
            code: _this.jobInfo.code,
            descript:_this.jobInfo.descript,
            descript1:_this.jobInfo.descript1,
            descript2:_this.jobInfo.descript2
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                if(this.addflag==true){
                  this.$refs.refjob.bodyWrapper.scrollTop =0
                }
                this.flag=2
                this.$message({message: "操作成功", type: 'success'});
                this.getdeptlist()
                this.dept=_this.jobInfo.code
                this.reasonConfirm(_this.hotelData)
                resolve()
              }
            }
          })
        })
        })
      },
      btnAdd:function () {
        this.addflag=true
        this.ifdisabled=false
        this.$refs.refjob.setCurrentRow()
        this.hotelData=[]
        this.flag=1
        this.jobInfo={
          code:'',
          descript:'',
          descript1:'',
          descript2:''
        }
      },
      btnSave:function () {
        var _this=this
        var reg=/[^\w]/ig
        if(this.addflag==true){
          var repeat=false
          this.jobData.forEach(function (item) {
            if(item.code==_this.jobInfo.code){
              repeat=true
            }
          })
          if( _this.jobInfo.code==''||repeat){
            this.$message({message: "编码为空或重复", type: 'warning'});
          }else if(reg.test(_this.jobInfo.code)){
            this.$message({message: "编码只允许输入数字或英文", type: 'warning'});
          }else if(_this.jobInfo.descript==''){
            this.$message({message: "中文描述不能为空", type: 'warning'});
          }else if(_this.hotelData.length==0){
            this.$message({message: "请选择酒店", type: 'warning'});
          }
          else{
            this.jobchange()
          }
        }else{
          if(_this.jobInfo.descript==''){
            this.$message({message: "中文描述不能为空", type: 'warning'});
          }else if(_this.hotelData.length==0){
            this.$message({message: "请选择酒店", type: 'warning'});
          }else{
            this.jobchange()
          }
        }
      },
      showlog:function () {
        this.logkey=this.$store.getters.hotel.hotelid+'|dept|'+this.dept+'|'+this.$store.getters.groupid
        this.$store.commit('setLogtype','Basecode');
        this.$store.commit('setLogKey',this.logkey);
        this.$root.$emit('bv::show::modal', 'maintLogModal');
      },
      chooseShow:function () {
        this.$refs.refchoose.hotelDatashow();
      }
    },
    watch:{
      searchitems:function (val,oldval) {
        var _this=this
        if(val.length>0){
          if(this.flag!=2) {
            _this.dept=this.searchitems[0].code
            _this.jobInfo={
              code:_this.searchitems[0].code,
              descript:_this.searchitems[0].descript,
              descript1:_this.searchitems[0].descript1,
              descript2:_this.searchitems[0].descript2
            }
            this.$nextTick(function(){
              this.$refs.refjob.setCurrentRow(this.searchitems[0])
            })
          }
        }else{
          this.dept=''
        }
      },
      dept:function (val,oldval) {
        if(val!=''){
          this.gethotelbydept()
        }else{
          this.hotelData=[]
        }
      },
    },
    mounted:function () {
      this.getdeptlist()
    }
  }
</script>

<style lang="scss">
  $colorCC:#71A2CC;
  $colorE0:#6FB3E0;
  $colorC0:#77C6C0;
  #setjob{
    .search{
      &.input-group {
        padding-bottom:0;
      }
    }
    .widthleft{
      flex: 0 0 38%;
      max-width: 38%;
    }
    .widthright{
      flex: 0 0 60%;
      max-width: 60%;
    }
    p{
      color:$colorCC;
    }
    .el-table td, .el-table th{
      padding:0;
    }
    .col{
      .btn{
        margin-right: 15px;
        &:nth-child(2n){
          background:$colorC0 ;
          border:$colorC0 ;
        }
        &:nth-child(2n+1){
          background:$colorE0 ;
          border:$colorE0 ;
        }
      }
    }
    .form-control{
      height: 30px;
    }
    .form-group {
      margin-bottom: 0.7rem;
    }
  }
</style>
