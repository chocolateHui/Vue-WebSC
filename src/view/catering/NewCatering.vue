<template>
  <div>
    <CateringInfo isNew @saveCatering="saveCatering"></CateringInfo>
    <NewEvent :toggleshow="toggleshow" ref="newevent"></NewEvent>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst.js'
  import CateringInfo from '../../components/catering/CateringInfo.vue'
  import NewEvent from '../../components/catering/NewEvent.vue'
  import '../../css/font.scss'

  let loading;

  export default {
    data () {
      return {
        toggleshow:false,
        isNew:true
      };
    },
    components: {
      CateringInfo,
      NewEvent
    },
    created(){
      loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'})
    },
    mounted(){
    },
    methods: {
      saveCatering(localcatering){
        let _this=this;
        this.$refs.newevent.eventCheck(localcatering).then((checked) => {
          if(checked){
            this.$store.dispatch('encrypttoken').then(() => {
              this.$http.defaults.headers.common['username'] = this.$store.getters.username
              this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
              this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
              this.$http.post(methodinfo.newcatering, localcatering).then(function (response) {
                if (response.data.errorCode === '0') {
                  let caterid = response.data.caterid;
                  _this.$refs.newevent.batchSaveEvent(caterid).then(() => {
                    _this.$message({
                      message: '宴会保存成功!',
                      type: 'success'
                    })
                    _this.$router.push({ name: '宴会预订详情', params: { caterid: caterid }});
                  });
                }else{
                  _this.$alert(response.data.errorMessage)
                }
              });
            })
          }
        });
      },
      getCodeDatas(){
        this.$store.dispatch('encrypttoken').then(() => {
          if(this.isNew){
            this.$store.dispatch("getPlacelist");
            this.$store.dispatch("getSale");
            this.$store.dispatch("getAllBaseCodes");
            this.isNew = false;
            setTimeout(() => {
              loading.close();
            }, 300);
          }
        })
      }
    },
    beforeRouteEnter  (to, from, next) {
      next(vm => vm.getCodeDatas())
    }
  }
</script>
<style lang="scss">
  .card {
    margin-bottom: 15px;
    .form-control{
      height: 33.5px;
    }
    .ivu-input{
      height: 30px;
      margin-top: 0;
    }
  }
</style>
