/**
 * Created by lsj on 2018/3/9.
 */
import axios from 'axios'
import methodinfo from '../../config/MethodConst.js'

const axiosinstance = axios.create({
  baseURL: 'http://10.1.1.171:8083/',
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
  groupid: 'G000001',
  username: '',
  hotel: {
    hotelid : '',
    descript : '',
    descript1: ''
  },
  hotels: [],
  empno: {
  }
}

// getters
const getters = {
  groupid: groupid => state.groupid,

  username: state => state.username,

  hotel: state => state.hotel,

  hotels: state => state.hotels,

  empno: state => state.empno
}

// actions
const actions = {
  gethotels: function (store) {
    axiosinstance.get(methodinfo.getloginhotellist, {
      params: {
        groupid: state.groupid,
        username: state.username.toUpperCase()
      }
    }).then(function (response) {
      if (response.status === 200) {
        store.commit('setHotels', response.data.hotels)
      }
    })
  },
  getsysempno: function (store, token) {
    return new Promise((resolve, reject) => {
      axiosinstance.defaults.headers.common['username'] = state.username.toUpperCase()
      axiosinstance.defaults.headers.common['signature'] = token
      axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
      axiosinstance.post(methodinfo.getempnoinfo, {
        username: state.username.toUpperCase()
      }).then(function (response) {
        if (response.status === 200) {
          store.commit('setEmpno', response.data)
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
    state.username = username.toUpperCase()
  },
  setHotel (state, hotel) {
    state.hotel = hotel
  },
  setHotels (state, hotels) {
    state.hotels = hotels
  },
  setEmpno (state, empno) {
    state.empno = empno
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
