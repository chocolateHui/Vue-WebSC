

let archMixins={
  data () {
    return {
      poparch: false,
    }
  },
  methods:{
    btnArchClose:function () {
      this.poparch=false;
    },
    btnArchOk:function (param,popType,popno,archTypeId) {
      if(param==''){
        this.$message({
          message: "请选择档案",
          type: "warning"
        });
      }else{
        this.poparch=false;
        if(typeof this.todayList!='undefined'){
          if(archTypeId=='A'||archTypeId=='C'){
            this.popunit=popType
            this.popunitno=popno
          }else{
            this.popguest=popType
            this.popguestno=popno
          }
        }else{
          this.localcatering.cusno = popno
          this.localcatering.cusno_des = popType
        }
        this.$refs.refarch.clearAll()
      }
    },
    btnChooseName:function (popType,popno,archTypeId) {
      this.poparch=false;
      if(typeof this.todayList!='undefined') {
        if (archTypeId == 'A' || archTypeId == 'C') {
          this.popunit = popType
          this.popunitno = popno
        } else {
          this.popguest = popType
          this.popguestno = popno
        }
      }else{
        this.localcatering.cusno = popno
        this.localcatering.cusno_des = popType
      }
    },
  }
}
export default archMixins
