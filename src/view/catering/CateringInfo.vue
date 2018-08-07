<template>
  <div id="Catering">
    <CateringInfo @updateCatering="updateCatering" :caterid="caterid"></CateringInfo>
    <NewEvent ref="newevent" :eventshow="false" :toggleshow="toggleshow"></NewEvent>
    <b-button v-if="!isHistory && catering.sta!=='0' && catering.sta!=='O'" v-b-toggle.newevent class="newEventbtn">新建事务</b-button>
    <el-tabs type="border-card" :before-leave="tabChange" v-model="currentTab">
      <el-tab-pane label="事务列表" name="EventList">
        <EventList :caterid="caterid"></EventList>
      </el-tab-pane>
      <el-tab-pane label="客房预留" name="RoomInfo">
        <RoomInfo :caterid="caterid"></RoomInfo>
      </el-tab-pane>
    </el-tabs>

    <b-modal id="caterlogmodal" size="lg" title="操作日志" ok-only ok-title="退出">
      <Syslog ref="log"></Syslog>
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
  import '../../css/font.scss'

  export default {
    data () {
      return {
        eventshow:false,
        toggleshow:true,
        isNew:true,
        currentTab:"EventList"
      };
    },
    components: {
      CateringInfo,
      NewEvent,
      EventList,
      RoomInfo
    },
    computed: {
      ...mapGetters([
        'caterid',
        'catering',
        'isHistory'
      ])
    },
    mounted(){

    },
    methods: {
      getCateringData(){
        if(this.isHistory){
          this.$message({
            message: '当前订单为历史订单,请注意!',
            type: 'warning'
          })
        }

        this.currentTab = "EventList";
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
          this.$store.commit('setEventlist', [])
          this.$store.commit('setRoomlist', [])
          this.$store.dispatch("getCateringInfo").then(()=>{
            this.$store.dispatch("getRoomList");
          })
          this.$store.dispatch("getEventList");

        });
        setTimeout(() => {
          loading.close();
        }, 200);
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
                  this.$refs.newevent.batchSaveEvent(localcatering.caterid).then((eventrsp) => {
                    if(eventrsp.errorCode==='0'){
                      this.$message({
                        message: '宴会保存成功!',
                        type: 'success'
                      })
                      this.$store.dispatch("getEventList");
                      this.$store.commit('setCatering', localcatering)
                      this.$store.commit('setCatersta', localcatering.sta)
                    }else{
                      this.$message.error(eventrsp.errorMessage)
                    }
                    loading.close();
                  });
                  this.$refs.log.getLogData();
                }else{
                  this.$alert(response.data.errorMessage)
                  loading.close();
                }
              });
            })
          }else{
            loading.close();
          }
        }).catch(()=>{
          loading.close();
        });
      },
      tabChange(activeName, oldActiveName){
        if(!this.catering.hasOwnProperty("blockid")) {
          return new Promise((resolve, reject) => {
            this.$confirm("当前宴会订单未同步到前台系统,是否要进行同步?", "提示").then(() => {
              this.$store.dispatch('encrypttoken').then(() => {
                this.$http.defaults.headers.common['username'] = this.$store.getters.username
                this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
                this.$http.defaults.headers.common['timestamp'] = new Date().getTime()

                let param = {
                  caterid: this.catering.caterid,
                  name: this.catering.name,
                  contactor: this.catering.contactor,
                  mobile: this.catering.contact_mobile,
                  arr: this.catering.arr,
                  dep: this.catering.dep,
                  ref: this.catering.ref,
                  saleid: this.catering.saleid,
                  saleidname: this.catering.saleid_name,
                  protype: "C",
                  prono: this.catering.cusno,
                  proname: this.catering.cusno_des,
                  status: this.catering.sta,
                  rmnum: this.catering.rmnum,
                  gstno: this.catering.attends,
                };
                this.$http.post(methodinfo.syncSCCatering, param).then((response) => {
                  if (response.data.errorCode === '0') {
                    this.$message('宴会同步成功')
                    this.$store.dispatch("getCateringInfo")
                    resolve();
                  } else {
                    this.$message.error(response.data.errorMessage)
                    reject();
                  }
                }).catch(()=>{
                  reject();
                })
              })
            }).catch(() => {
              reject()
            })
          })
        }
      }
    },
    watch:{

    },
    beforeRouteEnter  (to, from, next) {
      next(vm => vm.getCateringData())
    }
  }
</script>
<style lang="scss" type="text/scss">
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
      margin-right: 32px;
      margin-top: 4px;
      position: relative;
      z-index: 1002;
      float: right;
      background-color: #D15B47 !important;
      border: none;
      border-radius: 2px;
      text-align: center;
    }
    .form-control{
      height: 33.5px;
    }
    .ivu-input{
      height: 30px;
      margin-top: 0;
    }
  }
</style>
