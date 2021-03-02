import { requestApi } from '../util/network'
// 获取推荐人
export const getInviterInfo =
    (inviter_id) =>
      requestApi(
        '/Login/get_inviter',
        'POST',
        {
          'inviter_id': inviter_id
        }
      )
// 用户注册
export const register =
    (username, password, passwordConfirm, inviterId) =>
      requestApi(
        '/Login/register',
        'POST',
        {
          'username': username,
          'password': password,
          'password_confirm': passwordConfirm,
          'inviter_id': inviterId,
          'client': 'wap'
        }
      )
// 用户手机注册
export const registerByMobile =
    (phone, password, passwordConfirm, captcha, inviterId) =>
      requestApi(
        '/Connect/sms_register',
        'POST',
        {
          'phone': phone,
          'password': password,
          'password_confirm': passwordConfirm,
          'captcha': captcha,
          'inviter_id': inviterId,
          'client': 'wap'
        }
      )

// 获取验证码
export const getMakeCode =
    () =>
      requestApi(
        '/Login/makecode',
        'GET',
        {}
      )
