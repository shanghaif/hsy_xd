import { requestApi } from '../util/network'

// 获取当前店铺所有代金券
export const getStoreVoucher =
    (storeId) =>
      requestApi(
        '/Voucher/voucher_tpl_list',
        'POST',
        {
          'store_id': storeId, // 所属店铺
          'gettype': 'points'
        }
      )
// 领取取代金券
export const receiveVoucher =
    (tid) =>
      requestApi(
        '/Membervoucher/voucher_point',
        'POST',
        {
          'tid': tid
        },
        'member'
      )
// 获取当前店铺信息
export const getStoreInfo =
    (terminal_id,storeId, token,memberId,userStoreId,buyType,areaId,tuan) =>
      requestApi(
        '/Store/store_info',
        'POST',
        {
          'terminal_id':terminal_id,  // 终端
          'store_id': storeId, // 所属店铺
          'key': token,
          'member_id': memberId,//登录用户id
          'user_store_id': userStoreId,//如果是商家 商家id
          // 'buy_type': buyType,//如果是普通会员 零售/团购
          // 'area_id': areaId,//零售地区
          // 'tuan': tuan,//团购地区
          
        }
      )

// 获取店铺分类
export const getStoreGoodsClass =
    (storeId) =>
      requestApi(
        '/Store/store_goods_class',
        'POST',
        {
          'store_id': storeId // 所属店铺
        }
      )
// 获取店铺商品
export const getStoreGoodsList =
    (params,memberId,userStoreId,buyType,areaId,tuan,key) =>
      requestApi(
        '/Store/store_goods',
        'POST',
        {
          'page': params.page,
          'per_page': params.per_page,
          'storegc_id': params.gc_id,
          'keyword': params.keyword,
          'store_id': params.store_id, // 所属店铺
          'sort_order': params.sort_order,
          'sort_key': params.sort_key,
          
          'member_id': memberId,//登录用户id
          'user_store_id': userStoreId,//如果是商家 商家id
          'key':key
          // 'buy_type': buyType,//如果是普通会员 零售/团购
          // 'area_id': areaId,//零售地区
          // 'tuan': tuan,//团购地区
        }
      )
      // 获取商家全部商品
export const getStoreGoodsListAll =
    (store_id,gc_id) =>
      requestApi(
        '/Store/store_list_all',
        'POST',
        {
          'store_id': store_id,//商家id
          "gc_id": gc_id,         ///商品分类
        }
      )


// 
export const getLiveData =
(token,deviceId,channelId,app_id,app_scret) =>
  requestApi(
    '/Refund/get_StreamInfo',
    'POST',
    {
      token:token,
      deviceId:deviceId,
      channelId:channelId,
      appId:app_id,
      appSecret:app_scret
    }
  )

// 获取 餐饮 菜品列表
export const getFoodsList =
( store_id ) =>
  requestApi(
    '/store/store_foods',
    'POST',
    {
      store_id:store_id,
    },
    'member'
  )
	
// 获取 餐饮 餐桌列表
export const getSelectDesk =
( store_id,order_begin,order_end ) =>
  requestApi(
    '/memberbuy/select_desk',
    'POST',
    {
      'store_id':store_id,       // 店铺名称
			'order_begin':order_begin, // 开始 时间
			'order_end':order_end,     //  结束时间
    },
    'member'
  )

//  获取 餐饮 提交餐桌
export const setDeskOrder =
( desk_id,store_id,order_begin,order_end ) =>
  requestApi(
    '/memberbuy/desk_order',
    'POST',
    {
			'desk_id':desk_id,         // 餐桌 ID
      'store_id':store_id,       // 店铺名称
			'order_begin':order_begin, // 开始 时间
			'order_end':order_end,     //  结束时间
    },
    'member'
  )
	
//  获取 餐饮 提交餐桌
export const getDeskOrderList =
(obj) =>
  requestApi(
    '/memberbuy/order_list',
    'POST',
    obj,
    'member'
  )
	
//  取消 餐饮 订单
export const orderCancel =
( id ) =>
  requestApi(
    '/memberbuy/order_cancel',
    'POST',
    {
			'id' :id,
		},
    'member'
  )

  // url:getLiveStreamInfo
  // "token":"At_12345678901234567890123456789012", // [String][Not Null]授权的token(userToken或accessToken)
  // "deviceId":"2342sdfl-df323-23", // [String][Not Null]设备序列号
  // "channelId":"0", // [String][Not Null]通道号

  // 'params':'{"token":"At_12345678901234567890123456789012","deviceId":"2342sdfl-df323-23","channelId":"0"}'