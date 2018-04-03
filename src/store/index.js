import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'
import user from './modules/user'
import maintab from './modules/maintab'
import sysoption from './modules/sysoption'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  strictMode :debug,
  storage: window.localStorage,
  filter: (mutation) => (
    mutation.type === 'setEmpno' ||
    mutation.type === 'setToken' ||
    mutation.type === 'setHotel' ||
    mutation.type === 'setSecretkey'
  ),
  modules: ['token', 'user']
})

const store = new Vuex.Store({
  modules: {
    token,
    user,
    maintab,
    sysoption
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  strict: debug
})

export default store
