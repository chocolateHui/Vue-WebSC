/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

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
  axiosinstance.defaults.headers.common['signature'] = store.getters.signature
  axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
}

// actions
const actions = {
  getSale: function (store) {
    return new Promise((resolve, reject) => {
      getAllMsg(store)
      axiosinstance.post(methodinfo.getsaleidlist, { sta: 'I' }).then((response) => {
        if (store.getters.empsale !== '' && ['02', '03'].indexOf(store.getters.role) >= 0) {
          let saleid = store.getters.empsale
          let sale = response.data.saleids.filter((item) => {
            return item.code === saleid
          })
          store.commit('setSalelist', sale)
          resolve()
        } else {
          store.commit('setSalelist', response.data.saleids)
          resolve()
        }
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },
    getTypeItem:function (store) {
      return new Promise((resolve, reject) => {
        getAllMsg(store)
        axiosinstance.post(methodinfo.getbasecodelist, {
          cat:'guest_diary_item',
        }).then(function (response) {
          if (response.status === 200) {
            if (response.data.errorCode === '0') {
              if(response.data.hasOwnProperty('basecodes')){
                store.commit('setDiaryItemList', response.data.basecodes)
                resolve()
              }
            }
          }
        })
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
    state.profileslist = []
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
