<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="htldeptinfo">
    <b-container fluid>
      <b-row>
        <b-col sm="4" class="my-1">
          <b-form-group horizontal label="酒店" class="mb-0">
            <el-select v-model="saleid" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in eloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-group horizontal label="角色" class="mb-0">
            <el-select v-model="saleid" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in eloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-group class="mb-0">
            <b-form-checkbox >停用</b-form-checkbox>
            <b-button variant="primary">查询</b-button>
            <b-button variant="primary">新建</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <el-table
        ref = "empnotable"
        :row-key="getRowKeys"
        @expand-change = "expandChange"
        :data="searchitems"
        border
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
                                  v-model="props.row.email"
                                  placeholder="">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="所属酒店:"
                                horizontal>
                    <b-form-input type="text"
                                  v-model="props.row.email"
                                  placeholder="">
                    </b-form-input>
                  </b-form-group>
                </b-form>
              </b-col>
              <b-col>
                <b-form>
                  <b-form-group label="性别:"
                                horizontal>
                    <b-form-radio-group class="pt-2" v-model="props.row.sex" :options="[{text: '男', value: '1'},{text: '女', value: '2'}]">
                    </b-form-radio-group>
                  </b-form-group>
                  <b-form-group label="生日:"
                                horizontal>
                    <b-form-input id="exampleInput2"
                                  type="text"
                                  v-model="props.row.empname"
                                  required
                                  placeholder="Enter name">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="QQ:"
                                horizontal>
                    <b-form-input type="text"
                                  v-model="props.row.email"
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
                                   v-model="props.row.empno"
                                   required
                                   placeholder="Enter name">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="岗位:"
                                horizontal>
                    <b-form-input id="exampleInput2"
                                  type="text"
                                  v-model="props.row.empname"
                                  required
                                  placeholder="Enter name">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="角色:"
                                horizontal>
                    <b-form-input type="text"
                                  v-model="props.row.email"
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
              type="danger">删除</b-button>
          </template>
        </el-table-column>
      </el-table>
    </b-container>
  </div>
</template>

<script>
  const items = []
  const fildes = [
    {  prop: 'empno', label:  '工号',width:'160',sortable:true },
    {  prop: 'empname', label:  '姓名',width:'',sortable:true,showTip:true},
    {  prop: 'deptno', label:  '部门',width:'',sortable:true,showTip:true},
    {  prop: 'htldept', label:  '岗位',width:'100',sortable:true },
    {  prop: 'htljob', label:  '角色',width:'100',sortable:true },
    {  prop: 'hotel', label:  '所属酒店',width:'',sortable:true }
  ]

  export default {
    data () {
      return {
        items: items,
        fildes :fildes,
        saleid: '',
        eloptions: [],
        value6: '',
        expands:'',
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
      submitempno:function (row) {
        console.log(row.toSource());
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
      }
    }
  }
</script>
<style lang="scss">
  #empnoinfo{
    .el-date-editor .el-range-separator{
      padding: 0;
    }
    .btn{
      width: 100px;
    }
    .table{
      border-color: #dee2e6;
      th{
        border-color: #dee2e6;
      }
    }
    .el-input__inner{
      height: 36px;
    }
    .el-table td, .el-table th{
      padding: 0;
    }
    .el-table .caret-wrapper{
      width: 20px;
    }
    .el-table__expanded-cell{
      padding: 5px!important;
    }
    .row{
      margin-right: 0;
    }
  }
</style>
