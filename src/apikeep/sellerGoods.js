/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-17 15:39:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-17 15:51:34
 */
import { requestKeepApi } from './network'

// 获取卖家商品列表
export const getGoodsList1=
    (d_start,d_end,store_id) =>
    requestKeepApi(
        '/Supervisestore/goods_account',
        'POST',
        {
          'd_start': d_start,
          'd_end': d_end,
          'store_id':store_id,
        },
        'keep'
      )

// 获取二维码 商品 溯源
export const getGoodsQrcode =
    (goods_commonid) =>
    requestKeepApi(
        '/Sellergoods/goods_qrcode',
        'POST',
        {
          'goods_commonid':goods_commonid
        },
        'keep',
      )