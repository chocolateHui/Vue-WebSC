<template>
  <b-container id="caterinfo" fluid>
    <b-card header-tag="header">
      <b-row slot="header">
        <b-col sm="1" class="my-1 catertitle">
          <span>宴会信息</span>
        </b-col>
        <b-col sm="6" class="my-1"></b-col>
        <b-col sm="4" class="my-1"></b-col>
        <b-col sm="1" class="my-1 icondiv">
          <a></a>
          <a></a>
          <a>
            <i v-b-toggle="'cater'" @click="toggleclick" class="fa toggleclass" :class="toggleclass"></i>
          </a>
        </b-col>
      </b-row>
      <b-collapse visible id="cater">
        <b-row id="catermain">
          <b-col sm="1" class="my-1">
            <div class="Sta">
              <label class="StaFont">{{catersta}}</label>
            </div>
          </b-col>
          <b-col sm="3" class="my-1">
            <b-form>
              <b-form-group class="required" label="宴会名称:"
                            horizontal>
                <b-form-input v-model="localcatering.name" type="text" required></b-form-input>
              </b-form-group>
              <b-form-group class="required" label="抵离日期:" horizontal>
                <el-date-picker
                  v-model="caterdate"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  :clearable="editable"
                  :editable="editable"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="datepickerOptions">
                </el-date-picker>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col sm="3" class="my-1">
            <b-form>
              <b-form-group label="联系人:" horizontal>
                <b-form-input  type="text" v-model="localcatering.contactor"></b-form-input>
              </b-form-group>
              <b-form-group label="销售员:"
                            horizontal>
                <el-select v-model="localcatering.saleid" clearable filterable placeholder="请输入销售员名称">
                  <el-option
                    v-for="item in saleoptions"
                    :key="item.code"
                    :label="item.descript"
                    :value="item.code">
                    <span class="option-main">{{ item.descript }}</span>
                    <span class="option-sub">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col sm="3" class="my-1">
            <b-form>
              <b-form-group label="联系电话:" horizontal>
                <FormatInput type="number" maxlength="15" v-model="localcatering.contact_mobile"></FormatInput>
              </b-form-group>
              <b-form-group label="宴会类型:" horizontal>
                <el-select v-model="localcatering.cater_type" placeholder="请选择">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.code"
                    :label="item.descript"
                    :value="item.code">
                  </el-option>
                </el-select>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col sm="2" class="my-1">
            <div class="btndiv" v-if="!isNew">
              <div>
                <b-button class="confirmbtn">确认</b-button>
                <b-button class="cancelbtn">取消</b-button>
              </div>
              <div>
                <b-button class="savebtn">保存</b-button>
              </div>
            </div>
            <div class="btndiv" v-if="isNew">
              <b-button class="savebtn newbtn" @click="saveCatering">保存</b-button>
            </div>
          </b-col>
        </b-row>
        <b-row id = "catersub">
          <b-row>
            <b-form-group class="numinput" :label-cols="6" label="房&#8195;&#8195;数"
                          horizontal>
              <FormatInput type="number" maxlength="5" v-model="localcatering.rmnum"></FormatInput>
            </b-form-group>
            <b-form-group class="numinput" :label-cols="6" label="入住人数"
                          horizontal>
              <FormatInput type="number" maxlength="5" v-model="localcatering.cover"></FormatInput>
            </b-form-group>
            <b-form-group class="normalput" :label-cols="4" label="协议单位" horizontal>
              <el-input class="modalinput" clearable readonly v-model="localcatering.cusno_des">
                <i slot="prefix" class="fa fa-list"></i>
              </el-input>
            </b-form-group>
            <b-form-group class="normalput" :label-cols="4" label="跟进时间" horizontal>
              <el-date-picker
                v-model="localcatering.join_date"
                value-format="yyyy-MM-dd"
                type="date"
                :editable="editable"
                :picker-options="datepickerOptions">
              </el-date-picker>
            </b-form-group>
            <b-form-group class="normalput" :label-cols="4" label="确认期限"
                          horizontal>
              <el-date-picker
                v-model="localcatering.confirm_date"
                value-format="yyyy-MM-dd"
                type="date"
                :editable="editable"
                :picker-options="datepickerOptions">
              </el-date-picker>
            </b-form-group>
            <b-form-group class="normalput" label="现场联系人" :label-cols="5" horizontal>
              <b-form-input type="text" v-model="localcatering.contacter"></b-form-input>
            </b-form-group>
          </b-row>
          <b-row style="width: 100%">
            <b-form-group class="longinput" :label-cols="1" label="迎&#8194;宾&#8194;词" horizontal>
              <b-form-input  type="text" v-model="localcatering.subject"></b-form-input>
            </b-form-group>
          </b-row>
          <b-row style="width: 100%">
            <b-form-group class="longinput" :label-cols="1" label="备&#8195;&#8195;注"
                          horizontal>
              <b-form-input  type="text" v-model="localcatering.remark"></b-form-input>
            </b-form-group>
          </b-row>
        </b-row>
      </b-collapse>
    </b-card>
  </b-container>
</template>
<script>
  // 框架相关
  import vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'
  import methodinfo from '../../config/MethodConst.js'
  import FormatInput from '../FormatInput.vue'
  // 组件和参数

  export default {
    name: 'CateringInfo',
    data () {
      return {
        caterdate:[],
        toggleclass:'fa-chevron-up',
        caterclose:false,
        editable:false,
        localcatering:{},
        datepickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        //宴会类型
        typeOptions: [
          { code: '1', descript: '宴席' },
          { code: '2', descript: '会议' },
          { code: '3', descript: '活动' },
          { code: '4', descript: '其他' }
        ],
        //销售员列表
        saleoptions:[
        ]
      }
    },
    props:{
      isNew :{
        type:Boolean,
        default:false
      },
    },
    computed: {
      ...mapGetters([
        'caterid',
        'catersta',
        'saleid',
        "catering"
      ])
    },
    methods: {
      saveCatering(){
        if(!this.localcatering.name){
          this.$alert("宴会名称不允许为空!")
          return;
        }else if(!this.caterdate[0]){
          this.$alert("抵离日期不允许为空!")
          return;
        }
        this.$emit('saveCatering',this.localcatering);
      },
      toggleclick(){
        if(!this.caterclose){
          this.toggleclass = "fa-chevron-down";
        }else{
          this.toggleclass = "fa-chevron-up";
        }
        this.caterclose=!this.caterclose;
      }
    },
    components: {
      FormatInput
    },
    mounted(){
    },
    watch: {
      catering(val,oldval){
        if(val){
          this.localcatering = Object.assign({},val);
          this.caterdate = [];
          this.caterdate.push(val.arr,val.dep)
        }
      }
    }
  }
</script>
<style lang="scss">
  #caterinfo{
    font-size: 0.9rem;
    .row{
      margin: 0;
    }
    .card-header,.card-body{
      padding: 0;
    }
    .catertitle{
      border-right: 1px solid #d9d9d9;
    }
    .icondiv{
      border-left: 1px solid #d9d9d9;
    }
    input{
      font-size: 0.9rem;
    }
    .toggleclass{
      float: right;
      font-size: 20px;
      cursor: pointer;
    }
    .el-input__inner{
      height: 33px;
      border-radius: 0;
    }
    .el-range-separator{
      padding: 0;
      width: 15px;
    }
    .el-range__close-icon{
      display: none;
    }
    .option-main{
      float: left;
    }
    .option-sub{
      float: right; color: #8492a6; font-size: 0.9rem
    }
    //宴会主单主要信息
    #catermain{
      .el-icon-date,.fa{
        color: #fcac6f;
      }
      .Sta{
        width: 90%;
        height: 65px;
        background: #ff7266;
        border-radius: 10px;
        padding: 0 20px;
        margin-top: 6px;
        .StaFont{
          padding-top: 3px;
          font-size: 3.5rem;
          color: white;
          height: 55px;
          line-height: 55px;
        }
      }
      .required{
        .col-form-label{
          font-weight: bold;
        }
      }
      .form-group{
        margin-bottom: 2px;
      }
      .form-row{
        margin-bottom: 1px;
      }
      .col-sm-1,.col-sm-2{
        padding: 0 10px;
      }
      .form-control{
        border: none;
        border-bottom: 1px solid #dddddd;
        border-radius: 0;

      }
      .el-input__inner{
        width: 100%;
        padding: 0;
        border: none;
        border-bottom: 1px solid #dddddd;
      }
      .el-input__inner:focus{
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }
      .el-select{
        width: 100%;
        .el-input__inner{
          padding: 0.375rem 0.75rem;
        }
      }
      .btn{
        border: none;
      }
      .btndiv{
        padding: 5px 0;
      }
      .confirmbtn{
        width: 48.5%;
        background-color: #FFB752;
      }
      .cancelbtn{
        width: 48.5%;
        background-color: #2EC5FA;
      }
      .savebtn {
        width: 99%;
        background-color: #fa8052;
        margin-top: 0.25rem;
      }
      .newbtn{
        margin-top: 20px;
        margin-bottom: 15px;
      }

    }
    //宴会主单附加信息
    #catersub{
      .el-icon-date,.fa{
        color: #fcac6f;
      }
      .modalinput{
        i{
          padding-top: 9px;
          padding-left: 5px;
        }
      }
      .form-control:focus{
        box-shadow: none;
      }
      margin-bottom: 10px;
      .form-group{
        margin: 0;
      }
      .form-row{
        margin: 0;
      }
      .row{
        padding: 0 10px;
      }
      .form-control{
        border-radius: 0;
        border-color:#bce8f1;
        line-height:1.7;
      }
      .el-input{
        width: 100% !important;
        .el-input__icon{
          margin-top: -4px;
        }
      }
      .el-input__inner{
        width: 101%;
        border-color: #bce8f1;
      }
      .col-form-label{
        padding-top: calc(0.375rem + 2px);
      }
      .numinput{
        width: 12%;
        div{
          padding: 0;
        }
      }
      .normalput {
        width: 19%;
        div {
          padding: 0;
        }
      }
      //备注和迎宾词输入框
      .longinput{
        div{
          padding: 0;
          flex: 0 0 94%;
          max-width: 100%
        }
        .form-control{
          border-top: none;
        }
        //文本和上面对齐
        legend{
          flex: 0 0 6%;
        }
      }
      legend{
        background-color: #bce8f1;
        font-size: 0.85rem;
        padding-left: 10px;
      }
      .longinput{
        width: 100%;
      }
    }
  }
</style>
