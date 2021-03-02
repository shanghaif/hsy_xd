/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-20 08:57:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-20 13:42:05
 */
import { requestKeepApi } from './network'
// 安全员管理 列表
export const keepSafetyList =
  (obj) =>
  requestKeepApi(
      '/Supervisestore/safety_list',
      'POST',
      obj,
      'keep'
    )

// 安全员 详细信息
export const keepSafetyInfo =
  (safety_id) =>
  requestKeepApi(
      '/Supervisestore/safety_info',
      'POST',
      {
        'safety_id': safety_id,  //安全员 id
      },
      'keep'
    )

// 安全员 审核 
export const keepSafetyEdit =
  (safety_id,status) =>
  requestKeepApi(
      '/Supervisestore/safety_edit',
      'POST',
      {
        'safety_id': safety_id,   //安全员 id
        'status'   : status,      // 1申请入驻  2入驻成功
      },
      'keep'
    )

// 安全员信息 列表 
export const keepSafetyTextList =
  (obj) =>
  requestKeepApi(
      '/Supervisestore/safetytext_list',
      'POST',
      obj,
      'keep'
    )

// 制定安全员 列表
export const keepSafetyXuanze =
  () =>
  requestKeepApi(
      '/Supervisestore/safety_xuanze',
      'POST',
      {},
      'keep'
    )
// 指定 安全员
export const keepSafetyShenhe =
  (safety_id,store_id) =>
  requestKeepApi(
      '/Supervisestore/safety_shenhe',
      'POST',
      {
        'safety_id': safety_id,   //安全员 id
        'store_id' : store_id,    //店铺id
      },
      'keep'
    )
