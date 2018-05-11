<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="empnoinfo">
    <b-container fluid>
      <b-row>
        <b-col sm="4" class="my-1">
          <b-form-group horizontal label="酒店" class="mb-0">
            <el-select v-model="descript" clearable filterable placeholder="请选择" :disabled="disabled">
              <el-option
                v-for="item in gethotellist"
                :value="item.descript">
              </el-option>
            </el-select>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-group horizontal label="角色" class="mb-0">
            <el-select v-model="value1" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in getjoblist"
                :value="item.descript">
              </el-option>
            </el-select>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-group class="mb-0">
            <b-form-checkbox >停用</b-form-checkbox>
            <b-button variant="primary">查询</b-button>
            <b-button variant="primary" @click="newProp">新建</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <el-table
        id = "empnotable"
        ref = "empnotable"
        :row-key="getRowKeys"
        @expand-change = "expandChange"
        :data="getempnolist"
        border
        stripe
        style="width: 100%" :max-height="tableHeight">
        <el-table-column type="expand">
          <template slot-scope="props">
            <b-row>
              <b-col>
                <b-form>
                  <b-form-group label="工号:"
                                horizontal>
                    <b-form-input  type="text"
                                  v-model="props.row.empno"
                                  required
                                  placeholder="Enter name">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="姓名:"
                                horizontal>
                    <b-form-input id="exampleInput2"
                                  type="text"
                                  v-model="props.row.empname"
                                  required
                                  placeholder="Enter name">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="电话:"
                                horizontal>
                    <b-form-input type="text"
                                  v-model="props.row.phone"
                                  placeholder="">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="所属酒店:"
                                horizontal>
                    <b-form-input type="text"
                                  v-model="props.row.hotel"
                                  placeholder="">
                    </b-form-input>
                  </b-form-group>
                </b-form>
              </b-col>
              <b-col>
                <b-form>
                  <b-form-group label="性别:"
                                horizontal>
                    <b-form-radio-group class="pt-2" v-model="props.row.sex" :options="[{text: '男', value: '0'},{text: '女', value: '1'}]">
                    </b-form-radio-group>
                  </b-form-group>
                  <b-form-group label="生日:"
                                horizontal>
                    <b-form-input id="exampleInput2"
                                  type="text"
                                  v-model="props.row.birth"
                                  required
                                  placeholder="">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="QQ:"
                                horizontal>
                    <b-form-input type="text"
                                  v-model="props.row.qq"
                                  placeholder="">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="Email:"
                                horizontal>
                    <b-form-input type="email"
                                  v-model="props.row.email"
                                  placeholder="">
                    </b-form-input>
                  </b-form-group>
                </b-form>
              </b-col>
              <b-col>
                <b-form>
                  <b-form-group label="销售员:"
                                horizontal>
                    <b-form-input  type="text"
                                   v-model="props.row.empname"
                                   required
                                   placeholder="Enter name">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="岗位:"
                                horizontal>
                    <b-form-input id="exampleInput2"
                                  type="text"
                                  v-model="props.row.htldept"
                                  required
                                  placeholder="Enter name">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="角色:"
                                horizontal>
                    <b-form-input type="text"
                                  v-model="props.row.htljob"
                                  placeholder="">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <b-form-checkbox >停用</b-form-checkbox>
                  </b-form-group>
                </b-form>
              </b-col>
            </b-row>
            <b-button type="submit" @click="submitempno(props.row)" variant="primary">保存</b-button>
            <b-button type="submit" variant="primary">修改密码</b-button>
            <b-button type="submit" variant="primary">解锁</b-button>
            <b-button v-b-modal.logmodal type="submit" variant="primary">日志</b-button>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <b-button
              size="mini"
              type="danger" @click="deleteempno(row)"></b-button>
          </template>
        </el-table-column>
      </el-table>

      <b-modal id="logmodal" size="lg" title="操作日志" ok-only ok-title="确认">
        <sysLog></sysLog>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
  import sysLog from  '../../components/syslog.vue'
  import methodinfo from '../../config/MethodConst.js'

//  const items = [
//    {  age: 40,empno:'FOX', empname:  '销售员1',email:'',sex:'1' },
//    {  age: 21,empno:'TEST1', empname: '销售员1',email:'' ,sex:'1'},
//    {  age: 9,empno:'TEST2', empname: 'Mini',email:'mini@126.com',sex:'2'},
//    {  age: 89,empno:'TEST3', empname: 'Geneva',email:'',sex:'2' },
//    {  age: 38,empno:'TEST4', empname: 'Jami',email:'',sex:'2' },
//    {  age: 27,empno:'TEST5', empname: 'Essie',email:'',sex:'2' }
//  ]
  const fildes = [
    {  prop: 'empno', label:  '工号',width:'160',sortable:true },
    {  prop: 'empname', label:  '姓名',width:'',sortable:true,showTip:true},
    {  prop: 'htldept', label:  '部门',width:'',sortable:true,showTip:true},
    {  prop: 'deptno', label:  '岗位',width:'100',sortable:true },
    {  prop: 'htljob', label:  '角色',width:'100',sortable:true },
    {  prop: 'hotel', label:  '所属酒店',width:'',sortable:true }
  ]

  export default {
    data () {
      return {
        getempnolist: [],
        fildes :fildes,
        saleid: '',
        gethotellist: [],
        getjoblist: [],
        descript:'',
        value1: '',
        expands:'',
        hotelid:'',
        disabled:'',
        // 获取row的key值
        getRowKeys(row) {
          return row.empno;
        },
        // 要展开的行，数值的元素是row的key值
        tableHeight: document.body.clientHeight-140,//减去header的60px

      }
    },
    computed: {
      searchitems:function () {
        if(!this.saleid){
          return this.items;
        }else{
          return this.items.filter( item => (~item.name.indexOf(this.saleid)));
        }
      }
    },
    methods: {
      configDefault:function () {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
      },
      submitempno:function (row) {
        console.log(row.toSource());
      },
      deleteempno:function (row) {
        this.$confirm("是否要删除该员工信息？", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getempnolist.splice(row,1);
//          this.$message({
//            type: 'success',
//            message: '删除成功!'
//          });
        });

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
      },
      newProp:function(){
        this.getempnolist.push({age: '',empno:'', empname:  '',email:'',sex:'' })
      },
      getHotel:function () {
        var _this = this
        this.hotelid = _this.$store.state.user.hotel.hotelid;
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          // 获取营业点
          this.$http.post(methodinfo.gethotellist, {}).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode == "0") {
                _this.gethotellist = response.data.hotels;
              }
              if(this.hotelid.indexOf('H',0)!==-1){
                this.descript = _this.gethotellist[0].descript
                this.disabled = true
              }else{
                this.disabled = false
              }
            }
          });
        })
      },
      getJoblist:function(){
        var _this = this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          // 获取营业点
          this.$http.post(methodinfo.getjoblist, {}).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode == "0") {
                _this.getjoblist = response.data.jobs;
              }
            }
          });
        })
      },
      getEmpnolist:function(){
        var _this = this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          // 获取营业点
          this.$http.post(methodinfo.getempnolist, {}).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode == "0") {
                _this.getempnolist = response.data.empnos;
              }
            }
          });
        })
      }

    },
    mounted: function (){
      this.getHotel();
      this.getJoblist();
      this.getEmpnolist();
    },
    components: {
      sysLog
    }
  }
</script>
<style lang="scss">
  #maint{
    .input-group-text{
      background-color: #7EB2DD;
      border: 1px solid #76ACD8;
      color: #FFFFFF;
    }
    #empnoinfo{

      .el-date-editor .el-range-separator{
        padding: 0;
      }
      .custom-control-label {
        &::before{
          border: 1px solid #D9DADB;
          border-radius: 0px;
         }
      }
      .custom-control-input:checked ~ .custom-control-label {
        &::before{
          background-color: rgba(0,0,0,0);
         }
        &::after {
          background-image: url("/static/WEBS&C 1.2.0-11.png");
        }
      }
      .btn-primary{
        width: 100px;
          background: #7EB2DD;
          border: none;
         &:last-of-type{
          background: #89C5BF;
          border: none;
          }
      }
      .btn-secondary{
        background: url("/static/dele.png") no-repeat;
        margin: 4px;
        display: block;
        border: {
          color: #FFFFFF;
          radius:0px;
        }
        height: 28px;
        width: 28px;

      }
      #empnotable{
        table{
          border-color: #dee2e6;
          th,td{
            padding: 0;
            border-color: #dee2e6;
          }
        }
        .el-table__header-wrapper{
          .el-table__header th.is-leaf{
            border-top: 1px solid #ebeef5;
            border-left: 1px solid #ebeef5;
            border-right: none;
          }
        }
        .el-table__body-wrapper{
          .el-table__row td{
            border-right: none;
            border-left: 1px solid #ebeef5;
          }
        }
        .el-input__inner{
          height: 36px;
        }
        .el-table .caret-wrapper{
          width: 20px;
        }
        .el-table__expanded-cell{
          border-right: none;
          border-left: 1px solid #ebeef5;
          padding: 5px!important;
          box-shadow: 1px 5px 5px #dee2e6;
          .btn-primary:last-of-type{
             background: #7EB2DD;
             border: none;
          }
        }
      }
      #logmodal{
        .el-table__header th.is-leaf{
          border-top: 1px solid #ebeef5;
        }
      }
      .row{
        margin-right: 0;
      }
    }
  }
</style>
