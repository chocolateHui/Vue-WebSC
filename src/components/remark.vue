<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div id="remark">
    <b-container fluid>
      <b-row  style="font-size: 12px">
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="宴会">
            <b-form-input
              type="text"
            v-model="remarkinfo.caterdes"
            required
            :disabled="changeshow.pccodedisabled"
            @input.native="updateValue"
            placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="事务" >
            <b-form-input
              type="text"
              v-model="remarkinfo.eventdes"
              required
              :disabled="changeshow.descriptdisabled"
              @input.native="updateValue"
              placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="排序">
            <b-form-input
              type="text"
              v-model="remarkinfo.seq"
              required
              :disabled="changeshow.descript1disabled"
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
              v-model="remarkinfo.title"
              :disabled="changeshow.descript2disabled"
              required
              placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
        <b-col sm="4" class="my-1 paddingright0">
          <b-form-group horizontal :label-cols="4" label="显示在EO单" class="mb-0">
            <b-form-checkbox id="checkbox1"
                             v-model="remarkinfo.flag"
                             value="T"
                             unchecked-value="F">
            </b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col sm="4" class="my-1 paddingright0">
          <b-input-group prepend="备注时间">
            <b-form-input
              type="text"
              v-model="remarkinfo.date0"
              :disabled="changeshow.tablesdisabled"
              required
              placeholder="">
            </b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row  style="font-size: 12px ;padding-left: 12px">
        <b-form-textarea id="textarea1"
                         v-model="remarkinfo.content"
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
  import methodinfo from '../config/MethodConst.js'
  const show = {  pccodedisabled: true, descriptdisabled:  true,descript1disabled:true,descript2disabled:true ,kinddesdisabled:true,tablesdisabled:true}
  const newshow = {  pccodedisabled: false, descriptdisabled:  false,descript1disabled:false,descript2disabled:false ,kinddesdisabled:true,tablesdisabled:true}

  export default {
    data () {
      return {
        show: show,
        remarkinfo:this.remark,
        ty:"",
      }
    },
    props:{
      remark: {
        type:Object
      },
    },
    created(){
      console.log("a");
      this.getremark()
    },

    watch: {
      remarkinfo:function (val,oldval) {
       this.getremark();
      }
    },

    methods: {
      changeshow() {
        if(this.ty=="new"){
          return show;
        }else{
          return newshow;
        }
      },
      updateValue(event) {
        console.log(event);
        if(!event.isComposing){
          return event.data;
        }else{
          event.preventDefault();
        }
      },
      getremark(){
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
            this.$http.post(methodinfo.getscnotelist, {
              caterid: this.remarkinfo.caterid,
              eventid: this.remarkinfo.eventid,
              itemid:this.remarkinfo.itemid,
              type:this.remarkinfo.type,
            }).then((response)=> {
              if (response.status === 200) {
                if(typeof(response.data.notes) != "undefined"){
                  var s = response.data.notes[0];
                  this.remarkinfo.seq = s.seq;
                  this.remarkinfo.content = s.content;
                  this.remarkinfo.title = s.title;
                  this.remarkinfo.flag = s.flag;
                  this.remarkinfo.date0 = s.date0;
                  this.remarkinfo.uuid= s.uuid;
                  this.ty="update";
                }
                else{
                  this.ty="new";
                }
              }
            })
          })
        },
      close:function(){
        // console.log(this.$store.getters.username);
        // console.log(this.$store.getters.empno);
        // this.$emit('onhide');
      },
      updatescnotes(){
        console.log(this.remarkinfo)
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.updatescnoteinfo, {
            uuid: this.remarkinfo.uuid,
            title: this.remarkinfo.title,
            content:this.remarkinfo.content,
            type:this.remarkinfo.type,
            sta:this.remarkinfo.sta,
            eoprinted:this.remarkinfo.eoprinted
          }).then((response)=> {
            if (response.status === 200) {
              console.log(response.data.errorCode);
            }
          })
        })
      },
      newscnotes(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
          this.$http.post(methodinfo.newscnoteinfo, {
            blockid: this.remarkinfo.blockid,
            caterid: this.remarkinfo.caterid,
            eventid: this.remarkinfo.eventid,
            itemid: this.remarkinfo.itemid,
            type:this.remarkinfo.type,
            title: this.remarkinfo.title,
            content:this.remarkinfo.content,
            date0:new Date().getTime(),
            flag:this.remarkinfo.flag,
            seq:this.remarkinfo.seq
          }).then((response)=> {
            if (response.status === 200) {

              if(response.data.errorcode == "0"){

              }
              else{

              }
            }
          })
        })
      },
      savescnotes:function(){
        var url = "";
        if(this.ty==="update"){
          this.updatescnotes();
        }
        else{
          this.newscnotes();
        }

      }
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
  }
</style>
