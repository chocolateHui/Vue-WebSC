import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { DatePicker,Select,Option,Tree,Table} from 'element-ui';

import './css/font.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(BootstrapVue)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tree)
Vue.use(Table)
Vue.config.productionTip = false

let sc = new Vue({
  el: '#app',
  store,
  router,
  render (h) {
    return h(App)
  }
})

Vue.use({ sc })
