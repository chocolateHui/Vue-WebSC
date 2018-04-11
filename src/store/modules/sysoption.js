/**
 * Created by lsj on 2018/4/2.
 */
import axios from 'axios'
import methodinfo from '../../config/MethodConst.js'

const axiosinstance = axios.create({
  baseURL: methodinfo.url,
  timeout: 10000,
  headers: {
    type: 'APP',
    nonce: 0,
    loc: 'zh_CN',
    'Content-type': 'application/json;charset=utf-8'
  }
})
// initial state
const state = {
  eventDepDate: {},
  eventWaitingLimit: {},
  isToPos: {},
  isRResource: {},
  scPmsType: {},
  scPmsUrl: {},
  scPosType: {},
  scPosUrl: {},
  scDoCheck: {},
  scMessageUrl: {},
  scEoSigntime: {},
}

// getters
const getters = {
  eventDepDate: state => state.eventDepDate,

  eventWaitingLimit: state => state.eventWaitingLimit,

  isToPos: state => state.isToPos,

  isRResource: state => state.isRResource,

  scPmsType: state => state.scPmsType,

  scPmsUrl: state => state.scPmsUrl,

  scPosType: state => state.scPosType,

  scPosUrl: state => state.scPosUrl,

  scDoCheck: state => state.scDoCheck,

  scMessageUrl: state => state.scMessageUrl,

  scEoSigntime: state => state.scEoSigntime
}

// actions
const actions = {
  getAllSysoption: function (store) {
    store.dispatch('encrypttoken').then(() => {
      axiosinstance.defaults.headers.common['username'] = store.getters.username
      axiosinstance.defaults.headers.common['signature'] = store.getters.signature
      axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
      axiosinstance.post(methodinfo.getsysoptionlist, {
        cat: 'sc'
      }).then(function (response) {
        if (response.status === 200) {
          for(let option of response.data.sysoptions){
            if (option) {
              switch (option.itemid) {
                case 'event_dep_date':
                  store.commit('setEventDepDate', option)
                  break
                case 'event_waiting_limit':
                  store.commit('setEventWaitingLimit', option)
                  break
                case 'is_to_pos':
                  store.commit('setIsToPos', option)
                  break
                case 'is_r_resource':
                  store.commit('setIsRResource', option)
                  break
                case 'sc_pms_type':
                  store.commit('setScPmsType', option)
                  break
                case 'sc_pms_url':
                  store.commit('setScPmsUrl', option)
                  break
                case 'sc_pos_type':
                  store.commit('setScPosType', option)
                  break
                case 'sc_pos_url':
                  store.commit('setScPosUrl', option)
                  break
                case 'sc_do_check':
                  store.commit('setScDoCheck', option)
                  break
                case 'sc_message_url':
                  store.commit('setScMessageUrl', option)
                  break
                case 'sc_eo_signtime':
                  store.commit('setScEoSigntime', option)
                  break
              }
            }
          }
        }
      })
    })
  },
  commitSysoption:function () {

  }
}

// mutations
const mutations = {

  setEventDepDate (state, eventDepDate) {
    state.eventDepDate = eventDepDate
  },
  setEventWaitingLimit (state, eventWaitingLimit) {
    state.eventWaitingLimit = eventWaitingLimit
  },
  setIsToPos (state, isToPos) {
    state.isToPos = isToPos
  },
  setIsRResource (state, isRResource) {
    state.isRResource = isRResource
  },
  setScPmsType (state, scPmsType) {
    state.scPmsType = scPmsType
  },
  setScPmsUrl (state, scPmsUrl) {
    state.scPmsUrl = scPmsUrl
  },
  setScPosType(state, scPosType) {
    state.scPosType = scPosType
  },
  setScPosUrl (state, scPosUrl) {
    state.scPosUrl = scPosUrl
  },
  setScDoCheck (state, scDoCheck) {
    state.scDoCheck = scDoCheck
  },
  setScMessageUrl (state, scMessageUrl) {
    state.scMessageUrl = scMessageUrl
  },
  setScEoSigntime (state, scEoSigntime) {
    state.scEoSigntime = scEoSigntime
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}