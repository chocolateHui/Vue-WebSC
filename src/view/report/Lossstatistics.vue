<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="Lossstatistics">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="销售员" class="mb-0">
            <el-select v-model="filter" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in eloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
          <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </b-col>
        <!--<b-col md="6" class="my-1">-->
          <!--<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />-->
        <!--</b-col>-->
        <!--<b-col md="6" class="my-1">-->
        <!--</b-col>-->
      </b-row>

      <!-- Main table element -->
      <b-table show-empty
               stacked="md"
               border
               caption-top
               :items="items"
               :fields="fields"
               :filter="filter"
               :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               @filtered="onFiltered"
               empty-filtered-text="没有符合要求的数据"
      >
        <template slot="table-caption">
          <div v-if="value6" >
            <span style="padding-right: 20px">销售员:{{filter}}</span>
            <span>报表日期:{{value6}}</span>
          </div>
          <div v-else>
            <span>请选择报表开始和结束日期</span>
          </div>
        </template>
        <!--<template slot="name" slot-scope="row">-->
          <!--<span :title="row.value.first">{{row.value.first}} {{row.value.last}}</span>-->
          <!--&lt;!&ndash;<input class="form-control"&ndash;&gt;-->
            <!--&lt;!&ndash;type="text"&ndash;&gt;-->
            <!--&lt;!&ndash;v-model="row.value.first"/>&ndash;&gt;-->
        <!--</template>-->
        <!--<template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>-->
      </b-table>
    </b-container>
  </div>
</template>

<script>
  const items = [
    { isActive: true, age: 40, name:  '销售员1' },
    { isActive: false, age: 21, name: '销售员1' },
    {
      isActive: false,
      age: 9,
      name: 'Mini'
    },
    { isActive: false, age: 89, name: 'Geneva' },
    { isActive: true, age: 38, name: 'Jami' },
    { isActive: false, age: 27, name: 'Essie' },
    { isActive: true, age: 40, name: 'Thor' },
    {
      isActive: true,
      age: 87,
      name: 'Larsen'
    },
    { isActive: false, age: 26, name: 'Mitzi' },
    { isActive: false, age: 22, name: 'Genevieve' },
    { isActive: true, age: 38, name: 'John' },
    { isActive: false, age: 29, name: 'Dick' },
    { isActive: false, age: 26, name: 'Mitzi' },
    { isActive: false, age: 22, name: 'Genevieve' },
    { isActive: true, age: 38, name: 'John' },
    { isActive: false, age: 29, name: 'Dick' },
    { isActive: false, age: 26, name: 'Mitzi' },
    { isActive: false, age: 22, name: 'Genevieve' }
  ]

  export default {
    data () {
      return {
        items: items,
        fields: [
          { key: 'caterid', label: '订单编号', sortable: true,'class': 'text-center' },
          { key: 'name', label: '订单名称', sortable: true },
          { key: 'cusnodes', label: '订单编号',sortable: true },
          { key: 'eventid', label: '事务ID',sortable: true,'class': 'text-center' },
          { key: 'place', label: '场地描述', sortable: true },
          { key: 'eventtype', label: '事务类型', sortable: true },
          { key: 'osta', label: '原状态',sortable: true,'class': 'text-center' },
          { key: 'reason', label: '取消理由',sortable: true },
          { key: 'saleid', label: '销售员',sortable: true },
          { key: 'cby', label: '修改人'},
          { key: 'changed', label: '修改时间' }
        ],
        totalRows: items.length,
        sortBy: null,
        sortDesc: false,
        filter: null,
        eloptions: [{
          value: '销售员1',
          label: '黄金糕'
        }, {
          value: '销售员2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value6: ''
      }
    },
    computed: {
      sortOptions () {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => { return { text: f.label, value: f.key } })
      }
    },
    methods: {
      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
      }
    }
  }
</script>
<style lang="scss">
  #Lossstatistics{
    .el-date-editor .el-range-separator{
      padding: 0;
    }
    .table{
      border-color: #dee2e6;
      th{
        border-color: #dee2e6;
      }
      td{
        padding: 0;
        border-color: #dee2e6;
      }
    }
  }
</style>
