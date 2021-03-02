/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-16 14:37:46
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-20 16:04:23
 */
import axios from 'axios'
import router from '../router'
import store from '../store'
function urlencode (data) {
  var _result = []
  for (var key in data) {
    var value = data[key]
    _result.push(key + '=' + value)
  }

  return _result.join('&')
}
export function requestKeepApi (reqUrl, type = 'POST', data = {}, auth = '', multipart = false) {
  if (!reqUrl) { return }
  let headers = {}
  if (auth === 'keep') {
    // console.log('keep');
    // if (typeof (store.state.member) === 'undefined' || !store.state.member.token) {
    //   router.push({ name: 'HomeLogin' })
    // }
    headers['X-DS-KEY'] = store.state.keep.keepToken
  }
  
  if (multipart) {
    headers['Content-Type'] = 'multipart/form-data'
  }
  type = type.toUpperCase()
  reqUrl = env.API_HOST + reqUrl

  let axiosData
  if (type === 'POST') {
    axiosData = {
      headers: headers,
      method: type,
      url: reqUrl,
      data: data
    }
  } else {
    if (JSON.stringify(data) !== '{}') {
      reqUrl += '?' + urlencode(data)
    }
    axiosData = {
      headers: headers,
      method: type,
      url: reqUrl
    }
  }
  return new Promise((resolve, reject) => {
    axios(axiosData).then(res => {
      if (res.data.code === 10000) {
        resolve(res.data)
      } else if (res.data.code === 13001) {
        this.$store.commit('clearkeepInfo')
        router.push({ name: 'KeepLogin', query: { clear: 1 } })// token过期，需要删除
      } else {
        reject(res.data)
      }
    }, error => {
      reject(error)
    })
  })
}