(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tabbar"],{"077d":function(t,a,i){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={props:{tabbar_show:{type:Boolean,default:!0},tabs_index:{type:Number,default:0},tabbar_bg:{type:Boolean,default:!1}},data:function(){return{pc_height:!1,list:[{icon:"/static/img/tabbar/index.png",icon_hover:"/static/img/tabbar/index_hover.png",icon2:"/static/img/index-icon.png",icon2_hover:"/static/img/index-hover.png",text:"首页"},{icon:"/static/img/tabbar/product.png",icon_hover:"/static/img/tabbar/product_hover.png",icon2:"/static/img/product-icon.png",icon2_hover:"/static/img/product-hover.png",text:"产品馆"},{icon:"/static/img/tabbar/case.png",icon_hover:"/static/img/tabbar/case_hover.png",icon2:"/static/img/case-icon.png",icon2_hover:"/static/img/case-hover.png",text:"案例馆"},{icon:"/static/img/tabbar/map.png",icon_hover:"/static/img/tabbar/map_hover.png",icon2:"/static/img/map-icon.png",icon2_hover:"/static/img/map-hover.png",text:"门店地址"},{icon:"/static/img/tabbar/me.png",icon_hover:"/static/img/tabbar/me_hover.png",icon2:"/static/img/me-icon.png",icon2_hover:"/static/img/me-hover.png",text:"我的"}]}},created:function(){var t=getApp().globalData.osName;"windows"!=t&&"macos"!=t&&"android"!=t||(this.pc_height=!0)},methods:{itemChange:function(a){0==a?t.switchTab({url:"/pages/index/index"}):1==a?t.switchTab({url:"/pages/product/product"}):2==a?t.switchTab({url:"/pages/case/case"}):3==a?t.switchTab({url:"/pages/map/map"}):t.switchTab({url:"/pages/me/me"})}}};a.default=i}).call(this,i("543d")["default"])},"19a2":function(t,a,i){"use strict";i.r(a);var n=i("a578"),e=i("ae0a");for(var c in e)["default"].indexOf(c)<0&&function(t){i.d(a,t,(function(){return e[t]}))}(c);i("1a9f");var o=i("f0c5"),r=Object(o["a"])(e["default"],n["b"],n["c"],!1,null,"195eaa47",null,!1,n["a"],void 0);a["default"]=r.exports},"1a9f":function(t,a,i){"use strict";var n=i("f03e"),e=i.n(n);e.a},a578:function(t,a,i){"use strict";i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return e})),i.d(a,"a",(function(){}));var n=function(){var t=this.$createElement;this._self._c},e=[]},ae0a:function(t,a,i){"use strict";i.r(a);var n=i("077d"),e=i.n(n);for(var c in n)["default"].indexOf(c)<0&&function(t){i.d(a,t,(function(){return n[t]}))}(c);a["default"]=e.a},f03e:function(t,a,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tabbar-create-component',
    {
        'components/tabbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("19a2"))
        })
    },
    [['components/tabbar-create-component']]
]);
