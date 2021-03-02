import { requestApi } from '../util/network'


// 获取 多买惠列表
export const getXianshiList =
    (params) =>
      requestApi(
        '/Goods/xianshi_list',
        'POST',
        params
      );
	  
	 
/* *------秒杀抢购-------- */
// 获取 秒杀抢购时间列表
export const getTimeList =
    (data) =>
      requestApi(
        '/Goods/cuttime_list',
        'POST',
        data
      );
//获取 秒杀抢购列表
export const getContentList =
    (data) =>
      requestApi(
        '/Goods/qianggou_list',
        'POST',
        data
      );