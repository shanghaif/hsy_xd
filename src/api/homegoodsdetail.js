import { requestApi } from '../util/network'

// 移动端产品详情页增加参数
// api/Goods/goods_detail
// form_id，入口，0无，1折扣，2抢购
// terminal_id，终端，1APP，2公众号
// 获取商品
export const getGoodsInfo =
  ( terminal_id, form_id, id, token, extra = {}) =>
    requestApi(
      '/goods/goods_detail',
      'GET',
      Object.assign(
        {
          'goods_id': id,
          'key': token,
          "terminal_id" : terminal_id,
          "form_id" : form_id,
        },
        extra)
    )
// 商品评论
export const getReviewList =
    (id, type, page) =>
      requestApi(
        '/goods/goods_evaluate',
        'GET',
        {
          'goods_id': id,
          'type': type,
          'page': page
        }
      )
// 组合搭配
export const productAccessoryList =
    (id,key) =>
      requestApi(
        '/goods/get_bundling',
        'GET',
        {
          'goods_id': id,
          "key":key
        },
		'member'
      )
// 收藏商品
export const productLike =
    (id) =>
      requestApi(
        '/Memberfavorites/favorites_add',
        'POST',
        {
          'goods_id': id
        },
        'member'
      )
// 取消收藏
export const productUnlike =
    (id) =>
      requestApi(
        '/Memberfavorites/favorites_del',
        'POST',
        {
          'fav_id': id
        },
        'member'
      )
// 获取商品
export const getGoodsConsult =
    (params, id) =>
      requestApi(
        '/goods/consulting_list',
        'GET',
        {
          'goods_id': id,
          'page': params.page,
          'per_page': params.per_page
        }
      )
// 资讯商家
export const addGoodsConsult =
    (id, consult_type_id, content, token) =>
      requestApi(
        '/goods/save_consult',
        'POST',
        {
          'goods_content': content,
          'consult_type_id': consult_type_id,
          'goods_id': id,
          'key': token
        }
      )

// 扫描二维码 获取 商品 溯源安全
export const getGoodsQrcodeInfo =
  ( goods_commonid ) =>
    requestApi(
      '/Goods/goods_qrcode_info',
      'POST',
      {
        'goods_commonid': goods_commonid,
      }
    )
