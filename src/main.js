import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { DatePicker,Select,Option,Tree,Table,TableColumn,Tabs,TabPane,Message,MessageBox,Input} from 'element-ui';
import axiosinstance from '../src/common/axiosinstance'
import echarts from 'echarts'

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
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
Vue.config.productionTip = false
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$http = axiosinstance;
Vue.prototype.$echarts = echarts

let sc = new Vue({
  el: '#app',
  store,
  router,
  render (h) {
    return h(App)
  }
})

Vue.use({ sc })
