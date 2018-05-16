<template>
  <input class="form-control ime" :placeholder="text" type="text" v-model="inputvalue" @input.native="updateValue">
</template>
<script>
  export default {
    props: ['value','text','type','max'],
    name: 'Numberinput',
    data() {
      return {
        inputvalue: this.value
      }
    },
    watch: {
      inputvalue(val,oldval)  {
        if(!val){
          return;
        }
        let re = /[\u4E00-\u9FA5]/g;
        if (re.test(val)){
          this.inputvalue = oldval;
          return;
        }
        if(this.type==='number'){
          console.log(val)
          if(val.indexOf('.')>=0){
            this.inputvalue = oldval;
            return;
          }
        }
        if(this.type==='number'||this.type==='float'){
          let numval = Number(val);
          if(Number.isNaN(numval)){
            if(Number.isNaN(oldval)){
              this.inputvalue = null;
            }else{
              this.inputvalue = oldval;
            }
          }
        }
        this.$emit('input', this.inputvalue)
        this.$emit('change', this.inputvalue)
      },
      value(val,oldval){
        this.inputvalue = val;
      }
    },
    methods: {
      updateValue(event) {
        if(!event.isComposing){
          return event.data;
        }else{
          event.preventDefault();
        }
      }
    }
  }
</script>
<style lang="scss">
  .ime{
    ime-mode: disabled;
  }
</style>
