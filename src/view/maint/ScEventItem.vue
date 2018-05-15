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
          :data="maintTree"
          :props="defaultProps"
          @node-click="NodeClick"
          default-expand-all
          highlight-current
          :filter-node-method="filterNode"
          ref="tree2">
        </el-tree>
      </b-col>
      <b-col cols="10">
        <b-container :style="{height: bodyHeight + 'px'}">
          <scitem></scitem>
          <sceventitem></sceventitem>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { mapGetters} from 'vuex'
  import scitem from  '../../components/sceventitem/Scitem.vue'
  import sceventitem from  '../../components/sceventitem/Sceventitem.vue'

  export default {
    data() {
      return {
        treeHeight: document.body.clientHeight-150,
        bodyHeight: document.body.clientHeight-110,
        filterText: '',
        maintTree: [{
          label: '基础信息',
          disabled: true,
          children: [{
            label: '事务1',
            disabled: true,
            eventid:"1000001"
          }, {
            label: '事务2',

          }, {
            label: '事务3',

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
        this.$router.push({path:data.route})
      },
    },
    mounted ()  {

    },

    components: {
      scitem,
      sceventitem
    }
  };
</script>
<style lang="scss" type="text/scss">

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
