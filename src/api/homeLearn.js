import { requestApi } from '../util/network'

// 获取学习信息
export const getData =
(member_id) =>
  requestApi(
    '/Refund/member_learn',
    'POST',
    {
      "member_id":member_id
    }
  )
// 保存进度
export const saveJD =
(ks,jd,fs) =>
  requestApi(
    '/Member/member_learn_edit',
    'POST',
    {
      "ks":ks,
      "jd":jd,
      "fs":fs
    },
    'member'
  )
//  获取图片下载链接
export const getImgUrl =
    (base64_image_content,id)=>
      requestApi(
        '/Member/base64_image_content1',
        'POST',
        {
          base64_image_content:base64_image_content,
          id:id,
        },
        'member'
      )