<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="indexpanel" class="router-template2">
    <div class="template-wrap2" >
      <b-container class="height100 width100">
        <b-row class="paddingbottom15">
            <b-col cols="8" class="paddingright0">
              <b-card border-variant="info" header="未来一周宴会会场走势图" footer-tag="footer" align="left" class="height100">
                <div id="myChart" :style="{width: '760px', height: '260px'}"></div>
              </b-card>
            </b-col>
            <b-col cols="4" class="paddingright0">
              <div class="width100">
                <b-card border-variant="info" header="未来一周宴会会场排行" footer-tag="footer" align="left" class="widht50 height50 marginbottom15">
                  <div id="myChart3" :style="{width: '328px', height: '90px'}"></div>
                </b-card>

                <b-card border-variant="info" header="未来一周宴会类型" footer-tag="footer" align="left" class="widht50 height50 ">
                  <div id="myChart2" :style="{width: '328px', height: '140px'}"></div>
                </b-card>
              </div>

            </b-col>

        </b-row>

        <b-row >
          <b-col cols="4" class="paddingright0">
            <b-card border-variant="info" header="本日宴会事务列表" footer-tag="footer" align="left" class="height100">
              <el-table
                :data="tableData"
                border
                stripe
                height="180"
                style="width: 100%">
                <el-table-column
                  property="date"
                  label="事务名称"
                  width="90">
                </el-table-column>
                <el-table-column
                  property="name"
                  label="场地描述"
                  width="75">
                </el-table-column>
                <el-table-column
                  property="address"
                  label="类型"
                  width="60">
                </el-table-column>
                <el-table-column
                  property="bdate"
                  label="事务日期"
                  width="80">
                </el-table-column>
                <el-table-column
                  property="start"
                  label="开始日期"
                  width="80">
                </el-table-column>
              </el-table>
            </b-card>
          </b-col>
          <b-col cols="4" class="paddingright0">
            <b-card border-variant="info" header="未来一周即将到来的宴会团" footer-tag="footer" align="left" class="height100">
              <el-table
                :data="tableData"
                border
                stripe
                height="180"
                style="width: 100%">
                <el-table-column
                  property="date"
                  label="宴会名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  property="name"
                  label="销售员"
                  width="80">
                </el-table-column>
                <el-table-column
                  property="address"
                  label="抵达日期"
                  width="105">
                </el-table-column>
                <el-table-column
                  property="remark"
                  label="类型"
                  width="80">
                </el-table-column>
              </el-table>
            </b-card>
          </b-col>
            <b-col cols="4" class="paddingright0">
              <b-card border-variant="info" header="未来一周客户需要确认的订单" footer-tag="footer" align="left" class="height100">
                <el-table
                  :data="tableData"
                  border
                  stripe
                  height="180"
                  style="width: 100%">
                  <el-table-column
                    property="date"
                    label="宴会名称"
                    width="205">
                  </el-table-column>
                  <el-table-column
                    property="name"
                    label="销售员"
                    width="180">
                  </el-table-column>
                </el-table>
              </b-card>
            </b-col>



        </b-row>


      </b-container>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      var labelRight = {
        normal: {
          position: 'right'
        }
      }
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        maxnum:'40',
        linenumdata:[5, 20, 36, 10, 10, 20,25],
        linetimedata:["3-16","3-17","3-18","3-19","3-20","3-21","3-22"],
        piedata:[{
          value: 5,
          name: "会议",
        }, {
          value: 8,
          name: "活动",
        }, {
          value: 9,
          name: "宴会",
        }, {
          value :11,
          name: "事务",
        }],
        zhuydata:[
          {value: 5, label: labelRight},
          {value: 10, label: labelRight},
          {value: 20, label: labelRight}
        ],
        zhuxdata:[ '咫尺天涯', '海清河晏','中庭大堂'],
      }
    },
    mounted() {
      this.drawLine();
      this.drawpie();
      this.drawzhu();
      this.getevem
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: "宴会总场地 72场",
            left: 15,
            top:10,
          },
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data:this.linetimedata
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            max: this.maxnum
          },
          series: [{
            name: "出租数",
            type: "line",
            data:this.linenumdata ,
            markPoint: {
              data: [{
                type: "max",
                name: "最大值"
              },
                {
                  type: "min",
                  name: "最小值"
                }]
            }
          }]
        });
      },
      drawpie() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        myChart.setOption({
          title: {
            x: "center",
            subtextStyle: {
              fontSize: 14,
              fontFamily: "Microsoft YaHei",
              fontWeight: "bold",
              color: "black"
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a}<br/>{b}:{c}({d}%)"
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            x: "left",
            left: 230,
            top: 10,
            data:this.piedata,
            formatter: function(e) {
              return (e.length > 2 ? (e.slice(0, 2) + "...") : e)
            }
          },
          series: [{
            type: "pie",
            radius: ["0%", "80%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            color: ["#ff8440", "#ed524a", "#7dc42c", "#1bc1c1", "#30a2ce", "#995097", "#c6618a", "#ffba31"],
            data:this.piedata,
            label: {
              normal: {
                show: false
              }
            }
          }]
        });
      },
      drawzhu() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart3'));

        // 绘制图表
        myChart.setOption({
          title: {
            text: ''
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 10,
            left:80,
            bottom: 10,

          },
          xAxis: {
            type : 'value',

            // position: 'top',
            axisLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            splitLine:{show: false},
            // data : [ '咫尺天涯', '海清河晏','中庭大堂']
          },
          yAxis: {
            type : 'category',

            axisLine: {show: false},
            // axisLabel: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
            data :this.zhuxdata
          },
          series : [
            {
              name:'场数',
              // color: ["#ff8440", "#ed524a", "#7dc42c", "#1bc1c1", "#30a2ce", "#995097", "#c6618a", "#ffba31"],
              type:'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  // formatter: '{b}',
                  position: 'left'
                }
              },
              itemStyle: {
                normal: {
                  // 随机显示
                  //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                 label : {show: true, position: 'inside'},
                  // 定制显示（按顺序）
                  color: function(params) {
                    var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ];
                    return colorList[params.dataIndex]
                  }
                },
              },
              data:this.zhuydata
            }
          ]
        });
      },
      getlinedata(){

      }
    }



  }
</script>
<style lang="scss"  type="text/scss">
  #indexpanel{
    .router-template2 {
      color: #000;
      font-size: 15px;
      font-weight: 400;
      height: 100%;
    }
    .template-wrap2 {
      height: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: left;
    }
    .width100{
      width: 100%;
    }
    .width50{
      width: 50%;
    }
    .height100{
      height: 100%;
    }

    .card-text{
      height: 70px;
      float: left;
    }
    .card-body {
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      padding: 0rem;
    }
    .cell {
     font-size:12px;
     height: 20px;
    }
    .el-table td, .el-table th {
      padding: 6px 0
    }
    .paddingright0{
      padding-right: 0px;
    }
    .paddingbottom15{
      padding-bottom: 15px;
    }
    .marginbottom15{
      margin-bottom: 15px;
    }
    .card-header {
      padding: 0.3rem 1.25rem 0.3rem!important;
    }
    .container {
      width: 100%!important;
      max-width: 100%!important;
      padding-right: 0px;
      padding-left: 0px;
       margin-right: 0px;
       margin-left: 0px;
    }
  }

</style>
