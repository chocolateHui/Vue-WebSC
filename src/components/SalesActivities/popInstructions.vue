<template>
  <div class="pop_instructions">
    <div class="pop_instructions_tou">批示内容<i class="fa fa-close" @click="btnClose"></i></div>
    <ul class="clearfix">
      <li>
        <p>批示内容</p>
        <textarea class="text" v-model.trim="instruText"></textarea>
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
      props:['instructtext','instructtime','instructperson'],
      methods:{
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
        this.instruText=this.instructtext
        this.insPerson=this.instructperson
        this.insTime=this.instructtime
      }
    }
</script>

<style scoped lang="scss">

</style>
