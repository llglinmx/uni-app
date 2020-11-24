import Vue from 'vue'
import App from './App'
import store from './store/store.js';

import {get,post} from './common/api.js'
Vue.prototype.apiget = get
Vue.prototype.apipost = post

Vue.config.productionTip = false
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
