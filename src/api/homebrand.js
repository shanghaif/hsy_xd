import { requestApi } from '../util/network'


// 获取食安企业类型-POST
export const getUnitType =
    () =>
      requestApi(
        '/Sabrand/getUnittype',
        'POST',
        {}
      );
// 获取食安企业类型-POST
export const getHotKeyWords =
    () =>
      requestApi(
        '/Sabrand/getunithotkwd',
        'POST',
        {}
      );
// // 获取热门推荐
// export const getHotKeyWords = 
//   ()=>
//     requestApi(
//       '/Sabrand/getunithotkwd',
//       'post',
//       {}
//     )

// 获取当前 所有品牌工厂
export const getBrandList =
    ( obj, keyword='') =>
      requestApi(
        '/Sabrand/sabrand_list',
        'POST',
        { 
          'region_id':obj.region_id,
          'page': obj.page,
          'per_page': obj.per_page,
          'sabrand_id': obj.sabrand_id, // 食安品牌id，1是食安山东 必穿
          'lat1': obj.lat1,             // 经度 必穿
          'lng1': obj.lng1,             // 纬度 必穿
          'unit_type': obj.unit_type,   //（可选、搜索项）：食安企业类型id

          'sort_distance': obj.sort_distance,  // 距离排序，默认值0，表示不按距离，2表示由远到近，1是由近到远排序
          'sort_points': obj.sort_points,    // 评分排序，默认值2，表示由高到低，0表示不排序，1是由低到高排序
          'sort_follow': obj.sort_follow,    // 热度排序，默认值0，表示不排序，2表示由高到低，1表示低到高

          'keyword': keyword,       // 关键词 模糊搜索
        }
      )


// 获取当前工厂 详情页
export const getSaunitInfo =
    ( store_id) =>
      requestApi(
        '/Sabrand/saunit_info',
        'POST',
        { 
          "store_id":store_id
        }
      )

// 获取当前工厂 工厂简介
export const getSaunitIntro=
    ( store_id) =>
      requestApi(
        '/Sabrand/saunit_intro',
        'POST',
        { 
          "store_id":store_id
        }
      )

// 满意度调查表 获取 评价信息
export const getSaunitSurvey=
( store_id, member_id ) =>
  requestApi(
    '/Sabrand/saunit_survey',
    'POST',
    { 
      'store_id' : store_id,   // 店铺 id
      'member_id': member_id,  //会员 id
    }
  )

// 获取 评价列表接口
export const getSaunitEvaluates=
( store_id, page, per_page ) =>
  requestApi(
    '/Sabrand/saunit_evaluates',
    'POST',
    { 

      'store_id' : store_id,    // 店铺 id
      'page': page,         // 请求页数
      'per_page': per_page, //  条数
    }
  )

// 提交评价 评价列表接口
export const addSaunitInfo=
( allitems ) =>
  requestApi(
    '/Sabrand/saunit_surveydo',
    'POST',
    {
      'allitems':allitems
    }
  )


// 食安企业核心竞争力列表接口
// https://shop.ihaosy.com/api/Sabrand/saunit_datalist
// 传入参数
// store_id，店铺id
// data_type，核心竞争力类型id
export const getSaunitDatalis=
( store_id, data_type ) =>
  requestApi(
    '/Sabrand/saunit_datalist',
    'POST',
    { 

      'store_id' : store_id,    // store_id，店铺id
      'data_type': data_type,   // data_type，核心竞争力类型id
    }
  )

// 获取 餐饮街区 商家 列表

export const getApplySabrandList=
( obj ) =>
  requestApi(
    '/Sabrand/apply_sabrand_list',
    'POST',
    obj
  )
