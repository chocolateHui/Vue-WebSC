import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'
import user from './modules/user'
import catering from './modules/catering'
import routeTab from './modules/routeTab'
import sysoption from './modules/sysoption'
import sceventitem from './modules/sceventitem'
import VuexPersistence from 'vuex-persist'
import SalesActivities from './modules/SalesActivities'
import scnote from './modules/scnote'
import routeParam from './modules/routeParam'
import placeDistribution from './modules/placeDistribution'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  strictMode: debug,
  storage: window.localStorage,
  modules: ['token', 'user', 'sysoption', 'routeParam']
})

const store = new Vuex.Store({
  modules: {
    token,
    user,
    routeTab,
    sysoption,
    catering,
    SalesActivities,
    scnote,
    sceventitem,
    routeParam,
    placeDistribution
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  strict: debug
})

export default store
