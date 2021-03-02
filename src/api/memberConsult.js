import { requestApi } from '../util/network'
// 投诉列表
export const getConsultList =
    (params) =>
      requestApi(
        '/memberconsult/index',
        'POST',
        {
          page: params.page,
          per_page: params.per_page
        },
        'member'
      )

// 获取 用户页面 的主要消息 条数 小红点
export const getMemberInformation =
    () =>
      requestApi(
        '/Memberconsult/consult_count',
        'POST',
        {
        },
        'member'
      )
