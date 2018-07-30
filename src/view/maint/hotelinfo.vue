<template>
  <div id="hotelinfo">
    <b-container fluid>
      <b-row>
        <b-col class="infohead">
          基本信息
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form>
            <b-form-group label="编&#8194;&#8194;&#8194;&#8194;码:" horizontal>
              <b-form-input
                disabled
                type="text"
                v-model="hoteInfo.hotelid "
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="中文名称:" horizontal>
              <b-form-input
                disabled
                type="text"
                v-model="hoteInfo.descript "
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="繁体名称:" horizontal>
              <b-form-input
                disabled
                type="text"
                v-model="hoteInfo.descript2"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="开业时间:" horizontal>
              <b-form-input
                disabled
                type="text"
                v-model="hoteInfo.opened " >
              </b-form-input>
            </b-form-group>
            <b-form-group label="城&#8194;&#8194;&#8194;&#8194;市:"
                          horizontal>
              <el-select v-model="hoteInfo.city" @change="citychange"  clearable filterable placeholder="请输入或选择城市">
                <el-option
                  v-for="item in cityList"
                  :key="item.citycode"
                  :label="item.descript"
                  :value="item.citycode">
                </el-option>
              </el-select>
            </b-form-group>
            <b-form-group label="东&#8194;&#8194;&#8194;&#8194;经:" horizontal>
              <FormatInput type="float" maxlength="20" v-model="hoteInfo.longitude"></FormatInput>
            </b-form-group>
          </b-form>
        </b-col>
        <b-col>
          <b-form>
            <b-form-group label="品牌信息:" horizontal>
              <b-form-input
                disabled
                type="text"
                v-model="hoteInfo.brandid"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="英文名称:" horizontal>
              <b-form-input
                disabled
                type="text"
                v-model="hoteInfo.descript1 "
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="简&#8194;&#8194;&#8194;&#8194;称:" horizontal>
              <b-form-input
                disabled
                type="text"
                v-model="hoteInfo.exts3" >
              </b-form-input>
            </b-form-group>
            <b-form-group label="证书有效期:" horizontal>
              <b-form-input
                disabled
                type="text"
                v-model="hoteInfo.name"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="城&#8194;&#8194;&#8194;&#8194;区:"
                          horizontal>
              <el-select v-model="cityarea"  clearable filterable placeholder="请输入或选择城区">
                <el-option
                  v-for="item in cityareaList"
                  :key="item.code"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </b-form-group>
            <b-form-group label="北&#8194;&#8194;&#8194;&#8194;纬:" horizontal>
              <FormatInput type="float" maxlength="20" v-model="hoteInfo.latitude"></FormatInput>
            </b-form-group>
          </b-form>
        </b-col>
        <b-col>
          <b-form>
            <b-form-group label="状&#8194;&#8194;&#8194;&#8194;态:" horizontal>
              <el-select v-model="hoteInfo.sta " placeholder="请选择">
                <el-option
                  v-for="item in hotelStatus"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </b-form-group>
            <b-form-group label="星&#8194;&#8194;&#8194;&#8194;级:" horizontal>
              <el-select v-model="hoteInfo.level" placeholder="请选择">
                <el-option
                  v-for="item in hotelLever"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </b-form-group>
            <b-form-group label="片&#8194;&#8194;&#8194;&#8194;区:" horizontal>
              <el-select v-model="hoteInfo.area" placeholder="请选择">
                <el-option
                  v-for="item in areaList"
                  :key="item.code"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </b-form-group>
            <b-form-group label="联&#8194;系&#8194;人:" horizontal>
              <b-form-input
                type="text"
                v-model="hoteInfo.contactor "
                 maxlength="25"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="手&#8194;&#8194;&#8194;&#8194;机:" horizontal>
              <FormatInput type="number" maxlength="11" v-model="hoteInfo.phone"></FormatInput>
            </b-form-group>
            <b-form-group label="电&#8194;&#8194;&#8194;&#8194;话:" horizontal>
              <FormatInput type="number" maxlength="15" v-model="hoteInfo.telephone"></FormatInput>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="8" class="addrcol">
          <b-form-group label="地&#8194;&#8194;&#8194;&#8194;址:" horizontal>
            <b-form-input
              type="text"
              v-model="hoteInfo.address "
              maxlength="50"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group label="搜索关键字:" horizontal>
            <b-form-input
              type="text"
              v-model="hoteInfo.keyword "
              maxlength="50"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group label="描&#8194;&#8194;&#8194;&#8194;述:" horizontal>
            <b-form-textarea id="textarea1"
                             v-model="hoteInfo.remark "
                             :rows="4"
                             :max-rows="6"
                             maxlength="100"
            >
            </b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="邮&#8194;&#8194;&#8194;&#8194;件:" horizontal>
            <b-form-input
              type="email"
              v-model="hoteInfo.email "
              maxlength="30"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group label="传&#8194;&#8194;&#8194;&#8194;真:" horizontal>
            <FormatInput type="number" maxlength="15" v-model="hoteInfo.photo"></FormatInput>
          </b-form-group>
          <b-form-group label="排&#8194;&#8194;&#8194;&#8194;序:" horizontal>
            <FormatInput type="number" maxlength="10" v-model="hoteInfo.seq "></FormatInput>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="infofoot">
        <b-col cols="8">
          <b-form-checkbox
            v-model="hoteInfo.istemplate "
            value="T"
            unchecked-value="F">
            作为模板
          </b-form-checkbox>
        </b-col>
        <b-col>
          <!--<b-button>周边设施</b-button>-->
          <b-button @click="btnSave">保存</b-button>
          <b-button @click="btnInitalize">初始化</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="logmodal" ref="myModalInitalize" size="lg" :title="modelTitle" hide-footer>
      <initalize-first v-if="ifFirst" :flag="flag" :sign="hoteInfo.sign" @btnExit2="btnExit2" @btnExit1="btnExit1" :hotelid="hotelid"></initalize-first>
      <initalize v-else @btnExit="btnExit" :hotelid="hotelid"></initalize>
    </b-modal>
  </div>
</template>

<script>
  import initalize from './initalize'
  import initalizeFirst from './initializeFirst'
  import methodinfo from '../../config/MethodConst.js'
  export default {
    name: "hotelinfoadmin",
    data(){
      return{
        hotelLever: [
          {name:'1星',code:'1'},
          {name:'2星',code:'2'},
          {name:'3星',code:'3'},
          {name:'4星',code:'4'},
          {name:'5星',code:'5'},
        ],
        hotelStatus:[
          {name:'营业',code:'I'},
          {name:'待初始化',code:'R'},
          {name:'停业',code:'S'},
        ],
        hoteInfo:{},
        value:'',
        areaList:[],
        cityList:[],
        cityareaList:[],
        citycode:'',
        hotelid:'',
        cityarea:'',
        ifFirst:false,
        hotelStatusNow:'',
        modelTitle:'初始化',
        flag:0,
      }
    },
    props:['innhotel','sign'],
    watch:{
      innhotel:function (val,oldval) {
        this.hoteInfo=Object.assign({},{});
        if(this.innhotel!=''){
          this.getpccodelist()
          this.getisnewhotel()
        }
      }
    },
    components:{
      initalizeFirst,initalize
    },
    computed: {

    },
    methods:{
      configDefault:function () {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
      },
      gethotelid:function () {
        if(this.sign===1){
          this.hotelid=this.innhotel
        }else{
          this.hotelid=this.$store.getters.hotel.hotelid
        }
      },
      // 判断是否是新建酒店
      getisnewhotel:function () {
        this.gethotelid()
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.getisnewhotel, {
            hotel:this.hotelid
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                if(response.data.isnew=='F'){
                  _this.ifFirst=false
                } else{
                  _this.ifFirst=true
                }
              }
            }
          })
        })
      },
      getpccodelist:function(){
        this.gethotelid()
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.gethotel, {
            hotel:this.hotelid
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                this.hoteInfo=response.data
                this.modelTitle='初始化'+this.hoteInfo.descript
                if(this.hoteInfo.city!=''&&this.hoteInfo.city!=undefined){
                  this.getcityarealist(this.hoteInfo.city,1)
                }
                this.hotelStatusNow=this.hoteInfo.sta
                if(this.hoteInfo.sign==0){
                  this.getisnewhotel()
                }
              }
            }
          })
        })
      },
      // 获取片区
      getarealist:function(){
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.getbasecodelist, {
            cat: 'area',
            halt:'F'
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                this.areaList=response.data.basecodes
              }
            }
          })
        })
      },
      //获取城市
      getcitylist:function(){
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.getcntcode, {
            city: 'T'
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                this.cityList=response.data.citycodes
              }
            }
          })
        })
      },
      //获取城区
      getcityarealist:function(val,index){
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.getcntcode, {
            citycode:val,
            city: 'F'
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                this.cityareaList=response.data.citycodes
                if(index==2){
                  this.cityarea=this.cityareaList[0].code
                }else{
                  this.cityareaList.forEach((item)=>{
                    if(item.code==this.hoteInfo.cityarea){
                      this.cityarea=item.code
                    }
                  })
                }
              }
            }
          })
        })
      },
      citychange:function (val) {
        if(this.cityList.length){
          for(var t=0;t<this.cityList.length;t++){
            if(this.cityList[t].citycode==val){
              this.citycode=this.cityList[t].citycode
            }
          }
        }
        if(this.hoteInfo.city!=''){
          this.getcityarealist(this.citycode,2)
        }else{
          this.cityarea=''
        }
      },
      btnSave:function () {
        this.hoteInfo.cityarea=this.cityarea
        var emailreg= /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
        if(this.sign==1&&this.innhotel==''){
          this.$message({message: "请选择酒店", type: 'warning'});
        }else if((this.hoteInfo.email!=''&&this.hoteInfo.email!=undefined)&&!emailreg.test(this.hoteInfo.email)){
          console.log(this.hoteInfo.email)
          this.$message({message: "邮箱格式不正确", type: 'warning'});
        }else{
        var _this=this
        this.$set(this.hoteInfo,"hotel",this.hoteInfo.hotelid);
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.modifyhotel,
            this.hoteInfo
          ).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                this.hotelStatusNow=this.hoteInfo.sta
                _this.$message('保存成功')
                if(this.hoteInfo.city==''){
                  this.cityareaList=[]
                }
              }
            }
          })
        })
        }
      },
      btnInitalize:function () {
        this.flag++;
        if(this.sign==1&&this.innhotel==''){
          this.$message({message: "请选择酒店", type: 'warning'});
        }else if(this.hotelStatusNow!='R'){
          this.$message({message: "此状态下酒店不能进行初始化", type: 'warning'});
        }else{
          this.$refs.myModalInitalize.show()
        }
      },
      btnExit:function () {
        this.$refs.myModalInitalize.hide()
      },
      btnExit1:function () {
        this.$refs.myModalInitalize.hide()
      },
      btnExit2:function () {
        this.getisnewhotel()
        this.$refs.myModalInitalize.hide()
      }
    },
    created(){
      this.getcitylist()
      this.getarealist()
      if(this.sign!=1) {
        this.getpccodelist()
      }
    }
  }
</script>

<style lang="scss">
  $colorE0:#6FB3E0;
  $colorCC:#71A2CC;
  #hotelinfo{
    .col-sm-3{
      flex: 0 0 33%;
      max-width: 35%;
    }
    .col-sm-9{
      flex: 0 0 66%;
      max-width: 75%;
    }

    .infohead{
      padding: 5px 15px;
      color:$colorCC;
      font-size: 1.1rem;
    }
    .infofoot{
      padding-top: 30px;
      padding-bottom: 20px;
      .col{
        .btn{
          float: right;
          margin-right: 15px;
          &:last-child{background:$colorE0;border-color:$colorE0}
          &:first-child{background:#B2D9D5;border-color:#B2D9D5}
        }
      }
    }
    .addrcol{
      .col-sm-3{
        flex: 0 0 16%;
        max-width: 16%;
      }
      .col-sm-9 {
        flex: 0 0 84%;
        max-width: 86%;
      }
    }
    .form-control,.el-input--suffix .el-input__inner{
      height: 33px;
    }
    #textarea1{
      height: 70px !important;
    }
    .el-select{
      width: 100%;
    }
    .col-form-label{
      font-size: 0.9rem;
    }
    .el-input__icon{
      line-height: 30px;
    }
  }
</style>
