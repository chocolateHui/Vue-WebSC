<template>
  <div class="pop_archives">
    <div class="pop_archives_tou">宾客档案查询<i @click="archClose" class="fa fa-close"></i></div>
    <div class="search">
      <ul>
        <li><label>名称</label><input type="text" class="text_input" v-model="name" id="archivesname"></li>
        <li><label>手机</label><input type="text" class="text_input" v-model="mobile" id="archivesphone"></li>
        <li><label>档案号</label><input type="text" class="text_input" v-model="no" id="archivesno"></li>
        <li><label>联系人</label><input type="text" class="text_input" v-model="contacter" id="archivesContacts"></li>
        <li><label>销售员</label>
          <div class="select" id="archivessale"><p @click="saleListShow" ref="refsales" :data-id="salesId">{{salesName}}</p>
            <ol v-if="ifSales">
              <li @click="saleListHide(item)" v-for="item in popSalesList" :data-id="item.code">{{item.name}}</li>
            </ol>
          </div>
        </li>
        <li><label>类型</label>
          <div class="select" id="archivestype" :class="{'bgSales': bgUnit}"><p @click="archTypeShow" ref="reftype" :data-id="archTypeId">{{archTypeName}}</p>
            <ol v-if="ifTypeShow&&bgUnit">
              <li @click="archTypeHide(item)" :data-id="item.id" v-for="item in ifunit">{{item.name}}</li>
            </ol>
          </div>
        </li>
      </ul>
      <input type="button" class="btn_query" @click="btnQuery" value="查询"/>
    </div>
    <div class="list_archives">
      <h1>档案列表</h1>
      <ol>
        <li class="nav1">名称</li>
        <li class="nav2">档案号</li>
        <li class="nav3">类型</li>
        <li class="nav4">手机号</li>
        <li class="nav5">联系人</li>
        <li class="nav6">签单人</li>
        <li class="nav7">销售员</li>
        <li class="nav8">城市</li>
      </ol>
      <ul>
        <li :class="{'proCurrent':ifproCurrent==proList.prono}" @click="getHistoryList(proList)" @dblclick="chooseType(proList)" v-for="proList in profileslist">
          <span class="nav1">{{proList.proname}}</span>
          <span class="nav2">{{proList.prono}}</span>
          <span class="nav3">{{proList.txt}}</span>
          <span class="nav4">{{proList.mobile}}</span>
          <span class="nav5">{{proList.contacter}}</span>
          <span class="nav6"></span>
          <span class="nav7"></span>
          <span class="nav8"></span>
        </li>
      </ul>
    </div>
    <div class="list_book">
      <h1>预订历史</h1>
      <ol>
        <li class="nav1">宴会名称</li>
        <li class="nav2">抵达时间</li>
        <li class="nav3">离开时间</li>
        <li class="nav4">手机号</li>
        <li class="nav5">联系人</li>
        <li class="nav6">销售员</li>
      </ol>
      <ul>
        <li v-if="cateringlist" v-for="caterList in cateringlist"><span class="nav1">{{caterList.name}}</span><span class="nav2">{{caterList.arr.substring(0, 10)}}</span><span
          class="nav3">{{caterList.dep.substring(0, 10)}}</span><span class="nav4">{{caterList.contact_mobile}}</span><span class="nav5">{{caterList.contactor}}</span><span
          class="nav6">{{caterList.saleid_name}}</span></li>
      </ul>
    </div>
    <div class="tr"><input type="button" class="btn_ok" @click="archOk" value="确定"><input type="button" class="btn_quit" @click="archClose" value="退出"></div>
  </div>
</template>
<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
  import methodinfo from '../../config/MethodConst.js'
  import '../../css/SalesActivite.scss';

  export default {
    name: "pop-archives",
    data(){
      return {
        archTypeName: '',
        archTypeId: '',
        salesAll: [{
          "name": "所有",
          "code": "",
        }],
        popSalesList: [],
        ifSales: false,
        salesId: '',
        salesName: '',
        bgUnit: false,
        ifTypeShow: false,
        proParam: {},
        name: '',
        mobile: '',
        no: '',
        contacter: '',
        caterParam: {},
        ifproCurrent: '',
        proName: '',
        proNo: '',
        cateringlist: []
      }
    },
    computed: {
      ...mapGetters(['salelist']),
      ...mapGetters(['profileslist'])
    },
    created(){
      this.archTypeName = this.ifunit[0].name
      this.archTypeId = this.ifunit[0].id
      this.bgUnit = this.archTypeId !== 'F';
      let salesList = this.salelist
      this.popSalesList = this.salesAll.concat(salesList)
      this.salesId = this.salesAll[0].code
      this.salesName = this.salesAll[0].name
    },
    props: ['ifunit'],
    methods: {
      chooseType: function (popType) {
        this.$emit('btnChooseName', popType.proname, this.prono, this.archTypeId);
      },
      archClose: function () {
        this.$emit('btnArchClose')
      },
      archOk: function () {
        this.$emit('btnArchOk', this.ifproCurrent, this.proName, this.proNo, this.archTypeId)
      },
      /*档案搜索*/
      btnQuery: function () {
        if (this.mobile === '' && this.name === '' && this.no === '' && this.contacter === '') {
          this.$message({
            message: "名称、手机号、档案号、联系人至少填写一个",
            type: "warning"
          });
        } else {
          this.proParam = {
            saleid: this.salesId,
            mobile: this.mobile,
            no: this.no,
            name: this.name,
            contacter: this.contacter,
            ischeck: "T",
            type: this.archTypeId,
          };
          this.getProfilesList()
        }
      },
      //预定历史搜索
      getHistoryList: function (proList) {
        this.proName = proList.proname
        this.proNo = proList.prono
        this.ifproCurrent = proList.prono
        this.$store.dispatch('encrypttoken').then(() => {
          this.$http.defaults.headers.common['username'] = this.$store.getters.username
          this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
          this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
          this.$http.post(methodinfo.getcateringlist, {
            no: proList.prono,
          }).then(function (response) {
            if (response.data.errorCode === '0') {
              this.cateringlist =[];
              if(response.data.caterings){
                this.cateringlist = response.data.caterings;
              }
            }
          })
        })
      },
      getProfilesList: function () {
        this.$store.dispatch('encrypttoken').then(() => {
          this.$store.dispatch('getProfiles', this.proParam).then(() => {
          })
        })
      },
      saleListShow: function () {
        this.ifSales = true
      },
      saleListHide: function (item) {
        this.salesId = item.code
        this.salesName = item.name
        this.ifSales = false
      },
      archTypeShow: function () {
        this.ifTypeShow = true
      },
      archTypeHide: function (item) {
        this.archTypeId = item.id
        this.archTypeName = item.name
        this.ifTypeShow = false
      },
    },
    mounted: function () {
      this.$store.commit("setProfilesNull")
      document.addEventListener('click', (e) => {
        if (this.$refs.refsales) {
          if (!this.$refs.refsales.contains(e.target)) {
            this.ifSales = false
          }
        }
        if (this.$refs.reftype) {
          if (!this.$refs.reftype.contains(e.target)) {
            this.ifTypeShow = false
          }
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .bgSales {
    background: #ffffff !important;
  }

  .proCurrent {
    background: #e1edf7 !important;
  }
</style>
