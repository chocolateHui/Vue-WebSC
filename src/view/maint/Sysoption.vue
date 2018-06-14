<template>
  <div id="sysoption">
    <b-form>
      <h4>事务相关参数</h4>
      <b-form-group horizontal :label-cols="5"
                    label="事务可以晚于宴会离开日期几天">
        <FormatInput v-model="eventDepDate1.val" class="numinput" type="number" maxlength="2"></FormatInput>
      </b-form-group>
      <b-form-group horizontal :label-cols="5"
                    label="宴会同一场地候补事务数量限制,0为不限制">
        <FormatInput v-model="eventWaitingLimit1.val" class="numinput" type="number" maxlength="2"></FormatInput>
      </b-form-group>
      <b-form-group :label-cols="5" horizontal>
        <b-button type="submit" variant="primary" @click="commitSysoption1">保存</b-button>
      </b-form-group>
    </b-form>
    <b-form>
      <h4>第三方系统相关参数</h4>
      <b-form-group :label-cols="5" horizontal>
        <b-form-checkbox v-model="isToPos1.val" value="T" unchecked-value="F">
          宴会事务是否和餐饮进行关联
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label-cols="5" horizontal>
        <b-form-checkbox v-model="isRResource1.val" value="T" unchecked-value="F">
          预订状态是否需要产生餐饮预订单
        </b-form-checkbox>
      </b-form-group>
      <b-form-group horizontal :label-cols="5" label="SC连接的PMS系统类别">
        <el-select v-model="scPmsType1.val" placeholder="请选择">
          <el-option
            v-for="item in pmstype"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </b-form-group>
      <b-form-group :label-cols="5" horizontal label="SC第三方PMS系统接口地址">
        <b-form-input v-model="scPmsUrl1.val"></b-form-input>
      </b-form-group>
      <b-form-group horizontal :label-cols="5" label="SC连接的POS系统类别" >
        <el-select v-model="scPosType1.val" placeholder="请选择" :disabled="isToPos1.val=='F'">
          <el-option
            v-for="item in postype"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </b-form-group>
      <b-form-group
        :label-cols="5"
        horizontal
        label="SC第三方POS系统服务地址">
        <b-form-input v-model="scPosUrl1.val" :disabled="isToPos1.val=='F'"></b-form-input>
      </b-form-group>
      <b-form-group :label-cols="5" horizontal>
        <b-button type="submit" variant="primary" @click="commitSysoption2">保存</b-button>
      </b-form-group>
    </b-form>
    <b-form>
      <h4>移动SC相关参数</h4>
      <b-form-group :label-cols="5" horizontal>
        <b-form-checkbox v-model="scDoCheck1.val" value="T" unchecked-value="F">
          移动S&C是否启用审核模式
        </b-form-checkbox>
      </b-form-group>
      <b-form-group horizontal :label-cols="5" label="EO单签名确认时间段，单位：H">
        <FormatInput  v-model="scEoSigntime1.val" class="numinput" type="number" maxlength="2"></FormatInput>
      </b-form-group>
      <b-form-group horizontal :label-cols="5" label="移动SC消息推送地址">
        <b-form-input v-model="scMessageUrl1.val" ></b-form-input>
      </b-form-group>
      <b-form-group :label-cols="5" horizontal>
        <b-button type="submit" variant="primary" @click="commitSysoption3">保存</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
  import { mapGetters, mapActions,mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst.js'
  import FormatInput from './../../components/FormatInput'

  export default {
    data () {
      return {
        pmstype:[
          {
            value: 'XMS',
            label: 'XMS'
          }, {
            value: 'X5',
            label: 'X5'
          },
        ],
        postype:[
          {
            value: 'XMS',
            label: 'XMS'
          }, {
            value: 'X5',
            label: 'X5'
          }, {
            value: 'HaiHeng',
            label: '海亨'
          },
        ],
        eventDepDate1:'',
        eventWaitingLimit1:'',
        isToPos1:'',
        isRResource1:'',
        scPmsType1:'',
        scPmsUrl1:'',
        scPosType1:'',
        scPosUrl1:'',
        scDoCheck1:'',
        scEoSigntime1:'',
        scMessageUrl1:''
      }
    },
    computed: {
      ...mapGetters([
        'eventDepDate',
        'eventWaitingLimit',
        'isToPos',
        'isRResource',
        'scPmsType',
        'scPmsUrl',
        'scPosType',
        'scPosUrl',
        'scDoCheck',
        'scMessageUrl',
        'scEoSigntime',
        'saveSysoption'
      ]),
    },
    created(){
      this.eventDepDate1 = Object.assign({},this.eventDepDate);
      this.eventWaitingLimit1 = Object.assign({},this.eventWaitingLimit);
      this.isToPos1 = Object.assign({},this.isToPos);
      this.isRResource1 = Object.assign({},this.isRResource);
      this.scPmsType1 = Object.assign({},this.scPmsType);
      this.scPmsUrl1 = Object.assign({},this.scPmsUrl);
      this.scPosType1 = Object.assign({},this.scPosType);
      this.scPosUrl1 = Object.assign({},this.scPosUrl);
      this.scDoCheck1 = Object.assign({},this.scDoCheck);
      this.scMessageUrl1 = Object.assign({},this.scMessageUrl);
      this.scEoSigntime1 = Object.assign({},this.scEoSigntime);
    },
    methods: {
      commitSysoption1:function () {
        this.$store.dispatch('encrypttoken').then(() => {
          //获取工号信息,完成后进行路由
          this.$store.dispatch('saveSysoption',this.eventDepDate1)
          this.$store.dispatch('saveSysoption',this.eventWaitingLimit1)
        })
      },
      commitSysoption2:function () {
        this.$store.dispatch('encrypttoken').then(() => {
          //获取工号信息,完成后进行路由
          this.$store.dispatch('saveSysoption',this.scPmsType1)
          this.$store.dispatch('saveSysoption',this.scPmsUrl1)
          this.$store.dispatch('saveSysoption',this.scPosType1)
          this.$store.dispatch('saveSysoption',this.scPosUrl1)
        })
      },
      commitSysoption3:function () {
        this.$store.dispatch('encrypttoken').then(() => {
          //获取工号信息,完成后进行路由
          this.$store.dispatch('saveSysoption',this.scEoSigntime1)
          this.$store.dispatch('saveSysoption',this.scMessageUrl1)
        })
      }
    },
    components: {
      FormatInput
    }
  }
</script>
<style lang="scss" type="text/scss">
  #sysoption{
    form{
      h4{
        padding: 5px 15px;
        color: #71A2CC;
        font-weight: normal;
      }
    }
    .el-input__inner{
      height: 35px;
    }
    .numinput{
      width: 30%;
    }
    legend{
      text-align: right;
    }
    .form-group{
      margin-bottom: 0.6rem;
    }
    form{
      border-bottom: 1px solid #ced4da;
      margin-bottom: 0.5rem;
    }
    .btn{
      width: 100px;
      background: #6FB3E0;
      border-color: #6FB3E0;
      margin-bottom: 0.5rem;
    }
  }
</style>
