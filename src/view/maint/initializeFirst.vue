<template>
  <b-container id="initialContain">
    <b-row>
      <b-col>
        <b-form-group label="选择酒店模板：&#8194;&#8194;" horizontal>
          <el-select v-model="hotelModel" placeholder="请选择">
            <el-option
              v-for="item in hotelList"
              :key="item.hotelid"
              :label="item.descript"
              :value="item.hotelid">
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
         <b-button @click="btnInstall">开始安装</b-button>
        <b-button @click="btnExit">取消</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
  import methodinfo from '../../config/MethodConst.js'
    export default {
      name: "initialize",
      data(){
          return{
            hotelList:[],
            BusinesHours:'',
            tiptext:'请先选择酒店模板',
            hotelModel:'',
            signflag:''
          }
      },
      created(){
        if(this.sign!=0){
          this.signflag=2
        }else{
          this.signflag=0
        }
        this.BusinesHours=this.dateFormat()
        this.gethotellist()
      },
      props:['hotelid','sign'],
      methods:{
        dateFormat: function () {
          let date = new Date()
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },
        configDefault:function () {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
        },
        gethotellist:function(){
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            // 获取营业点
            this.$http.post(methodinfo.gethotellist, {
              istemplate:'T',
              sign:_this.signflag
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                  this.hotelList=response.data.hotels
                }
              }
            })
          })
        },
        hotelinitalize:function(){
          var _this=this
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            // 获取营业点
            this.$http.post(methodinfo.initscdata,{
              cat:'R',
              hotel:_this.hotelid,
              templatehotel:_this.hotelModel
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                  this.$message({message: "安装成功", type: 'success'});
                  this.$emit('btnExit2')
                }
              }
            })
          })
        },
        btnInstall:function () {
          if(this.hotelModel==''){
            this.$message({message: "请选择酒店模板", type: 'warning'});
          }else{
            this.hotelinitalize()
          }
        },
        btnExit:function () {
          this.$emit('btnExit1')
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
