/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-16 14:40:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-22 15:45:57
 */
// initial state
import { getGoodsclassList } from '../../apikeep/goods'
const state = {
  keepToken: null,  // 移动监管 token 
  keepInfo: null,   // 移动监管 用户信息

  
  items: [],
  currentItem: null,
}

// mutations
const mutations = {
  savekeepInfo(state, [token,info]){
    // console.log(token,info);
    state.keepToken = token;
    state.keepInfo = info; 
  },
  clearkeepInfo(state){
    state.keepToken = null;
    state.keepInfo = null; 
  },

  // 商品分类
  
  keepSaveCurrentGoodsclassItem (state, item) {
    state.currentItem = item
  },

  
  keepSaveGoodsclassItems (state, items) {
    state.items = items
  },
}



// actions
const actions = {
  keepGoodsclassList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getGoodsclassList().then((response) => {
        if (response.result && response.result.class_list && response.result.class_list.length) {          
          commit('keepSaveGoodsclassItems', response.result.class_list)
          if (!state.currentItem) {
            commit('keepSaveCurrentGoodsclassItem', response.result.class_list[0])
          }
        }
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
