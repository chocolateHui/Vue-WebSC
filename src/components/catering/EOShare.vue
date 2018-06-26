<template>
  <div id="EOShare">
    <b-container fluid>
      <b-row>
        <b-col sm="6">
          <label>宴会名称:&#8195;{{catering.name}}</label>
        </b-col>
        <b-col sm="6">
          <label>宴会ID:&#8195;{{caterid}}</label>
        </b-col>
      </b-row>
      <el-table
        ref = "eoprinttable"
        :data="eoprintdatas"
        height="260"
        border
        style="width: 100%">
        <el-table-column
          v-for="item in fildes"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          :class-name="item.classname"
          :show-overflow-tooltip="item.showTip" :key="item.prop">
        </el-table-column>
      </el-table>
      <b-row class="radio-row">
        <b-form-group>
          <b-form-radio-group id="radios1" v-model="kindselected" name="kindradios">
            <b-form-radio value="all">整单</b-form-radio>
            <b-form-radio value="change">变更单</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-row>
      <b-row class="radio-row">
        <b-form-group>
          <b-form-radio-group id="radios2" v-model="doctypeselected" name="typeradios">
            <b-form-radio value="pdf">预览</b-form-radio>
            <b-form-radio value="word">下载</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-row>
      <b-row class="footer-row">
        <b-col sm="6"></b-col>
        <b-col sm="3">
          <b-btn @click="EOConfirm" variant="primary">确定</b-btn>
        </b-col>
        <b-col sm="3">
          <b-btn @click="exitModal">退出</b-btn>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst'

  const fildes = [
    {  prop: 'eono', label:  '打印流水号',width:'150',sortable:true,"classname":"text-center" },
    {  prop: 'printkind', label:  '类型',width:'60',showTip:true,"classname":"text-center"},
    {  prop: 'changed', label:  '处理时间',width:'140',sortable:true,showTip:true,"classname":"text-center"},
    {  prop: 'cby', label:  '处理人',width:'',showTip:true}
  ]

  export default {
    data () {
      return {
        eoprintdatas:[],
        fildes :fildes,
        kindselected:'all',
        doctypeselected:'pdf'
      }
    },
    computed: {
      ...mapGetters([
        'caterid',
        'catering',
        'sc_eo_group'
      ])
    },
    created(){

    },
    methods: {
      EOConfirm(){
        if(this.doctypeselected==="pdf"){
          let routeData = this.$router.resolve({
            name: "宴会预订EO单",
            params: {
              caterid: this.caterid,
              EOKind:this.kindselected,
            }
          });
          window.open(routeData.href, '_blank');
        }else{
          const loading = this.$loading.service({fullscreen:true, background: 'rgba(0, 0, 0, 0.7)'});
          let printtype= this.scEoGroup.val;
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.downloadScEO, {
              caterid:this.caterid,
              printkind:this.kindselected,
              printtype:printtype,
              doctype:'word'
            }).then((response)=> {
              if (response.data.errorCode === "0") {
                loading.close();
                let bytes = window.atob(response.data.doc);
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
                downloadElement.download = this.caterid+".docx"; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放掉blob对象

                this.updateEOPrintRecord();
              }
            })
          })
        }
        this.$root.$emit('bv::hide::modal','EOSharemodal')
      },
      getEOPrintRecord(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.getEOPrintRecord, {
            caterid:this.caterid
          }).then((response)=> {
            if (response.data.errorCode === "0") {
              for(let elem of response.data.printlist){
                this.eoprintdatas.push(elem);
              }
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
            printkind:this.kindselected,
            printtype:this.doctypeselected,
          }).then((response)=> {
            if (response.data.errorCode === "0") {
              this.$message.success("更新成功!")
            }
          })
        })
      },
      exitModal(){
        this.$root.$emit('bv::hide::modal','EOSharemodal')
      }
    }
  }
</script>
<style lang="scss">
  #EOShare{
    .el-table td, .el-table th{
      padding: 0;
    }
    .btn{
      width: 100px;
    }
    .form-group{
      margin-left: 150px;
      margin-bottom: 0;
    }
    label{
      font-size: 1rem;
    }
    .radio-row{
      padding: 5px 0;
    }
  }
</style>
