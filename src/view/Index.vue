<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="indexpanel" class="router-template2">
    <div class="template-wrap2" >
      <b-container class="height100 width99">
        <b-row ref="tu" class="paddingbottom15">
          <b-col cols="8" class="paddingright0">
            <b-card border-variant="info" header="未来一周宴会会场走势图"  header-tag="header" align="left" class="height100">
              <div id="myChart" :style="{width: '760px', height: '260px'}"></div>
              <div slot="header">
                <span>未来一周宴会会场走势图</span>
                <i class="fa fa-refresh refresh" @click="refreshline" aria-hidden="true"></i>
              </div>
            </b-card>
          </b-col>
          <b-col cols="4" class="paddingright0">
            <div class="width100">
              <b-card border-variant="info" header-title="未来一周宴会会场排行" header-tag="header" align="left" class="widht50 height50 marginbottom15">
                <div id="myChart3" :style="{width: '328px', height: '90px'}"></div>
                <div slot="header">
                  <span>未来一周宴会会场排行</span>
                  <i class="fa fa-refresh refresh" @click="refreshzhu" aria-hidden="true"></i>
                </div>
              </b-card>

              <b-card border-variant="info" header="未来一周宴会类型" header-tag="header" align="left" class="widht50 height50 ">
                <div id="myChart2" :style="{width: '328px', height: '140px'}"></div>
                <div slot="header">
                  <span>未来一周宴会类型</span>
                  <i class="fa fa-refresh refresh" @click="refreshpie" aria-hidden="true"></i>
                </div>
              </b-card>
            </div>

          </b-col>

        </b-row>

        <b-row >
          <b-col cols="4" class="paddingright0">
            <b-card border-variant="info" header="本日宴会事务列表" header-tag="header" align="left" class="height100 c1">
              <div slot="header">
                <span>本日宴会事务列表</span>
                <i class="fa fa-refresh refresh" @click="refreshtable1" aria-hidden="true"></i>
              </div>
              <el-table
                :data="tableData1"
                border
                stripe
                :height="tableHeight"
                style="width: 100%">
                <el-table-column
                  property="descript"
                  :show-overflow-tooltip=true
                  label="事务名称"
                  width="90">
                </el-table-column>
                <el-table-column
                  property="codedes"
                  :show-overflow-tooltip=true
                  label="场地描述"
                  width="">
                </el-table-column>
                <el-table-column
                  property="typedes"
                  :show-overflow-tooltip=true
                  label="类型"
                  width="60">
                </el-table-column>
                <el-table-column
                  property="bdate"
                  :show-overflow-tooltip=true
                  label="事务日期"
                  width="70">
                </el-table-column>
                <el-table-column
                  property="begintime"
                  :show-overflow-tooltip=true
                  label="开始日期"
                  width="70">
                </el-table-column>
              </el-table>
            </b-card>
          </b-col>
          <b-col cols="4" class="paddingright0">
            <b-card border-variant="info" header="未来一周即将到来的宴会团" header-tag="header" align="left" class="height100 c2">
              <div slot="header">
                <span>未来一周即将到来的宴会团</span>
                <i class="fa fa-refresh refresh" @click="refreshtable2" aria-hidden="true"></i>
              </div>
              <el-table
                :data="tableData2"
                border
                stripe
                :height="tableHeight"
                style="width: 100%">
                <el-table-column
                  property="name"
                  :show-overflow-tooltip=true
                  label="宴会名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  property="saleid_name"
                  :show-overflow-tooltip=true
                  label="销售员"
                  width="80">
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip=true
                  property="arr"
                  label="抵达日期"
                  width="">
                </el-table-column>
                <el-table-column
                  property="remark"
                  :show-overflow-tooltip=true
                  label="备注"
                  width="80">
                </el-table-column>
              </el-table>
            </b-card>
          </b-col>
          <b-col cols="4" class="paddingright0">
            <b-card border-variant="info" header="未来一周客户需要确认的订单" header-tag="header" align="left" class="height100 c3">
              <div slot="header">
                <span>未来一周即将到来的宴会团</span>
                <i class="fa fa-refresh refresh" @click="refreshtable3" aria-hidden="true"></i>
              </div>
              <el-table
                :data="tableData3"
                border
                stripe
                :height="tableHeight"
                style="width: 100%">
                <el-table-column
                  property="name"
                  :show-overflow-tooltip=true
                  label="宴会名称"
                  width="">
                </el-table-column>
                <el-table-column
                  property="saleid_name"
                  :show-overflow-tooltip=true
                  label="销售员"
                  width="tableHeight">
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
  import Vue from 'vue'
  import {formatDate}  from '../common/date.js'
  import methodinfo from '../config/MethodConst.js'
  import 'font-awesome/css/font-awesome.css'
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/pie')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/legendScroll')
  export default {

    data () {

      return {
        tableData1: [],
        tableData2: [],
        tableData3: [],
        maxnum:'',
        linenumdata:[],
        linetimedata:[],
        piedata:[],
        zhuydata:[],
        zhuxdata:[],
        tuHeight:"",
        tableHeight: ""
      }
    },
    created(){
      this.tableHeight = document.body.clientHeight-480
    },
    mounted() {

      this.getlinedata();
      this.getpiedata();
      this.getzhudata();
      this.gettable1data();
      this.gettable2data();
      this.gettable3data();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: "宴会总场地"+this.maxnum+"场",
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
        let myChart = echarts.init(document.getElementById('myChart2'))
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
        let myChart = echarts.init(document.getElementById('myChart3'));

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
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getplacerentinfo, {
            bdate:formatDate(new Date(),"yyyy-MM-dd")
            // bdate:"2018-04-09"
          }).then((response)=> {
            if (response.status === 200) {
              this.maxnum =  response.data.placenum;
              this.linenumdata = [];
              this.linetimedata= [];
              for(let rentinfo of response.data.rentinfo){
                this.linenumdata.push(rentinfo.rentnum);
                this.linetimedata.push(rentinfo.bdate);
              }
            }
            this.drawLine();
          })
        })
      },
      getpiedata(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.geteventtypecompose, {
            bdate:formatDate(new Date(),"yyyy-MM-dd")
            // bdate:"2018-04-09"
          }).then((response)=> {
            if (response.status === 200) {
              this.piedata = [];
              if(typeof(response.data.typeinfo) == "undefined"){
                var types = {};
                types["value"]=0;
                types["name"]='总量';
                this.piedata.push(types);
              }
              else{
                for(let typeinfo of response.data.typeinfo){
                  var types = {};
                  types["value"]=typeinfo.typenum;
                  types["name"]=typeinfo.descript;
                  this.piedata.push(types);
                }
              }

            }
            this.drawpie();
          })
        })
      },
      getzhudata(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getplacerankinfo, {
            bdate:formatDate(new Date(),"yyyy-MM-dd")
            // bdate:"2018-04-09"
          }).then((response)=> {
            if (response.status === 200) {
              this.zhuxdata = [];
              this.zhuydata = [];
              if(typeof(response.data.rankinfo) != "undefined"){
                var labelRight = {
                  normal: {
                    position: 'right'
                  }
                }
                var rankinfo = response.data.rankinfo;
                if(rankinfo.length<=2){
                  for(var i=rankinfo.length-1;i>=0;i--){
                    this.zhuxdata.push(rankinfo[i].descript);
                    var types={};
                    types["value"]=rankinfo[i].rentnum;
                    types["label"]=labelRight;
                    this.zhuydata.push(types);
                  }
                }
                else{
                  for(var i=2;i>=0;i--){
                    this.zhuxdata.push(rankinfo[i].descript);
                    var types={};
                    types["value"]=rankinfo[i].rentnum;
                    types["label"]=labelRight;
                    this.zhuydata.push(types);
                  }
                }
              }

            }
            this.drawzhu();
          })
        })
      },
      gettable3data(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          var edate = new Date();
          edate.setDate(new Date().getDate()+7 );
          this.$http.post(methodinfo.getcateringlist, {
            sdate:formatDate(new Date(),"yyyy-MM-dd"),
            edate:formatDate(edate,"yyyy-MM-dd"),
            sta:'1'
            // bdate:"2018-04-09"
          }).then((response)=> {
            if (response.status === 200) {
              this.tableData3 = [];
              if(typeof(response.data.caterings) != "undefined"){
                for(let caterings of response.data.caterings){
                  var types = {};
                  types["name"]=caterings.name;
                  types["saleid_name"]=caterings.saleid_name;
                  this.tableData3.push(types);
                }

              }
            }
          })
        })
      },
      gettable2data(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          var edate = new Date();
          edate.setDate(new Date().getDate()+7 );
          this.$http.post(methodinfo.getcateringlist, {
            sdate:formatDate(new Date(),"yyyy-MM-dd"),
            edate:formatDate(edate,"yyyy-MM-dd"),
            sta:'1,2'
            // bdate:"2018-04-09"
          }).then((response)=> {
            if (response.status === 200) {
              if(typeof(response.data.caterings) != "undefined"){
                this.tableData2 = [];
                for(let caterings of response.data.caterings){
                  var types = {};
                  types["name"]=caterings.name;
                  types["saleid_name"]=caterings.saleid_name;
                  types["arr"]=caterings.arr;
                  types["remark"]=caterings.remark;
                  this.tableData2.push(types);
                }

              }
            }
          })
        })
      },
      gettable1data(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          var edate = new Date();
          edate.setDate(new Date().getDate()+7 );
          this.$http.post(methodinfo.geteventlist, {
            begindate:formatDate(new Date(),"yyyy-MM-dd"),
            enddate:formatDate(new Date(),"yyyy-MM-dd")
            // bdate:"2018-04-09"
          }).then((response)=> {
            if (response.status === 200) {
              this.tableData1 = [];
              if(typeof(response.data.events) != "undefined"){
                for(let events of response.data.events){
                  var types = {};
                  types["descript"]=events.descript;
                  types["codedes"]=events.codedes;
                  types["typedes"]=events.typedes;
                  types["bdate"]=events.bdate;
                  types["begintime"]=events.begintime;
                  this.tableData1.push(types);
                }

              }
            }
          })
        })
      },
      refreshline: function () {
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        setTimeout(() => {
          loading.close();
        }, 500);
        this.getlinedata();
      },
      refreshpie: function () {
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        setTimeout(() => {
          loading.close();
        }, 500);
        this.getpiedata();
      },
      refreshzhu: function () {
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        setTimeout(() => {
          loading.close();
        }, 500);
        this.getzhudata();
      },
      refreshtable1: function () {
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        setTimeout(() => {
          loading.close();
        }, 500);
        this.gettable1data();
      },
      refreshtable2: function () {
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        setTimeout(() => {
          loading.close();
        }, 500);
        this.gettable2data();
      },
      refreshtable3: function () {
        const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
        setTimeout(() => {
          loading.close();
        }, 500);
        this.gettable3data();
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
      padding-left: 15px;
      padding-right: 15px;
    }
    .width100{
      width: 100%;
    }
    .width99{
      width: 99%;
    }
    .width50{
      width: 50%;
    }
    .height100{
      height: 100%;
    }
    .card {
      margin-bottom: 0px;
      border-color: #ccc!important;
      border-radius: 0px;
    }
    .card-text{
      height: 70px;
      float: left;
    }
    .card-body {
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      padding: 0rem!important;
    }
    .cell {
      font-size:12px;
      height: 20px;
    }
    .el-table{
      thead {
        th,td{
          background: linear-gradient(#fff, #F4F5F6);
        }
      }
      th,td {
        padding: 6px 0
      }
    }
    .paddingright0{
      padding-right: 0px;
      .c1,.c2,.c3{
        .card-header{ color: #ffffff}
      }
      .c1{
        .card-header{
          background-color: #ffb751;
          border-color: #ffb751;
          border-radius: 0px;
        }
      }
      .c2{
        .card-header{
          background-color: #b39ddb;
          border-color: #b39ddb;
          border-radius: 0px;
        }
      }
      .c3{
        .card-header{
          background-color: #53bb80;
          border-color: #53bb80;
          border-radius: 0px;
        }
      }
    }
    .paddingbottom15{
      padding-bottom: 15px;
      .card-header {
        .refresh { color: #ffb751;}
      }
    }
    .marginbottom15{
      margin-bottom: 15px;
    }
    .card-header {
      padding: 0.3rem 1.25rem 0.3rem!important;
    }
    .container {
      width: 100%!important;
      max-width: 99%!important;
      padding-right: 0px;
      padding-left: 0px;
      margin-right: 0px;
      margin-left: 0px;
    }
    .refresh {
      float: right;
      padding-top: 4px;
    }


  }

</style>
