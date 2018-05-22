/**
 * Created by lsj on 2018/3/9.
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
  timechoose: [],
  placesinfo: [],
  cateringlist2: []
}
// getters
const getters = {
  timechoose: state => state.timechoose,
  placesinfo: state => state.placesinfo,
  cateringlist2: state => state.cateringlist2
}
const getAllMsg = function (store) {
  axiosinstance.defaults.headers.common['username'] = store.getters.username
  axiosinstance.defaults.headers.common['signature'] = store.getters.signature
  axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
}
// actions
const actions = {
  getTimeUnit: function (store) {
    getAllMsg(store)
    axiosinstance.post(methodinfo.getbasecodelist, { cat: 'sc_time_unit' }).then((response) => {
      store.commit('setTimeUnit', response.data.basecodes)
    }).catch((error) => {
      console.log(error)
    })
  },
  // 查询预定记录
  getcateringlist: function (store, param) {
    axiosinstance.post(methodinfo.getcateringlist, {
      begindate: param.begindate,
      enddate: param.enddate,
      flag: param.flag,
      sta: param.sta
    }).then(function (response) {
      if (response.status === 200) {
        if (response.data.errorCode === '0') {
          store.commit('setCatering2', response.data.caterings)
        }
      }
    })
  },
  // 添加销售日记
  saveorupdateguestdiary: function (store, param) {
    return new Promise((resolve, reject) => {
      getAllMsg(store)
      axiosinstance.post(methodinfo.saveorupdateguestdiary, {
        amount: param.amount,
        applname: param.applname,
        appltel: param.appltel,
        ctime: param.ctime,
        cusno: param.cusno,
        cusnodes: param.cusnodes,
        no: param.no,
        nodes: param.nodes,
        date: param.date,
        feedback: param.feedback,
        id: param.id,
        item: param.item,
        memorandum: param.memorandum,
        memsta: param.memsta,
        saleid: param.saleid,
        ref: param.ref,
        tag: param.tag
      }).then(function (response) {
        resolve()
      })
    })
  },
  // 查看销售详情
  getguestdiary: function (store, param) {
    return new Promise((resolve, reject) => {
      getAllMsg(store)
      axiosinstance.post(methodinfo.getguestdiary, {
        id: param
      }).then(function (response) {
        if (response.data.errorCode === '0') {
          store.commit('setGuestDiary', response.data)
          resolve()
        }
      })
    })
  },
  // 查询场地状态
  getplaceusedinfo: function (store, param) {
    return new Promise((resolve, reject) => {
      getAllMsg(store)
      axiosinstance.post(methodinfo.getplaceusedinfo, {
        pccode: param.pccode,
        begindate: param.begindate,
        enddate: param.enddate,
        sta: param.sta
      }).then(function (response) {
        if (response.status === 200) {
          let placedata = []
          if (response.data.errorCode === '0') {
            if (response.data.hasOwnProperty('places')) {
              placedata = response.data.places
              for (let i = 0; i < placedata.length; i++) {
                placedata[i].bdates.reverse()
              }
            }
          }
          store.commit('setPlaceusedinfo', placedata)
          resolve()
        }
      })
    })
  }
}
// mutations
const mutations = {
  setTimeUnit (state, timechoose) {
    state.timechoose = timechoose
  },
  setCatering2 (state, cateringlist2) {
    state.cateringlist2 = cateringlist2
  },
  setPlaceusedinfo (state, placesinfo) {
    state.placesinfo = placesinfo
  },
  // 清空列表
  setProfilesNull (state) {
    state.cateringlist = []
    state.profileslist = []
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
