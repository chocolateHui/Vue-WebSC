// initial state
const state = {
  caterid: '',
  eventid: ''
}

// getters
const getters = {
  caterid: state => state.caterid,

  eventid: state => state.eventid
}

// actions
const actions = {

}

// mutations
const mutations = {

  setCaterid (state, caterid) {
    state.caterid = caterid
  },
  setEventid (state, eventid) {
    state.eventid = eventid
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
