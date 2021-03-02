import {
	requestApi,
	requestRaw
} from '../util/network'
// 会员宴席订单列表
export const getMemberBanqueList =
	(obj) =>
	requestApi(
		'/Memberbanque/member_banque_list',
		'POST',
		obj,
		// {
		//   'pagesize': pagesize,
		//   'page': page,
		//   'status': status
		// },
		'member'
	)
	
// 用户获取商家宴席预定列表
export const getSellerSetList =
	(data) =>
	requestApi(
		'/Memberbanque/banquet_store_info',
		'POST',
		data,
		'member'
	)
	
// 用户获取商家宴席预定列表
export const sendOrderList =
	(data) =>
	requestApi(
		'/Memberbanque/member_banque_book',
		'POST',
		data,
		'member'
	)	
	
// 厨师宴席订单列表
export const getMemberBanqueCookList =
	(obj) =>
	requestApi(
		'/Memberbanque/member_banquecook_list',
		'POST',
		obj,
		'member'
	)

// 选择菜品分类
export const getBanqueGoodsClass =
	(store_id,banquet_type,table_name) =>
	requestApi(
		'/Memberbanque/member_goods_class',
		'POST',
		{
			'store_id':store_id,
			'banquet_type': banquet_type,
		},
		'member'
	)
		
// 用户宴席订单列表详情
export const getListInfo =
(data) =>
requestApi(
	'/Memberbanque/Member_banque_info',
	'POST',
	data,
	'member'
)

// 用户去选菜
export const getMemberBanqueMenu =
(data) =>
requestApi(
	'/Memberbanque/member_banquec_menu',
	'POST',
	data,
	'member'
)

// 会员取消订单
export const cancelOrder =
(data) =>
requestApi(
	'/Memberbanque/Member_banque_status',
	'POST',
	data,
	'member'
)

// 厨师备注
 export const sendMarket =
  (data) =>
  requestApi(
   '/Memberbanque/banquet_cook_memo',
   'POST', 
   data,
   'member'
  )
  // 初始签到
  export const qiandao =
   (data) =>
   requestApi(
    '/Memberbanque/member_banquecook_sign',
    'POST', 
    data,
    'member'
	 )

// 获取订单支付信息
export const getOrderpayInfo =
    (paySn) =>
      requestApi(
        '/Memberbanque/yan_pay',
        'POST',
        {
          'pay_sn': paySn
        },
        'member'
			)

// 用户支付
export const pay =
    (paySn, payType, data, key,pay_type_new,wxcoder) =>
      requestRaw(
        env.SITE_URL + '?s=api/Memberbanque/' + payType + '/pay_sn/' + paySn + '/password/' + data.password + '/rcb_pay/' + data.rcb_pay + '/pd_pay/' + data.pd_pay + '/payment_code/' + data.payment_code + '/key/' + key + '/pay_type/'+pay_type_new+ '/wxcoder/'+wxcoder
      )
