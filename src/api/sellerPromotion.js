import { requestApi } from '../util/network'


/************************ 多买惠 开始 ********************************* */
// 多买惠活动列表
export const duomaihList =
(page,xianshi_name,state) =>
  requestApi(
    '/Sellergoods/duomaih_index',
    'POST',
    {
      'page':page,
      'xianshi_name':xianshi_name,
      'state':state
    },
    'seller'
)

// 新增多买惠活动
export const duomaihAdd =
(obj) =>
  requestApi(
    '/Sellergoods/xianshi_save',
    'POST',
    obj,
    'seller'
)


// 编辑 多买惠活动后 保存
export const duomaihEditSave =
(obj) =>
  requestApi(
    '/Sellergoods/xianshi_edit_save',
    'POST',
    obj,
    'seller'
)


// 多增惠 编辑活动 详情
export const getDiscountDetails =
(xianshi_id) =>
  requestApi(
    '/Sellergoods/xianshi_edit',
    'POST',
    {
      xianshi_id
    },
    'seller'
)

// 多增惠 删除 活动
export const deleteDiscount =
(xianshi_id) =>
  requestApi(
    '/Sellergoods/xianshi_del',
    'POST',
    {
      xianshi_id
    },
    'seller'
)

//  活动内选择未参与商品列表
export const duomaihGoodsSelect =
(goods_name,xianshi_type) =>
  requestApi(
    '/Sellergoods/goods_select',
    'POST',
    {
      'goods_name':goods_name,
      'xianshi_type':xianshi_type
    },
    'seller'
)

//  活动内参与商品列表
export const duomaihGoodsList =
(xianshi_id) =>
  requestApi(
    '/Sellergoods/xianshi_manage',
    'POST',
    {
      'xianshi_id':xianshi_id,
    },
    'seller'
)

//  修改活动内参与商品
export const editXianshiGoods =
(xianshigoods_id,xianshi_price) =>
  requestApi(
    '/Sellergoods/xianshi_goods_price_edit',
    'POST',
    {
      'xianshigoods_id':xianshigoods_id,
      'xianshi_price':xianshi_price
    },
    'seller'
)

//  删除活动内参与商品
export const deteleXianshiGoods =
(xianshigoods_id) =>
  requestApi(
    '/Sellergoods/xianshi_goods_delete',
    'POST',
    {
      'xianshigoods_id':xianshigoods_id,
    },
    'seller'
)

//  新增多增惠 活动内参与商品
export const addXianshiGoods =
(goods_id,xianshi_id,xianshi_price) =>
  requestApi(
    '/Sellergoods/xianshi_goods_add',
    'POST',
    {
      'goods_id' : goods_id,  // 商品 id
      'xianshi_id' : xianshi_id,  //  活动id
      'xianshi_price' : xianshi_price  // 商品价格
    },
    'seller'
)

/************************ 多买惠 结束 ********************************* */


/************************* 抢购 开始 *********************************** */
// 抢购列表
export const getPurchaseList =
(data) =>
  requestApi(
    '/Sellergoods/groupbuy_list',
    'POST',
	data,
    'seller'
)
// 新增抢购选择商品
export const searchProducts =
(data) =>
  requestApi(
    '/Sellergoods/search_goods',
    'POST',
	data,
    'seller'
)
//新增获取时间段
export const getTimeArry =
(data) =>
  requestApi(
    '/Sellergoods/ajax_getGroupbuycuttimeinfo',
    'POST',
	{
		'start_time':data
	},
    'seller'
)
// 提交抢购表单
export const sendGroupbuy =
(data) =>
  requestApi(
    '/Sellergoods/groupbuy_save',
    'POST',
	data,
    'seller'
)
// 抢购提交图片
export const uploadSellerImg =
(data) =>
  requestApi(
    '/Sellergoods/image_upload_q',
    'POST',
	data,
    'seller'
)
//抢购返回审核天数

export const getResTimes =
(data) =>
  requestApi(
    '/Sellergoods/_config',
    'POST',
	data,
    'seller'
)

/************************* 抢购 结束 *********************************** */

/************************* 满即送 开始 ***************************************** */
//  满即送列表
export const getMansongList =
(mansong_name,state,page) =>
  requestApi(
    '/Sellergoods/mansong_index',
    'POST',
    {
      'mansong_name': mansong_name,
      'state':state,
      page
    },
    'seller'
)

// 满送活动商品列表 Sellergoods/mansong_search_goods
export const getMansongSearchGoods =
(params) =>
  requestApi(
    '/Sellergoods/mansong_search_goods',
    'POST',
    params,
    'seller'
)

// 满即送保存 
export const saveMansong =
(mansong_name,mansong_type,start_time,end_time,mansong_rule,remark) =>
  requestApi(
    '/Sellergoods/mansong_save',
    'POST',
    {
      'mansong_name': mansong_name,  // 活动名称
      'start_time':start_time,       // 活动开始 时间
      'end_time':end_time,           // 活动结束时间
      'mansong_type':mansong_type,   // 类型
      'mansong_rule':mansong_rule,   // 多个
      
			'remark':remark,  // 备注
    },
    'seller'
)

//  满送删除Sellergoods/mansong_del
export const deleteMansong =
(mansong_id) =>
  requestApi(
    '/Sellergoods/mansong_del',
    'POST',
    {
      'mansong_id':mansong_id
    },
    'seller'
)

//  满送 查看详情
export const getMansongGetails =
(mansong_id) =>
  requestApi(
    '/Sellergoods/mansong_detail ',
    'POST',
    {
      'mansong_id':mansong_id
    },
    'seller'
)

/************************* 满即送 结束 ***************************************** */


/************************* 优惠套装 开始 ***************************************** */

// 优惠套装列表
export const getSuitList =
(data) =>
  requestApi(
    '/Sellergoods/taozhuang_index ',
    'POST',
	data,
    'seller'
)
// 添加优惠套装
export const sendBundlingbuy =
(data) =>
  requestApi(
    '/Sellergoods/bundling_add',
    'POST',
	data,
    'seller'
)
// 编辑优惠套装获取列表
export const getSuitListEdit =
(data) =>
  requestApi(
    '/Sellergoods/bundling_edit',
    'POST',
	{
		bundling_id:data
	},
    'seller'
)

// 删除优惠套装列表
export const delSuitItem =
(data) =>
  requestApi(
    '/Sellergoods/drop_bundling',
    'POST',
	{
		bundling_id:data
	},
    'seller'
)
//优惠套装搜索
export const taozhuangSerach =
(data) =>
  requestApi(
    '/Sellergoods/taozhuang_search_goods',
    'POST',
	data,
    'seller'
)

/************************* 优惠套装 结束 ***************************************** */
