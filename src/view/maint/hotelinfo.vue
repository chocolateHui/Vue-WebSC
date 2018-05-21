<template>
    <div id="hotelinfoadmin">
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
              <b-form-group label="城&#8194;&#8194;&#8194;&#8194;市:" horizontal>
                <el-select v-model="hoteInfo.city" placeholder="请选择">
                  <el-option
                    v-for="item in city"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </b-form-group>
              <b-form-group label="东&#8194;&#8194;&#8194;&#8194;经:" horizontal>
                <b-form-input
                  type="text"
                  v-model="hoteInfo.longitude " >
                </b-form-input>
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
              <b-form-group label="城&#8194;&#8194;&#8194;&#8194;区:" horizontal>
                <el-select v-model="hoteInfo.cityarea" placeholder="请选择">
                  <el-option
                    v-for="item in city"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </b-form-group>
              <b-form-group label="北&#8194;&#8194;&#8194;&#8194;纬:" horizontal>
                <b-form-input
                  type="text"
                  v-model="hoteInfo.latitude " >
                </b-form-input>
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
              <b-form-group label="邮&#8194;&#8194;&#8194;&#8194;件:" horizontal>
                <b-form-input
                  type="text"
                  v-model="hoteInfo.email "
                >
                </b-form-input>
              </b-form-group>
              <b-form-group label="联&#8194;系&#8194;人:" horizontal>
                <b-form-input
                  type="text"
                  v-model="hoteInfo.contactor " >
                </b-form-input>
              </b-form-group>
              <b-form-group label="手&#8194;&#8194;&#8194;&#8194;机:" horizontal>
                <b-form-input
                  type="text"
                  v-model="hoteInfo.phone "
                 >
                </b-form-input>
              </b-form-group>
              <b-form-group label="电&#8194;&#8194;&#8194;&#8194;话:" horizontal>
                <b-form-input
                  type="text"
                  v-model="hoteInfo.telephone "
                  >
                </b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="addrcol">
            <b-form-group label="地&#8194;&#8194;&#8194;&#8194;址:" horizontal>
              <b-form-input
                type="text"
                v-model="hoteInfo.address " >
              </b-form-input>
            </b-form-group>
            <b-form-group label="搜索关键字:" horizontal>
              <b-form-input
                type="text"
                v-model="hoteInfo.keyword " >
              </b-form-input>
            </b-form-group>
            <b-form-group label="描&#8194;&#8194;&#8194;&#8194;述:" horizontal>
              <b-form-textarea id="textarea1"
                               v-model="hoteInfo.remark "
                               :rows="4"
                               :max-rows="6">
              </b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col>

            <b-form-group label="传&#8194;&#8194;&#8194;&#8194;真:" horizontal>
              <b-form-input
                type="text"
                v-model="hoteInfo.photo "
               >
              </b-form-input>
            </b-form-group>
            <b-form-group label="排&#8194;&#8194;&#8194;&#8194;序:" horizontal>
              <b-form-input
                type="text"
                v-model="hoteInfo.seq "
               >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="infofoot">
          <b-col cols="8">
              <b-form-checkbox
               v-model="status"
               value="T"
               unchecked-value="F">
               作为模板
              </b-form-checkbox>
          </b-col>
          <b-col>
            <b-button>周边设施</b-button>
            <b-button>保存</b-button>
            <b-button>初始化</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>
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
            form: {
              name: '',
            },
            city:[{name:'上海',id:1},{name:'北京',id:2},{name:'武汉',id:3}],
            status: 'T'
          }
      },
      computed: {

      },
      methods:{
        configDefault:function () {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
        },
        getpccodelist:function(){
          this.$store.dispatch('encrypttoken').then(() => {
            this.configDefault()
            // 获取营业点
            this.$http.post(methodinfo.gethotel, {
              hotelid:this.$store.getters.hotel.hotelid
            }).then((response) => {
              if (response.status === 200) {
                if (response.data.errorCode=="0") {
                this.hoteInfo=response.data
                }
              }
            })
          })
        },
      },
      created(){
        this.getpccodelist()
      }
    }
</script>

<style lang="scss">
  $colorE0:#6FB3E0;
  $colorCC:#71A2CC;
#hotelinfoadmin{
  .infohead{
    padding: 15px;
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
        &:first-child{background: $colorCC;border-color:$colorCC}
      }
    }
  }
  .addrcol{
    .col-sm-3{
      flex: 0 0 12.5%;
      max-width: 12.5%;
    }
    .col-sm-9 {
      flex: 0 0 87.5%;
      max-width: 87.5%;
    }
  }
  .form-control,.el-input--suffix .el-input__inner{
    height: 35px;
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
}
</style>
