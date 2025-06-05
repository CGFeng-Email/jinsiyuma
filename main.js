import App from './App'

import request from './api/api.js';
Vue.prototype.$request = request;

// 1先给onLaunch方法套一个promise实例，执行成功后再执行全局挂载的方法，标识当前已经执行完毕。
// 2.在页面中利用async/await 同步执行代码的方法，实现onLaunch 在 onLoad 之后执行
Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve
})

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

import LOGINMODAL from './components/login_modal.vue';
Vue.component('LOGINMODAL', LOGINMODAL);

import COURSE_LOGIN_MODEL from './components/course_login_model.vue';
Vue.component('COURSE_LOGIN_MODEL', COURSE_LOGIN_MODEL);

import EMPTY from './components/empty.vue';
Vue.component('EMPTY', EMPTY)

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