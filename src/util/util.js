import Moment from 'moment'
import { getNewStoreClass } from '../api/seller';
export default {

  fetch (key) {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  },
  save (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  stopPrevent (event) {
    let e = event || window.event
    if (e.preventDefault) {
      e.preventDefault()
    } else {
      window.event.returnValue = false // IE
    }
  },
  // arrayFilter: 数组去重
  arrayFilter (array) {
    let newAray = []
    for (let i = 0, len = array.length - 1; i <= len; i++) {
      if (newAray.indexOf(array[i]) < 0) {
        newAray.push(array[i])
      }
    }
    return newAray
  },
  fillTheScreen (obj) {
    const isWX = /micromessenger/.test(navigator.userAgent.toLowerCase())
    // why? document.documentElement.clientHeight - document.documentElement.offsetHeight
    let height = isWX ? document.documentElement.clientHeight : document.documentElement.offsetHeight
    if (!obj.target || !obj.totalHeight) return
    height = 1 - obj.totalHeight / height
    obj.target.style.height = height * 100 + 'vh'
  },
  /**
   *
   * @param start  开始展示的字符
   * @param end 结束字符展示位置
   * @param target 目标字符
   * @param length
   * @returns {string|string}
   */
  replaceStr (target, start, end, length) {
    let str = ''
    if (start) {
      str = target.substr(start, length) + '***'
    } else if (end) {
      str = '***' + target.substr(end, length)
    } else {
      str = target.substr(0, 1) + '***' + target.substr(target.length - 1, 1)
    }
    return str
  },
  /**
   *
   * @param date 日期
   * @param format 显示的格式
   * @returns {string}
   */
  formatDate (date, format) {
    if (date) {
      return Moment(date).format(format)
    }
  },
  padLeftZero (str) {
    return ('00' + str).substr(str.length)
  },
  /**
   * 格式化价格（保留两位小数）
   * @param price 价格
   * @returns {string}
   */
  currencyPrice (price) {
    return parseFloat(price).toFixed(2)
  },
  /**
   * 是否是数值
   * @param value 要判断的参数值
   * @returns {boolean}
   */
  isNumber (value) {
    let reg = new RegExp('^[0-9]*$')
    if (!reg.test(value)) {
      return false
    }
    return true
  },
  /**
   *
   * @param beginAt 开始时间（时间戳）
   * @param endAt 结束时间（时间戳）
   * @returns {number}
   */
  activityStatus (beginAt, endAt) {
    let status = -1 // (0: 未开始；1: 进行中；2: 已过期)
    let timestamp = Date.parse(new Date()) / 1000
    if (beginAt > timestamp) {
      status = 0
    } else if (timestamp > beginAt && timestamp < endAt) {
      status = 1
    } else if (timestamp > endAt) {
      status = 2
    }
    return status
  },
  /**
   * 把秒数换为*天*时*分*秒的时间格式
   * @param interval 时间间隔（单位为s）
   * @returns {string|*}
   */
  formatTimeInterval (interval) {
    let format = null
    let day = parseInt(interval / 60.0 / 60.0 / 24.0)
    let hour = parseInt(interval / 60 / 60 % 24)
    let minute = parseInt(interval / 60 % 60)
    let second = interval % 60
    format = day + ' 天 ' + hour + ' 时 ' + minute + ' 分 ' + second + ' 秒'
    return format
  },

  /**
   * 获取未读消息数
   * @param zhiManager
   * @param scoped
   * @param key
   */
  getunreadCount (zhiManager, scoped, key) {
    zhiManager.on('unread.count', function (data) {
    })
    zhiManager.on('receivemessage', function (ret) {
      scoped.key = ret
    })
  },
  /**
   *
   * @param timestamp 时间戳转化为日期
   * @returns {string}
   */
  timestampToTime (timestamp) {
    var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
	  var	Y = date.getFullYear() + '-'
    var	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    return Y + M + D + h + m + s
  },

  // 设置cookie
  setCookie: function (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires + "; path=/;"
  },
  // 获取cookie
  getCookie: function (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1)
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  // 清除cookie
  clearCookie: function (cname) {
    this.setCookie(cname, '', -1)
  },
  getUrlKey: function (url, name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')) || null
  },

  // 判断是否是 手机号
  checkIsTel(value){
    var Tel = /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/;
    var Landline = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
    if(Tel.test(value)){
        return true;
    }else if(Landline.test(value)){
      return true;
    }else{
      return false;
    }
  },

  // 判断是否是身份证
  checkIsCardNo(card){  
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
    if(reg.test(card) === false){   
      return  false;  
    }else{
      return true;
    }
  },

  // 判断是否是汉字
  IsChinese(card){
    var reg =  /^[\u4e00-\u9fa5]+$/;
    if( reg.test(card) ){
      return  true;
    }else{
      return false;
    }
  },
  // 截取输出汉字
  getChinese(val){
    return val.replace(/[^\u4e00-\u9fa5]/g,'')
  },

  // 判断是否是英文或数字
  IsEnglishNum(card){
    var reg = /[^A-Za-z0-9]/g;
    if( reg.test(card) ){   
      return  false;
    }else{
      return true;
    }
  },
  // 截取输出英文或数字
  getEnglishNum(val){
    return val.replace( /[^A-Za-z0-9]/g,'')
  },
  
  // 判断是否为 英文数字汉字
  IsStandard (value) {
    var reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
    if( reg.test(value) ){   
      return  false;
    }else{
      return true;
    }
  },
  // 截取输出 英文数字汉字
  getStandard(val){
    return val.replace( /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')
  },

  // 获取经纬度
  getLatLng () {
    return new Promise((resolve, reject) => {
      
      let BMap = window.BMap;
      let geolocation = new BMap.Geolocation();
      
      geolocation.enableSDKLocation(); //允许SDK辅助
      geolocation.getCurrentPosition(function (r) {
        if(this.getStatus() == 0){
          resolve(r.point);
        }else{
          reject('定位失败')
        }
      })
    })
  },

  // 判断 是否为 特殊身份 种植养殖屠宰
  isSpecialIdentity (s_c_id) {
    if( s_c_id == '32' || s_c_id == '41' || s_c_id == '42' ){
      return true;
    }else{
      return false;
    }
  },
  // 判断 是否为 特殊身份 种植养殖屠宰
  isNewSpecial (s_c_id) {
    if( s_c_id == '10501' || s_c_id == '10502' || s_c_id == '10503' ){
      return true;
    }else{
      return false;
    }
  },
  // 判断 是否为 特殊身份 种植养殖
  isSpecialIdentityEnd (s_c_id) {
    if( s_c_id == '32' || s_c_id == '41' ){
      return true;
    }else{
      return false;
    }
  },

  // 获取 商家类型 的 数组
  getSpecialIdentity (value) {
    return new Promise((resolve, reject) => {
      getNewStoreClass().then(res=>{
        if( value < 0 ){
          // console.log('特殊');
          for( var item of res.result.store_class){
            if(item.storeclass_id == 105){
              resolve([item]);
              return;
            }
          }
        }else if( value > 0 ){
          var arr = [];
          for( var item of res.result.store_class){
            if(item.storeclass_id !== 105){
              arr.push(item);
            }
          }
          resolve(arr);
          arr = null;
        }else{
          // console.log('全部');
          resolve(res.result.store_class);
        }
        // arr = [];
      }).catch(err=>{
        reject(err)
      })
    })
  }

}
