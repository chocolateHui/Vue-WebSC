<template>
  <input class="form-control" :placeholder="text" type="text" v-model="inputvalue" @input.native="updateValue">
</template>
<script>
  export default {
    props: ['value', 'text','type','max'],
    name: 'Numberinput',
    data() {
      return {
        inputvalue: this.value
      }
    },
    watch: {
      inputvalue:function (val,oldval) {
        let re = /[\u4E00-\u9FA5]/g;
        if (re.test(val)){
          this.inputvalue = oldval;
        }
        if(this.type==='number'){
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
