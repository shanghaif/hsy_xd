import { requestApi } from '../util/network'
// 获取菜单
export const getMenuInfo =
    (data) =>
      requestApi(
        '/Refund/menu_index',
        'POST',
		data,
      )
// 厨师列表
export const getCookInfo =
    (data) =>
      requestApi(
        '/Refund/cook_list',
        'POST',
		data,
		'member'
      )
// 菜谱分类
export const getMenuClass =
  (data) =>
	requestApi(
	  '/Menu/get_menu_class_list',
	  'POST',
	data,
	'member'
	)
// 点赞 菜谱厨师
export const sendThumbs =
  (data) =>
	requestApi(
	  '/Menu/menu_thumbs',
	  'POST',
	data,
	'member'
	)
// 上传厨师证
export const uploadMemberCookImg =
  (data) =>
	requestApi(
	  '/Menu/menu_images',
	  'POST',
	data,
	'member'
	)

// 上传厨师证
export const uploadCropImg =
  (base64_image_content) =>
	requestApi(
	  '/Menu/menu_images_base64',
	  'POST',
	{
		"base64_image_content":base64_image_content
	},
	'member'
	)

// 商家获取 厨师 信息 
export const getStoreCookInfo =
  (member_id) =>
	requestApi(
	  '/Menu/cook_cookinfo',
	  'POST',
		{
			'member_id':member_id
		},
		'member'
	)

// 商家 删除 厨师 信息 
export const selStoreCook =
  (cook_id) =>
	requestApi(
	  '/Menu/cook_del',
	  'POST',
		{
			'cook_id':cook_id
		},
		'member'
	)

export const addCookInfo =
  (data) =>
	requestApi(
	  '/Menu/cook_add',
	  'POST',
	data,
	'member'
	)
	// 厨师审核状态
export const cookShenhe =
  (data) =>
	requestApi(
	  '/Menu/cook_shenhe',
	  'POST',
	data,
	'member'
	)
// 获取菜单分类
export const resMenuClass =
  (data) =>
	requestApi(
	  '/Menu/get_menu_class_list',
	  'POST',
	data,
	'member'
	)
// 提交菜谱
export const sendMenuAdd =
  (data) =>
	requestApi(
	  '/Menu/menu_add',
	  'POST',
	data,
	'member'
	)
	
// 菜谱详情
export const getMenuDetail =
  (data) =>
	requestApi(
	  '/Menu/menu_info',
	  'POST',
	data,
	'member'
	)
// wode菜谱管理
export const getMyMenuList =
  () =>
	requestApi(
	  '/Menu/my_menu_list',
	  'POST',
	{},
	'member'
	)
// 删除菜谱
export const delMyMenuListItem =
  (data) =>
	requestApi(
	  '/Menu/my_menu_del',
	  'POST',
	data,
	'member'
	)
// 餐馆管理
export const manageCooklist =
  (data) =>
	requestApi(
	  '/Menu/cook_list',
	  'POST',
	data,
	'member'
	)
// 菜谱搜索
export const menuSearchKeyWord =
  (data) =>
	requestApi(
	  '/Menu/menu_index',
	  'POST',
	data,
	'member'
	)
// 厨师主页
export const cookhome =
  (data) =>
	requestApi(
	  '/Menu/menu_cook_info',
	  'POST',
	data,
	'member'
	)
// 菜谱详情收藏
export const shoucangSend =
  (data) =>
	requestApi(
	  '/Menu/menucollection_save',
	  'POST',
	data,
	'member'
	)
// 取消收藏
export const quxiaoshoucang =
  (data) =>
	requestApi(
	  '/Menu/menucollection_del',
	  'POST',
	data,
	'member'
	)
// 评论
export const sendCommentReq =
  (data) =>
	requestApi(
	  '/Menu/menu_commentadd',
	  'POST',
	data,
	'member'
	)
	// 子评论列表
export const getCommentDetailList =
  (data) =>
	requestApi(
	  '/Menu/menucomment_list',
	  'POST',
	data,
	'member'
	)
	
	// 一键买齐
export const cartAdd =
  (data) =>
	requestApi(
	  '/Membercart/cart_add',
	  'POST',
	data,
	'member'
	)
	
// 获取店铺经营分类
export const getGoodsClass =
	() =>
	  requestApi(
		'/Menu/goods_class',
		'POST',
		{

		},
		'member'
	  )
// 获取首页单个菜谱
export const getMenuInfoOne =
	() =>
	  requestApi(
		'/Goods/menu_index',
		'POST',
		{

		},
		// 'member'
		)
// 菜谱关联菜品选择的菜品
export const getBanquetGoodsList =
	(obj) =>
	  requestApi(
		'/Menu/banquet_goods_list',
		'POST',
		obj,
		'member'
		)