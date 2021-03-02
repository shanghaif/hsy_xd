// 获取订单支付信息
import { requestRaw,requestApi } from '../util/network'

// 用户支付
export const pay =
    (paySn, payType, data, key,pay_type_new,wxcoder) =>
      requestRaw(
        env.SITE_URL + '?s=api/Memberpayment/' + payType + '/pay_sn/' + paySn + '/password/' + data.password + '/rcb_pay/' + data.rcb_pay + '/pd_pay/' + data.pd_pay + '/payment_code/' + data.payment_code + '/key/' + key + '/pay_type/'+pay_type_new+ '/wxcoder/'+wxcoder
      )
// 获取支付方式列表
export const getPaymentList =
() =>
  requestApi(
    '/Memberpayment/payment_list',
    'POST',
    {
			
    },
    'member'
  )  
// 获取支付数据
export const getPayData = 
(path)=>
  requestApi(
    '/Groupbuy/'+path,
    'GET'
  )
// 微信公众号支付
export const wxpublicPayData = 
(wxcode)=>
  requestApi(
    '/Groupbuy/get_openid',
    'GET',
    {
      wxcoder:wxcode
    }
  )

// 上传 回单  照片
export const uploadRecipt = 
(obj)=>
  requestApi(
    '/Memberorder/orderreceipt_image',
    'POST',
    obj,
    'member',
    true
  )

// 删除 回单照片
export const dropRecipt = 
(file)=>
  requestApi(
    '/Memberorder/orderreceipt_image',
    'POST',
    file,
    'member',
    true
  )

// 提交 回单
export const saveRecipt = 
( order_id, order_image )=>
  requestApi(
    '/Memberorder/orderreceipt_saveimage',
    'POST',
    {
      'order_id' : order_id,  // 订单编号
      'order_image' : order_image,  // 回单图片
    },
    'member',
  )