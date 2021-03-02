// initial state
const state = {
  isOnline: false,
  token: null,
  info: null,
  point: {},
  inviterId: 0,
  isTokenInvalid: false,
  mclass:0,
tid:0,
tsids:null,
tcids:null,
tarea_info:null,
tarea_id:null,
  storeJoinin: {}
}

// mutations
const mutations = {
  sellerJoininSave (state, payload) {
    state.storeJoinin = Object.assign(
      state.storeJoinin,
      payload.storeJoinin)
  },
  memberTuans (state, payload) {
    state.tid = payload.tid
    state.tsids = payload.tsids
    state.tcids = payload.tcids
    state.tarea_info = payload.tarea_info
    state.tarea_id = payload.tarea_id
    state.mclass = payload.mclass
  },
  memberInviterId (state, payload) {
    state.inviterId = payload.inviterId
  },
  memberPoint (state, payload) {
    state.point = Object.assign(
      state.point,
      payload.point)
  },
  memberLogin (state, payload) {
    state.info = payload.info
    state.info.invalid_time = parseInt((new Date().getTime()) / 1000) + 3600// 一小时更新
    state.isOnline = true
    state.token = payload.token
    state.isTokenInvalid = false
    state.mclass = payload.mclass  
  },
  memberLogout (state) {
    state.info = null
    state.isOnline = false
    state.token = null
    state.mclass=0
  },
  memberUpdate (state, payload) {
    if (state.info) {
      state.info = payload.info
      state.info.invalid_time = parseInt((new Date().getTime()) / 1000) + 3600// 一小时更新
    }
  },
  memberEdit (state, payload) {
    if (state.info) {
      let i
      for (i in payload) {
        state.info[i] = payload[i]
      }
    }
  },
  memberSetTarea(state,arr){
    // console.log(arr);
    state.tarea_info = arr[0];
    state.tarea_id = arr[1];

  }
}

export default {
  state,
  mutations
}
