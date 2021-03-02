import { requestApi } from '../util/network'

// 商家宴席订单列表
export const getBanquetStoreList =
  (obj)=>
  requestApi(
    '/Sellerbanquet/banquet_store_list',
    'POST',
    obj,
    'seller'
    // {
    //   'pagesize': pagesize,
    //   'page': page,
    //   'status': status
    // },
  )

// 商家获取宴席信息
export const getBanquetStoreInfo =
  ()=>
  requestApi(
    '/Sellerbanquet/banquet_store_info',
    'POST',
    {
    },
    'seller'
  )

// 商家宴席开关设置
export const setBanquetStatus =
  (status)=>
  requestApi(
    '/Sellerbanquet/banquet_off',
    'POST',
    {
      'status':status
    },
    'seller'
  )

// 商家设置宴席信息
export const setBanquetInfo =
  (obj)=>
  requestApi(
    '/Sellerbanquet/banquet_set',
    'POST',
    obj,
    'seller'
  )
  
//商家--商家接单
// 厨师上门
export const dinnerCookList =
 () =>
 requestApi(
  '/Refund/cook_list',
  'POST', {
  },
  'seller'
 )
 // 厨师上门接单
 export const getOrderCInfo =
  (data) =>
  requestApi(
   '/Sellerbanquet/banquet_storecook_status',
   'POST', 
   data,
   'seller'
  )
//获取列表信息
export const getListInfo =
 (data) =>
 requestApi(
  '/Sellerbanquet/banquet_store_order_info',
  'POST', 
  data,
  'seller'
 )
//到店堂食接单
export const getOrderLInfo =
 (data) =>
 requestApi(
  '/Sellerbanquet/banquet_store_status',
  'POST', 
  data,
  'seller'
 )
 
 //商家订单备注
 export const sendMarket =
  (data) =>
  requestApi(
   '/Sellerbanquet/banquet_store_memo',
   'POST', 
   data,
   'seller'
  )
 