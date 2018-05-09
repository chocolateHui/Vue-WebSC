/**
 * Created by lsj on 2018/5/7.
 */
import methodinfo from '../config/MethodConst'

const eventMixin = {
  data: function () {
    return {
      timeoptions:[],
      typeoptions:[],
      priceoptions:[],
      layoutoptions:[],
      degreeoptions:[]
    }
  },
  created() {
    //界面生成时加载数据
    let degrees = this.degreeoptions;
    let timeunits = this.timeoptions;
    let lyaouts = this.layoutoptions;
    let types = this.typeoptions;
    let priceitems = this.priceoptions;

    this.$store.dispatch('encrypttoken').then(() => {
      this.$http.defaults.headers.common['username'] = this.$store.getters.username
      this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
      this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
      this.$http.post(methodinfo.getbasecodelist, {
        cat: 'sc_event_type',
        halt:"F"
      }).then(function (response) {
        if (response.data.errorCode==='0') {
          for(let option of response.data.basecodes){
            if(option.exts2==='0'){
              option.cycle = '无'
            }else if(option.exts2==='1'){
              option.cycle = '月'
            }else if(option.exts2==='2'){
              option.cycle = '季'
            }else if(option.exts2==='3'){
              option.cycle = '半年'
            }else if(option.exts2==='4'){
              option.cycle = '年'
            }
            types.push(option)
          }
        }
      })
      this.$http.post(methodinfo.getbasecodelist, {
        cat: 'sc_event_degree',
        halt:"F"
      }).then(function (response) {
        if (response.data.errorCode==='0') {
          for(let option of response.data.basecodes){
            degrees.push(option)
          }
        }
      })
      this.$http.post(methodinfo.getbasecodelist, {
        cat: 'sc_time_unit',
        halt:"F"
      }).then(function (response) {
        if (response.data.errorCode==='0') {
          for(let option of response.data.basecodes){
            timeunits.push(option)
          }
        }
      })
      this.$http.post(methodinfo.getbasecodelist, {
        cat: 'layout',
        halt:"F"
      }).then(function (response) {
        if (response.data.errorCode==='0') {
          for(let option of response.data.basecodes){
            lyaouts.push(option)
          }
        }
      })
      this.$http.post(methodinfo.getitemlist, {
        type: '4'
      }).then(function (response) {
        if (response.data.errorCode==='0') {
          for(let option of response.data.items){
            priceitems.push(option)
          }
        }
      })
    })
  },
  methods: {

  }
}
export default eventMixin
