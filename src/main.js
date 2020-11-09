import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'

import axios from 'axios'

// NeDB数据库
import db from './datastore'

import store from './store'
Vue.prototype.$db = db

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
