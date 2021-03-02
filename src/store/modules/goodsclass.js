/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-15 17:18:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-27 14:28:16
 */
import { getGoodsclassList, getGoodsclassListNew } from '../../api/homesearch'

// initial state
const state = {
  items: [],
  currentItem: null,

  goodClassData:[],  // 新版本 商品分类
  goodClassDataSelect: null,  // 新版本 商品分类 右上角 搜索
}

// mutations
const mutations = {
  // 新版本 商品分类
  saveGoodClassData(state, items){
    state.goodClassData = items
  },
  // 新版本 商品分类 第一个 下的 子元素
  saveGoodClassDataSelect(state, items){
    state.goodClassDataSelect = items
  },

  saveGoodsclassItems (state, items) {
    state.items = items
  },
  clearGoodsclassItems (state) {
    state.items = null
  },
  saveCurrentGoodsclassItem (state, item) {
    state.currentItem = item
  },
  resetCurrentGoodsclassItem (state) {
    if (state.items && state.items.length) {
      state.currentItem = state.items[0]
    }
  },

}

// actions
const actions = {
  fetchGoodsclassList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getGoodsclassList().then((response) => {
        if (response.result && response.result.class_list && response.result.class_list.length) {
          commit('saveGoodsclassItems', response.result.class_list)
          if (!state.currentItem) {
            commit('saveCurrentGoodsclassItem', response.result.class_list[0])
          }
        }
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },
  
  fetchGoodsclassListNew ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getGoodsclassListNew().then((response) => {
        // console.log(response);
        commit('saveGoodClassData', response.result);
        // if (!state.goodClassDataSelect) {
          commit('saveGoodClassDataSelect', response.result[0])          
        // }
        resolve(response);
      }, (error) => {
        reject(error)
      })
    })
  },
  
}

export default {
  state,
  mutations,
  actions
}
