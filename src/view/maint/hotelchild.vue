<template>
<div>
  <b-container fluid>
    <b-row class="childContain">
      <b-col>
        <b-form-group label="酒店品牌:" horizontal>
          <el-select @change="gethotellist" v-model="brandid" placeholder="请选择酒店品牌">
            <el-option
              v-for="item in brandList"
              :key="item.hotelid"
              :label="item.descript"
              :value="item.hotelid">
            </el-option>
          </el-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="子酒店:" horizontal>
          <el-select v-model="innhotel" placeholder="请选择子酒店">
            <el-option
              :key="item.hotelid"
              v-for="item in hotelList"
              :label="item.descript"
              :value="item.hotelid">
            </el-option>
          </el-select>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
<hotelinfo :innhotel="innhotel" :sign="sign"></hotelinfo>
</div>
</template>

<script>
  import methodinfo from '../../config/MethodConst.js'
  import hotelinfo from './hotelinfo'
  export default {
    name: "hotelchild",
    data(){
      return{
        brandList:[],
        hotelList:[],
        hoteInfo:'',
        brandid:'',
        innhotel:'',
        sign:1,
      }
    },
    components:{
       hotelinfo,
    },
    methods:{
      configDefault:function () {
        this.$http.defaults.headers.common['username'] = this.$store.getters.username
        this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
        this.$http.defaults.headers.common['timestamp'] = new Date().getTime();
      },
      getbrandlist:function(){
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.gethotellist, {
            sign:1
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                this.brandList=response.data.hotels
              }else{
                this.brandList=[]
              }
            }
          })
        })
      },
      gethotellist:function(){
        this.innhotel=''
        var _this=this
        this.$store.dispatch('encrypttoken').then(() => {
          this.configDefault()
          this.$http.post(methodinfo.gethotellist, {
            brandid:_this.brandid,
          }).then((response) => {
            if (response.status === 200) {
              if (response.data.errorCode=="0") {
                this.hotelList=response.data.hotels
              }else{
                this.hotelList=[]
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
