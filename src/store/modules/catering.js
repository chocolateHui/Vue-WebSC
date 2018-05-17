/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

// initial state
const state = {
  catersta: 'Q',
  catering: {},
  eventlist: [],
  defaulttype: '',
  eventstas: '1,2,3,W,Q',
  roomlist: [],
  placelist: [],
  reasonlist: [],
  timeoptions: [],
  typeoptions: [],
  priceoptions: [],
  layoutoptions: [],
  degreeoptions: []
}

// getters
const getters = {
  catersta: state => state.catersta,

  catering: state => state.catering,

  eventlist: state => state.eventlist,

  defaulttype: state => state.defaulttype,

  eventstas: state => state.eventstas,

  roomlist: state => state.roomlist,

  placelist: state => state.placelist,

  reasonlist: state => state.reasonlist,

  timeoptions: state => state.timeoptions,

  typeoptions: state => state.typeoptions,

  priceoptions: state => state.priceoptions,

  layoutoptions: state => state.layoutoptions,

  degreeoptions: state => state.degreeoptions
}

// actions
const actions = {
  getAllBaseCodes (store) {
    axiosinstance.defaults.headers.common['username'] = store.getters.username
    axiosinstance.defaults.headers.common['signature'] = store.getters.signature
    axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
    axiosinstance.post(methodinfo.getbasecodelist, {
      cat: 'sc_event_type',
      halt: 'F'
    }).then(function (response) {
      if (response.data.errorCode === '0') {
        let typeoptions = []
        for (let option of response.data.basecodes) {
          if (option.exts2 === '0') {
            option.cycle = '无'
          } else if (option.exts2 === '1') {
            option.cycle = '月'
          } else if (option.exts2 === '2') {
            option.cycle = '季'
          } else if (option.exts2 === '3') {
            option.cycle = '半年'
          } else if (option.exts2 === '4') {
            option.cycle = '年'
          }
          typeoptions.push(option)
        }
        store.commit('setTypeoptions', typeoptions)
      }
    })
    axiosinstance.post(methodinfo.getbasecodelist, {
      cat: 'sc_event_degree',
      halt: 'F'
    }).then(function (response) {
      if (response.data.errorCode === '0') {
        store.commit('setDegreeoptions', response.data.basecodes)
      }
    })
    axiosinstance.post(methodinfo.getbasecodelist, {
      cat: 'sc_time_unit',
      halt: 'F'
    }).then(function (response) {
      if (response.data.errorCode === '0') {
        store.commit('setTimeoptions', response.data.basecodes)
      }
    })
    axiosinstance.post(methodinfo.getbasecodelist, {
      cat: 'layout',
      halt: 'F'
    }).then(function (response) {
      store.commit('setLayoutoptions', response.data.basecodes)
    })
    axiosinstance.post(methodinfo.getitemlist, {
      type: '4'
    }).then(function (response) {
      if (response.data.errorCode === '0') {
        store.commit('setPriceoptions', response.data.items)
      }
    })
  },
  getCateringInfo (store) {
    if (store.getters.caterid) {
      axiosinstance.defaults.headers.common['username'] = store.getters.username
      axiosinstance.defaults.headers.common['signature'] = store.getters.signature
      axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
      axiosinstance.post(methodinfo.getcateringinfo, {
        caterid: store.getters.caterid
      }).then(function (response) {
        if (response.data.errorCode === '0') {
          store.commit('setCatering', response.data)
          let sta = response.data.sta
          store.commit('setCatersta', sta)
        }
      }).catch(function () {
      })
    }
  },
  getEventList (store) {
    store.commit('setEventlist', [])
    axiosinstance.defaults.headers.common['username'] = store.getters.username
    axiosinstance.defaults.headers.common['signature'] = store.getters.signature
    axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
    axiosinstance.post(methodinfo.geteventlist, {
      caterid: store.getters.caterid,
      sta: state.eventstas
    }).then(function (response) {
      if (response.data.errorCode === '0') {
        let events = response.data.events
        if (events) {
          store.commit('setEventlist', events)
          store.commit('setDefaulttype', events[events.length - 1].type)
        }
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

  setCatersta (state, catersta) {
    state.catersta = catersta
  },
  setCatering (state, catering) {
    state.catering = catering
  },
  setEventlist (state, eventlist) {
    state.eventlist = eventlist
  },
  setDefaulttype (state, defaulttype) {
    state.defaulttype = defaulttype
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
  },
  setTimeoptions (state, timeoptions) {
    state.timeoptions = timeoptions
  },
  setTypeoptions (state, typeoptions) {
    state.typeoptions = typeoptions
  },
  setPriceoptions (state, priceoptions) {
    state.priceoptions = priceoptions
  },
  setLayoutoptions (state, layoutoptions) {
    state.layoutoptions = layoutoptions
  },
  setDegreeoptions (state, degreeoptions) {
    state.degreeoptions = degreeoptions
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
