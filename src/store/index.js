import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'
import user from './modules/user'
import catering from './modules/catering'
import maintab from './modules/maintab'
import sysoption from './modules/sysoption'
import VuexPersistence from 'vuex-persist'
import getsale from './modules/getsale'
import scnote from './modules/scnote'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  strictMode: debug,
  storage: window.localStorage,
  modules: ['token', 'user', 'sysoption']
})

const store = new Vuex.Store({
  modules: {
    token,
    user,
    maintab,
    sysoption,
    catering,
    getsale,
    scnote
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  strict: debug
})

export default store
