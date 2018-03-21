/**
 * Created by lsj on 2018/3/19.
 */

// initial state
const state = {
  mainRoutes: [
    {route: '/main',name:'首页'}
  ],
  activeIndex: 0
}

// getters
const getters = {
  mainRoutes: state => state.mainRoutes,

  activeIndex: state => state.activeIndex,

  getRouteByName: (state) => (name) => {
    return state.mainRoutes.find(routeinfo => routeinfo.name === name)
  }
}

// actions
const actions = {

}

// mutations
const mutations = {
  // 添加tabs
  add_tabs (state, data) {
    state.mainRoutes.push(data);
  },
  // 删除tabs
  delete_tabs (state, route) {
    let index = 0;
    for (let option of state.mainRoutes) {
      if (option.route === route) {
        break;
      }
      index++;
    }
    state.mainRoutes.splice(index, 1);
  },
  // 设置当前激活的tab
  set_active_index (state, index) {
    state.activeIndex = index;
    console.log(index);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
