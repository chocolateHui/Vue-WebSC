/**
 * Created by lsj on 2018/3/9.
 */
import methodinfo from '../../config/MethodConst.js'
import axiosinstance from '../../common/axiosinstance'

// initial state
const state = {
  caterinfo:{},
  caterdes:'',
  eventdes:'',
  scnote:{},
}

// getters
const getters = {
  caterinfo: state => state.caterinfo,

  caterdes: state => state.caterdes,

  eventdes:state => state.eventdes,

  scnote:state => state.scnote,
}

// actions
const actions = {
  getScNotots(store) {
    return new Promise((resolve, reject) => {
      {
        axiosinstance.defaults.headers.common['username'] = store.getters.username
        axiosinstance.defaults.headers.common['signature'] = store.getters.signature
        axiosinstance.defaults.headers.common['timestamp'] = new Date().getTime()
        axiosinstance.post(methodinfo.getscnotelist, {
          caterid: state.caterinfo.caterid,
          eventid: state.caterinfo.eventid,
          itemid:state.caterinfo.itemid,
          type:state.caterinfo.type,
        }).then(function (response) {
          if (response.data.errorCode==='0') {

            if(typeof(response.data.notes) != "undefined")
            {
              var type = response.data.notes[0];
              type["isnew"] ="F";
              store.commit('setScnote', type);
              console.log("vuex");
            }
            else{
              var type = {};
              type["caterid"] =  state.caterinfo.caterid;
              type["eventid"] =state.caterinfo.eventid;
              type["itemid"]=state.caterinfo.itemid;
              type["type"]  = state.caterinfo.type;
              type["isnew"] ="T";
              store.commit('setScnote', type)
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

  setCaterinfo (state, caterinfo) {
    state.caterinfo = caterinfo
  },
  setCaterdes (state, caterdes) {
    state.caterdes = caterdes
  },
  setEventdes (state, eventdes) {
    state.eventdes = eventdes
  },
  setScnote (state, scnote) {
    state.scnote = scnote
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
