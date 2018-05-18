/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

// initial state
const state = {
  sceventitemeventid:"",
  corteventlist:[],
  sceventitemlist:[],

}

// getters
const getters = {
  sceventitemeventid: state => state. sceventitemeventid,

  corteventlist: state => state.corteventlist,

  sceventitemlist: state => state.sceventitemlist,
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
            else{
              store.commit('setCorteventlist', []);
            }
            resolve();
          }else{
            console.log(response.data);
            reject(response.data.errorMessage);
          }
        }).catch(function () {
          reject("获取复制宴会列表信息异常!");
        })
      }
      resolve()
    })
  },
  getsceventitem(store) {
    return new Promise((resolve, reject) => {
      {
        console.log(store);
        axiosinstance.defaults.headers.common['username'] = store.getters.username
        axiosinstance.defaults.headers.common['signature'] = store.getters.signature
        axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
        axiosinstance.post(methodinfo.geteventitemlist, {
          eventid:state.sceventitemeventid,
          sta:"0"
        }).then(function (response) {
          if (response.data.errorCode==='0') {

            if(typeof(response.data.eventitems) != "undefined")
            {
              console.log(response.data);
              let type =[];
              for(let elm of response.data.eventitems){
                let event = {};
                event =  elm;
                if(typeof(elm.descript1) == "undefined"){
                  event["descript1"] = "";
                }
                type.push(event);
              }
              store.commit('setSceventitemlist', type);
              console.log("vuex");
            }
            else{
              store.commit('setSceventitemlist', []);
            }
            resolve();
          }else{
            console.log(response.data);
            reject(response.data.errorMessage);
          }
        }).catch(function () {
          reject("获取宴会项目异常!");
        })
      }
      resolve()
    })
  }
}

// mutations
const mutations = {
  setSceventitemeventid(state, sceventitemeventid) {
    state.sceventitemeventid = sceventitemeventid
  },
  setCorteventlist (state, corteventlist) {
    state.corteventlist = corteventlist
  },
  setSceventitemlist (state, sceventitemlist) {
    state.sceventitemlist = sceventitemlist
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
