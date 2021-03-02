import { requestApi } from '../util/network'
// 举报商家列表
export const getComplaintList =
    (params) =>
      requestApi(
        '/membercomplain/complain_store_list',
        'POST',
        {
          page: params.page,
          per_page: params.per_page
        },
        'member'
      )
// 新增举报商家
export const addReport =
(store_id, store_name, complain_content, pic_name) =>
  requestApi(
    '/membercomplain/complain_store_save',
    'POST',
    {
      store_id : store_id,  // 商家 id
      store_name : store_name,  // 商家 名称
      complain_content : complain_content,  // 详细内容
      pic_name: pic_name,  // 图片
    },
    'member'
  )
// 取消举报商家
export const cancelComplaint =
    (order_id) =>
      requestApi(
        '/membercomplain/complain_cancel',
        'POST',
        {
          complain_id: order_id
        },
        'member'
      )
// 上传 图片
export const uploadComplaintPic =
    (file) =>
      requestApi(
        '/membercomplain/upload_pic',
        'POST',
        file,
        'member',
        true
      )
// 获取公共信息
export const getCommonData =
    (order_id, goods_id) =>
      requestApi(
        '/membercomplain/get_common_data',
        'POST',
        {
          order_id: order_id,
          goods_id: goods_id
        },
        'member'
      )
// 获取 详情
export const getReportInfo =
    (complain_id) =>
      requestApi(
        '/membercomplain/complain_store_info',
        'POST',
        {
          complain_id: complain_id
        },
        'member'
      )

export const addComplaintTalk =
    (complain_id, complain_talk) =>
      requestApi(
        '/membercomplain/publish_complain_talk',
        'POST',
        {
          complain_id: complain_id,
          complain_talk: complain_talk
        },
        'member'
      )
    
export const getComplaintTalk =
    (complain_id) =>
      requestApi(
        '/membercomplain/get_complain_talk',
        'POST',
        {
          complain_id: complain_id
        },
        'member'
      )

export const handleComplain =
    (complain_id) =>
      requestApi(
        '/membercomplain/apply_handle',
        'POST',
        {
          input_complain_id: complain_id
        },
        'member'
      )
