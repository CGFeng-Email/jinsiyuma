(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/register"],{177:function(e,n,t){"use strict";(function(e,n){var o=t(4);t(26);o(t(25));var u=o(t(178));e.__webpack_require_UNI_MP_PLUGIN__=t,n(u.default)}).call(this,t(1)["default"],t(2)["createPage"])},178:function(e,n,t){"use strict";t.r(n);var o=t(179),u=t(181);for(var r in u)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return u[e]}))}(r);t(184);var i,c=t(32),a=Object(c["default"])(u["default"],o["render"],o["staticRenderFns"],!1,null,"24dc7ac2",null,!1,o["components"],i);a.options.__file="pages/login/register.vue",n["default"]=a.exports},179:function(e,n,t){"use strict";t.r(n);var o=t(180);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},180:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return u})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return r})),t.d(n,"components",(function(){return o}));try{o={"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,269))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,275))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--input/u--input")]).then(t.bind(null,283))},uToast:function(){return t.e("uni_modules/uview-ui/components/u-toast/u-toast").then(t.bind(null,289))},uCode:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-code/u-code")]).then(t.bind(null,296))},uButton:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-button/u-button")]).then(t.bind(null,304))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var e=this,n=e.$createElement;e._self._c},r=!1,i=[];u._withStripped=!0},181:function(e,n,t){"use strict";t.r(n);var o=t(182),u=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=u.a},182:function(e,n,t){"use strict";(function(e){var o=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(t(55)),r=o(t(57)),i=t(183),c={data:function(){return{login_logo:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/login_logo.png",array:["86","001","400","800"],index:0,seconds:60,tips:"",errorType:"border-bottom",model:{phone:"",code:""},rules:{phone:[{type:"number",required:!0,len:11,message:"请输入您的电话",trigger:["change","blur"]},{validator:function(n,t,o){return e.$u.test.mobile(t)},message:"手机号码不正确",trigger:["change","blur"]}],code:{type:"number",required:!0,len:6,message:"请填写验证码",trigger:["change","blur"]}}}},methods:{bindPickerChange:function(e){this.index=e.detail.value},end:function(){},start:function(){},codeChange:function(e){this.tips=e},getCode:function(){var n=this;return(0,r.default)(u.default.mark((function t(){var o;return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,i.checkPhone)(n.model.phone);case 2:o=t.sent,o?n.$refs.uCode.canGetCode?(e.showLoading({title:"正在获取验证码"}),setTimeout((function(){e.hideLoading(),e.$u.toast("验证码已发送"),n.$refs.uCode.start()}),1e3)):e.$u.toast("倒计时结束后再发送"):e.$u.toast("请输入正确的电话号码");case 4:case"end":return t.stop()}}),t)})))()},submit:function(){e.showLoading({title:"登录中...",mask:!0}),this.$refs.uForm.validate().then((function(n){e.hideLoading()})).catch((function(n){e.hideLoading(),e.$u.toast("请输入正确的账号信息")}))},user_agreement:function(){e.navigateTo({url:"/pages/agreement/user"})},privacy_agreement:function(){e.navigateTo({url:"/pages/agreement/privacy"})}}};n.default=c}).call(this,t(2)["default"])},184:function(e,n,t){"use strict";t.r(n);var o=t(185),u=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=u.a},185:function(e,n,t){}},[[177,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/register.js.map