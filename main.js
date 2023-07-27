import App from './App'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import share from './utils/share.js';
Vue.mixin(share)

import CONTACT_US from './components/contact_us.vue';
Vue.component('CONTACTUS', CONTACT_US);

import TOPICON from './components/top_icon.vue';
Vue.component('TOPICON', TOPICON);

import TABBAR from './components/tabbar.vue';
Vue.component('TABBAR', TABBAR);

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	share
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif