/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-25 15:03:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-20 14:49:10
 */
import { requestApi } from '../util/network'

// 获取用户订单列表
export const getOrderList =
(parmas, stateType, orderKey) =>
  requestApi(
    '/Memberorder/order_list',
    'POST',
    {
      'page': parmas.page,

      'per_page': parmas.per_page,
      'state_type': stateType,
      'order_key': orderKey
    },
    'member'
  )
// 获取订单信息
export const getOrderInfo =
(orderId) =>
  requestApi(
    '/Memberorder/order_info',
    'POST',
    {
      'order_id': orderId
    },
    'member'
  )
// 订单评价
export const saveOrderEvaluate =
    (orderId, result) =>
      requestApi(
        '/Memberevaluate/save',
        'POST',
        Object.assign(
          {
            'order_id': orderId
          },
          result),
        'member'
      )
// 获取评价信息
export const getOrderEvaluateInfo =
    (orderId) =>
      requestApi(
        '/Memberevaluate/index',
        'POST',
        {
          'order_id': orderId
        },
        'member'
      )
// 取消订单
export const cancelOrder =
    (orderId) =>
      requestApi(
        '/Memberorder/order_cancel',
        'POST',
        {
          'order_id': orderId
        },
        'member'
      )
// 订单收货
export const receiveOrder =
    ( orderId, goods_yhren ) =>
      requestApi(
        '/Memberorder/order_receive',
        'POST',
        {
          'order_id': orderId,
          'goods_yhren':goods_yhren,
        },
        'member'
      )
// 物流跟踪
export const getOrderDeliver =
    (orderId) =>
      requestApi(
        '/Memberorder/search_deliver',
        'POST',
        {
          'order_id': orderId
        },
        'member'
      )

// 商家账户信息
export const getStoreInfo =
    (store_id) =>
      requestApi(
        '/Member/store_join_info',
        'POST',
        {
          'store_id': store_id
        },
        'member'
      )
