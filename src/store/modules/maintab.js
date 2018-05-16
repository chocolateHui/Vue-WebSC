/**
 * Created by lsj on 2018/3/19.
 */

// initial state
const state = {
  mainRoutes: [
    { route: '/main/index', name: '首页' }
  ],
  activeIndex: '首页',
  isLoading: false
}

// getters
const getters = {
  mainRoutes: state => state.mainRoutes,

  activeIndex: state => state.activeIndex,

  isLoading: state => state.isLoading
}

// actions
const actions = {

}

// mutations
const mutations = {
  // 添加tabs
  add_tabs (state, data) {
    state.mainRoutes.push(data)
  },
  // 添加tabs
  set_tab_route (state, data) {
    let index = data.index
    let route = data.route
    state.mainRoutes[index].route = route
  },
  // 删除tabs
  delete_tabs (state, index) {
    state.mainRoutes.splice(index, 1)
  },
  // 设置当前激活的tab
  set_active_index (state, name) {
    state.activeIndex = name
  },
  // 设置当前激活的tab
  set_loading (state, isLoading) {
    state.isLoading = isLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
