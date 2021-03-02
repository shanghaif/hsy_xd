// initial state
const state = {
  total_amount: 0, // 总量
  total_price: 0.00, // 总价
  cartGoods: [], // 购物车中选中的商品
  cart_type:null,//购物车商品类型
  cart_area_id:null,//购物车商品地址
  market:null,//来自于那个市场
}
// mutations
const mutations = {
  // 计算购物车总量和总价
  calculationAmount (state, amount) {
    state.total_amount = amount
  },
  calculationPrice (state, price) {
    state.total_price = price
  },
  saveSelectedCartGoods (state, payload) {
    state.cartGoods = payload.cartGoods
  },
  clearSelectedCartGoods (state) {
    state.cartGoods = []
  },
  saveHomecartCartType(state,arr){
    state.cart_type = arr[0]
    state.cart_area_id = arr[1]
  },
  saveHomecartMarket(state,market){
    // console.log('修改market',market);
    state.market = market
  }
}

export default {
  state,
  mutations
}
