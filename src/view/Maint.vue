<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <b-container id="maint" fluid>
    <b-row no-gutters>
      <b-col cols="2">
        <b-input-group>
          <b-input-group-text slot="append">
            <i class="fa fa-search"></i>
          </b-input-group-text>
          <b-form-input v-model="filterText" placeholder="请输入关键字搜索"></b-form-input>
        </b-input-group>
        <el-tree
          :style="{height: treeHeight + 'px'}"
          class="filter-tree"
          node-key="id"
          :data="maintTree"
          :props="defaultProps"
          @node-click="NodeClick"
          :default-expanded-keys="defaultExpandedKeys"
          highlight-current
          :filter-node-method="filterNode"
          ref="maintTree">
        </el-tree>
      </b-col>
      <b-col cols="10">
        <b-container :style="{height: bodyHeight + 'px'}" class="maint-container">
          <router-view></router-view>
        </b-container>
      </b-col>
    </b-row>
    <b-modal id="maintLogModal" size="lg" title="操作日志" ok-only ok-title="退出">
      <Syslog></Syslog>
    </b-modal>
  </b-container>
</template>

<script>
  import { mapGetters} from 'vuex'
  import '../css/imgbtn.scss'

  export default {
    data() {
      return {
        treeHeight: document.body.clientHeight-150,
        bodyHeight: document.body.clientHeight-120,
        filterText: '',
        defaultExpandedKeys:[],
        maintTree: [{
          label: '基础信息',
          children: [{
            id:'hotelinfo',
            label: '酒店信息',
            route:'/main/maint/hotelinfo'
          }, {
            id:'empnoinfo',
            label: '用户管理',
            route:'/main/maint/empnoinfo'
          }]
        }, {
          label: '宴会代码',
          children: [{
              id:'namedef',
              label: '报表数据项',
              route:'/main/maint/namedef'
          }, {
            id:'basecode/sc_event_type',
            label: '事务类型',
            route:'/main/maint/basecode',
            cat:'sc_event_type'
          },{
            id:'basecode/sc_time_unit',
            label: '事务常用时间段',
            route:'/main/maint/basecode',
            cat:'sc_time_unit'
          }, {
            id:'basecode/sc_event_degree',
            label: '事务优先等级设置',
            route:'/main/maint/basecode',
            cat:'sc_event_degree'
          },{
            id:'basecode/layout',
            label: '场地布局',
            route:'/main/maint/basecode',
            cat:'layout'
          }, {
            id:'basecode/sc_cancel_reason',
            label: '宴会取消理由',
            route:'/main/maint/basecode',
            cat:'sc_cancel_reason'
          },{
            id:'basecode/sc_place_kind',
            label: '场地类型',
            route:'/main/maint/basecode',
            cat:'sc_place_kind'
          }, {
            id:'basecode/sc_place_style',
            label: '场地风格',
            route:'/main/maint/basecode',
            cat:'sc_place_style'
          },{
            id:'basecode/sc_place_location',
            label: '场地位置',
            route:'/main/maint/basecode',
            cat:'sc_place_location'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    computed: {
      ...mapGetters([
        'isLoading'
      ]),

    },
    watch: {
      filterText(val) {
        this.$refs.maintTree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      NodeClick(data){
        if (data.hasOwnProperty('cat')) {
          this.$router.push({name: "通用基础代码", params: {cat: data.cat}})
        } else {
          this.$router.push({path: data.route})
        }
      },
      NodeExpand(Nodeid){
        if(Nodeid==='maint'){
          Nodeid = 'hotelinfo'
        }
        this.$refs.maintTree.setCurrentKey(Nodeid);
        this.defaultExpandedKeys.push(Nodeid);
      }
    },
    mounted ()  {
      if(this.$store.getters.hotel.sign===0){
        this.maintTree[0].children.splice(1,0,{
          label: '子酒店信息维护',
          route:'/main/maint/hotelchild'
        });
        this.maintTree[0].children.splice(2,0,{
          label: '岗位设置',
          route:'/main/maint/hoteldept'
        });
      }
      if(this.$store.getters.hotel.sign===2){
        this.maintTree[0].children.push({
          id:'sysoption',
          label: '系统参数',
          route:'/main/maint/sysoption'
        });
        this.maintTree[1].children.splice(0,0,{
          id:'pccode',
          label: '宴会营业点',
          route:'/main/maint/pccode'
        });
        this.maintTree[1].children.splice(1,0,{
          id:'item',
          label: '宴会项目',
          route:'/main/maint/item'
        },);
      }
    },
    beforeRouteEnter  (to, from, next) {
      let index = to.path.indexOf('/maint/')
      let Nodeid = to.path.substring(index+7);
      next(vm => vm.NodeExpand(Nodeid))
    },
    components: {
    }
  };
</script>
<style lang="scss">
  #maint{
    .maint-container{
      width: 100% !important;
      max-width: 100%;
    }
    .container{
      overflow-y: auto;
    }
    .col-2{
      padding-right: 0.5rem;
    }
    .input-group{
      padding-bottom: 0.5rem;
    }
    .form-control{
      height: 33.5px;
    }
    .col-10{
      border: 1px solid #ced4da;
      border-radius: 5px;
      padding-top: 10px;
    }
    .el-tree{
      border: 1px solid #ced4da;
      overflow-y: auto;
    }
    input::-moz-placeholder, .form-control::-moz-placeholder{
      color: #c0c0c0;
      opacity: 1;
    }
  }
</style>
