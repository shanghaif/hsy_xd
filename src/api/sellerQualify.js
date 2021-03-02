import { requestApi } from '../util/network'
import { type } from 'jquery'

// 新增
export const saveQualify =
    (type,class3,product_name,product_num,unit_id,product_phone,product_origin,autograph_seal,add_time,check,additional)=>
      requestApi(
        '/Sellergoods/goods_certificate_save',
        'POST',
        {
          'type':type,                           //1 手填 2 图片
          'class3':class3,
          'product_name': product_name,          // 产品名称
          'product_num' : product_num,           //数量
          'unit_id': unit_id,                    //单位
          'product_phone': product_phone,        //手机号
          'product_origin': product_origin,      //产地
          'autograph_seal': autograph_seal,       //签名
          'add_time': add_time,                   //添加时间
          'additional': additional,               // 附加信息
          'check' :check,                         //多选框
        },
        'seller'
      )
// 新增
export const saveImgQualify =
    (type,class3,product_num,unit_id,certificate_image,certificate_no,product_name)=>
      requestApi(
        '/Sellergoods/goods_certificate_save',
        'POST',
        {
          'type':type,                           //1 手填 2 图片
          'class3':class3,                       //产品类型
          'product_num' : product_num,           //数量
          'unit_id': unit_id,                    //单位
          'certificate_image': certificate_image, // 上传的图片
          'certificate_no': certificate_no, // 合格证编号
          'product_name': product_name, // 合格证编号
        },
        'seller'
      )
// 获取列表
export const getQualify =
    (status=2)=>
      requestApi(
        '/Sellergoods/goods_certificate_list',
        'POST',
        {
          status:status,//1 发布商品时 查看可用的合格
        },
        'seller'
      )
// 获取列表
export const getQualifyAll =
    (start_time,end_time,status=2)=>
      requestApi(
        '/Sellergoods/goods_certificate_list',
        'POST',
        {
          status:status,//2 合格证管理里 产看所有合格证
          start_time: start_time,  //开始时间
          end_time : end_time      //结束时间
        },
        'seller'
      )
// 获取我发放的列表
export const getMyQualify =
    (start_time,end_time)=>
      requestApi(
        '/Sellergoods/my_certificate',
        'POST',
        {
          start_time: start_time,  //开始时间
          end_time : end_time      //结束时间
        },
        'seller'
      )
//  查看详情
export const getQualifyInfo =
    (certificate_id,sName)=>
      requestApi(
        '/Refund/goods_certificate_info',
        'POST',
        {
          'certificate_id': certificate_id,
          'store_name':sName
        },
        // 'seller'
      )
//  查看我发放的详情
export const getMyQualifyInfo =
    (source_id)=>
      requestApi(
        '/Refund/my_certificate_info',
        'POST',
        {
          'source_id': source_id
        },
      )
//  发放合格证里的 查询合格证列表
export const getQualifyPut =
    (certificate_id)=>
      requestApi(
        '/Sellergoods/goods_certificate_xz',
        'POST',
        {
          certificate_id:certificate_id
        },
        'seller'
      )
//  搜索商家列表
export const getStoreList =
    (store_name)=>
      requestApi(
        '/Sellergoods/source_store_list',
        'POST',
        {
          store_name:store_name
        },
        'seller'
      )
//  发放合格证 本地
export const putQualify =
    (c_store_name,c_store_id,num,certificate_id)=>
      requestApi(
        '/Sellergoods/goods_certificate_n',
        'POST',
        {
          c_store_name:c_store_name,
          c_store_id:c_store_id,
          num:num,
          certificate_id:certificate_id,
        },
        'seller'
      )
//  发放合格证 外地
export const putQualify_w =
    (c_store_name,c_store_id,num,certificate_id)=>
      requestApi(
        '/Sellergoods/goods_certificate_w',
        'POST',
        {
          c_store_name:c_store_name,
          c_store_id:c_store_id,
          num:num,
          certificate_id:certificate_id,
        },
        'seller'
      )
//  将base61 格式 转化成 https:.....png/jpg 格式
export const getPdfQualify_w =
    (base64_image_content,id,type)=>
      requestApi(
        '/Refund/base64_image_content1',
        'POST',
        {
          base64_image_content:base64_image_content,
          id:id,
          type:type,
        },
      )

//  首次获取合格证追溯列表
export const getCertificate =
    (start_time,end_time)=>
      requestApi(
        '/Sellergoodsadd/source_certificate',
        'POST',
        {          
          start_time: start_time,  //开始时间
          end_time : end_time      //结束时间
        },
        'seller'
      )

//  查看下级合格证 数据
export const getCertificateChild =
    (goods_id,grade)=>
      requestApi(
        '/Sellergoodsadd/source_certificate_child',
        'POST',
        {
          goods_id:goods_id,  //商品编号
          grade:grade //级别
        },
        'seller'
      )


