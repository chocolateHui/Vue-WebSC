<template>
<div>
  <b-container fluid>
    <b-row class="childContain">
      <b-col>
        <b-form-group label="酒店品牌:" horizontal>
          <el-select v-model="hoteInfo" placeholder="请选择酒店品牌">
            <el-option
              v-for="item in hoteList"
              :key="item.hotelid"
              :label="item.descript"
              :value="item.hotelid">
            </el-option>
          </el-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="子酒店:" horizontal>
          <el-select v-model="hoteInfo" placeholder="请选择子酒店">
            <el-option
              v-for="item in hoteList"
              :key="item.hotelid"
              :label="item.descript"
              :value="item.hotelid">
            </el-option>
          </el-select>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
  <hotelinfoadmin></hotelinfoadmin>
</div>
</template>

<script>
  import methodinfo from '../../config/MethodConst.js'
  import hotelinfoadmin from './hotelinfo'
  export default {
    name: "hotelchild",
    data(){
      return{
        hoteList:[],
        hoteInfo:'',
      }
    },
    components:{
      hotelinfo
    },
    methods:{
      configDefault:function () {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
      },
      getbrandlist:function(){
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          // 获取营业点
          this.$http.post(methodinfo.gethotellist, {
            hotelid:this.$store.getters.hotel.hotelid
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                this.hoteList=response.data.hotels
                // console.log(JSON.stringify( this.hoteList)+' this.hoteList')
              }
            }
          })
        })
      },
    },
    created(){
      this.getbrandlist()
    }
  }
</script>

<style lang="scss">
.childContain{
  .el-select{
    width: 100%;
  }
  .col-sm-3{
    flex: 0 0 16%;
    max-width: 75%;
  }
  .col-sm-9{
    flex: 0 0 84%;
    max-width: 95%;
  }
  .form-group{
    margin-bottom: 0;
  }

}
</style>
