(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-swiper/u-swiper"],{433:function(e,t,n){"use strict";n.r(t);var i=n(434),r=n(436);for(var u in r)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n(439);var o,a=n(35),d=Object(a["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,"6b019429",null,!1,i["components"],o);d.options.__file="uni_modules/uview-ui/components/u-swiper/u-swiper.vue",t["default"]=d.exports},434:function(e,t,n){"use strict";n.r(t);var i=n(435);n.d(t,"render",(function(){return i["render"]})),n.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(t,"components",(function(){return i["components"]}))},435:function(e,t,n){"use strict";var i;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return u})),n.d(t,"components",(function(){return i}));try{i={uLoadingIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(n.bind(null,630))},uSwiperIndicator:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swiper-indicator/u-swiper-indicator")]).then(n.bind(null,646))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.$u.addUnit(e.height)),i=e.$u.addUnit(e.radius),r=e.loading?null:e.$u.addUnit(e.height),u=e.loading?null:e.$u.addUnit(e.previousMargin),o=e.loading?null:e.$u.addUnit(e.nextMargin),a=e.loading?null:e.__map(e.list,(function(t,n){var i=e.__get_orig(t),r=e.__get_style([e.itemStyle(n)]),u=e.getItemType(t),o="image"===u?e.$u.addUnit(e.height):null,a="image"===u?e.$u.addUnit(e.radius):null,d="image"===u?e.getSource(t):null,c=e.getItemType(t),s="video"===c?e.$u.addUnit(e.height):null,l="video"===c?e.getSource(t):null,f="video"===c?e.getPoster(t):null,g="video"===c?e.showTitle&&e.$u.test.object(t)&&t.title:null,m=e.showTitle&&e.$u.test.object(t)&&t.title&&e.$u.test.image(e.getSource(t));return{$orig:i,s0:r,m0:u,g5:o,g6:a,m1:d,m2:c,g7:s,m3:l,m4:f,g8:g,g9:m}})),d=e.__get_style([e.$u.addStyle(e.indicatorStyle)]),c=e.loading||!e.indicator||e.showTitle?null:e.list.length;e.$mp.data=Object.assign({},{$root:{g0:n,g1:i,g2:r,g3:u,g4:o,l0:a,s1:d,g10:c}})},u=!1,o=[];r._withStripped=!0},436:function(e,t,n){"use strict";n.r(t);var i=n(437),r=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=r.a},437:function(e,t,n){"use strict";(function(e){var i=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n(13)),u=i(n(438)),o={name:"u-swiper",mixins:[e.$u.mpMixin,e.$u.mixin,u.default],data:function(){return{currentIndex:0}},watch:{current:function(e,t){e!==t&&(this.currentIndex=e)}},computed:{itemStyle:function(){var t=this;return function(n){var i={};return t.nextMargin&&t.previousMargin&&(i.borderRadius=e.$u.addUnit(t.radius),n!==t.currentIndex&&(i.transform="scale(0.92)")),i}}},methods:{getItemType:function(t){return"string"===typeof t?e.$u.test.video(this.getSource(t))?"video":"image":"object"===(0,r.default)(t)&&this.keyName?t.type?"image"===t.type?"image":"video"===t.type?"video":"image":e.$u.test.video(this.getSource(t))?"video":"image":void 0},getSource:function(t){return"string"===typeof t?t:"object"===(0,r.default)(t)&&this.keyName?t[this.keyName]:(e.$u.error("请按格式传递列表参数"),"")},change:function(e){var t=e.detail.current;this.pauseVideo(this.currentIndex),this.currentIndex=t,this.$emit("change",e.detail)},pauseVideo:function(t){var n=this.getSource(this.list[t]);if(e.$u.test.video(n)){var i=e.createVideoContext("video-".concat(t),this);i.pause()}},getPoster:function(e){return"object"===(0,r.default)(e)&&e.poster?e.poster:""},clickHandler:function(e){this.$emit("click",e)}}};t.default=o}).call(this,n(2)["default"])},439:function(e,t,n){"use strict";n.r(t);var i=n(440),r=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=r.a},440:function(e,t,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-ui/components/u-swiper/u-swiper.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-swiper/u-swiper-create-component',
    {
        'uni_modules/uview-ui/components/u-swiper/u-swiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(433))
        })
    },
    [['uni_modules/uview-ui/components/u-swiper/u-swiper-create-component']]
]);
