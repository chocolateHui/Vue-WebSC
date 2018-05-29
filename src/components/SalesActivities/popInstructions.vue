<template>
  <div class="pop_instructions">
    <ul class="clearfix">
      <li>
        <p>批示内容</p>
        <textarea class="text" v-model.trim="instruText" maxlength="200"></textarea>
      </li>
      <li class="mr10">
        <p>批示人</p>
        <input type="text" class="text_input" v-model="insPerson" disabled="disabled"/>
      </li>
      <li>
        <p>批示时间</p>
        <input type="text" class="text_input" v-model="insTime" disabled="disabled" />
      </li>
    </ul>
    <div class="tr"><input type="button" class="btn_ok" @click="btnOk" value="确定"></div>
  </div>
</template>
<script>
  import '../../css/SalesActivite.scss';
    export default {
        name: "pop-instructions",
      data(){
         return{
           instruText:'',
           insPerson:'',
           insTime:''
         }
      },
      created:function () {
        this.popInstruData()
      },
      watch:{
        instruFlag:function (val,oldval) {
          this.popInstruData()
        },
      },
      props:['instructtext','instructtime','instructperson','instruFlag'],
      methods:{
        popInstruData:function () {
          this.instruText=this.instructtext
          this.insPerson=this.instructperson
          this.insTime=this.instructtime
        },
        btnClose:function () {
          this.$emit('InstructClose')
        },
        btnOk:function () {
          if(this.instruText==''){
            this.$message({
              message: "批示内容不能为空",
              type: "warning"
            });
          }else{
            this.$emit('InstructOk',this.instruText)
          }
        }
      },
      mounted:function () {
      }
    }
</script>
<style lang="scss">
  @import '../../css/color';
  .pop_instructions{background: $colorWhite;width: 780px;
    ul, ol,li {list-style: none;}
    .mr10 {
      margin-right: 10px;
    }
    h1,ul, ol, dl, li, dt, dd, p, table, th, td, input, textarea,  img, label, span, select, strong, b {
      margin: 0px;
      padding: 0px;
    }
    .pop_instructions_tou{background: $colorF5;border-bottom: 1px solid $colorGray; color: $colorD0;font-size: 16px;height: 54px;line-height: 54px;padding: 0 35px;margin-bottom: 10px;
      i{color: #9E9E9F;cursor: pointer;display: inline-block;float: right;height: 14px;line-height: 14px;margin-top:24px;text-align: center;width: 14px;}
    }
    ul{
      padding-left: 35px;
      li{float: left;
        p{line-height: 30px;}
      }
    }
    .text{border: 1px solid $colorGray; width: 710px;height: 225px;padding: 5px; resize: none;}
    .text_input{background: $colorF5; border: 1px solid $colorGray;font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif ; width: 350px;height:30px;line-height:30px;padding: 5px;}
    .btn_ok{background: $colorSaveBtn;border: none;color: $colorWhite;font-size: 14px;height: 28px;line-height: 28px;margin-right:35px;text-align: center;width: 80px;float: right;margin-top: 20px}
    .tr{height: 48px}
  }
</style>
