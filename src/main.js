// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './permission.js'

Vue.use(VueLazyload)
Vue.use(ElementUI)

Vue.prototype.HOST = '/api'
Vue.prototype.Global = 'http://qiniu.clideo.cn/'

import store from './store'
/* eslint-disable no-new */
new Vue({
  router,
	store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
