/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

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
  },
  empsale:''
}

// getters
const getters = {
  groupid: state => state.groupid,

  username: state => state.username,

  hotel: state => state.hotel,

  hotels: state => state.hotels,

  empno: state => state.empno,

  empsale: state => state.empsale,
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
      axiosinstance.defaults.headers.common['username'] = state.username
      axiosinstance.defaults.headers.common['signature'] = token
      axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
      axiosinstance.post(methodinfo.getempnoinfo, {
        username: state.username
      }).then(function (response) {
        if (response.status === 200) {
          if(response.data.errorCode!=='0'){
            reject(response.data.errorMessage)
          }else{
            store.commit('setEmpno', response.data)
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
    state.username = (username+'').toUpperCase()
  },
  setHotel (state, hotel) {
    state.hotel = hotel
  },
  setHotels (state, hotels) {
    state.hotels = hotels
  },
  setEmpno (state, empno) {
    delete empno.password;
    delete empno.md5;
    state.empno = empno
  },
  setEmpSale (state, empsale) {
    state.empsale = empsale
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
