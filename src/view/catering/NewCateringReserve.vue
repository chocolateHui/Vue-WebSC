<template>
  <div>
    <CateringInfo ref="newcatering" isNew @saveCatering="saveCatering"></CateringInfo>
    <NewEvent isNew :toggleshow="toggleshow" :eventshow="eventshow" ref="newevent"></NewEvent>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import CateringInfo from '../../components/catering/CateringInfo.vue'
  import NewEvent from '../../components/catering/NewEvent.vue'
  import cateringMixin from './cateringMixin'
  import '../../css/font.scss'

  export default {
    data(){
      return {

      }
    },
    components: {
      CateringInfo,
      NewEvent
    },
    mixins: [cateringMixin]
  }
</script>
<style scoped lang="scss">
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
