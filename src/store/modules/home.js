import { homeIndexAdList, homeIndexProductList, getIndexInform } from '../../api/homeindex'
import { getArticleList } from '../../api/homeArticle'
// import { getMenuInfo } from '../../api/homeMenu'
// initial state
const state = {
  banners: null, // 首页Banner
  navs: null, // 首页导航
  floorAds: null, // 横屏广告图
  g_ads:null,  // 新版本 轮播
  indexInform:null, //今日行情
  promotionAds: null, // 促销广告图 3 张
  articles: null, // 商城公告分类下的文章 首页显示
  hotProducts: null, // 首页热门产品
  recentlyProducts: null,
  goodProducts: null,
  storeMapInfo:null,  //店铺地图信息
  banquetStore: {
    'xz': [],
    'dz': [],
    'bj': [],
    'cook': [],
    'xzTotal':0,
    'dzTotal':0,
    'bjTotal':0,
    'cookTotal':0,
    'typeName':''
  }, // 宴请数据
  banquetObj:{},
  // menuInfo:null,	//菜单信息
}

// mutations
const mutations = {
  saveHomeAds (state, data) {
    state.banners = data.result.banners
    state.navs = data.result.navs
    state.floorAds = data.result.floor_ads
    state.promotionAds = data.result.promotion_ads
    state.g_ads = data.result.g_ads
  },
  saveHomeArticles (state, data) {
    state.articles = data.result.article_list
  },
  saveHomeProducts (state, data) {
    state.hotProducts = data.result.hot_products
    state.recentlyProducts = data.result.recently_products
    state.goodProducts = data.result.good_products
  },
  savestoreMapInfo(state, storeMapInfo) {
    state.storeMapInfo = storeMapInfo;
  },
  saveHomeInform (state, data) {
  	state.inform = data.result
  },
  // 保存 宴请购物车数据
  saveBanquetStore (state, obj) {
    if( obj.clear == true ){
      state.banquetStore = {
        'xz': [],
        'dz': [],
        'bj': [],
        'cook': [],
        'xzTotal':0,
        'dzTotal':0,
        'bjTotal':0,
        'cookTotal':0,
        'typeName':''
      };
    }else if(obj.type == true){
      state.banquetStore['typeName'] = obj.typeName;      
    }else{
      state.banquetStore[obj.key] = obj.data;
      state.banquetStore['xzTotal'] = obj.xzTotal;
      state.banquetStore['dzTotal'] = obj.dzTotal;
      state.banquetStore['bjTotal'] = obj.bjTotal;
      state.banquetStore['cookTotal'] = obj.cookTotal;
    }
  },
  savebanquetObj(state, data) {
  	state.banquetObj = data
  },
  // 保存菜单信息
  // saveMenuInfo (state, data) {
	 //  console.log(data);
	 //  state.menuInfo = data.result
  // }
}

// actions
const actions = {
  // 获取首页轮播图
  fetchHomeAd ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      homeIndexAdList().then(
        (response) => {
          commit('saveHomeAds', response)
          resolve(response)
        }, (error) => {
          reject(error)
        })
    })
  },
  // 获取首页商城公告分类下文章
  fetchHomeArticle ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      // 文章分类ID为1 下的文章列表
      getArticleList('', 1).then(
        (response) => {
          commit('saveHomeArticles', response)
          resolve(response)
        }, (error) => {
          reject(error)
        })
    })
  },
  // 获取今日行情
  fetchHomeInform ({ commit,state }, params ) {
	  // console.log(params,'params')
	  // debugger
  	  return new Promise((resolve, reject) => {
  	    getIndexInform(params.pagesize,params.page).then(
  	      (response) => {
            if( params.pagesize == 2 ){
              commit('saveHomeInform', response)
            }
  	        resolve(response)
  	      }, (error) => {
  	        reject(error)
  	      })
  	  })
  },
  // 获取首页产品
  fetchHomeProduct ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      homeIndexProductList(params.name).then(
        (response) => {
          commit('saveHomeProducts', response)
          resolve(response)
        }, (error) => {
          reject(error)
        })
    })
  },
  // 获取菜单信息
 //  fetchHomeMenuInfo ({ commit,state }, params ) {
	//   return new Promise((resolve, reject) => {
	//     getMenuInfo(params).then(
	//       (response) => {
	//         commit('saveMenuInfo', response)
	//         resolve(response)
	//       }, (error) => {
	//         reject(error)
	//       })
	//   })
	// }
}

export default {
  state,
  mutations,
  actions
}
