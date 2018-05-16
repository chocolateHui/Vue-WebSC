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
          default-expand-all
          highlight-current
          :filter-node-method="filterNode"
          ref="maintTree">
        </el-tree>
      </b-col>
      <b-col cols="10">
        <b-container :style="{height: bodyHeight + 'px'}">
          <div v-if="isLoading">
            <loading></loading>
          </div>
          <div v-if="!isLoading">
            <router-view></router-view>
          </div>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import loading from '../components/loading.vue'
  import { mapGetters} from 'vuex'
  import '../css/imgbtn.scss'

  export default {
    data() {
      return {
        treeHeight: document.body.clientHeight-150,
        bodyHeight: document.body.clientHeight-120,
        filterText: '',
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
          }, {
            id:'sysoption',
            label: '系统参数',
            route:'/main/maint/sysoption'
          }]
        }, {
          label: '宴会代码',
          children: [{
            id:'pccode',
            label: '宴会营业点',
            route:'/main/maint/pccode'
          }, {
            id:'item',
            label: '宴会项目',
            route:'/main/maint/item'
          },{
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
        this.$refs.tree2.filter(val);
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
      }
    },
    mounted ()  {
      if(!this.$store.getters.hotel.sign){
        this.maintTree[0].children.splice(1,0,{
          label: '岗位设置',
          route:'/main/maint/hoteldept'
        });
      }
      let index = this.$route.path.indexOf('/maint/')
      let Nodeid = this.$route.path.substring(index+7);
      this.$refs.maintTree.setCurrentKey(Nodeid);
    },
    components: {
      loading
    }
  };
</script>
<style lang="scss">

  #maint{
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
