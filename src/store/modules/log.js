/* eslint-disable prefer-promise-reject-errors */
/**
 * Created by lsj on 2018/3/9.
 */

// initial state
const state = {
  logtype: '',
  logkey: ''
}

// getters
const getters = {
  logtype: state => state.logtype,

  logkey: state => state.logkey
}

// actions
const actions = {

}

// mutations
const mutations = {
  setLogtype (state, logtype) {
    state.logtype = logtype
  },
  setLogKey (state, logkey) {
    if (logkey !== state.logkey) {
      state.logkey = logkey
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
