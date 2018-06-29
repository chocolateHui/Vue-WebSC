/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

// initial state
const state = {
  sceventitemeventid: '',
  corteventlist: [],
  eventdes: '',
  isrefresh: ''
}

// getters
const getters = {
  sceventitemeventid: state => state.sceventitemeventid,

  corteventlist: state => state.corteventlist,

  eventdes: state => state.eventdes,

  isrefresh: state => state.isrefresh
}

// actions
const actions = {
  getcortEventlist (store) {
    return new Promise((resolve, reject) => {
      axiosinstance.defaults.headers.common['username'] = store.getters.username
      axiosinstance.defaults.headers.common['signature'] = store.getters.signature
      axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
      axiosinstance.post(methodinfo.geteventlist, {
        sta: '1,2,3,Q,W'
      }).then(function (response) {
        if (response.data.errorCode === '0') {
          if (typeof (response.data.events) !== 'undefined') {
            let type = []
            for (let elm of response.data.events) {
              let event = {}
              event = elm
              if (typeof (elm.descript1) === 'undefined') {
                event['descript1'] = ''
              }
              type.push(event)
            }
            store.commit('setCorteventlist', type)
          } else {
            store.commit('setCorteventlist', [])
          }
          resolve()
        } else {
          reject(response.data.errorMessage)
        }
      }).catch(function () {
      })
      resolve()
    })
  }
}

// mutations
const mutations = {
  setSceventitemeventid (state, sceventitemeventid) {
    state.sceventitemeventid = sceventitemeventid
  },
  setCorteventlist (state, corteventlist) {
    state.corteventlist = corteventlist
  },
  setIsrefresh (state, isrefresh) {
    state.isrefresh = isrefresh
  },
  setEventdes (state, eventdes) {
    state.eventdes = eventdes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
