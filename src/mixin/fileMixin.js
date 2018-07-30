/* eslint-disable max-nested-callbacks,standard/object-curly-even-spacing */
import axios from 'axios'

let loading

let fileserver = 'http://xrfiles.test.foxhis.com/FoxhisFileServer/action?'
let imageurl = 'http://xrfiles.test.foxhis.com/FoxhisFileServer/image/'
let groupid = 'C0000001'
let access = 'FOXHIS.WOP'
let topath = 'SC/'
const filetoken = '71DFD83564CD06366DA6C6E35496B61D'

let uploadMixin = {
  data () {
    return {
      fileserver: fileserver,
      imageurl: imageurl,
      topath: topath,
      token: '?token=' + filetoken
    }
  },
  created () {
    let hotelid = this.$store.getters.hotel.hotelid
    this.topath = topath + hotelid + '/'
    this.imageurl = imageurl + groupid + this.topath
    this.fileserver = this.fileserver + 'groupid=' + groupid + '&access=' + access
  },
  methods: {
    fileupload (file, filename) {
      loading = this.$loading.service({ fullscreen: true, background: 'rgba(0, 0, 0, 0.7)' })
      return new Promise((resolve, reject) => {
        let param = new FormData() // 创建form对象
        param.append('topath', this.topath) // 添加form表单中其他数据
        param.append('file', file, filename) // 通过append向form对象添加数据
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let url = this.fileserver + '&method=upload'
        // 添加请求头
        axios.post(url, param, config)
          .then(response => {
            loading.close()
            if (response.data.result === 'success') {
              resolve()
            } else {
              reject(response)
            }
          }).catch(response => {
            loading.close()
            reject(response)
          })
      })
    },
    fileRemove (file) {
      loading = this.$loading.service({ fullscreen: true, background: 'rgba(0, 0, 0, 0.7)' })
      return new Promise((resolve, reject) => {
        let url = this.fileserver + '&method=delete&filename=' + this.topath + file.name
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        // 添加请求头
        axios.post(url, {}, config)
          .then(response => {
            loading.close()
            if (response.data.result === 'yes') {
              resolve()
            } else {
              reject(response)
            }
          }).catch(response => {
            loading.close()
            reject(response)
          })
      })
    }
  }
}

export default uploadMixin
