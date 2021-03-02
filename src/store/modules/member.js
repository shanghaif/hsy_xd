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
  storeJoinin: {},
  area_id:null,//收货地址id
  area_info:"",//收货地址
  tuan:"",//社区团
  exid:"",
  extuan:"",
  menuIndex:'',	//菜谱列表
}

// mutations
const mutations = {
  sellerJoininSave (state, payload) {
    state.storeJoinin = Object.assign(
      state.storeJoinin,
      payload.storeJoinin)
  },
  sellerJoininTypeSave(state, type){
    state.storeJoinin.store_type = type; 
  },
  memberTuans (state, payload) {
    // console.log(payload);
    state.tid = payload.tid
    state.tsids = payload.tsids
    state.tcids = payload.tcids
    state.tarea_info = payload.tarea_info
    state.tarea_id = payload.tarea_id
    state.mclass = payload.mclass
  },
  membersetCS (state, payload) {
    // console.log('修改',payload);
    state.tsids = payload.tsids
    state.tcids = payload.tcids
  },
  memberTsids(state, payload){
    // console.log('从新查看',payload);
    state.tsids = payload
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
    state.mclass=0;
    // console.log("mclass退出了");
    state.exid = null;
    state.extuan = null;
    state.tuan = null;
    state.storeJoinin = {};

    state.tcids = null;
    state.tsids = null;
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

  },
  memberSaveArea_id(state,arr){
    // console.log('member.js 修改收货地址',arr)
    state.area_id = arr[0]
    state.area_info = arr[1]
  },  
  memberSaveTuan(state,tuan){
    // console.log('member.js 修改团',tuan)
    state.tuan = tuan
  },
  memberEx(state,arr){
    // console.log('member.js 测试地址团',arr)
    state.exid = arr[0]
    state.extuan = arr[1]
  },
  // 修改 mclass
  memberEditMclass(state,mclass){
    state.mclass = mclass;
  },
  memberSaveMenuIndex(state,index) {
	  state.menuIndex = index
	  // console.log(index,'index')
  }
}

export default {
  state,
  mutations
}
