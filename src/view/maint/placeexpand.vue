<template>
  <div id="placeexpand">
    <b-row>
      <b-col sm="3">
        <el-table
          ref="logtable"
          :data="searchitems"
          border
          style="width: 100%">
          <el-table-column
            v-for="item in fildes"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sortable="item.sortable"
            :show-overflow-tooltip="item.showTip" :key="item.prop">
          </el-table-column>
        </el-table>
      </b-col>
      <b-col sm="9" class="expand-col">
        <b-row>
          <b-col sm="2"></b-col>
          <b-col sm="4">
            <label>场地代码:</label>
            <span>1001</span>
          </b-col>
          <b-col sm="2"></b-col>
          <b-col sm="4">
            <label>场地名称:</label>
            <span>宴会厅</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <b-form-group label="布置时间:" :label-cols="4" horizontal>
              <b-input-group>
                <b-input-group-text slot="append">
                  <span>分钟</span>
                </b-input-group-text>
                <b-form-input type="text" v-model="expand.empno"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group label="面积:" :label-cols="4" horizontal>
              <b-input-group>
                <b-input-group-text slot="append">
                  <span>平米</span>
                </b-input-group-text>
                <b-form-input type="text" v-model="expand.empno"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group label="位置:" :label-cols="4" horizontal>
              <b-form-input type="text"
                            v-model="expand.email"
                            placeholder="">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="撤场时间:" :label-cols="4" horizontal>
              <b-input-group>
                <b-input-group-text slot="append">
                  <span>分钟</span>
                </b-input-group-text>
                <b-form-input type="text" v-model="expand.empno"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group label="场地类型:" :label-cols="4" horizontal>
              <b-form-input id="exampleInput2"
                            type="text"
                            v-model="expand.empname">
              </b-form-input>
            </b-form-group>
            <b-form-group label="场地风格:" :label-cols="4" horizontal>
              <b-form-input type="text"
                            v-model="expand.email"
                            placeholder="">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="img-row">
          <el-upload
            :action="fileserver"
            list-type="picture-card"
            :file-list="fileList2"
            :http-request="fileupload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :modal="false">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="btn-row">
      <b-col sm="4"></b-col>
      <b-col sm="6">
        <b-button type="submit" variant="primary">保存</b-button>
        <b-button type="submit" variant="primary">退出</b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
  import axios from 'axios'

  const fileserver = "https://files.foxhis.com/FoxhisFileServer/action?groupid=C0000001&access=dsajlkda1";
  const items = [
    {code: '1001', cby: '宴会厅'},
    {code: '1002', cby: '会议室'},
  ]
  const fildes = [
    {prop: 'code', label: '代码', width: '70'},
    {prop: 'cby', label: '描述', width: '', sortable: true, showTip: true}
  ]

  export default {
    data () {
      return {
        items: items,
        fildes: fildes,
        fileserver:fileserver,
        expand: {},
        eloptions: [],
        fileList2: [{name: 'xr.png', url: 'https://files.foxhis.com/FoxhisFileServer/image/C0000001/target/xr.png?token=71DFD83564CD06366DA6C6E35496B61D'},
          {name: 'logo.png', url: 'https://files.foxhis.com/FoxhisFileServer/image/C0000001/target/logo.png?token=71DFD83564CD06366DA6C6E35496B61D'}],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    prop: {
      pkid: {
        type: String
      },
    },
    computed: {
      searchitems: function () {
        return this.items;
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file.name);
        let url = this.fileserver +'&method=delete';
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        // 添加请求头
        axios.post(url, {filename:'target/'+file.name},config)
          .then(response => {
            console.log(response)
          }).catch(response => {
          console.log(response)
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      fileupload(action){
        let param = new FormData() // 创建form对象
        param.append('topath', 'target') // 添加form表单中其他数据
        param.append('file', action.file, action.file.name) // 通过append向form对象添加数据
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let url = this.fileserver +'&method=upload';
        // 添加请求头
        axios.post(url, param, config)
          .then(response => {
            console.log(response)
          }).catch(response => {
          console.log(response)
        })
      }
    }
  }
</script>
<style lang="scss">
  #placeexpand {
    .el-table {
      td, th {
        border-color: #dee2e6;
        padding: 0;
      }
      .caret-wrapper {
        width: 20px;
      }
    }
    .col-sm-3{
      padding-left: 0;
    }
    .row {
      margin-right: 0;
      margin-left: 0;
    }
    .img-row{
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 5px;
    }
    .expand-col{
      background-color: #f2f2f2;
      .row{
        margin-top: 1rem;
        margin-bottom: 1rem;
        background-color: white;
        .col-sm-6{
          padding-top: 1rem;
        }
      }
    }
    .input-group{
      padding-bottom: 0;
    }
    .btn-row{
      padding-top: 5px;
    }
  }
</style>
