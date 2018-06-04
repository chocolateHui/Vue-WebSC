/**
 * Created by lsj on 2018/3/9.
 */
import CryptoJS  from 'crypto-js'
import axiosinstance from '../../common/axiosinstance'
import methodinfo from '../../config/MethodConst.js'

// initial state
const state = {
  token: null,
  tokentime: null,
  signature: null,
  secretkey: '',
  loginerror: ''
}

// getters
const getters = {
  token: state => state.token,

  tokentime: state => state.tokentime,

  signature: state => state.signature,

  secretkey: state => state.secretkey,

  loginerror: state => state.loginerror
}

// actions
const actions = {
  encrypttoken: function (store) {
    return new Promise((resolve, reject) => {
      let username = store.getters.username
      let time = new Date().getTime()
      let content = username + 0 + time + store.getters.token
      let key = CryptoJS.enc.Latin1.parse(store.getters.secretkey)
      let encrypted = CryptoJS.AES.encrypt(content, key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      store.commit('setSignature', encrypted.toString())
      resolve()
    })
  },
  gettoken: function (store, tokenparam) {
    let password = tokenparam.password
    let secret = CryptoJS.MD5(password).toString()
    return new Promise((resolve, reject) => {
      axiosinstance.get(methodinfo.auth, {
        params: {
          groupid: tokenparam.groupid,
          hotelid: tokenparam.hotelid,
          username: tokenparam.username,
          password: secret,
          module: 'SC'
        }
      }).then(function (response) {
        if (response.status === 200) {
          if (response.data.errorCode === '0') {
            store.commit('setLoginerror', '')
            store.commit('setToken', response.data.token)
            store.commit('setSecretkey', secret.substr(0, 16))
            resolve()
          } else {
            store.commit('setLoginerror', response.data.errorMessage)
            reject(response.data.errorMessage)
          }
        }
      })
    })
  }
}

// mutations
const mutations = {
  setToken (state, token) {
    state.token = token
    state.tokentime = new Date().getTime()
  },
  setSecretkey (state, secretkey) {
    state.secretkey = secretkey
  },
  setSignature (state, signature) {
    state.signature = signature
  },
  setLoginerror (state, loginerror) {
    state.loginerror = loginerror
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
