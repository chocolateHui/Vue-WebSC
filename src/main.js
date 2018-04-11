import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { DatePicker,Select,Option,Tree,Table,TableColumn,Tabs,TabPane,Message,MessageBox} from 'element-ui';
import axios from 'axios'

import './css/font.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';

const instance = axios.create({
  baseURL: 'http://172.10.60.61:8083/',
  timeout: 10000,
  headers: {
    type: 'APP',
    nonce: 0,
    loc: 'zh_CN',
    'Content-type': 'application/json;charset=utf-8'
  }
});

Vue.use(BootstrapVue)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.config.productionTip = false
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$http = instance;

let sc = new Vue({
  el: '#app',
  store,
  router,
  render (h) {
    return h(App)
  }
})

Vue.use({ sc })
