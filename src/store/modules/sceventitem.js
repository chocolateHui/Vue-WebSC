/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

// initial state
const state = {
  corteventlist:[],
  sceventitem:{},

}

// getters
const getters = {
  corteventlist: state => state.corteventlist,

  sceventitem: state => state.sceventitem,
}

// actions
const actions = {
  getcortEventlist(store) {
    return new Promise((resolve, reject) => {
      {
        axiosinstance.defaults.headers.common['username'] = store.getters.username
        axiosinstance.defaults.headers.common['signature'] = store.getters.signature
        axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
        axiosinstance.post(methodinfo.geteventlist, {
          sta:"1,2,3,Q,W"
        }).then(function (response) {
          if (response.data.errorCode==='0') {

            if(typeof(response.data.events) != "undefined")
            {
              let type =[];
              for(let elm of response.data.events){
                let event = {};
                event =  elm;
                if(typeof(elm.descript1) == "undefined"){
                  event["descript1"] = "";
                }
                type.push(event);
              }
              store.commit('setCorteventlist', type);
              console.log("vuex");
            }
            resolve();
          }else{
            console.log(response.data);
            reject(response.data.errorMessage);
          }
        }).catch(function () {
          reject("获取备注信息异常!");
        })
      }
      resolve()
    })
  }
}

// mutations
const mutations = {

  setCorteventlist (state, corteventlist) {
    state.corteventlist = corteventlist
  },
  setSceventitem (state, sceventitem) {
    state.sceventitem = sceventitem
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
