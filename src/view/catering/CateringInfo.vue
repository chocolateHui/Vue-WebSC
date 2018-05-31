<template>
  <div id="Catering">
    <CateringInfo @updateCatering="updateCatering" :caterid="caterid"></CateringInfo>
    <NewEvent ref="newevent" :eventshow="false" :toggleshow="toggleshow"></NewEvent>
    <b-button v-b-toggle.newevent class="newEventbtn">新建事务</b-button>
    <el-tabs type="border-card">
      <el-tab-pane label="事务列表">
        <EventList :caterid="caterid"></EventList>
      </el-tab-pane>
      <el-tab-pane label="客房预留">
        <RoomInfo :caterid="caterid"></RoomInfo>
      </el-tab-pane>
    </el-tabs>

    <b-modal id="logmodal" size="lg" title="操作日志" ok-only ok-title="确认">
      <sysLog></sysLog>
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst.js'
  import CateringInfo from '../../components/catering/CateringInfo.vue'
  import NewEvent from '../../components/catering/NewEvent.vue'
  import EventList from '../../components/catering/EventList.vue'
  import RoomInfo from '../../components/catering/RoomInfo.vue'
  import sysLog from '../../components/syslog.vue'
  import '../../css/font.scss'

  export default {
    data () {
      return {
        eventshow:false,
        toggleshow:true,
        isNew:true
      };
    },
    components: {
      CateringInfo,
      NewEvent,
      EventList,
      RoomInfo,
      sysLog
    },
    computed: {
      ...mapGetters([
        'caterid',
        'catering'
      ])
    },
    methods: {
      getCateringData(){
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        this.$store.dispatch('encrypttoken').then(() => {
          if(this.isNew){
            this.$store.dispatch("getPlacelist");
            this.$store.dispatch("getSale");
            this.$store.dispatch("getAllBaseCodes");
            this.$store.dispatch("getReasonList");
            this.isNew = false;
          }
          this.eventshow = false;
          this.$store.dispatch("getCateringInfo")
          this.$store.dispatch("getEventList");
          this.$store.dispatch("getRoomList");
        });
        setTimeout(() => {
          loading.close();
        }, 500);
      },
      updateCatering(localcatering){
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        this.$refs.newevent.eventCheck(localcatering).then((checked) => {
          if(checked){
            this.$store.dispatch('encrypttoken').then(() => {
              this.$http.defaults.headers.common['username'] = this.$store.getters.username
              this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
              this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
              this.$http.post(methodinfo.updatecatering, localcatering).then((response)=>{
                if (response.data.errorCode === '0') {
                  this.$refs.newevent.batchSaveEvent(localcatering.caterid).then(() => {
                    this.$message({
                      message: '宴会保存成功!',
                      type: 'success'
                    })
                    this.$store.commit('setCatering', localcatering)
                    this.$store.commit('setCatersta', localcatering.sta)
                    this.$store.dispatch("getEventList");
                    loading.close();
                  });
                }else{
                  this.$alert(response.data.errorMessage)
                }
              });
            })
          }
        });
      },
    },
    watch:{

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
      z-index: 1199;
      float: right;
    }
  }
  .card {
    margin-bottom: 15px;
  }
  .form-control{
    height: 33.5px;
  }
  .ivu-input{
    height: 30px;
    margin-top: 0;
  }
</style>
