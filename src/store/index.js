import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    token,
    user
  },
  strict: debug
})
