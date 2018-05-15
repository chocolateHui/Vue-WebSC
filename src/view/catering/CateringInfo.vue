<template>
  <div id="Catering">
    <CateringInfo :caterid="caterid"></CateringInfo>
    <NewEvent :caterid="caterid" :eventshow="eventshow" :toggleshow="toggleshow"></NewEvent>
    <b-button v-b-toggle.newevent class="newEventbtn">新建事务</b-button>
    <el-tabs type="border-card">
      <el-tab-pane label="事务列表">
        <EventList :caterid="caterid"></EventList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import CateringInfo from '../../components/catering/CateringInfo.vue'
  import NewEvent from '../../components/catering/NewEvent.vue'
  import EventList from '../../components/catering/EventList.vue'
  import '../../css/font.scss'

  export default {
    data () {
      return {
        eventshow:false,
        toggleshow:true
      };
    },
    props:['caterid'],
    components: {
      CateringInfo,
      NewEvent,
      EventList
    },
    methods: {
      getCateringData(){
        this.$store.commit('setCaterid',this.caterid);
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch("getCateringInfo").then(() => {
          }).catch(function (errorMessage) {
            this.$alert(errorMessage, "异常提示")
          })
        });
        this.getEvnetList();
      },
      getEvnetList(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch("getEventList");
          this.$store.dispatch("getPlacelist");
        });
      }
    },
    beforeRouteEnter  (to, from, next) {
      next(vm => vm.getCateringData())
    }
  }
</script>
<style lang="scss">
  #Catering{
    overflow: auto;
  .el-tabs{
    padding-top: 0;
    margin-left: 15px;
    margin-right: 15px;
  .el-tabs__header{
    margin: 0;
  }
  }
  .newEventbtn{
    margin-right: 17px;
    margin-top: 1px;
    position: relative;
    z-index: 9999;
    float: right;
  }
  }
  .card {
    margin-bottom: 15px;
  }
</style>
