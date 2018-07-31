<template>
  <div id="sidebar" :style="{height: screenHeight + 'px'}">
    <div class="sidebar-shortcuts" @click="openCalendar">
      <div id="calendar" v-show="dateshow">
        <div id="day" class="day">{{date}}</div>
        <div id="lunar" class="lunar">农历:{{lunardate}}</div>
      </div>
    </div>
    <b-nav vertical>
      <b-nav-item :to="menu.route" :class="getselect(menu)"  v-for="menu in menus" :key="menu.route" :style="{width: navwidth + 'px'}">
        <i class="menu-icon fa fa-fw" :class="menu.iconClass"></i>
        <span v-show="isClose" class="menu-text">{{menu.name}}</span>
      </b-nav-item>
    </b-nav>
    <div class="sidebar-toggle sidebar-collapse" style="text-align: center">
      <i @click="togglebar" class="fa" :class="toggleClass"></i>
    </div>
    <b-modal ref="calendarModal" title="日历" hide-footer>
      <div class="calendar-dialog-body">
        <calendar ref="calendar" :zero="calendar.zero" :lunar="calendar.lunar" :value="calendar.value"></calendar>
      </div>
    </b-modal>
  </div>
</template>
<script>
  // 框架相关
  import vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import 'font-awesome/css/font-awesome.css'
  import calendar from './calendar.vue'
  import calendarjs from '../../common/calendar'
  import {formatDate} from '../../common/date'
  // 组件和参数

  export default {
    name: 'sidebar',
    data :function () {
      return {
        date:'',
        lunardate :'',
        dateshow:true,

        calendar:{
          zero:true,
          value:[new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()], //默认日期
          lunar:true
        },
        menus: [

        ],
        isClose:true,
        toggleClass:"fa-angle-double-left",
        screenHeight: document.body.clientHeight+145,//减去header的60px
        navwidth:150
      }
    },
    computed: {
      ...mapGetters([
        'mainRoutes',
        'activeIndex',
        'hotel',
        'role'
      ])
    },
    methods: {
      ...mapMutations([
        'add_tabs'
      ]),
      getselect: function (menu) {
        if(this.$route.path===menu.route){
          return "active"
        }else{
          if(this.$route.path.indexOf('/maint/')>0&&menu.route==='/main/maint'){
            return "active"
          }
        }
      },
      togglebar:function () {
        this.dateshow = !this.dateshow;
        this.isClose=!this.isClose;
        if(!this.isClose){
          this.toggleClass = "fa-angle-double-right"
          this.navwidth = 50
        }else{
          this.navwidth = 150
          this.toggleClass = "fa-angle-double-left"
        }
        this.$emit("barclose",this.isClose);
      },
      openCalendar(){
        this.$refs.calendar.init();
        this.$refs.calendarModal.show();
      }
    },
    mounted () {
      let role = this.role;
      if(this.hotel.sign===2){
        this.menus.push({ route: '/main/caterList', name: '宴会预订列表',iconClass:"fa-list"});
        this.menus.push({ route: '/main/newQuery', name: '新建宴会问询',iconClass:"fa-clock-o fa-rotate-90"});
        this.menus.push({ route: '/main/newReserve', name: '新建宴会预订',iconClass:"fa-registered"});
        this.menus.push({ route: '/main/place/placeDistribution', name: '宴会场地分布',iconClass:"fa-th"});
        if(role!=='01'){
          this.menus.push({ route: '/main/saleDiary', name: '销售活动日历',iconClass:"fa-calendar"});
        }
      }

      if(role==='ADM'||['00','01','02','04','05'].indexOf(role)>=0){
        this.menus.push({ route: '/main/report', name: '报表专家',iconClass:"fa-list-alt"});
      }
      if(role==='ADM'||role==='00'){
        this.menus.push({ route: '/main/maint', name: '基础代码维护',iconClass:"fa-cog"});
      }

      this.date= formatDate(new Date(),"yyyy年MM月dd日");
      let lunarinfo= calendarjs.solar2lunar(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate());
      this.lunardate = lunarinfo.IMonthCn+lunarinfo.IDayCn
      // 刷新时以当前路由做为tab加入tabs
      if (this.$route.path !== '/main/index') {
        if(this.$route.name==='新建宴会问询'){
          this.$store.commit('setCatersta', 'Q');
        }else if(this.$route.name==='新建宴会预订'){
          this.$store.commit('setCatersta', '1');
        }
        let routename = this.$route.name;
        if(this.$route.path.indexOf("/maint/")>0){
          routename = "基础代码维护";
        }
        this.$store.commit('add_tabs', {route: this.$route.path , name: routename });
        this.$nextTick(function(){
          this.$store.commit('set_active_index', routename);
        })
      }
    },
    components: {
      calendar
    }
  }
</script>
<style lang="scss">
  #sidebar{
    background-color: #f2f2f2;
    border-style: solid;
    border-color: #CCC;
    border-width: 0 1px 0 0;
    float: left;
    height: auto;
    position: relative;
    padding-left: 0;
    padding-right: 0;
    .sidebar-shortcuts{
      background-color: #fafafa;
      text-align: center;
      min-height: 40px;
      margin-bottom: 0;
      overflow: hidden;
      position: relative;
      border: 0 solid;
    }
    .sidebar-toggle{
      display: block;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      .fa{
        margin: 9px 0;
        padding: 0 5px;
        line-height: 18px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 100%;
        border: 1px solid #BBB;
        position: relative;
        color: #AAA;
        background-color: #FFF;
        text-align: center;
      }
    }
    .nav{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      list-style: none;
      li:hover:before{
        content: "";
        position: absolute;
        top: -1px;
        left: 0;
        z-index: 1;
        height: 41px;
        width: 3px;
        max-width: 3px;
        overflow: hidden;
        background-color: #629cc9;
      }
      li.active:after{
        display: block;
        content: "";
        position: absolute;
        right: -2px;
        top: -1px;
        bottom: 0;
        z-index: 1;
        border: solid;
        border-width: 0 2px 0 0;
        border-color: #2b7dbc;
      }
      li:hover {
        a {
          background-color: #FFF;
          color: #266cad
        }
      }
      .active{
        a{
          background-color: #FFF;
          color: #266cad
        }
        a:after {
          display: block;
          content: "";
          position: absolute;
          right: 0;
          top: 4px;
          border:solid transparent;
          border-width: 14px 10px;
          border-right-color: #2b7dbc
        }
      }
    }
    .nav-item{
      display: block;
      position: relative;
      float: none;
      padding: 0;
      border-style: solid;
      border-width: 1px 0 0;
      border-color: #e5e5e5;
      a{
        padding: 10px;
        background-color: #f8f8f8;
        height: 39px;
        font-size: 0.9rem;
        color: #585858;
      }
    }
    .menu-icon{
      display: inline-block;
      min-width: 30px;
      vertical-align: sub;
      text-align: center;
      font-size: 1.2rem;
      font-weight: normal;
    }
    .calendar-dialog-body{
      background: #fff;
      padding:20px;
      border: 1px solid #eee;
      border-radius: 2px;
    }
    .lunar{
      font-size: 0.9rem;
      color: #888888;
    }
  }
</style>
