(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/fixed_navbar"],{"138b":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={props:{navbar_title:{type:String,default:""}},data:function(){return{navbarStyle:{fontSize:"14px",color:"#313131",fontWeight:600}}},methods:{left_return:function(){n.navigateBack()},open_index:function(){n.switchTab({url:"/pages/index/index"})}}};t.default=e}).call(this,e("543d")["default"])},2552:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return a}));var a={uNavbar:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(e.bind(null,"e5f8"))}},u=function(){var n=this.$createElement;this._self._c},r=[]},"81fb":function(n,t,e){"use strict";e.r(t);var a=e("2552"),u=e("caa8");for(var r in u)["default"].indexOf(r)<0&&function(n){e.d(t,n,(function(){return u[n]}))}(r);e("e1d6");var i=e("f0c5"),o=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,"b6ebb426",null,!1,a["a"],void 0);t["default"]=o.exports},c8a8:function(n,t,e){},caa8:function(n,t,e){"use strict";e.r(t);var a=e("138b"),u=e.n(a);for(var r in a)["default"].indexOf(r)<0&&function(n){e.d(t,n,(function(){return a[n]}))}(r);t["default"]=u.a},e1d6:function(n,t,e){"use strict";var a=e("c8a8"),u=e.n(a);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/fixed_navbar-create-component',
    {
        'components/fixed_navbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("81fb"))
        })
    },
    [['components/fixed_navbar-create-component']]
]);
