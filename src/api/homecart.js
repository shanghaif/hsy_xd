import { requestApi } from '../util/network'

// 获取购物车
export const cartGet =
() =>
  requestApi(
    '/Membercart/cart_list',
    'POST',
    {
    },
    'member'
  )
// 新增购物车
export const cartAdd =
    (goodsId, quantity, blId,price,cart_type,cart_area_id) =>
      requestApi(
        '/Membercart/cart_add',
        'POST',
        {
          'bl_id': blId,
          'goods_id': goodsId,
          'quantity': quantity,
          'price':price,
          'cart_type':cart_type,//商品类型(零售:"l" 团购:"c")
          'cart_area_id':cart_area_id,//商品类型(零售:"l" 团购:"c")
        },
        'member'
      )
// 删除购物车
export const cartDelete =
(cartId) =>
  requestApi(
    '/Membercart/cart_del',
    'POST',
    {
      'cart_id': cartId
    },
    'member'
  )

// 购物车更新
export const cartUpdate =
(cartId, quantity) =>
  requestApi(
    '/Membercart/cart_edit_quantity',
    'POST',
    {
      'cart_id': cartId,
      'quantity': quantity
    },
    'member'
  )

// 购物车数量
export const cartQuantity =
() =>
  requestApi(
    '/Membercart/cart_count',
    'POST',
    {
    },
    'member'
  )
  // 购物车商品类型
export const cartType =
(member_id) =>
  requestApi(
    '/Membercart/cart_null',
    'POST',
    {
      'member_id': member_id
    },
    'member'
  )
  // 登陆人配送区域
  export const member_tid =
(member_id) =>
  requestApi(
    '/Store/store_distribution_list',
    'POST',
    {
      'member_id': member_id
    },
    'member'
  )
