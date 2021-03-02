import { requestApi } from '../util/network'

// 获取卖家商品列表
export const getGoodsList =
    (params, keyword, goods_type, search_type) =>
      requestApi(
        '/Sellergoods/goods_list',
        'POST',
        {
          'keyword': keyword,
          'goods_type': goods_type,
          'search_type': search_type,
          'page': params.page,
          'per_page': params.per_page,
          'client_type': 'wap'
        },
        'seller'
      )

// 获取卖家商品列表
export const getGoodsList1=
    (d_start,d_end) =>
      requestApi(
        '/Sellergoods/goods_list1',
        'POST',
        {
          'd_start': d_start,
          'd_end': d_end,
        },
        'seller'
      )
// 删除商品
export const dropGoods =
    (commonid) =>
      requestApi(
        '/Sellergoods/drop_goods',
        'POST',
        {
          'commonid': commonid,
          'client_type': 'wap'
        },
        'seller'
      )
// 商品上架
export const goodsShow =
    (commonid) =>
      requestApi(
        '/Sellergoods/goods_show',
        'POST',
        {
          'commonid': commonid,
          'client_type': 'wap'
        },
        'seller'
      )
// 商品下架
export const goodsUnshow =
    (commonid) =>
      requestApi(
        '/Sellergoods/goods_unshow',
        'POST',
        {
          'commonid': commonid,
          'client_type': 'wap'
        },
        'seller'
      )
// 商品编辑
export const goodsEdit =
    (commonid) =>
      requestApi(
        '/Sellergoods/edit_goods',
        'POST',
        {
          'commonid': commonid
        },
        'seller'
      )
// 商品规格值
export const goodsSpecAdd =
    (name, gc_id, sp_id) =>
      requestApi(
        '/Sellergoods/add_spec',
        'POST',
        {
          'name': name,
          'gc_id': gc_id,
          'sp_id': sp_id
        },
        'seller'
      )
export const uploadInfoFile =
    (file) =>
      requestApi(
        '/Sellergoods/image_upload',
        'POST',
        file,
        'seller',
        true
      )
// 商品保存
export const goodsSave =
    (obj) =>
      requestApi(
        '/sellergoods/save_foods',
        'POST',
        obj,
        'seller'
      )
// 获取店铺商品分类公共数据
export const getCommonData =
    (class_id) =>
      requestApi(
        '/Sellergoods/get_common_data',
        'POST',
        {
          'class_id': class_id
        },
        'seller'
      )
// 图片编辑
export const imageEdit =
    (commonid) =>
      requestApi(
        '/Sellergoods/edit_image',
        'POST',
        {
          'commonid': commonid
        },
        'seller'
      )
// 图片保存
export const imageSave =
    (commonid, img) =>
      requestApi(
        '/Sellergoods/save_image',
        'POST',
        {
          'commonid': commonid,
          'img': img
        },
        'seller'
      )
// 获取店铺经营分类
export const getGoodsClass =
    () =>
      requestApi(
        '/Sellergoods/goods_class',
        'POST',
        {

        },
        'seller'
      )

// 获取当前商家 商品下拉列表：
export const getGoodsWaste =
    () =>
      requestApi(
        '/Sellergoods/goods_reimbursement_list',
        'POST',
        {

        },
        'seller'
      )

// 获取当前商家 报销消费列表
export const getGoodsReimbursement =
    () =>
      requestApi(
        '/Sellergoods/goods_reimbursement',
        'POST',
        {

        },
        'seller'
      )
// 新增 当前商家 报销消费列表
export const addGoodsReimbursement =
    (goods_id,reimbursement_num,type) =>
      requestApi(
        '/Sellergoods/goods_reimbursement_add',
        'POST',
        {
          "goods_id": goods_id,
          "reimbursement_num": reimbursement_num,
          "type": type
        },
        'seller'
      )

// 单位列表 数据
export const getGoodsUnitList =
    () =>
      requestApi(
        '/Goods/goods_unit',
        'POST',
      )


// 单位列表 数据
export const uploadGoodsCropImg =
    (base64_image_content) =>
      requestApi(
        '/Sellergoods/image_upload_base64',
        'POST',
        {
          'base64_image_content':base64_image_content
        },
        'seller',
      )
/****************   餐桌 ************************************* */
// 获取卖家餐桌列表
export const getDesksList =
(params, keyword, goods_type, search_type) =>
  requestApi(
    '/sellergoods/desk_list',
    'POST',
    {
      'keyword': keyword,
      'goods_type': goods_type,
      'search_type': search_type,
      'page': params.page,
      'per_page': params.per_page,
      'client_type': 'wap'
    },
    'seller'
  )

// 发布 餐桌
export const SaveDesk =
( deskid, deskname ) =>
  requestApi(
    '/sellergoods/save_desk',
    'POST',
    {
      'deskid': deskid,
      'deskname': deskname,
    },
    'seller'
  )

// 删除 餐桌 api/sellergoods/del_desk
export const DeleteDesk =
( deskid ) =>
  requestApi(
    '/sellergoods/del_desk',
    'POST',
    {
      'desk_id': deskid,
    },
    'seller'
  )

// 翻桌 餐桌 sellergoods/reset_desk
export const ResetDesk =
( dorderid ) =>
  requestApi(
    '/sellergoods/reset_desk',
    'POST',
    {
      'dorderid': dorderid,
    },
    'seller'
  )


// 餐桌 订单 记录
export const getDeskOrder =
( obj ) =>
  requestApi(
    '/sellergoods/desk_order',
    'POST',
    obj,
    'seller'
  )

