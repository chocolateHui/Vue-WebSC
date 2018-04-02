<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <b-container id="maint" fluid>
    <b-row no-gutters>
      <b-col cols="2">
        <!--<div style="padding: 4px;">-->
          <!---->
        <!--</div>-->
        <b-input-group>
          <b-input-group-text slot="append">
            <i class="fa fa-search"></i>
          </b-input-group-text>
          <b-form-input v-model="filterText" placeholder="请输入关键字搜索"></b-form-input>
        </b-input-group>
        <el-tree
          :style="{height: treeHeight + 'px'}"
          class="filter-tree"
          :data="data2"
          :props="defaultProps"
          @node-click="NodeClick"
          :filter-node-method="filterNode"
          ref="tree2">
        </el-tree>
      </b-col>
      <b-col cols="10">
        <b-container>
          <router-view></router-view>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        treeHeight: document.body.clientHeight-140,//减去header的60px
        filterText: '',
        data2: [{
          label: '基础信息',
          children: [{
            label: '用户管理',
            route:'/main/maint/empnoinfo'
          }, {
            label: '岗位设置',
            route:'/main/maint/hoteldept'
          }, {
            label: '酒店信息维护',
            route:'/main/maint/hotelinfo'
          }, {
            label: '系统参数',
            route:'/main/maint/sysoption'
          }]
        }, {
          label: '宴会代码',
          children: [{
            label: '宴会营业点',
            route:'/main/maint/pccode'
          }, {
            label: '宴会项目',
            route:'/main/maint/item'
          },{
            label: '事务类型',
            route:'/main/maint/basecode'
          },{
            label: '事务常用时间段',
            route:'/main/maint/basecode'
          }, {
            label: '事务常用时间段',
            route:'/main/maint/basecode'
          }, {
            label: '事务优先等级设置',
            route:'/main/maint/basecode'
          },{
            label: '场地布局',
            route:'/main/maint/basecode'
          }, {
            label: '宴会取消理由',
            route:'/main/maint/basecode'
          },{
            label: '场地类型',
            route:'/main/maint/basecode'
          }, {
            label: '场地风格',
            route:'/main/maint/basecode'
          },{
            label: '场地位置',
            route:'/main/maint/basecode'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
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
        this.$router.push({path:data.route})
      }
    }
  };
</script>
<style lang="scss">

  #maint{
    .col-2{
      padding-right: 0.5rem;
    }
    .input-group{
      padding-bottom: 0.5rem;
    }
    .col-10{
      border: 1px solid #ced4da;
      border-radius: 5px;
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
