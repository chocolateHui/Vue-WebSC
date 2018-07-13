<template>
  <div id="empnoinfo">
    <b-container fluid>
      <b-row>
        <b-col sm="4" class="my-1">
          <b-form-group horizontal label="酒店" class="mb-0">
            <el-select v-model="hotelid" clearable filterable placeholder="请选择" :disabled="isGroup">
              <el-option
                v-for="item in gethotellist"
                :key = item.hotelid
                :value="item.hotelid"
                :label="item.descript">
              </el-option>
            </el-select>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-group horizontal label="角色" class="mb-0">
            <el-select v-model="htljob" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in joblist"
                :key="item.code"
                :value="item.code"
                :label="item.descript">
              </el-option>
            </el-select>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-group class="mb-0">
            <b-form-checkbox v-model="locked" value="T" unchecked-value="F" >停用</b-form-checkbox>
            <b-button variant="primary" @click="getEmpnolist">查询</b-button>
            <b-button variant="primary" @click="newProp">新建</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <el-table
        id = "empnotable"
        stripe
        ref = "empnotable"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change = "expandChange"
        :data="getempnolist"
        border
        style="width: 100%" :max-height="tableHeight">
        <el-table-column type="expand">
          <template slot-scope="props">
            <b-row>
              <b-col>
                <b-form>
                  <b-form-group label="工号:" horizontal>
                    <FormatInput type="text" maxlength="10" v-model="expandempno.empno" :disabled="able.name&&!expandempno.flag"></FormatInput>
                  </b-form-group>
                  <b-form-group label="姓名:"
                                horizontal>
                    <b-form-input type="text" maxlength="20" v-model="expandempno.empname">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="电话:" horizontal>
                    <FormatInput type="number" v-model="expandempno.phone" maxlength="11" placeholder=""></FormatInput>
                  </b-form-group>
                  <b-form-group horizontal label="酒店:" class="mb-0">
                    <el-select v-model="expandempno.hotelid" clearable filterable placeholder="请选择" :disabled="isGroup">
                      <el-option
                        v-for="item in gethotellist"
                        :key = item.hotelid
                        :value="item.hotelid"
                        :label="item.descript">
                      </el-option>
                    </el-select>
                  </b-form-group>
                </b-form>
              </b-col>
              <b-col>
                <b-form>
                  <b-form-group label="性别:" horizontal>
                    <b-form-radio-group class="pt-2" v-model="expandempno.sex"
                                        :options="[{text: '男', value: '0'},{text: '女', value: '1'}]">
                    </b-form-radio-group>
                  </b-form-group>
                  <div class="block">
                    <span class="demonstration">生日:</span>
                    <el-date-picker
                      v-model="expandempno.birth"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </div>
                  <b-form-group label="QQ:" horizontal>
                    <FormatInput type="number" maxlength="10" v-model="expandempno.qq"></FormatInput>
                  </b-form-group>
                  <b-form-group label="Email:" horizontal>
                    <b-form-input type="email" maxlength="64" v-model="expandempno.email" placeholder="">
                    </b-form-input>
                  </b-form-group>
                </b-form>
              </b-col>
              <b-col>
                <b-form>
                  <b-form-group label="销售员:" horizontal>
                    <el-select v-model="expandempno.saleid" clearable filterable placeholder="请选择">
                      <el-option v-for="item in empnoSaleList"
                        :key = item.code
                        :value="item.code"
                        :label="item.name">
                      </el-option>
                    </el-select>
                  </b-form-group>
                  <b-form-group label="岗位:" horizontal>
                    <el-select v-model="expandempno.deptno" clearable filterable placeholder="请选择">
                      <el-option v-for="item in getdeptlist"
                        :key = item.code
                        :value="item.code"
                        :label="item.descript">
                      </el-option>
                    </el-select>
                  </b-form-group>
                  <b-form-group label="角色:" horizontal>
                    <el-select v-model="expandempno.htljob" clearable filterable placeholder="请选择">
                      <el-option v-for="item in joblist"
                        :key="item.code"
                        :value="item.code"
                        :label="item.descript">
                      </el-option>
                    </el-select>
                  </b-form-group>
                  <b-form-group>
                    <b-form-checkbox v-model="expandempno.locked" value="T" unchecked-value="F">停用</b-form-checkbox>
                  </b-form-group>
                </b-form>
              </b-col>
            </b-row>
            <b-button type="submit" @click="modifyempnoinfo(expandempno)" variant="primary">保存</b-button>
            <b-button type="submit" variant="primary" v-b-modal.passmodal1>修改密码</b-button>
            <b-button @click="showLog(props.row)" variant="primary">日志</b-button>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in fildes"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.showTip" :key="item.prop">
        </el-table-column>
        <el-table-column :width="60" label="操作">
          <template slot-scope="scope">
            <b-button size="mini" type="danger" class="Cancel-button image-btn" @click="deleteempno(scope)"></b-button>
          </template>
        </el-table-column>
      </el-table>

    </b-container>
    <b-modal id="passmodal1" ref="passmodal1" @hidden="modalhidden" size="sm" title="修改密码" hide-footer>
      <div>
        <b-form @submit="modifyPwd" v-if="show">
          <b-form-group label="用户名" horizontal>
            <b-form-input :value="expandempno.empname" disabled>
            </b-form-input>
          </b-form-group>
          <b-form-group label="旧密码" horizontal>
            <b-form-input type="password" v-model="oldpassword" required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="新密码:" horizontal>
            <b-form-input type="password" v-model="newpassword" required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="确认密码:" horizontal>
            <b-form-input type="password" v-model="confirmpassword" required>
            </b-form-input>
          </b-form-group>
          <b-row>
            <b-col sm="3">
            </b-col>
            <b-col>
              <b-button type="submit" variant="primary">提交</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import methodinfo from '../../config/MethodConst.js'
  import { mapGetters, mapMutations } from 'vuex'

  import '../../css/imgbtn.scss'

  const fildes = [
    {  prop: 'empno', label:  '工号',width:'100',sortable:true },
    {  prop: 'empname', label:  '姓名',width:'',sortable:true,showTip:true},
    {  prop: 'htldeptdes', label:  '部门',width:'100',sortable:true,showTip:true},
    {  prop: 'deptnodes', label:  '岗位',width:'100',sortable:true },
    {  prop: 'htljobdes', label:  '角色',width:'100',sortable:true },
    {  prop: 'hoteldes', label:  '所属酒店',width:'',sortable:true }
  ]
  const able = {name:true,hotelinput:true}

  export default {
    data () {
      return {
        newp:true,
        getempnolist: [],
        fildes :fildes,
        saleid: '',
        gethotellist: [],
        joblist: [{
          code:'00',
          descript:'酒店EDP'
        },{
          code:'01',
          descript:'预订文员'
        },{
          code:'02',
          descript:'全职销售员'
        },{
          code:'03',
          descript:'兼职销售员'
        },{
          code:'04',
          descript:'销售总监'
        },{
          code:'05',
          descript:'销售协调员'
        }],
        getdeptlist: [],
        deptno:'',
        htljob:'',
        hotelid:'',
        isGourp:false,
        locked:'F',
        able:able,
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
        show: true,
        // 获取row的key值
        getRowKeys(row) {
          return row.empno;
        },
        // 要展开的行，数值的元素是row的key值
        expands: [],
        expandempno:{},
        lastHasSale:false,
        empnoSaleList:[],
        tableHeight: document.body.clientHeight-182,//减去header的60px
      }
    },
    beforeMount:function(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch('getSale')
        })
    },
    computed: {
      ...mapGetters([
        'groupid',
        'hotel',
        'empno',
        'salelist'
      ])
    },
    mounted: function (){
      //判断是否是集团,不是集团酒店下拉都不能修改
      if(this.$store.getters.hotel.sign===2){
        this.isGroup = true;
      }
      this.getHotel();
      this.getEmpnolist();
      this.getDeptlist();
    },
    methods: {
      configDefault:function () {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
      },
      modifyPwd: function () {
        if (this.newpassword !== this.confirmpassword) {
          this.$alert('两次密码输入不一致,请检查!');
          return;
        }
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
          this.$http.post(methodinfo.modifypassword, {
            username: this.expandempno.empno,
            newpassword: this.newpassword,
            oldpassword: this.oldpassword
          }).then((response) => {
            if (response.data.errorCode === '0') {
              this.$message({message: "修改成功", type: 'success'});
              let tokenparam = {
                groupid: this.$store.getters.groupid,
                hotelid: this.hotel.hotelid,
                username: this.empno.empno,
                password: this.newpassword
              };
              this.$store.dispatch('gettoken', tokenparam);
              this.$refs.passmodal1.hide();
            } else {
              this.$alert(response.data.errorMessage, "修改失败", {type: 'error'})
            }
          })
        })
      },
      //触发父面板日志弹窗
      showLog(row){
        let logkey = row.empno +'|'+this.groupid;
        this.$store.commit('setLogtype','SysEmpno');
        this.$store.commit('setLogKey',logkey);
        this.$root.$emit('bv::show::modal', 'maintLogModal');
      },
      modalhidden: function () {
        this.oldpassword = '';
        this.newpassword = '';
        this.confirmpassword = '';
        this.show = false;
        this.$nextTick(() => { this.show = true });
      },
      deleteempno:function (cs) {
        this.$confirm("是否要删除该员工信息？", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //若是新增的就直接删除不用走服务端
          if(cs.row.hasOwnProperty("isnew")){
            this.getempnolist.splice(cs.$index,1);
          }else{
            this.$store.dispatch('encrypttoken').then(() => {
              this.configDefault()
              this.$http.post(methodinfo.deleteempnoinfo, {
                username: cs.row.empno
              }).then((response) => {
                if (response.data.errorCode === "0") {
                  this.getempnolist.splice(cs.$index,1);
                }else{
                  this.$message.error(response.data.errorMessage)
                }
              });
            });
          }
        })
      },
      expandChange:function (row, expandedRows) {
        if(expandedRows.length>1){
          let index = 0;
          for (let expandrow of expandedRows) {
            if (expandrow.empno !== row.empno) {
              expandedRows.splice(index, 1);
            }
            index++;
          }
        }
        if(this.lastHasSale){
          this.empnoSaleList.splice(0, 1);
          this.lastHasSale = false;
        }

        if(row.hasOwnProperty("saleid")&&row.saleid!==''){
          this.lastHasSale = true;
          this.empnoSaleList.unshift(this.salelist.find((value) =>{
              return value.code===row.saleid
            })
          )
        }

        this.expandempno = Object.assign({},row);
      },
      newProp:function(){
        if(this.newp){
          this.newp = false;
          this.getempnolist.push({age: '',empno:'', empname:'',email:'',sex:'0',locked:'F',hotelid:this.hotelid,flag:true,isnew:'T'});
          this.expands.push('');
        }else{
          this.$message.error('请先保存新建员工信息!');
        }
      },
      getHotel:function () {
        this.hotelid = this.$store.state.user.hotel.hotelid;
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.gethotellist, {}).then((response) => {
            if (response.data.errorCode === "0") {
              this.gethotellist = response.data.hotels;
            }
          });
        })
      },
      getDeptlist:function(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.getdeptlist, {}).then((response) => {
            if (response.data.errorCode === "0") {
              this.getdeptlist = response.data.depts;
            }
          });
        })
      },
      getEmpnolist:function(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          let param = {
            hotel:this.hotelid,
            locked:this.locked
          }
          if(this.htljob!==''){
            param.htljob = this.htljob
          }
          this.$http.post(methodinfo.getempnolist,param ).then((response) => {
            if (response.data.errorCode === "0") {
              this.getempnolist = response.data.empnos;
              if(this.empnoSaleList.length===0){
                let saleids = [];
                this.getempnolist.forEach((empnoinfo,index)=>{
                  if(empnoinfo.hasOwnProperty("saleid")){
                    saleids.push(empnoinfo.saleid)
                  }
                })

                this.salelist.forEach((sale, index) => {
                  if(saleids.indexOf(sale.code)<0){
                    this.empnoSaleList.push(sale)
                  }
                })
              }
            }
          });
        })
      },
      modifyempnoinfo: function (val) {
        if (val.deptno && val.empname !== '' && val.htljob && val.empno !== '') {
          val.username = val.empno

          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            if (val.flag) {
              this.$http.post(methodinfo.addempnoinfo, val).then((response) => {
                if (response.data.errorCode === "0") {
                  this.$message('保存成功')
                  this.newp = true;
                  //如果工号选择了销售员则把元素移到第一位
                  if(val.hasOwnProperty("saleid")&&val.saleid!==''){
                    this.resetSaleList(val.saleid);
                  }
                  this.getEmpnolist();
                } else {
                  this.$message.error(response.data.errorMessage)
                }
              });
            } else {
              this.$http.post(methodinfo.modifyempnoinfo, val).then((response) => {
                if (response.data.errorCode === "0") {
                  this.$message('保存成功')
                  //如果工号选择了销售员则把元素移到第一位
                  if(val.hasOwnProperty("saleid")&&val.saleid!==''){
                    this.resetSaleList(val.saleid)
                  }
                  this.getEmpnolist();
                }else {
                  this.$message.error(response.data.errorMessage)
                }
              });
            }
          })
        } else {
          this.$message.error("请将'工号、姓名、角色、岗位'信息填写完整")
        }
      },
      //调整销售员下拉框
      resetSaleList(saleid){
        this.lastHasSale = true;
        let index = this.empnoSaleList.findIndex((value)=>{
          return value.code===saleid
        })

        this.empnoSaleList.unshift(this.empnoSaleList[index]);
        this.empnoSaleList.splice(index+1,1);
      }
    },
    watch:{

    }
  }
</script>
<style lang="scss" type="text/scss">
   #empnoinfo{
      .input-group-text{
        background-color: #7EB2DD;
        border: 1px solid #76ACD8;
        color: #FFFFFF;
      }
      .container-fluid{
        padding-right: 0;
        padding-left: 0;
      }
      .form-control{
        height: 33.5px;
      }
      .el-date-editor .el-range-separator{
        padding: 0;
      }
      .custom-checkbox {
        .custom-control-label {
          cursor: pointer;
          margin-left: 5px;
          &::before {
            border: 1px solid #D9DADB;
            width: 1.25rem;
            height: 1.25rem;
            top: 0.15rem;
          }
          &::after {
            width: 1.25rem;
            height: 1.25rem;
            top:0rem;
          }
        }
      }
      .container-fluid{
        >.row{
          margin-bottom: 10px;
          .my-1:last-of-type{
            .btn-primary{
              background: #7EB2DD;
              border: none;
              padding: 0.375rem 1.5rem;
              margin-right: 5px;
            }
            .btn-primary:last-of-type{
              background: #89C5BF;
            }
          }
        }
      }
      #empnotable{
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
          }
        }
        .el-table__body-wrapper{
          .row{
            .form-row{
              height:45px;
              .col-sm-9{
                .custom-control-label::after{
                  top: 0.21rem;
                  left: -1.55rem;
                }
                .el-select{
                  width: 100%;
                }
              }
              .col-form-label{
                text-align: justify;
                &::after{
                  content: " ";
                  display: inline-block;
                  width: 100%;
                }
              }
            }
            .form-group{
              margin-bottom: 0px;
            }
            .block{
              height:45px;
              display:flex;
              .demonstration{
                display: inline-block;
                width: 22.5%;
                text-align: justify;
                margin-right:10px;
                line-height:30px;
                &::after{
                  content: " ";
                  display: inline-block;
                  width: 100%;
                }
              }
              .el-date-editor.el-input{
                width: 74.35%;
                .el-input__prefix, .el-input__suffix{
                  height: 34px;
                  .el-input__icon{
                    line-height: 34px;
                  }
                }
              }
            }
          }
        }
        .el-input__inner{
          height: 33.5px;
        }
        .el-table .caret-wrapper{
          width: 20px;
        }
        .el-table__expanded-cell{
          padding: 20px!important;
          box-shadow: 1px 5px 5px #dee2e6;
          .btn-primary{
            background: #7EB2DD;
            border: none;
            padding: 0.375rem 1.5rem;
            margin-right: 5px;
          }
        }
      }
      #logmodal{
        .el-table__header th.is-leaf{
          border-top: 1px solid #ebeef5;
        }
      }
    }
</style>
