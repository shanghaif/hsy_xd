
// initial state
const state = {
  brandId: null, // 类型
  brandName:"",       // 类型名称

  unittypearr: [], // 首页导航
  lat: null, // 首页导航
  lng: null, // 首页导航

  store_id:null,  // 品牌id

  dutyObj:{},    // 核心竞争力 前四个 

  PanoRamicArr:[],   // 全景信息

  brandParams:{},   // 搜索信息
  brandPathName:null , //  路径

}

// mutations
const mutations = {
  // 保存 品牌id
  saveStoreId (state, store_id) {
    state.store_id = store_id;
  },
  savebrand (state, obj) {
    // console.log(obj);
    state.brandId = obj.id;
    state.brandName = obj.name;
  },
  savelatlng (state, obj) {
    state.lat = obj.lat;
    state.lng = obj.lng;
  },
  saveunittypearr (state, unittypearr) {
    state.unittypearr = unittypearr
  },
  saveDutyObj (state, dutyObj) {
    state.dutyObj = dutyObj
  },
  savePanoRamicArr (state, PanoRamicArr) {
    state.PanoRamicArr = PanoRamicArr
  },

  saveParams (state, params) {
    state.brandParams = params;
  },

  savebrandPathName (state, params) {
    state.brandPathName = params;
  },
}

export default {
  state,
  mutations
}
