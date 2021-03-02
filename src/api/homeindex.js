import { requestApi } from '../util/network'

// 获取 当前 版本号 
export const getAppVersionCode =
  () =>
    requestApi(
      '/Index/h5_version',
      'POST',
      {}
    )

// 根据ap_id 获取 广告列表
export const getAppadList =
  (apId) =>
    requestApi(
      '/Index/getAppadList',
      'POST',
      {
        'ap_id': apId
      }
    )

// 获取首页需要用到的广告图
export const homeIndexAdList =
    () =>
      requestApi(
        '/Index/getIndexAdList',
        'POST',
        {
        }
      )
// 获取今日行情
export const getIndexInform =
	(data) =>
	requestApi(
		'/Refund/goods_hangqing',
		'POST',
		data
		
  )  
// 首页商品列表
export const homeIndexProductList =
    () =>
      requestApi(
        '/Index/getProductList',
        'POST',
        {
        },
        'member'
      )
// 获取可编辑模块
export const getEditablePageConfigList =
    (pageId) =>
      requestApi(
        '/Index/getEditablePageConfigList',
        'POST',
        {
          editable_page_id: pageId
        }
      )
