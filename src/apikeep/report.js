/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-17 16:25:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-21 17:40:27
 */
import { requestKeepApi } from './network'
// 管理员查看 安全员上报的列表
export const getComplaintList =
    (params) =>
    requestKeepApi(
        '/Supervisestore/safetytext_list',
        'POST',
        params,
        'keep'
      )
// 管理员查看 安全员上报的详情
export const getReportInfo =
    (text_id) =>
    requestKeepApi(
        '/Supervisestore/safetytext_info',
        'POST',
        {
          text_id: text_id
        },
        'keep'
      )
// 管理员给 安全员上报的详情 返回处理意见
export const saveReportMessage =
    (text_id,text_desc) =>
    requestKeepApi(
        '/Supervisestore/safetytext_edit',
        'POST',
        {
          text_id: text_id,
          desc:text_desc
        },
        'keep'
      )


// 管理员查看 举报列表
export const getComplaintListJuBao =
    (params) =>
    requestKeepApi(
        '/Supervisestore/complainstorelist',
        'POST',
        params,
        'keep'
      )
// 管理员查看 安全员上报的详情
export const getReportInfoJubao =
    (complain_id) =>
    requestKeepApi(
        '/Supervisestore/complainstoreedit',
        'POST',
        {
          complain_id: complain_id
        },
        'keep'
      )

// 管理员查看 安全员上报的详情
export const saveReportMessageJubao =
    (complain_id,complainsubject_desc) =>
    requestKeepApi(
        '/Supervisestore/complainstoresave',
        'POST',
        {
          complain_id: complain_id,
          complainsubject_desc:complainsubject_desc
        },
        'keep'
      )      