(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{160:function(n,e,t){"use strict";(function(n,e){var o=t(4);t(26);o(t(25));var u=o(t(161));n.__webpack_require_UNI_MP_PLUGIN__=t,e(u.default)}).call(this,t(1)["default"],t(2)["createPage"])},161:function(n,e,t){"use strict";t.r(e);var o=t(162),u=t(164);for(var r in u)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return u[n]}))}(r);t(166),t(168);var i,a=t(35),c=Object(a["default"])(u["default"],o["render"],o["staticRenderFns"],!1,null,"57280228",null,!1,o["components"],i);c.options.__file="pages/index/index.vue",e["default"]=c.exports},162:function(n,e,t){"use strict";t.r(e);var o=t(163);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},163:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return u})),t.d(e,"staticRenderFns",(function(){return i})),t.d(e,"recyclableRender",(function(){return r})),t.d(e,"components",(function(){return o}));try{o={uLoadingPage:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-loading-page/u-loading-page")]).then(t.bind(null,417))},uNavbar:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(t.bind(null,425))},uSwiper:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(t.bind(null,433))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,441))},"u-Image":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--image/u--image")]).then(t.bind(null,450))},uLoadmore:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-loadmore/u-loadmore")]).then(t.bind(null,456))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var n=this,e=n.$createElement;n._self._c;n._isMounted||(n.e0=function(e){return n.current=e.current})},r=!1,i=[];u._withStripped=!0},164:function(n,e,t){"use strict";t.r(e);var o=t(165),u=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=u.a},165:function(n,e,t){"use strict";(function(n,o){var u=t(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(t(30)),i=u(t(18)),a=u(t(32)),c={data:function(){return{loading:!0,tabbar_bg:!1,topShow:!1,video_muted:!0,more_scroll:0,navbar_bg:"transparent",navbar_title:"金丝玉玛",navbarStyle:{fontSize:"14px",color:"#313131",fontWeight:600},scroll_number:0,current:0,banner_list:["https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index_banner/index_banner06.png","https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index_banner/index_banner07.png","https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index_banner/index_banner08.png","https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index_banner/index_banner09.png"],banner:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/banner.png",video_src:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/MP4/video.mp4",recommend_list:[{cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png",title:"金丝玉玛是专业从事瓷砖及其相关配套产品...",desc:"后现代风",see:867,collect_num:10,collect:!0},{cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png",title:"贝拉柔光750*1500",desc:"现代简约风",see:1267,collect_num:44,collect:!1},{cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png",title:"金丝玉玛是专业从事瓷砖及其相关配套产品...",desc:"后现代风",see:8267,collect_num:27,collect:!0},{cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png",title:"金丝玉玛是专业从事瓷砖及其相关配套产品...",desc:"后现代风",see:867,collect_num:10,collect:!1},{cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png",title:"金丝玉玛是专业从事瓷砖及其相关配套产品...",desc:"后现代风",see:867,collect_num:10,collect:!0}],recommend_item_number:2,recommend_current:0,list:[],list_loading:"loadmore"}},onLoad:function(){var e=this;return(0,a.default)(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.hideTabBar(),t.next=3,e.get_list();case 3:e.loading=!1,e.contact_us_height=getApp().globalData.windowHeight;case 5:case"end":return t.stop()}}),t)})))()},onReady:function(){},onReachBottom:function(){this.get_list()},methods:{onPageScroll:function(n){this.scroll_number=Number(Math.floor(n.scrollTop)),this.scroll_number>270?(this.tabbar_bg=!0,this.video_muted=!1):this.tabbar_bg=!1,this.scroll_number>450&&0==this.topShow?this.topShow=!0:this.scroll_number<450&&1==this.topShow&&(this.topShow=!1)},up_scroll:function(){var e=o.createSelectorQuery();e.select("#banner_swiper").boundingClientRect(),e.selectViewport().scrollOffset(),e.exec((function(e){console.log("res",e),n.pageScrollTo({scrollTop:e[0].height-88,duration:300})}))},open_product_details:function(){n.navigateTo({url:"/pages/product/product_details"})},open_hot_list:function(){n.navigateTo({url:"/pages/product/product_list"})},open_brand_list:function(){n.navigateTo({url:"/pages/brand/brand_list"})},open_brand_details:function(){n.navigateTo({url:"/pages/brand/brand_details"})},get_list:function(){var n=this;return(0,a.default)(r.default.mark((function e(){var t,o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n.list_loading="loading",!(n.list.length>=100)){e.next=3;break}return e.abrupt("return",n.list_loading="nomore");case 3:return e.next=5,n.list_data();case 5:t=e.sent,o=t.data,n.list=[].concat((0,i.default)(n.list),(0,i.default)(o)),console.log("list",n.list),n.list_loading="loadmore";case 10:case"end":return e.stop()}}),e)})))()},list_data:function(){return new Promise((function(n){var e=["https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png","https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover2.png","https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png","https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover4.png"],t=["金丝玉玛是专业从事瓷砖及其相关配套产品","轻奢｜既厚重华丽又具","奶油风｜清浅氛国书写","佗寂风｜自然 本真 极简"],o=[1523,876,986,27],u=[56,88,89,124],r=[!0,!1,!1,!0],i=function(n){var i=Math.floor(4*Math.random());return{image:e[i],title:t[i],see:o[i],collect:u[i],is_true:r[i],desc:"后现代风",time:"2023-07-16"}},a=[];setTimeout((function(){for(var e=0;e<20;e++)a.push(i(e));n({data:a})}),400)}))}}};e.default=c}).call(this,t(2)["default"],t(1)["default"])},166:function(n,e,t){"use strict";t.r(e);var o=t(167),u=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=u.a},167:function(n,e,t){},168:function(n,e,t){"use strict";t.r(e);var o=t(169),u=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=u.a},169:function(n,e,t){}},[[160,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map