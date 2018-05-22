<template>
  <b-container id="initialContain">
    <b-row>
      <b-col>
        <b-form-group label="选择酒店模板：&#8194;&#8194;" horizontal>
          <el-select v-model="hotelModel" placeholder="请选择">
            <el-option
              v-for="item in hotelList"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="营业日期：&#8194;&#8194;" horizontal>
          <el-date-picker
            v-model="BusinesHours"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2">
        <b-form-textarea id="textarea1"
                         v-model="tiptext"
                         :rows="4"
                         :max-rows="6">
        </b-form-textarea>
      </b-col>
    </b-row>
    <b-row class="initfoot">
      <b-col>
         <b-button >开始安装</b-button>
        <b-button>取消</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
    export default {
      name: "initialize",
      data(){
          return{
            hotelList:[{descript:'a',code:1},{descript:'b',code:2}],
            BusinesHours:'',
            tiptext:'',
            hotelModel:''
          }
      }
    }
</script>

<style lang="scss">
  $colorE0:#6FB3E0;
#initialContain{
  .col-sm-3 {
    flex: 0 0 32%;
    max-width:40%;
    text-align: right;
  }
  .col-sm-9 {
    flex: 0 0 68%;
    max-width: 80%;
  }
  .col-2{
    flex: 0 0 98%;
    max-width: 100%;
  }
  #textarea1{
    height: 150px !important;
  }
  .initfoot{
    padding-top: 30px;
    padding-bottom: 20px;
    .col{
      .btn{
        float: right;
        margin-right: 15px;
        &:last-child{background:$colorE0;border-color:$colorE0}
      }
    }
  }
}
</style>
