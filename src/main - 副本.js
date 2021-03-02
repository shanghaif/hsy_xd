import Vue from 'vue'
import App from './App.vue'
import 'es6-promise/auto'
import Mint from 'mint-ui'
import moment from 'moment'
import BaiduMap from 'vue-baidu-map'

import router from './router'
import store from './store'
import utils from './util/util'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
import './assets/style/iconfont/iconfont.css'
import './assets/style/common.scss'

Vue.use(Mint)
Vue.use(BaiduMap, {
  ak: '9KD6cQTi08vuK4O189Lqw33PgG7QkZgd'
})
Vue.use(ElementUI)

Vue.prototype.utils = utils;

moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
    store,
    router,  
    el: '#app',
  render: h => h(App),
}).$mount('#app')
// new Vue({
//     el: '#app',
//     store,
//     router,
//     components: { App },
//     template: '<App/>'
// })
