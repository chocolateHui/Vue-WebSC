<template>
  <div id="sysoption">
    <b-form>
      <h4>事务相关参数</h4>
      <b-form-group horizontal :label-cols="5"
                    label="事务可以晚于宴会离开日期几天">
        <b-form-input v-model="eventDepDate.val" class="numinput"></b-form-input>
      </b-form-group>
      <b-form-group horizontal :label-cols="5"
                    label="宴会同一场地候补事务数量限制,0为不限制">
        <b-form-input v-model="eventWaitingLimit.val" class="numinput"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">保存</b-button>
    </b-form>
    <b-form>
      <h4>第三方系统相关参数</h4>
      <b-form-group :label-cols="5" horizontal>
        <b-form-checkbox v-model="isToPos.val" value="T" unchecked-value="F">
          宴会事务是否和餐饮进行关联
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label-cols="5" horizontal>
        <b-form-checkbox v-model="isRResource.val" value="T" unchecked-value="F">
          预订状态是否需要产生餐饮预订单
        </b-form-checkbox>
      </b-form-group>
      <b-form-group horizontal :label-cols="5" label="SC连接的PMS系统类别">
        <el-select v-model="scPmsType.val" placeholder="请选择">
          <el-option
            v-for="item in pmstype"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </b-form-group>
      <b-form-group :label-cols="5" horizontal label="SC第三方PMS系统接口地址">
        <b-form-input v-model="scPmsUrl.val"></b-form-input>
      </b-form-group>
      <b-form-group horizontal :label-cols="5" label="SC连接的POS系统类别">
        <el-select v-model="scPosType.val" placeholder="请选择">
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
        <b-form-input v-model="scPosUrl.val"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">保存</b-button>
    </b-form>
    <b-form>
      <h4>移动SC相关参数</h4>
      <b-form-group :label-cols="5" horizontal>
        <b-form-checkbox v-model="scDoCheck.val" value="T" unchecked-value="F">
          移动S&C是否启用审核模式
        </b-form-checkbox>
      </b-form-group>
      <b-form-group horizontal :label-cols="5" label="EO单签名确认时间段，单位：H">
        <b-form-input  v-model="scEoSigntime.val" class="numinput"></b-form-input>
      </b-form-group>
      <b-form-group horizontal :label-cols="5" label="移动SC消息推送地址">
        <b-form-input v-model="scMessageUrl.val"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">保存</b-button>
    </b-form>
  </div>
</template>

<script>
  import { mapGetters, mapActions,mapMutations } from 'vuex'

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
        ]
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
        'scEoSigntime'
      ])
    },
    methods: {
      commitSysoption:function (sysoption,val) {

      }
    }
  }
</script>
<style lang="scss">
  #sysoption{
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
      margin-bottom: 0.5rem;
    }
  }
</style>
