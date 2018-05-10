/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

// initial state
const state = {
  caterid: '',
  catersta: 'Q',
  catering: {},
  eventlist: [],
  eventstas: '1,2,3,W,Q',
  roomlist: [],
  placelist: [],
  reasonlist: []
}

// getters
const getters = {
  caterid: state => state.caterid,

  catersta: state => state.catersta,

  catering: state => state.catering,

  eventlist: state => state.eventlist,

  eventstas: state => state.eventstas,

  roomlist: state => state.roomlist,

  placelist: state => state.placelist,

  reasonlist: state => state.reasonlist
}

// actions
const actions = {
  getCateringInfo (store) {
    return new Promise((resolve, reject) => {
      if (state.caterid) {
        axiosinstance.defaults.headers.common['username'] = store.getters.username
        axiosinstance.defaults.headers.common['signature'] = store.getters.signature
        axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
        axiosinstance.post(methodinfo.getcateringinfo, {
          caterid: state.caterid
        }).then(function (response) {
          if (response.data.errorCode === '0') {
            store.commit('setCatering', response.data)
            let sta = response.data.sta
            store.commit('setCatersta', sta)
            resolve()
          } else {
            reject(response.data.errorMessage)
          }
        }).catch(function () {
        })
      }
      resolve()
    })
  },
  getEventList (store) {
    axiosinstance.defaults.headers.common['username'] = store.getters.username
    axiosinstance.defaults.headers.common['signature'] = store.getters.signature
    axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
    axiosinstance.post(methodinfo.geteventlist, {
      caterid: state.caterid,
      sta: state.eventstas
    }).then(function (response) {
      if (response.data.errorCode === '0') {
        store.commit('setEventlist', response.data.events)
      }
    })
  },
  getRoomList (store) {
    if (state.catering.blockid) {
      axiosinstance.defaults.headers.common['username'] = store.getters.username
      axiosinstance.defaults.headers.common['signature'] = store.getters.signature
      axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
      axiosinstance.post(methodinfo.getMasterRsvsrc, {
        blockid: state.catering.blockid
      }).then(function (response) {
        if (response.data.errorCode === '0') {
          store.commit('setRoomlist', response.data.rsvsrcs)
        }
      })
    }
  },
  getPlacelist (store) {
    axiosinstance.defaults.headers.common['username'] = store.getters.username
    axiosinstance.defaults.headers.common['signature'] = store.getters.signature
    axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
    axiosinstance.post(methodinfo.getplacelist, {
    }).then(function (response) {
      if (response.data.errorCode === '0') {
        store.commit('setPlacelist', response.data.places)
      }
    })
  },
  getReasonList (store) {
    axiosinstance.defaults.headers.common['username'] = store.getters.username
    axiosinstance.defaults.headers.common['signature'] = store.getters.signature
    axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
    axiosinstance.post(methodinfo.getbasecodelist, {
      cat: 'sc_cancel_reason',
      halt: 'F'
    }).then(function (response) {
      if (response.data.errorCode === '0') {
        store.commit('setReasonList', response.data.basecodes)
      }
    })
  }
}

// mutations
const mutations = {

  setCaterid (state, caterid) {
    state.caterid = caterid
  },
  setCatersta (state, catersta) {
    console.log(catersta)
    state.catersta = catersta
  },
  setCatering (state, catering) {
    state.catering = catering
  },
  setEventlist (state, eventlist) {
    state.eventlist = eventlist
  },
  setEventstas (state, eventstas) {
    state.eventstas = eventstas
  },
  setRoomlist (state, roomlist) {
    state.roomlist = roomlist
  },
  setPlacelist (state, placelist) {
    state.placelist = placelist
  },
  setReasonList (state, reasonlist) {
    state.reasonlist = reasonlist
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
