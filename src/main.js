/*
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-15 17:18:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-22 09:16:32
 */
import Vue from 'vue'
import App from './App.vue'
import 'es6-promise/auto'

import moment from 'moment'
import BaiduMap from 'vue-baidu-map'
import underscore from 'vue-underscore'

import router from './router'
import store from './store'
import utils from './util/util'
import Back from './util/back.js'
import ElementUI from 'element-ui'
import Mint from 'mint-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import './assets/style/iconfont/iconfont.css'
import './assets/style/common.scss'
// import '@/assets/style/font/font.scss';
// 轮播
import wcSwiper from './components/home/wc-swiper/index.js';
import './components/home/wc-swiper/style.css';
Vue.use(wcSwiper.default);
// 瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)


Vue.use(BaiduMap, {
  ak: '9KD6cQTi08vuK4O189Lqw33PgG7QkZgd'
})
Vue.use(ElementUI)
Vue.use(underscore)
Vue.use(Mint)
Vue.prototype.utils = utils;

moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.config.productionTip = false;

//节流
const on = Vue.prototype.$on;
Vue.prototype.$on = function (event, func) {
  let previous = 0
  let newFunc = func
  if (event === 'click') {
    newFunc = function () {
      const now = new Date().getTime();
      if (previous + 680 <= now) {
        func.apply(this, arguments)
        previous = now
      }
    }
  }
  on.call(this, event, newFunc);
}

//指令 仅汉字
Vue.directive('only-chinese', {
  inserted: function (el) {
    let input = el;
    if( input.tagName.toLocaleLowerCase() != 'input' ){
      input = el.getElementsByTagName('input')[0];
    }
    input.onkeyup = function (e) {
      input.value = input.value.replace(/[^\u4e00-\u9fa5]/g,'')
    }
    input.onblur = function (e) {
      input.value = input.value.replace(/[^\u4e00-\u9fa5]/g,'')
    }
  } 
});

new Vue({
    store,
    router,  
    el: '#app',
  render: h => h(App),
  Back
}).$mount('#app')
// new Vue({
//     el: '#app',
//     store,
//     router,
//     components: { App },
//     template: '<App/>'
// })
