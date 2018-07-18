<template>
      <ol id="todayThings">
        <li>今日事务</li>
        <li class="head">
          <span class="n1">宴会名称</span>
          <span class="n5">事务名称</span>
          <span class="n7">状态</span>
          <span class="n2">销售员</span>
          <span class="n3">时间</span>
          <span class="n4">修改人</span>
        </li>
        <li class="it" v-for="placeslist in placesinfo2" v-if="placeslistp==placeslist.tableno">
          <div v-for="infolist in placeslist.bdates" class="clearfix" v-if="infolist.bdate==timelistthing1">
            <span class="n1" :data-id="infolist.caterid" @click="btnToEvent(infolist.caterid)">{{infolist.caterdes}}</span>
            <span class="n5">{{infolist.eventdes}}</span>
            <span class="n7" v-for="hlist in headListp" v-if="hlist.dataid==infolist.sta">{{hlist.name}}</span>
            <span class="n2">{{infolist.salename}}</span>
            <span class="n3">{{infolist.begintime.substring(11,16)}}~ {{infolist.endtime.substring(11,16)}}</span>
            <span class="n4">{{infolist.cby}}</span>
            <span class="n6" v-if="infolist.remark!=''&&infolist.remark">{{infolist.remark}}</span>
          </div>
        </li>
        <li></li>
        <a class="btn_add" v-if=" new Date(timenow)<=new Date(timelistthing1)" @click="addThings"><i style="font-size: 1rem" class="fa fa-plus-circle"></i>   添加宴会事务</a>
      </ol>
 </template>
<script>
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
  import '../../css/PlaceDistribute.scss';
  import Icon from "iview/src/components/icon/icon";
    export default {
      components: {Icon},
      name: "today-things",
      data(){
        return{
           timenow:'',
          placesinfo2:[],
        }
      },
      computed: {
        ...mapGetters(['placesinfo']),
      },
      created(){
        this.timenow=this.today()
        this.placesinfo2 = Object.assign({},this.placesinfo);
      },
      props:['timelistthing1','placeslistp','headListp'],
      methods:{
        btnToEvent:function (cater) {
          this.$store.commit('setCaterid',cater);
          this.$store.commit('setIsHistory',false);
          this.$router.push({ name: '宴会预订详情'});
        },
        addThings:function () {
          this.$emit('addThings',this.timelistthing1,this.placeslistp)
        },
        //获取今天的时间
        today:function(){
          var date1 = new Date();
          var day,month;
          day=date1.getDate();
          month=date1.getMonth()+1;
          if(day<10){day="0"+day;}
          if(month<10){month="0"+month;}
          var times = date1.getFullYear() + "-" + month + "-" + day;
          return times;
        },
      },
    }
</script>

<style lang="scss">
#todayThings{
.scoll{
  max-height: 200px;overflow-y: auto;
}
}
</style>
