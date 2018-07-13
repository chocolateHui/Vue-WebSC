<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="remark">
    <b-container fluid>
      <b-row  style="font-size: 12px">
        <b-col sm="5" class="my-1 paddingright0">
          <b-input-group prepend="宴会">
            <b-form-input type="text" :value="Titleinfo.caterdes" :readonly="show.pccodedisabled" placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="5" class="my-1 paddingright0">
          <b-input-group prepend="事务" >
            <b-form-input type="text" :value="Titleinfo.eventdes" :readonly="show.descriptdisabled" placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="2" class="my-1 paddingright0">
          <b-input-group prepend="排序">
            <FormatInput type="number" maxlength="5" v-model="localscnotes.seq"></FormatInput>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row  style="font-size: 1rem">
        <b-col sm="5" class="my-1 paddingright0">
          <b-input-group prepend="标题">
            <b-form-input type="text" v-model="localscnotes.title" placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="3" class="my-1 paddingright0">
          <b-form-group horizontal :label-cols="6" label="显示在EO单" class="mb-0">
            <b-form-checkbox id="checkbox1" v-model="localscnotes.flag" value="T" unchecked-value="F" plain>
            </b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="备注时间">
            <b-form-input type="text" v-model="localscnotes.date0" readonly placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row  style="font-size: 12px ;padding-left: 12px">
        <b-form-textarea id="textarea1" v-model="localscnotes.content" :rows="12" :max-rows="12">
        </b-form-textarea>
      </b-row>
      <b-row  style="font-size: 12px ;padding-left: 12px;float: right">
        <b-btn class="mt-3" variant="outline-danger" block @click="savescnotes">确认</b-btn>
        <b-btn class="mt-3" variant="outline-danger" block @click="close">取消</b-btn>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import methodinfo from '../../config/MethodConst.js'
  import {formatDate} from '../../common/date'

  // 组件和参数
  import FormatInput from './FormatInput.vue'

  const show = {  pccodedisabled: true, descriptdisabled:  true,descript1disabled:false,descript2disabled:false ,kinddesdisabled:false,tablesdisabled:false}
  const newshow = {  pccodedisabled: true, descriptdisabled:  true,descript1disabled:false,descript2disabled:false ,kinddesdisabled:false,tablesdisabled:false}

  export default {

    data () {
      return {
        show: show,
        localscnotes:{
          flag:"F"
        },
        ty:"",
        Titleinfo:{},
      }
    },
    props:{

    },
    created(){

    },

    watch: {
      ty:function (val,oldval) {
        if(this.ty==="new"){
          this.show= show;
        }else{
          this.show=  newshow;
        }
      },
      noteparam:function (val,oldval) {
        this.Titleinfo = Object.assign({},val);
        this.getremark();

      },
    },
    computed: {
      ...mapGetters([
        "noteparam"
      ]),
    },
    methods: {
      getremark(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
          this.$http.post(methodinfo.getscnotelist, {
              caterid: this.noteparam.caterid,
              eventid: this.noteparam.eventid,
              itemid: this.noteparam.itemid,
              type: this.noteparam.type
            }).then((response) =>{
              if (response.data.errorCode === '0') {
                if (typeof (response.data.notes) !== 'undefined') {
                  let type = response.data.notes[0]
                  type['isnew'] = 'F'
                  this.localscnotes = type;
                } else {
                  let type = this.noteparam
                  type['isnew'] = 'T'
                  type['flag'] = 'F'
                  this.localscnotes = Object.assign({},type);
                }
              } else {
                this.$message(response.data.errorMessage)
              }
            })
        })
      },
      close:function(){
        this.$root.$emit('bv::hide::modal','remarkmodal')
      },
      updatescnotes(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.updatescnoteinfo, this.localscnotes).then((response)=> {
              if(response.data.errorCode==="0"){
                this.$message({
                  type: '保存',
                  message: '保存成功!'
                });
                this.$emit('onhide');
               this.getremark()
              }
              else{
                this.$message.error({
                  type: '保存',
                  message:response.data.errorMessage
                });
              }
          })
        })
      },
      newscnotes(){
        if(!this.localscnotes.title){
          this.$message.error({
            type: '保存',
            message:"标题不能为空"
          });
          return;
        }
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.localscnotes.date0=formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
          this.$http.post(methodinfo.newscnoteinfo, this.localscnotes).then((response)=> {
              if(response.data.errorCode==="0"){
                this.$message({
                  type: '新建',
                  message: '新建成功!'
                });
                this.$root.$emit('bv::hide::modal','remarkmodal')
                this.getremark()
              }
              else{
                this.$message.error({
                  type: '保存',
                  message:response.data.errorMessage
                });
              }

          })
        })
      },
      savescnotes:function(){
        if(this.localscnotes.isnew==="F"){
          this.updatescnotes();
        }
        else{
          this.newscnotes();
        }

      }
    },
    components: {
      FormatInput
    },
  }
</script>
<style lang="scss" type="text/scss">
  #remark{
    .paddingright0 {
      padding-right: 0px;
    }
    .form-check-inline{
      padding-top: 10px;
    }
   .btn {
      width: 92px;
      margin-left: 5px;
      border-radius: 0.25rem;
    }
    .row{
      margin-right: 0;
    }
    .custom-control {
      min-height: 0.6rem;
    }
    .form-control[readonly]{
      background-color: white;
    }
    .form-row > .col, .form-row > [class*="col-"] {
      padding-right: 0px;
    }
    #textarea1{
      height: 300px;
    }
  }
</style>
