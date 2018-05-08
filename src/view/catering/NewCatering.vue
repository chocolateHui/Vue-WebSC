<template>
  <div>
    <CateringInfo isNew @saveCatering="saveCatering"></CateringInfo>
    <NewEvent :eventshow="eventshow" :toggleshow="toggleshow" ref="newevent"></NewEvent>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
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
        let checked = this.$refs.newevent.eventCheck(localcatering);
        if(!checked){
          return;
        }else{
          this.$router.push({ name: '宴会预订详情', params: { caterid: 'Y180416095701002' }});
        }
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
