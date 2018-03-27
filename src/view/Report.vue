<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="reportmain">
    <b-card-group deck class="mb-3">
      <b-card border-variant="info" :header="report.title" footer-tag="footer" align="center" v-for="report in reports" :key="report.name">
        <p class="card-text">这里是报表简介</p>
        <div slot="footer">
          <b-button @click="openreport(report)" style="float: right" variant="primary">查看报表</b-button>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        reports: [
          { route: '/main/lostreport', title: '订单流失统计',descript:"宴会预订列表"},
          { route: '/main/newQuery', title: '分类预测汇总报表',descript:"新建宴会问询"},
          { route: '/main/newReserve', title: '分类预测明细表',descript:"新建宴会预订"},
          { route: '/main/placeDistribution', title: '场地利用率分析',descript:"宴会场地分布"}
        ]
      };
    },
    methods: {
      openreport: function (report) {
        this.$router.push({path:report.route})
      }
    },
  }
</script>
<style lang="scss">
#reportmain{
  .card-text{
    height: 80px;
    float: left;
  }
}
</style>
