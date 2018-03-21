/**
 * Created by lsj on 2018/3/9.
 */
import crypto from 'crypto'
import axios from 'axios'
import methodinfo from '../../config/MethodConst.js'

const axiosinstance = axios.create({
  baseURL: 'http://10.1.1.171:8083/',
  timeout: 10000
})

// initial state
const state = {
  token: null,
  signature: null,
  secretkey: '',
  loginerror: ''
}

// getters
const getters = {
  token: state => state.token,

  signature: state => state.signature,

  loginerror: state => state.loginerror
}

// actions
const actions = {
  encrypttoken: function (store, username) {
    return new Promise((resolve, reject) => {
      let time = new Date().getTime()
      let cipher = crypto.createCipheriv('aes-128-cbc', state.secretkey, state.secretkey)
      let crypted = cipher.update(username + 0 + time + state.token, 'utf8', 'binary')
      crypted += cipher.final('binary')
      crypted = Buffer.from(crypted, 'binary').toString('base64')
      store.commit('setSignature', crypted)
      resolve()
    })
  },
  gettoken: function (store, tokenparam) {
    let md5 = crypto.createHash('md5')
    md5.update(tokenparam.password)
    let secret = md5.digest('hex')
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
            reject()
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
