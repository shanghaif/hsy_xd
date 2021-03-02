/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-18 15:37:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-21 10:42:10
 */
import { requestKeepApi } from './network'

// 商品 分类
export const getGoodsclassList =
  (obj) =>
  requestKeepApi(
      '/Supervisegoods/index',
      'POST',
      obj,
      'keep'
    )

// 搜索 商品
export const keepSearchGoodsList =
  (obj) =>
  requestKeepApi(
      '/Supervisegoods/goods_list',
      'POST',
      obj,
      'keep'
    )

// 商品追溯
export const keepGetGoodsZS =
  (goods_commonid) =>
  requestKeepApi(
      '/Supervisegoods/goodszs',
      'POST',
      {
        goods_commonid:goods_commonid
      },
      'keep'
    )
// 商品 上架 下架
export const keepSetGoodsLockup =
  (goods_commonid) =>
  requestKeepApi(
      '/Supervisegoods/goods_lockup',
      'POST',
      {
        goods_commonid:goods_commonid,
      },
      'keep'
    )
    