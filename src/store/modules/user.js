/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

// initial state
const state = {
  groupid: '',
  username: '',
  hotel: {
    hotelid: '',
    descript: '',
    descript1: '',
    sign: 0
  },
  hotels: [],
  empno: {},
  role: '',
  empsale: '',
  isHistory: false
}

// getters
const getters = {
  groupid: state => state.groupid,

  username: state => state.username,

  hotel: state => state.hotel,

  hotels: state => state.hotels,

  empno: state => state.empno,

  role: state => state.role,

  empsale: state => state.empsale,

  isHistory: state => state.isHistory
}

// actions
const actions = {
  gethotels: function (store) {
    axiosinstance.defaults.headers.common['signature'] = store.getters.signature
    axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
    axiosinstance.post(methodinfo.getloginhotellist, {
      params: {
        groupid: store.getters.groupid,
        username: store.getters.username.toUpperCase()
      }
    }).then(function (response) {
      if (response.status === 200) {
        store.commit('setHotels', response.data.hotels)
      }
    })
  },
  getsysempno: function (store, token) {
    return new Promise((resolve, reject) => {
      axiosinstance.defaults.headers.common['signature'] = store.getters.signature
      axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
      axiosinstance.post(methodinfo.getempnoinfo, {
        username: store.getters.username
      }).then(function (response) {
        if (response.status === 200) {
          if (response.data.errorCode !== '0') {
            reject(response.data.errorMessage)
          } else {
            store.commit('setEmpno', response.data)
            if (response.data.saleid) {
              store.commit('setEmpSale', response.data.saleid)
            }
            store.commit('setRole', response.data.htljob)
          }
        }
        resolve()
      })
    })
  }
}

// mutations
const mutations = {

  setGroupid (state, groupid) {
    state.groupid = groupid
  },
  setUsername (state, username) {
    state.username = (String(username)).toUpperCase()
  },
  setHotel (state, hotel) {
    state.hotel = hotel
  },
  setHotels (state, hotels) {
    state.hotels = hotels
  },
  setEmpno (state, empno) {
    delete empno.password
    delete empno.md5
    state.empno = empno
  },
  setRole (state, role) {
    state.role = role
  },
  setEmpSale (state, empsale) {
    state.empsale = empsale
  },
  setIsHistory (state, isHistory) {
    state.isHistory = isHistory
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
