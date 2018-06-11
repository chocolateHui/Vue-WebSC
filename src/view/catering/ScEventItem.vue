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
          node-key="eventid"
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
        localdes:"",
        selectnode:[],
        maintTree: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    computed: {
      ...mapGetters([
        'caterid',
        'eventid',
        'isLoading',
        'eventlist',
        'catering'
      ]),
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      caterid(val,oldval){
       this.getCateringData();
      },
      catering(val,oldval){
        this.setdata();
      },
      eventlist(val,oldval){
        this.setdata();
        this.$nextTick(function() {
          console.log(this.eventid);
          this.$refs.tree2.setCurrentKey(this.eventid);
          this.$store.commit('setEventdes',this.localdes);
        })
      },
    },

    methods: {
      filterNode(value, data) {
        // if (!value) return true;
        // return data.label.indexOf(value) !== -1;
      },
      NodeClick(data){
        if(data.root!="T"){
          this.$store.commit('setSceventitemeventid',data.eventid);
          this.$store.commit('setEventdes',data.label);
        }

      },
      setdata(){
        this.maintTree =[];
        let datac = [];
        let cchildren = [];
        let copyeventlist = this.eventlist;
        let copycatering = this.catering;
        for(let elm of copyeventlist){
          let type={};
          type["label"] = elm.descript;
          type["eventid"] = elm.eventid;
          type["root"] = "F";
          if(this.eventid===elm.eventid){
            this.localdes =elm.descript;
          }
          cchildren.push(type);
        }
        datac["label"] =copycatering.name;
        datac["children"] = cchildren;
        datac["root"] ="T";
        this.maintTree .push(datac);

      },
      getCateringData(){
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        console.log("caterid"+this.caterid);
        this.$store.commit('setCaterid',this.caterid);
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch("getCateringInfo")
          this.$store.dispatch("getEventList");
        });
        setTimeout(() => {
          loading.close();
        }, 500);
      },
    },
    created(){
      this.getCateringData();
      this.$store.commit('setSceventitemeventid',this.eventid);
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
      padding-left: 0px;
      padding-right: 0px;
    }
    .col-2{
      padding-right: 0.5rem;
    }
    .input-group{
      padding-bottom: 0.5rem;
    }
    .col-10{

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
