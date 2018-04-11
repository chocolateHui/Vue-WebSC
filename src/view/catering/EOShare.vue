<template>
  <div style="height: 100%;overflow-y: auto">
    <div id="EOShare" class="EOdiv">
      <h2>宴会预订EO单</h2>
      <table>
        <tr>
          <b-row>
            <b-col sm="2" class="my-1">
              <span>预订单位:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span>西软公司</span>
            </b-col>
            <b-col sm="2" class="my-1">
              <span>EO单号:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span>E18041000000001</span>
            </b-col>
          </b-row>
        </tr>
        <tr>
          <b-row>
            <b-col sm="2" class="my-1">
              <span>联系人:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span>王女士</span>
            </b-col>
            <b-col sm="2" class="my-1">
              <span>宴会负责人:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span>周先生</span>
            </b-col>
          </b-row>
        </tr>
        <tr>
          <b-row>
            <b-col sm="2" class="my-1">
              <span>联系电话:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span></span>
            </b-col>
            <b-col sm="2" class="my-1">
              <span>销售员:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span>销售</span>
            </b-col>
          </b-row>
        </tr>
        <tr>
          <b-row>
            <b-col sm="2" class="my-1">
              <span>传真:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span></span>
            </b-col>
            <b-col sm="2" class="my-1">
              <span>现场联系人:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span>销售</span>
            </b-col>
          </b-row>
        </tr>
        <tr>
          <b-row>
            <b-col sm="2" class="my-1">
              <span>团队帐号:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span></span>
            </b-col>
            <b-col sm="2" class="my-1">
              <span>团队名称:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span>销售</span>
            </b-col>
          </b-row>
        </tr>
        <tr>
          <b-row>
            <b-col sm="2" class="my-1">
              <span>联系地址:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span></span>
            </b-col>
            <b-col sm="2" class="my-1">
              <span>宴会主题:</span>
            </b-col>
            <b-col sm="4" class="my-1">
              <span>销售</span>
            </b-col>
          </b-row>
        </tr>
        <tr>
          <b-row>
            <b-col sm="2" class="my-1">
              <span>宴会备注:</span>
            </b-col>
            <b-col sm="10" class="my-1">
            <span>备注测试
            </span>
            </b-col>
          </b-row>
        </tr>
      </table>
      <caption>
        宴会事务(EVENT)
      </caption>
      <table class="eventtable">
        <tr>
          <b-row>
            <b-col sm="2" class="tr-col th-col">
              <span><strong>事务日期</strong></span>
            </b-col>
            <b-col sm="2" class="tr-col th-col">
              <span><strong>场地</strong></span>
            </b-col>
            <b-col sm="1" class="tr-col th-col">
              <span><strong>场租</strong></span>
            </b-col>
            <b-col sm="2" class="tr-col th-col">
              <span><strong>描述</strong></span>
            </b-col>
            <b-col sm="2" class="tr-col th-col">
              <span><strong>事务时间</strong></span>
            </b-col>
            <b-col sm="1" class="tr-col th-col">
              <span><strong>人数</strong></span>
            </b-col>
            <b-col sm="2" class="tr-col-1 th-col">
              <span><strong>预测收入</strong></span>
            </b-col>
          </b-row>
        </tr>
        <tr v-for="event in events">
          <b-row>
            <b-col sm="2" class="tr-col">
              <span>{{event.bdate}}</span>
            </b-col>
            <b-col sm="2" class="tr-col">
              <span>{{event.place}}</span>
            </b-col>
            <b-col sm="1" class="tr-col" style="text-align: right">
              <span>{{event.price}}</span>
            </b-col>
            <b-col sm="2" class="tr-col">
              <span>{{event.descript}}</span>
            </b-col>
            <b-col sm="2" class="tr-col">
              <span>{{event.time}}</span>
            </b-col>
            <b-col sm="1" class="tr-col">
              <span>{{event.att}}</span>
            </b-col>
            <b-col sm="2" class="tr-col-1">
              <span>{{event.income}}</span>
            </b-col>
          </b-row>
        </tr>
      </table>
      <caption>
        宴会项目(ITEM)
      </caption>
      <table class="itemtable">
        <tr>
          <b-row>
            <b-col sm="2" class="tr-col th-col">
              <span><strong>事务日期</strong></span>
            </b-col>
            <b-col sm="2" class="tr-col th-col">
              <span><strong>事务场地</strong></span>
            </b-col>
            <b-col sm="2" class="tr-col th-col">
              <span><strong>事务时间</strong></span>
            </b-col>
            <b-col sm="3" class="tr-col th-col">
              <span><strong>项目描述</strong></span>
            </b-col>
            <b-col sm="1" class="tr-col th-col">
              <span><strong>数量</strong></span>
            </b-col>
            <b-col sm="2" class="tr-col-1 th-col">
              <span><strong>金额</strong></span>
            </b-col>
          </b-row>
        </tr>
      </table>
      <b-row>
        <b-col sm="10" class="my-1">
        </b-col>
        <b-col sm="2" class="my-1">
          <b-button @click="exportword" variant="primary">下载</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
const events = [
  {bdate:'2018-04-10',place:'宴会厅',price:1000000,descript:'宴会事务'},
  {bdate:'2018-04-10',place:'宴会厅',price:0,descript:'宴会事务'},
  {bdate:'2018-04-10',place:'宴会厅',price:0,descript:'宴会事务'}
]

export default {
  data() {
    return {
      events:events
    }
  },
  methods:{
    exportword:function () {
      let bytes = window.atob(docjson.doc);
      let ab = new ArrayBuffer(bytes.length);
      // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      let blob = new Blob([ab], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
      let downloadElement = document.createElement('a');
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = 'test1.docx'; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
    }
  }
}
</script>
<style scoped lang="scss">
  .EOdiv{
    width: 800px;
    margin: auto;
    background-color: white;
    padding: 1rem;
    border: 1px solid #dee2e6;
  }
  #EOShare{

    h2{
      text-align: center;
    }
    table{
      width: 100%;
      margin-bottom: 0.5rem;
      border: 1px solid ;
      .row{
        margin-left: 0;
        margin-right: 0;
      }
    }
    .eventtable,.itemtable{
      tr{
        border-bottom: 1px solid;
        .th-col{
          text-align: center;
        }
        .tr-col{
          border-right: 1px solid;
          padding-left: 0.25rem;
          padding-right: 0.25rem;
        }
        .tr-col-1{
          padding-left: 0.25rem;
          padding-right: 0.25rem;
        }
      }
    }
    caption{
      width: 100%;
    }
    .btn{
      margin: auto;
      width: 100px;
    }
  }
</style>
