import { requestApi } from '../util/network'

/**
 * 获取卖家商品列表
 */
export const getStatisticsGeneral =
    () =>
      requestApi(
        '/Statisticsgeneral/index',
        'POST',
        {
          'client_type': 'wap'
        },
        'seller'
      )

/**
 * 【新增】转化率分析
  store_id 店铺id
  sel_timeid 时间，1一天2一周3一月
  goods_id 商品id
  class_id 商品分类id
  form_id 入口id，，1零售2团购3零售折扣4零售抢购5团购折扣6团购抢购
  terminal_id 终端id，1APP2公众号3h54PC
 */
export const getConversion =
    (store_id,{sel_timeid,goods_id,class_id,form_id,terminal_id}) =>
      requestApi(
        '/Statistic/conversion',
        'POST',
        {
          'store_id':store_id,
          'sel_timeid':sel_timeid,// sel_timeid 时间，1一天2一周3一月
          'goods_id':goods_id,    // 商品id
          'class_id':class_id,    // 商品分类id
          'form_id':form_id,      // 入口id，，1零售2团购3零售折扣4零售抢购5团购折扣6团购抢购
          'terminal_id':terminal_id,   // 终端id，1APP2公众号3h54PC
        },
        'seller'
      )


/*
  用户分析
  api/Statistic/useranalysis
  store_id 店铺id
  sel_timeid 时间，2一周，3一月
  goods_id 商品id
*/
export const getUseranalysis =
(store_id,{sel_timeid,goods_id}) =>
  requestApi(
    '/Statistic/useranalysis',
    'POST',
    {
      'store_id':store_id,
      'sel_timeid':sel_timeid,// sel_timeid 时间，1一天2一周3一月
      'goods_id':goods_id,    // 商品id
    },
    'seller'
  )

/*
  3，订单分析
  api/Statistic/orderanalysis
  store_id 店铺id
  sel_timeid 时间，1一天，2一周，3一月
  goods_id 商品id
  region_id 乡镇区域id
*/
export const getOrderanalysis =
(store_id,{sel_timeid,goods_id,region_id}) =>
  requestApi(
    '/Statistic/orderanalysis',
    'POST',
    {
      'store_id':store_id,
      'sel_timeid':sel_timeid,// sel_timeid 时间，1一天2一周3一月
      'goods_id':goods_id,    // 商品id
      'region_id':region_id
    },
    'seller'
  )