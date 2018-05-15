import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'
import user from './modules/user'
import catering from './modules/catering'
import maintab from './modules/maintab'
import sysoption from './modules/sysoption'
import sceventitem from './modules/sceventitem'
import scnote from './modules/scnote'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  strictMode :debug,
  storage: window.localStorage,
  modules: ['token', 'user','sysoption']
})

const store = new Vuex.Store({
  modules: {
    token,
    user,
    maintab,
    sysoption,
    catering,
    scnote,
    sceventitem,
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  strict: debug
})

export default store
