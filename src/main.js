// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './permission.js'
import { getToken } from 'api/auth.js'
import axios from 'axios'
import echarts from 'echarts'

Vue.use(VueLazyload)
Vue.use(ElementUI)
// axios.defaults.withCredentials=true

Vue.prototype.HOST = '/api'
Vue.prototype.Global = 'http://qiniu.clideo.cn/'
Vue.prototype.UserInfo = getToken() === undefined ? '' : JSON.parse(getToken())
Vue.prototype.$echarts = echarts

import store from './store'
/* eslint-disable no-new */
new Vue({
  router,
	store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
