/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-17 13:58:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-21 09:27:13
 */
import { requestKeepApi } from './network'
// 商家搜索
export const getStoreList =
    (brand, category, keyword, lng, lat, sort_key, page, key = '',store_area_id,transparent=false) =>
    requestKeepApi(
        '/Superviseindex/store_joinin',
        'POST',
        {
          'brand': brand, // 所属品牌id (选填)
          'cate_id': category, // 所属店铺分类id (选填)
          'keyword': keyword, // 关键字 (选填)
          'longitude': lng,
          'latitude': lat,
          'sort_key': sort_key, // 键
          'page': page, // 当前第几页
          'key': key,
          'store_area_id': store_area_id, //用户选择区域过滤
          'transparent':transparent,//透明工程
        },
        'keep'
      )
// 商品搜索
export const getStoreNearbyList =
    (brand, category, keyword, lng, lat, sort_key, page, key = '',store_area_id) =>
    requestKeepApi(
        '/Supervisestore/index1',
        'POST',
        {
          'brand': brand, // 所属品牌id (选填)
          'storeclass_id': category, // 所属店铺分类id (选填)
          'keyword': keyword, // 关键字 (选填)
          'longitude': lng,
          'latitude': lat,
          'sort_key': sort_key, // 键
          'page': page, // 当前第几页
          'key': key,
          'store_area_id':store_area_id
        },
        'keep'
      )
// 商品搜索
export const getStoreListMap =
    (brand, category, keyword, lng, lat, sort_key, page, key = '',store_area_id) =>
    requestKeepApi(
        '/Store/store_list',
        'POST',
        {
          'brand': brand, // 所属品牌id (选填)
          'cate_id': category, // 所属店铺分类id (选填)
          'keyword': keyword, // 关键字 (选填)
          'longitude': lng,
          'latitude': lat,
          'sort_key': sort_key, // 键
          'page': page, // 当前第几页
          'key': key,
          'store_area_id': store_area_id //用户选择区域过滤
        }
      )
// 地图搜索
export const getStoreNearbyList1 =
(brand, category, keyword, lng1, lat1, lng2, lat2, sort_key, page, key = '',zm) =>
requestKeepApi(
    '/Supervisestore/index1',
    'POST',
    {
      'brand': brand, // 所属品牌id (选填)
      'storeclass_id': category, // 所属店铺分类id (选填)
      'keyword': keyword, // 关键字 (选填)
      'longitude1': lng1,
      'latitude1': lat1,
      'longitude2': lng2,
      'latitude2': lat2,
      'sort_key': sort_key, // 键
      'page': page, // 当前第几页
      'key': key,
      'zoom': zm,  // 比例尺
    },
    'keep'
  )
      
