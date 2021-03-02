/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-20 14:12:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-20 14:40:50
 */
import { requestKeepApi } from './network'

// 安全员上报 信息
export const addReport =
( text_title, text_desc, text_image) =>
requestKeepApi(
    '/Supervisestore/safetytext_add',
    'POST',
    {
      text_title : text_title,  // 标题
      text_desc : text_desc,  // 详细内容
      text_image: text_image,  // 图片
    },
    'keep'
  )
// 上传 图片
export const uploadComplaintPic =
    (file) =>
    requestKeepApi(
        '/Supervisestore/upload_pic',
        'POST',
        file,
        'keep',
      )
// 获取 详情
export const getReportInfo =
    (text_id) =>
    requestKeepApi(
        '/Supervisestore/safetytext_info',
        'POST',
        {
          text_id: text_id,
        },
        'keep'
      )
