/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-17 16:45:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-20 17:44:23
 */
import { requestKeepApi } from './network'
// 获取商家信息
export const keepGetShenhedit =
  (member_id) =>
  requestKeepApi(
      '/Supervisestore/shenhedit',
      'POST',
      {
        'member_id':member_id
      },
      'keep'
    )

// 商家审核保存
// Supervisestore/store_joinin_verify
// verify_type:  ‘pass'通过    拒绝
// joinin_message：审核意见
// paying_amount：0  传0
// member_id：
// sabrand_id：食安品牌 0无   1食安山东   2食安曹县
// sabrand_grade：食安等级 9A+   8A  7A-  6B+  5B  4B-   3C+  2C  1C-
// 提交审核
export const keepSaveShenhedit =
  (obj) =>
  requestKeepApi(
      '/Supervisestore/store_joinin_verify',
      'POST',      
      // verify_type:  ‘pass'通过    拒绝
      // joinin_message：审核意见
      // paying_amount：0  传0
      // member_id：
      // sabrand_id：食安品牌 0无   1食安山东   2食安曹县
      // sabrand_grade：食安等级 9A+   8A  7A-  6B+  5B  4B-   3C+  2C  1C-
      obj,      
      'keep'
    )

// 修改 店铺名称
export const keepSaveStoreEdit =
  (obj) =>
  requestKeepApi(
      '/Supervisestore/store_edit',
      'POST',
      obj,      
      'keep'
    )