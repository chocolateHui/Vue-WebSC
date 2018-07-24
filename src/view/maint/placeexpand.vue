<template>
  <div id="placeexpand">
    <b-row>
      <b-col sm="3">
        <el-table
          ref="logtable"
          :data="searchitems"
          height="430"
          border
          highlight-current-row
        @current-change="handleChange"
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
            <span>{{selectedexpand.tableno}}</span>
          </b-col>
          <!--<b-col sm="2"></b-col>-->
          <b-col sm="4">
            <label>场地名称:</label>
            <span>{{selectedexpand.descript}}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <b-form-group label="布置时间:" :label-cols="4" horizontal>
              <b-input-group>
                <b-input-group-text slot="append">
                  <span>分钟</span>
                </b-input-group-text>
                <b-form-input type="text" v-model="selectedexpand.setup"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group label="面积:" :label-cols="4" horizontal>
              <b-input-group>
                <b-input-group-text slot="append">
                  <span>平米</span>
                </b-input-group-text>
                <b-form-input type="text" v-model="selectedexpand.squre"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group label="位置:" :label-cols="4" horizontal>
              <el-select v-model="selectedexpand.location">
                <el-option
                  v-for="item in locationdata"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </b-form-group>
            <b-form-group label="共享:" :label-cols="4" horizontal>
              <b-form-checkbox id="checkbox1"
                               v-model="selectedexpand.share"
                               value="T"
                               unchecked-value="F">
              </b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="撤场时间:" :label-cols="4" horizontal>
              <b-input-group>
                <b-input-group-text slot="append">
                  <span>分钟</span>
                </b-input-group-text>
              <b-form-input type="text" v-model="selectedexpand.setdown"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group label="场地类型:" :label-cols="4" horizontal>
              <el-select v-model="selectedexpand.kind">
                <el-option
                  v-for="item in kinddata"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!--<b-form-input id="exampleInput2"-->
              <!--type="text"-->
              <!--v-model="expand.kind">-->
              <!--</b-form-input>-->
            </b-form-group>
            <b-form-group label="场地风格:" :label-cols="4" horizontal>
              <el-select v-model="selectedexpand.style">
                <el-option
                  v-for="item in styledata"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="img-row">
          <el-upload
            :action="fileserver"
            list-type="picture-card"
            :file-list="fileList2"
            :http-request="uploadaction"
            :on-preview="handlePictureCardPreview"
            :on-exceed="handleExceed"
            :before-upload="beforeupload"
            :limit="6"
            accept="image/png, image/jpeg"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="footer-row">
      <b-col sm="6"></b-col>
      <b-col sm="6" style="text-align: center;">
        <b-button type="submit" @click="newp" variant="primary">保存</b-button>
        <b-button type="submit" @click="loglog" variant="primary">日志</b-button>
        <b-button  @click="exitm">退出</b-button>
      </b-col>
    </b-row>
    <el-dialog title="日志" id="loglog"
      :append-to-body="true"
      :visible.sync="dialoglogVisible">
      <span>
        <Syslog></Syslog>
      </span>
      <b-button type="primary" @click="dialoglogVisible = false">退出</b-button>
    </el-dialog>
  </div>
</template>
<script>
  import fileMixin from '../../mixin/fileMixin'
  import methodinfo from '../../config/MethodConst.js'
  import { mapGetters, mapMutations } from 'vuex'

  const fildes = [
    {prop: 'tableno', label: '代码', width: '70'},
    {prop: 'descript', label: '描述', width: '', sortable: false, showTip: true}
  ]

  export default {
    data () {
      return {
        dialoglogVisible: false,
        selectedexpand:{},
        items: [],
        fildes: fildes,
        fileList2: [],
        dialogImageUrl: '',
        dialogVisible: false,
        kinddata:[],
        styledata:[],
        locationdata:[],
        change :true
      }
    },
    props: {
      pccode:String
    },
    computed: {
      searchitems: function () {
        return this.items;
      },
      ...mapGetters([
        'groupid',
        'hotel'
      ])
    },
    mixins: [fileMixin],
    mounted() {
        this.getbasecodedata("sc_place_kind");
        this.getbasecodedata("sc_place_style");
        this.getbasecodedata("sc_place_location");

      },
    watch:{
        pccode(val,oldval){
          this.refreshdata();
        },
        selectedexpand(val,oldval){
          if(val.tableno!=oldval.tableno){
            this.refreshpic();
          }
        },
      fileList2(val,oldval){
        if(val.length>=6){
          let aEle=document.getElementsByClassName('el-upload')[0];
          aEle.style.display = 'none';
        }
        else{
          let aEle=document.getElementsByClassName('el-upload')[0];
          aEle.style.display = '';
        }
      },
      },
    methods: {
        handleRemove(file, fileList) {
          let uuid = file.uuid;
          this.fileRemove(file).then(()=>{
            this.deletepic(uuid);
          });
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        beforeupload(files) {
          console.log(files);
          if(files.size>204800){
            this.$message.error({
              message: '图片大小不能超过200kb'
            });
            return false;
          }
          if (!this.selectedexpand.tableno) {
            this.$message.error({
              message: '请选择一个场地'
            });
            return false;
          }
          let filename = this.selectedexpand.tableno + files.name;
          for (let s of this.fileList2) {
            let name = s.name;
            if (filename === name) {
              this.$message.error({
                message: '图片名重复'
              });
              return false;
            }
          }
        },
        uploadaction(action){
         let filename = this.selectedexpand.tableno + action.file.name;
          this.fileupload(action.file,filename).then(()=>{
            this.savepic(filename);
          });
       },
        handleExceed(files, fileList) {
          this.$message.error({
            message: '图片最多为6张'
          });
        },
        refreshdata() {

          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.getplaceexpandinfo, {
              pccode: this.pccode,
            }).then((response) => {
              if (response.data.errorCode == "0") {
                this.selectedexpand = {};
                if (typeof(response.data.expands) != "undefined") {
                  this.items = response.data.expands;
                  this.selectedexpand = response.data.expands[0];
                  this.$nextTick(function () {
                    this.$refs.logtable.setCurrentRow(this.selectedexpand);
                  })
                }
              }
            })
          })

        },
        refreshpic() {
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.getplacepicinfo, {
              tableno: this.selectedexpand.tableno
            }).then((response) => {
              if (response.data.errorCode == "0") {
                if (typeof(response.data.pics) != "undefined") {
                  let data = [];
                  for (let elem of response.data.pics) {
                    let type = {}
                    type["name"] = elem.pic;
                    type["uuid"] = elem.uuid;
                    type["url"] = this.imageurl + elem.pic + this.token;
                    data.push(type);
                  }
                  this.fileList2 = data;
                  // console.log( this.fileList2);
                  if(this.fileList2.length>=6){
                    let aEle=document.getElementsByClassName('el-upload')[0];
                    aEle.style.display = 'none';
                  }
                 else{
                    let aEle=document.getElementsByClassName('el-upload')[0];
                    aEle.style.display = '';
                  }

                }
                else {
                  this.fileList2 = [];
                }
              }
            })
          })
        },
        getbasecodedata(cat) {
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.getbasecodelist, {
              cat: cat
            }).then((response) => {
              if (response.data.errorCode == "0") {
                let data = [];
                if (typeof(response.data.basecodes) != "undefined") {
                  for (let elem of response.data.basecodes) {
                    let type = {}
                    type["value"] = elem.code;
                    type["label"] = elem.descript;
                    data.push(type);
                  }
                  if (cat === "sc_place_kind") {
                    this.kinddata = data;
                  }
                  if (cat === "sc_place_style") {
                    this.styledata = data;
                  }
                  if (cat === "sc_place_location") {
                    this.locationdata = data;
                  }
                }
              }
            })
          })
        },

        newp() {
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.saveplaceexpandinfo, this.selectedexpand).then((response) => {
              if (response.data.errorCode == "0") {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              }
            })
          })
        },
        savepic(filename) {
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.saveplacepicinfo, {
              tableno: this.selectedexpand.tableno,
              pic: filename,
            }).then((response) => {
              if (response.data.errorCode == "0") {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                this.refreshpic();
              }
              else {
                this.$message.error({
                  message: response.data.errorMessage
                });
              }
            })
          })
        },
        deletepic(uuid) {
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.deleteplacepicinfo, {
              tableno: this.selectedexpand.tableno,
              uuid: uuid,
            }).then((response) => {
              if (response.data.errorCode == "0") {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
              else {
                this.$message.error({
                  message: response.data.errorMessage
                });
              }
            })
          })
        },
      exitm(){
        this.$root.$emit('bv::hide::modal','placeexpandmodal')
      },

        handleChange(val) {

          if (val) {
            this.selectedexpand = val;
          }
        },
        loglog(){
          let logkey =this.selectedexpand.tableno +'|'+ this.$store.getters.hotel.hotelid +'|'+this.$store.getters.groupid;
          this.$store.commit('setLogtype','ScPalceExpand');
          this.$store.commit('setLogKey',logkey);
          this.dialoglogVisible = true;
        }
      },
    components: {
    },

  }
</script>
<style lang="scss"  type="text/scss">
  #placeexpand {
    body, span, input, label {
      font-family: 'Open Sans',sans-serif;
      overflow-y: inherit;
    }
    .custom-control {
      padding-top: 0.5rem;
    }
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
      padding-top: 13px;
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
        .col-sm-4{
          line-height: 28px;
          label{ margin-bottom: 0px;}
        }
      }
    }
    .input-group{
      padding-bottom: 0;
    }
    .btn-row{
      padding-top: 5px;
      .col-sm-6{
        text-align: right;
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
    .form-group{
      margin-bottom: 0.5rem;
    }
    .footer-row{
      width: 100%;
      border-top: 1px solid #e9ecef;
      padding-top: 7px;
      margin-top: 14.5px;
      .btn{
        width: 100px;
      }
    }
  }
  #loglog{
    #Syslog{
      padding-bottom: 50px;
    }
  }

</style>
