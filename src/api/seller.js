import { requestApi } from '../util/network'

// 卖家退出登录
export const logout =
    (seller_name) =>
      requestApi(
        '/Sellerlogout/index',
        'POST',
        {
          seller_name: seller_name,
          client: 'wap'
        },
        'seller'
      )
      
// 获取加密的银联签约地址
export const getSellerSign =
() =>
  requestApi(
    '/Sellerindex/unionpay_signed_jump',
    'POST',
    {

    },
    'seller'
  )
// 获取店铺基本信息
export const getSellerInfo =
    () =>
      requestApi(
        '/Sellerindex/index',
        'POST',
        {
          'client_type': 'wap'
        },
        'seller'
      )
// 旧版本 获取商家列表
export const getStoreClass =
    () =>
      requestApi(
        '/store/get_store_class',
        'POST',
        {

        }
      )
export const getNewStoreClass=
()=>
  requestApi(
    '/Store/get_store_class_new',
    'POST',
    {

    }
  )

export const getStoreGrade =
    () =>
      requestApi(
        '/store/get_store_grade',
        'POST',
        {

        }
      )
export const getStoreJoinin =
    () =>
      requestApi(
        '/Sellerjoinin/get_info',
        'POST',
        {

        },
        'member'
      )
export const saveStoreJoinin2 =
    (joinin) =>
      requestApi(
        '/Sellerjoinin/step2',
        'POST',
        joinin,
        'member'
      )
export const saveStoreJoinin3 =
    (joinin) =>
      requestApi(
        '/Sellerjoinin/step3',
        'POST',
        joinin,
        'member'
      )
export const saveStoreJoinin4 =
    (joinin) =>
      requestApi(
        '/Sellerjoinin/step4',
        'POST',
        joinin,
        'member'
      )
export const saveStoreJoinin5 =
    (joinin) =>
      requestApi(
        '/Sellerjoinin/pay_save',
        'POST',
        joinin,
        'member'
      )
export const uploadInfoFile =
    (file) =>
      requestApi(
        '/Sellerjoinin/upload_image',
        'POST',
        file,
        'member',
        true
      )
// 获取店铺日志记录
export const getSellerLogList =
    () =>
      requestApi(
        '/Sellerlog/log_list',
        'POST',
        {

        },
        'seller'
      )

// 获取店铺的消费记录
export const getSellerCostList =
    () =>
      requestApi(
        '/Sellercost/cost_list',
        'POST',
        {

        },
        'seller'
      )
// 保存商家位置
export const saveSellerStore_lon_lat =
    (key,store_id,lat,lng) =>
      requestApi(
        '/store/store_lon_lat',
        'POST',
        {
          'key':key,
          'store_id':store_id,
          'lat':lat,
          'lng':lng
        },
        'member'
      )

// 获取大华摄像头 token 
export const getLcData =
(app_id,app_scret) =>
  requestApi(
    '/Sellerjoinin/get_token',
    'POST',
    {
      app_id: app_id,
      app_scret: app_scret
    },
    'member'
  )

// 从新获取 token
export const upToken =
() =>
  requestApi(
    '/Sellerjoinin/up_token',
    'POST',
    {},
    'member'
  )

// 获取 1 的真实 token
export const getSeller1Token =
() =>
  requestApi(
    '/Refund/token_one',
    'POST',
    {},
  )

// 店铺入住 查询 库中是否有 此 许可证编号
export const getStcomByxkz =
(b_xk_no,b_xk_no1) =>
  requestApi(
    '/Storecom/getstcomByxkz',
    'POST',
    {
      'b_xk_no':b_xk_no,
      'b_xk_no1':b_xk_no1, // 第二次 修改
    },
    'member'
  )

// 修改 许可证 编号
export const setSellerXkz =
(b_xk_no,b_xk_no1) =>
  requestApi(
    '/Sellerjoinin/storeedit_save',
    'POST',
    {
      'b_xk_no': b_xk_no,
      'b_xk_no1': b_xk_no1,
    },
    'member'
  )


// 修改 许可证 编号
export const uploadCropImg =
(base64_image_content) =>
  requestApi(
    '/Sellerjoinin/upload_image_base64',
    'POST',
    {
      'base64_image_content': base64_image_content
    },
    'member'
  )

// 申请成为 供应链
export const getUpGrade =
(base64_image_content) =>
  requestApi(
    '/Sellerindex/store_supply_chain',
    'POST',
    {},
    'seller'
  )
  
//  供应链 商品列表
export const getUpGradeGoodsList =
(params) =>
  requestApi(
    '/Store/store_supply_goodslist',
    'POST',
    params,
    'seller'
  )
  
//  申请 食安类别  列表
export const getApplySabrand =
() =>
  requestApi(
    '/Sellerindex/apply_sabrand',
    'POST',
    {},
    'seller'
  )

  
// 查看当前商家 食安类别  列表
/**
 * 返回值： ["id"] =&gt; int(18)
  ["sabrand_id"] =&gt; int(21)
  ["unit_type"] =&gt; string(1) "5"
  ["store_id"] =&gt; int(33)
  ["status"] =&gt; string(1) "1"   1申请中   2申请通过
  ["sabrand_store_id"] =&gt; int(820)
 */
export const getApplySabrandShen =
() =>
  requestApi(
    '/Sellerindex/apply_sabrand_shen',
    'POST',
    {},
    'seller'
  )

//  提交申请 食安类别 
export const submitApplySabrand =
(obj) =>
  requestApi(
    '/Sellerindex/apply_sabrand_save',
    'POST',
    obj,
    'seller'
  )



//  提交申请 冷链
export const applyCold =
() =>
  requestApi(
    '/Sellerindex/store_leng',
    'POST',
    {},
    'seller'
  )


//  开通 大华 摄像头 直播
export const openLcApi =
(token,deviceId,channelId,app_id,app_scret) =>
  requestApi(
    '/Refund/openapi',
    'POST',
    {
      token:token,
      deviceId:deviceId,
      channelId:channelId,
      appId:app_id,
      appSecret:app_scret
    }
  )
