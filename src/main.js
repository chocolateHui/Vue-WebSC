import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { Input,Badge,DatePicker,Select,Option,Tree,Table,TableColumn,Tabs,TabPane,Message,MessageBox,Upload,Dialog,Popover} from 'element-ui';
import axiosinstance from '../src/common/axiosinstance'
import Stomp from 'stompjs'

import './css/font.scss'
import './css/color.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(BootstrapVue)
Vue.use(Badge)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Popover)
Vue.config.productionTip = false
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$http = axiosinstance;

let sc = new Vue({
  el: '#app',
  store,
  router,
  render (h) {
    return h(App)
  }
})

Vue.use({ sc })

// const ws = new WebSocket("ws://localhost:9090/sc-websocket");
// const wsclient = Stomp.over(ws);
// wsclient.connect(
//   {login:'H000001'},
//   function connectCallback(frame) {
//     // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
//     wsclient.subscribe('/topic/subscribe', function (response) {
//       console.log(response)
//       let returnData = JSON.parse(response.body);
//       console.log(returnData);
//       console.log(sc.$store.getters.username);
//     });
//     wsclient.send("/welcome", {}, JSON.stringify({'name': "FOX"}));
//   });
