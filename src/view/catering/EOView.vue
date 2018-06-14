<template>
  <div class="EOFrame" style="height: 100%;">
    <b-row class="toolbar">
      <b-col sm="5">
        <div class="numdiv">
          <span>总页数:&#8195;{{totalNum}}</span>
        </div>
      </b-col>
      <b-col sm="4" class="selectdiv">
        <b-form-select v-model="scale" :options="options" class="mb-3" />
      </b-col>
      <b-col sm="3" id="toolbarViewerRight">
        <!--<b-button title="打印">-->
        <!--<i class="fa fa-print"></i>-->
        <!--</b-button>-->
        <b-button @click="exportword" title="下载">
          <i class="fa fa-download"></i>
        </b-button>
      </b-col>
    </b-row>
    <div id="EOShare" :style="{height: bodyHeight + 'px'}">
      <div id="EODoc" class="EOdiv" :style="{width: EoWeight + 'px'}"></div>
    </div>
  </div>
</template>
<script>
  import 'font-awesome/css/font-awesome.css'
  import { mapGetters, mapMutations } from 'vuex'
  import pdfjs from 'pdfjs-dist'

  import methodinfo from '../../config/MethodConst'

  let loading;

export default {
  data() {
    return {
      pdfDoc: null,
      docblob:null,
      pageNum: 1,
      totalNum :1,
      pageRendering: false,
      pageNumPending: null,
      scale: 1.4,
      EoWeight:800,
      bodyHeight: document.body.clientHeight-33,
      options: [
        { value: 1, text: '100%' },
        { value: 1.25, text: '125%' },
        { value: 1.4, text: '140%' },
        { value: 2, text: '200%'}
      ]
    }
  },
  computed: {
  },
  props:['caterid','EOKind'],
  mounted(){
    pdfjs.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js';
    this.getEOInfo();
  },
  watch:{
    scale(val,oldval){
      if(val!==oldval){
        for (let i = 1; i <= this.totalNum; i++) {
          let id = `canvas${i}`;
          this.renderPage(i,id);
        }
      }
    }
  },
  methods:{
    exportword:function () {
      let downloadElement = document.createElement('a');
      let href = window.URL.createObjectURL(this.docblob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = 'test1.pdf'; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
    },
    getEOInfo(){
      loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
      this.$store.dispatch('encrypttoken').then(() => {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
        this.$http.post(methodinfo.downloadScEO, {
          caterid:this.caterid,
          printkind:'bdate',
          printtype:this.EOKind,
          doctype:'pdf'
        }).then((response)=> {
          if (response.data.errorCode === "0") {
            let bytes = window.atob(response.data.doc);
            let ab = new ArrayBuffer(bytes.length);
            // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
            let ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
              ia[i] = bytes.charCodeAt(i);
          }
            this.docblob = new Blob([ab], {type: 'application/pdf'});
            this.showPDF(ia);
          }
        })
      })
    },
    updateEOPrintRecord(){
      this.$store.dispatch('encrypttoken').then(() => {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
        this.$http.post(methodinfo.updateEOPrintRecord, {
          caterid:this.caterid,
          printkind:this.EOKind,
          printtype:"pdf",
        }).then((response)=> {
          if (response.data.errorCode === "0") {
            this.$message.success("更新成功!")
          }
        })
      })
    },
    showPDF (ia) {
      let cvsWraper = document.getElementById('EODoc')
      pdfjs.getDocument(ia).then((pdf)=> {
        this.pdfDoc = pdf
        this.totalNum = this.pdfDoc.numPages;
        let totalNum = this.pdfDoc.numPages;
        for (let i = 1; i <= totalNum; i++) {
          let id = `canvas${i}`;
          let cvsNode = document.createElement('canvas');
          cvsNode.setAttribute('id', id);
          cvsNode.setAttribute('class', 'canvas-item');
          cvsWraper.appendChild(cvsNode);
          this.renderPage(i,id);

          if (totalNum === i) {
            loading.close();
          }
        }
      })
    },
    renderPage (num,id) {
      this.pageRendering = true
      this.pdfDoc.getPage(num).then((page)=> {
        let viewport = page.getViewport(this.scale)
        let canvas = document.getElementById(id)
        canvas.height = viewport.height
        canvas.width = viewport.width
        if(this.EoWeight!==canvas.width){
          this.EoWeight = canvas.width;
        }
        // Render PDF page into canvas context
        let renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        }
        let renderTask = page.render(renderContext)

        // Wait for rendering to finish
        renderTask.promise.then(()=> {
          this.pageRendering = false
          if (this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(this.pageNumPending)
            this.pageNumPending = null
          }
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .EOFrame{
    background-color: rgb(64, 64, 64);
    span{
      margin-top: 5px;
      color: hsl(0,0%,85%);;
    }
    .row{
      margin: 0;
    }
    .toolbar{
      position: relative;
      left: 0;
      right: 0;
      z-index: 9999;
      cursor: default;
      height: 32px;
      background-color: #474747;
      box-shadow: inset 0 1px 1px hsla(0,0%,0%,.15), inset 0 -1px 0 hsla(0,0%,100%,.05), 0 1px 0 hsla(0,0%,0%,.15), 0 1px 1px hsla(0,0%,0%,.1);
    }
    #toolbarViewerRight{
      float: right;
    }
    .numdiv{
      margin-top: 5px;
    }
    .selectdiv{
      padding-top: 2px;
    }
    .custom-select{
      font-size: 0.9rem;
      height: 29px !important;
      width: 100px;
      color: white;
      padding: 0.2rem 1.75rem 0.375rem 0.75rem;
      border: 1px solid hsla(0,0%,0%,.35);
      border-color: hsla(0,0%,0%,.32) hsla(0,0%,0%,.38) hsla(0,0%,0%,.42);
      box-shadow: 0 1px 0 hsla(0,0%,100%,.05) inset, 0 0 1px hsla(0,0%,100%,.15) inset, 0 1px 0 hsla(0,0%,100%,.05);
      background-color: #474747;
    }
    .EOdiv{
      margin: auto;
      padding: 1rem;
    }
    .canvas-item{
      margin: 0 auto;
    }
    .btn{
      background-color: transparent;
      border: none;
      height: 30px;
      margin-top: 2px;
      float: right;
    }
    .btn:hover,.btn:focus{
      background-color: rgb(64, 64, 64);
      border: 1px solid black;
    }
    .fa{
      font-size: 1.3rem;
    }
    #EOShare{
      width: 100%;
      overflow-y:auto;
    }
  }
</style>
