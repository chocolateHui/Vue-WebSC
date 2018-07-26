<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="reportmain">
    <b-card-group deck class="mb-3">
      <b-card border-variant="info" :class="report.color" class="fa" :header="report.title" footer-tag="footer" align="center" v-for="report in reports" :key="report.name">
        <p class="card-text">{{report.descript}}</p>
        <div slot="footer">
          <b-button @click="openreport(report)" style="float: right" variant="primary">查看报表<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></b-button>
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
          { route: '/main/lostreport', title: '订单流失统计报表',descript:"显示取消的宴会订单情况,按销售员小计流失情况。",color:'c1'},
          { route: '/main/fuincome', title: '分类预测汇总报表',descript:"按销售员汇总订单的分类消费预测情况。",color:'c2'},
          { route: '/main/fuincomebysaleid', title: '分类预测明细报表',descript:"显示每个宴会订单的分类消费预测情况。",color:'c3',sale:"xxxxx",begin:"xxxx"},
          { route: '/main/placeana', title: '场地利用情况分析报表',descript:"按月或年统计宴会场地利用情况,并显示去年同期数据进行对比。",color:'c4'}
        ]
      };
    },
    methods: {
      openreport: function (report) {
        if (report.hasOwnProperty('sale')) {
          this.$router.push({name: "分类预测明细报表", params: {sale: report.sale,begin:report.begin}})
        } else {
          this.$router.push({path: report.route})
        }
      }
    },
  }
</script>
<style lang="scss">
#reportmain{
  .card-text{
    height: 80px;
    float: left;
    text-align: left;
  }
  .card-deck{
    margin-right: 0;
    margin-left: 0;
    .card{
      border-color: #DADCDC!important;
      border-radius: 0;
    }
    .c1 .card-header>div:before{
      color: #7EB2DD;
    }
    .c2 .card-header>div:before{
      color: #F4BD51;
    }
    .c3 .card-header>div:before{
      color: #97C144;
    }
    .c4 .card-header>div:before{
      color: #DF6F4B;
    }
    .card-header{
      text-align: left;
    }
    .card-header>div:before{
      content: "\F080";
      padding-right: 3px;
    }
    .card-body{
      color: #7C7D7E;
    }
    .card-footer{
      .btn-primary{
        border: none;
        background: none;
        color: #545555;
        .fa-arrow-circle-o-right{
          color: #93D2F7;
          padding-left: 5px;
          font-size: 1.15rem;
        }
      }
    }
  }
}
</style>
