/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

// initial state
const state = {
  caterid: '',
  catersta:'Q',
  catering: {},
  eventlist:[],
  placelist:[]
}

// getters
const getters = {
  caterid: state => state.caterid,

  catersta: state => state.catersta,

  catering: state => state.catering,

  eventlist:state => state.eventlist,

  placelist:state => state.placelist,
}

// actions
const actions = {
  getCateringInfo(store) {
    return new Promise((resolve, reject) => {
      if(state.caterid){
        axiosinstance.defaults.headers.common['username'] = store.getters.username
        axiosinstance.defaults.headers.common['signature'] = store.getters.signature
        axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
        axiosinstance.post(methodinfo.getcateringinfo, {
          caterid: state.caterid
        }).then(function (response) {
          if (response.data.errorCode==='0') {
            store.commit('setCatering', response.data)
            let sta = response.data.sta;
            if(sta==="1"){
              sta="R"
            }else if(sta==="2"){
              sta="C"
            }
            store.commit('setCatersta', sta)
            resolve();
          }else{
            reject(response.data.errorMessage);
          }
        }).catch(function () {
          reject("获取宴会订单信息异常!");
        })
      }
      resolve()
    })
  },
  getEventList(store){
    axiosinstance.defaults.headers.common['username'] = store.getters.username
    axiosinstance.defaults.headers.common['signature'] = store.getters.signature
    axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
    axiosinstance.post(methodinfo.geteventlist, {
      caterid: state.caterid
    }).then(function (response) {
      if (response.data.errorCode==='0') {
        store.commit('setEventlist', response.data.events)
      }
    })
  },
  getPlacelist(store){
    axiosinstance.defaults.headers.common['username'] = store.getters.username
    axiosinstance.defaults.headers.common['signature'] = store.getters.signature
    axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
    axiosinstance.post(methodinfo.getplacelist, {
    }).then(function (response) {
      if (response.data.errorCode==='0') {
        store.commit('setPlacelist', response.data.places)
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
    state.catersta = catersta
  },
  setCatering (state, catering) {
    state.catering = catering
  },
  setEventlist (state, eventlist) {
    state.eventlist = eventlist
  },
  setPlacelist (state, placelist) {
    state.placelist = placelist
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
