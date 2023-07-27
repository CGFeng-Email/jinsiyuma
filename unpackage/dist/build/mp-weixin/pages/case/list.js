(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/case/list"],{"1bd9":function(t,n,e){},"1dbe":function(t,n,e){},2051:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={props:{list:{type:Array,default:[]}},data:function(){return{list1:[],list2:[]}},methods:{changeList:function(t){this[t.name].push(t.value)},open_details:function(){t.navigateTo({url:"/pages/case/details"})}},onHide:function(){this.$refs.waterfall.clear()}};n.default=e}).call(this,e("543d")["default"])},"6cca":function(t,n,e){"use strict";var a=e("1dbe"),u=e.n(a);u.a},9800:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var a={uvWaterfall:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uv-waterfall/components/uv-waterfall/uv-waterfall")]).then(e.bind(null,"0040"))}},u=function(){var t=this.$createElement;this._self._c},i=[]},bda4:function(t,n,e){"use strict";e.r(n);var a=e("9800"),u=e("e963");for(var i in u)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("6cca"),e("f387");var r=e("f0c5"),c=Object(r["a"])(u["default"],a["b"],a["c"],!1,null,"35083ac4",null,!1,a["a"],void 0);n["default"]=c.exports},e963:function(t,n,e){"use strict";e.r(n);var a=e("2051"),u=e.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=u.a},f387:function(t,n,e){"use strict";var a=e("1bd9"),u=e.n(a);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/case/list-create-component',
    {
        'pages/case/list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("bda4"))
        })
    },
    [['pages/case/list-create-component']]
]);
