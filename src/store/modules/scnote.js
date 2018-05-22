/* eslint-disable prefer-promise-reject-errors */
/**
 * Created by lsj on 2018/3/9.
 */

// initial state
const state = {
  noteparam: {}
}

// getters
const getters = {
  noteparam: state => state.noteparam
}

// actions
const actions = {

}

// mutations
const mutations = {
  setNoteParam (state, scnote) {
    state.noteparam = scnote
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
