<template>
  <div>
    <CateringInfo isNew @saveCatering="saveCatering"></CateringInfo>
    <NewEvent :eventshow="eventshow" :toggleshow="toggleshow" ref="newevent"></NewEvent>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst.js'
  import CateringInfo from '../../components/catering/CateringInfo.vue'
  import NewEvent from '../../components/catering/NewEvent.vue'
  import '../../css/font.scss'

  export default {
    data () {
      return {
        eventshow:true,
        toggleshow:false
      };
    },
    components: {
      CateringInfo,
      NewEvent
    },
    created(){

    },
    methods: {
      saveCatering(localcatering){
        console.log(localcatering)
        let _this=this;
        this.$refs.newevent.eventCheck(localcatering).then((checked) => {
          if(checked){
            this.$store.dispatch('encrypttoken').then(() => {
              this.$http.defaults.headers.common['username'] = this.$store.getters.username
              this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
              this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
              this.$http.post(methodinfo.newcatering, localcatering).then(function (response) {
                if (response.data.errorCode === '0') {
                  console.log(response.data)
                  let caterid = response.data.caterid;
                  _this.$refs.newevent.batchSaveEvent(caterid).then(() => {
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
          this.$store.dispatch("getPlacelist");
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
  }
</style>
