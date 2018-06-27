/* eslint-disable max-nested-callbacks,standard/object-curly-even-spacing */
import methodinfo from '../../config/MethodConst.js'

let loading

let cateringMixin = {
  data () {
    return {
      eventshow: true,
      toggleshow: false,
      isNew: true
    }
  },
  created () {
    loading = this.$loading.service({ fullscreen: true, background: 'rgba(0, 0, 0, 0.7)' })
    this.getCodeDatas()
  },
  methods: {
    saveCatering (localcatering) {
      this.$refs.newevent.eventCheck(localcatering).then((checked) => {
        if (checked) {
          this.$store.dispatch('encrypttoken').then(() => {
            this.$http.defaults.headers.common['username'] = this.$store.getters.username
            this.$http.defaults.headers.common['signature'] = this.$store.getters.signature
            this.$http.defaults.headers.common['timestamp'] = new Date().getTime()
            this.$http.post(methodinfo.newcatering, localcatering).then((response) => {
              if (response.data.errorCode === '0') {
                let caterid = response.data.caterid
                this.$refs.newevent.batchSaveEvent(caterid).then(() => {
                  this.$message({
                    message: '宴会保存成功!',
                    type: 'success'
                  })
                  this.$store.commit('setCaterid', caterid)
                  this.$store.commit('setIsHistory', false)
                  let route = { name: '宴会预订详情', params: { caterid: caterid }}
                  this.$router.push(route)
                  this.$refs.newcatering.clearData()
                  this.$refs.newevent.clearData()
                })
              } else {
                this.$alert(response.data.errorMessage)
              }
            })
          })
        }
      })
    },
    getCodeDatas () {
      this.$store.dispatch('encrypttoken').then(() => {
        if (this.isNew) {
          this.$store.dispatch('getPlacelist')
          this.$store.dispatch('getSale')
          this.$store.dispatch('getAllBaseCodes')
          this.isNew = false
          setTimeout(() => {
            loading.close()
          }, 300)
        }
        this.eventshow = true
      })
    }
  }
}

export default cateringMixin
