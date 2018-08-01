import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { Input, Badge, DatePicker, Select, Loading, Option, Switch, Tree, Table, TableColumn, Tabs, TabPane, Message, MessageBox, Upload, Dialog, Popover, Tooltip } from 'element-ui'
import axiosinstance from '../src/common/axiosinstance'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import './css/font.scss'
import './css/color.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'

// 第三方组件注册
Vue.use(BootstrapVue)
Vue.use(Badge)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Option)
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$http = axiosinstance

// 项目内组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/base',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

let sc = new Vue({
  el: '#app',
  store,
  router,
  render (h) {
    return h(App)
  }
})

Vue.use({ sc })
