/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-16 14:37:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-21 17:44:31
 */
import { requestKeepApi } from './network'
// 安全员注册
export const keepRegister =
  (obj) =>
  requestKeepApi(
      '/Superviselogin/register',
      'POST',
      obj,
      ''
    )
    
// 用户登录
export const keepLogin =
  (admin_name,admin_password,client_type) =>
  requestKeepApi(
      '/Superviselogin/login',
      'POST',
      {
        'admin_name' : admin_name,  // 用户名称
        'admin_password' : admin_password,  // 用户密码
        'client_type' : client_type,  // 类型 1管理员   2安全员
      },
      ''
    )

// 用户登录
export const keepLogout =
  (admin_name,admin_password,client_type) =>
  requestKeepApi(
      '/Superviselogin/login',
      'POST',
      {
        'admin_name' : admin_name,  // 用户名称
        'admin_password' : admin_password,  // 用户密码
        'client_type' : client_type,  // 类型 1管理员   2安全员
      },
      ''
    )

// 访问 首页 数据
export const getKeepIndex =
  () =>
  requestKeepApi(
      '/Superviseindex/index',
      'POST',
      {},
      'keep'
    )
    

// 忘记密码
// export const forget =
// (userName, captcha, password, confirmPassword) =>
// requestKeepApi(
//     '/Superviselogin/edit_password',
//     'POST',
//     {
//       'phone': userName,
//       'captcha': captcha,
//       'password': password,
//       'password_confirm': confirmPassword,
//       'client': 'wap'
//     },
//   )

export const forget =
(phone, password,confirmPassword, captcha) =>
requestKeepApi(
    '/Superviselogin/edit_password',
    'POST',
    {
      phone:phone,
      password:password,
      'password_confirm': confirmPassword,
      captcha:captcha,
    },
  )

// 获取手机验证码
export const getSmsCaptcha =
    (type, phone) =>
    requestKeepApi(
        '/Connect/get_sms_captcha',
        'GET',
        {
          'type': type,
          'phone': phone
        }
      )