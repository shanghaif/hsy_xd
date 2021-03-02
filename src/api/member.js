import { requestApi } from '../util/network'
// 用户退出登录
export const logout =
    (username) =>
      requestApi(
        '/Logout/index',
        'POST',
        {
          username: username,
          client: 'wap'
        },
        'member'
      )
// 获取用户首页信息
export const getMemberIndex =
    () =>
      requestApi(
        '/Member/index',
        'POST',
        {
        },
        'member'
      )
// 获取用户基本信息
export const getMemberInfo =
    () =>
      requestApi(
        '/Member/information',
        'POST',
        {
        },
        'member'
      )
// 更新用户基本信息
export const updateMemberInfo =
    (memberInfo) =>
      requestApi(
        '/Member/edit_information',
        'POST',
        {
          member_nickname: memberInfo.member_nickname,
          member_qq: memberInfo.member_qq,
          member_ww: memberInfo.member_ww,
          member_areainfo: memberInfo.member_areainfo,
          member_areaid: memberInfo.member_areaid,
          member_birthday: memberInfo.member_birthday
        },
        'member'
      )
// 更新用户头像
export const uploadMemberAvatar =
    (file) =>
      requestApi(
        '/Member/edit_memberavatar',
        'POST',
        file,
        'member',
        true
      )
export const uploadAuth =
    (file) =>
      requestApi(
        '/Member/edit_auth',
        'POST',
        file,
        'member',
        true
      )
export const dropAuth =
    (file_name) =>
      requestApi(
        '/Member/drop_auth',
        'POST',
        {
          file_name: file_name
        },
        'member'
      )
export const updateMemberAuth =
    (member_areaid,member_areainfo,memberTruename, memberIdcard, ifConfirm,dwname,lng,lat,hangye,gangwei,tuan,type,bank_account_name,bank_account_number) =>
      requestApi(
        '/Member/auth',
        'POST',
        {
          member_areaid:member_areaid,      // 社区所在地id
          member_areainfo:member_areainfo,  // 社区所在地 名称
          
          member_truename: memberTruename, // 身份证名称
          member_idcard: memberIdcard,  //  身份证id
          dwname:dwname,             //  单位名称
          lng:lng,                   //  坐标
          lat:lat,                   //  坐标
          hangye:hangye,             //  行业
          gangwei:gangwei,           //  岗位
          tuan:tuan,                  // 社区团名称
          if_confirm: ifConfirm,
          type:type,                    //判断是修改 还是 保存
          bank_account_name: bank_account_name, //银行开户名
          bank_account_number: bank_account_number, //公司银行账号
          // bank_name:bank_name,            //开户银行支行名称
        },
        'member'
      )

// 上传 图片
export const uploadCropImg =
(base64_image_content) =>
  requestApi(
    '/Member/edit_auth_base64',
    'POST',
    {
      'base64_image_content':base64_image_content
    },
    'member'
  )

// 根据 地区id获取 社区团 地址
export const getTuanList =
( area_id) =>
  requestApi(
    '/Member/membercommunity',
    'POST',
    {
      'area_id':area_id
    },
    'member'
  )
