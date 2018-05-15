<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="remark">
    <b-container fluid>
      <b-row  style="font-size: 12px">
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="宴会">
            <b-form-input
              type="text"
            v-model="notescatername"
            required
            :disabled="show.pccodedisabled"
            @input.native="updateValue"
            placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="事务" >
            <b-form-input
              type="text"
              v-model="notesevent"
              required
              :disabled="show.descriptdisabled"
              @input.native="updateValue"
              placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="排序">
            <b-form-input
              type="text"
              v-model="notesseq"
              required
              :disabled="show.descript1disabled"
              placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row  style="font-size: 1rem">
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="标题">
            <b-form-input
              type="text"
              v-model="notestitle"
              :disabled="show.descript2disabled"
              required
              placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="4" class="my-1 paddingright0">
          <b-form-group horizontal :label-cols="4" label="显示在EO单" class="mb-0">
            <b-form-checkbox id="checkbox1"
                             v-model="flag"
                             value="T"
                             unchecked-value="F">
            </b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="备注时间">
            <b-form-input
              type="text"
              v-model="notestime"
              :disabled="show.tablesdisabled"
              required
              placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row  style="font-size: 12px ;padding-left: 12px">
        <b-form-textarea id="textarea1"
                         v-model="scnotes"
                         placeholder="Enter something"
                         :rows="12"
                         :max-rows="12">
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
  import methodinfo from '../../config/MethodConst.js'
  // import methodinfo from '../config/MethodConst.js'
  const show = {  pccodedisabled: true, descriptdisabled:  true,descript1disabled:false,descript2disabled:false ,kinddesdisabled:false,tablesdisabled:false}
  const newshow = {  pccodedisabled: true, descriptdisabled:  true,descript1disabled:false,descript2disabled:false ,kinddesdisabled:false,tablesdisabled:false}

  export default {
    data () {
      return {
        show: show,
        // remarkinfo:this.remark,
        flag:'T',
        notescatername:'',
        notesevent:'',
        noteparams:{},
        status: 'not_accepted',
        notesid:'',
        notestitle:'',
        notesseq:'',
        scnotes:'',
        notestime:'',
        saveparams:{},
        ty:"",
      }
    },
    props:['remarklist','cateridC','eventidC','ifnotechecked','num'],
    watch: {
      ty:function (val,oldval) {
        if(this.ty=="new"){
          this.show= show;
        }else{
          this.show=  newshow;
        }
      },
      num:function (val,oldval) {
        this.getremark();
      },
    },

    methods: {
      updateValue(event) {
        console.log(event);
        if(!event.isComposing){
          return event.data;
        }else{
          event.preventDefault();
        }
      },
      configDefault:function () {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
      },
      syncPost(paramdata,async){
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          return new Promise((resolve, reject) => {
            this.configDefault()
            this.$http.post(methodinfo.getscnotelist, {
              caterid:paramdata.caterid,
              eventid:paramdata.eventid,
              itemid:paramdata.itemid,
              type:paramdata.type,
            }).then((response) => {
              if (response.status === 200) {
                if(typeof response.data.notes==='undefined'){
                  this.notesid ='';
                  this.notestitle='';
                  this.notesseq='';
                  this.scnotes='';
                  this.ty="new"
                }else{
                  var note = response.data.notes[0];
                  this.notesid = note.uuid;
                  this.notestitle=note.title;
                  this.notesseq=note.seq;
                  this.scnotes=note.content;
                  this.notestime=note.date0;
                  this.flag=note.flag
                  this.ty="updata"
                }
              }
            })
          })
        })
      },
      getremark(){
        this.notescatername=this.remarklist.catername
        this.notesevent=this.remarklist.descript
        this.noteparams={
          caterid:this.cateridC,
          eventid:this.remarklist.eventid,
          itemid:null,
          type:'2',
        }
        this.syncPost(this.noteparams,false)
        },
      close:function(){
        this.$emit('onhide');
      },
      savescnotes:function(){
        if(this.notestitle==''){
          this.$message({
            message:"备注标题不能为空",
            type: "warning"
          });
          return;
        }
        if(this.scnotes==''&&this.notesid==''){
          this.$message({
            message:"备注标题不能为空",
            type: "warning"
          });
          return;
        }
        this.saveparams={
          caterid:this.remarklist.caterid,
          eventid:this.remarklist.eventid,
          itemid:null,
          type:'2',
          seq:this.notesseq,
          title:this.notestitle,
          content:this.scnotes,
          uuid:this.notesid
        }
        if(this.notesid==''){
          var method=methodinfo.newscnoteinfo
          this.$emit('btnsave1',this.saveparams,method,this.ifnotechecked)
        }else{
          var method=methodinfo.updatescnoteinfo
          this.$emit('btnsave1',this.saveparams,method,this.ifnotechecked)
        }
      }
      },
    mounted:function () {
      this.getremark()
    }
  }
</script>
<style lang="scss" type="text/scss">
  #remark{
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
    .paddingright0 {
      padding-right: 0px;
    }
    .form-row > .col, .form-row > [class*="col-"] {
      padding-right: 0px;
    }
  }
</style>
