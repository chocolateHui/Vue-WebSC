<template>
  <b-container id="initialContains">
    <b-row>
      <b-col>
        <b-form-textarea id="textarea1"
                         v-model="tiptext"
                         :rows="4"
                         :max-rows="6">
        </b-form-textarea>
      </b-col>
    </b-row>
    <b-row class="choose">
      <b-col>
        <b-form-checkbox
          v-model="status"
          value="T"
          unchecked-value="F">
          已经阅读并且同意以上条款
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row class="initfoot">
      <b-col>
        <b-button >初始化宴会数据</b-button>
        <b-button>初始化宴会代码</b-button>
      </b-col>
    </b-row>
    <b-row class="foot">
      <b-col>
        <b-button @click="btnExit">退出</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
    export default {
        name: "initalize",
      data(){
          return{
            status:'T',
            tiptext:'宴会数据初始化会清空所有营业数据，是否确定要进行营业数据初始化'
          }
      },
      methods:{
        btnExit:function () {
          this.$emit('btnExit')
        }
      }
    }
</script>

<style lang="scss">
  $colorE0:#6FB3E0;
#initialContains{
  .choose{
    margin: 20px 0;
    .col{padding-left: 0}
  }
  .initfoot {
    text-align: center;
    .col {
      .btn {
        margin-right: 15px;
        &:last-child {
          background: $colorE0;
          border-color: $colorE0;
        }
        padding: 15px;
      }
    }
  }
  #textarea1{
    height: 150px !important;
  }
  .foot{
    .col {
      .btn {
       float: right;
        margin-bottom: 10px;
        }
      }
  }
}
</style>
