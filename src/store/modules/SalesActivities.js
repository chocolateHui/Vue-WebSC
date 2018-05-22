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
  // 销售员列表
  salelist: [],
  // 查询销售类别
  diaryItemList: [],
  // 查询销售活动列表参数
  guestdiarylist: [],
  profileslist: [],
  guestDiary: {}
}
// getters
const getters = {
  salelist: state => state.salelist,
  diaryItemList: state => state.diaryItemList,
  guestdiarylist: state => state.guestdiarylist,
  profileslist: state => state.profileslist,
  guestDiary: state => state.guestDiary
}
const getAllMsg = function (store) {
  axiosinstance.defaults.headers.common['username'] = store.getters.username
  axiosinstance.defaults.headers.common['signature'] = store.getters.signature
  axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
}
function getsaleidlist () {
  return axiosinstance.post(methodinfo.getsaleidlist, { sta: 'I' })
}
function getbasecodelist () {
  return axiosinstance.post(methodinfo.getbasecodelist, { cat: 'guest_diary_item' })
}
// actions
const actions = {
  getSale: function (store) {
    getAllMsg(store)
    axios.all([getsaleidlist(), getbasecodelist()]).then(axios.spread((res1, res2) => {
      store.commit('setSalelist', res1.data.saleids)
      store.commit('setDiaryItemList', res2.data.basecodes)
    }))
      .catch((error) => {
        console.log(error)
      })
  },
  getguestdiarylist: function (store, diaryParam) {
    getAllMsg(store)
    axiosinstance.post(methodinfo.getguestdiarylist, {
      bdate: diaryParam.bdate,
      edate: diaryParam.edate,
      saleid: diaryParam.saleid
    }).then(function (response) {
      if (response.status === 200) {
        if (response.data.errorCode === '0') {
          store.commit('setGuestdiarylist', response.data.guestdiarys)
        }
      }
    })
  },
  // 查询档案列表
  getProfiles: function (store, param) {
    getAllMsg(store)
    axiosinstance.post(methodinfo.getProfiles, {
      saleid: param.saleid,
      mobile: param.mobile,
      no: param.no,
      name: param.name,
      contacter: param.contacter,
      ischeck: param.ischeck,
      type: param.type
    }).then(function (response) {
      if (response.status === 200) {
        if (response.data.errorCode === '0') {
          store.commit('setProfiles', response.data.profiles)
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
  }
}
// mutations
const mutations = {
  setSalelist (state, salelist) {
    state.salelist = salelist
  },
  setDiaryItemList (state, diaryItemList) {
    state.diaryItemList = diaryItemList
  },
  setGuestdiarylist (state, guestdiarylist) {
    state.guestdiarylist = guestdiarylist
  },
  setProfiles (state, profileslist) {
    state.profileslist = profileslist
  },
  setGuestDiary (state, guestDiary) {
    state.guestDiary = guestDiary
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
