(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/product"],{"0d5d":function(n,o,u){"use strict";u.r(o);var e=u("b6cb"),c=u("a004");for(var a in c)["default"].indexOf(a)<0&&function(n){u.d(o,n,(function(){return c[n]}))}(a);u("da43"),u("b788");var t=u("f0c5"),i=Object(t["a"])(c["default"],e["b"],e["c"],!1,null,"602b716c",null,!1,e["a"],void 0);o["default"]=i.exports},5428:function(n,o,u){"use strict";(function(n,e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var c={components:{SORTSELECT:function(){u.e("components/sort_select").then(function(){return resolve(u("d8fa"))}.bind(null,u)).catch(u.oe)}},data:function(){return{loading:!0,tabbar_bg:!1,scroll_number:0,navbarStyle:{fontSize:"14px",color:"#313131",fontWeight:600},dotsStyles:{width:8,height:8,backgroundColor:"rgba(255,255,255,0.5)",border:"0",color:"#fff",selectedBackgroundColor:"#fff",selectedBorder:"1px rgba(255, 255, 255) solid"},swiper_current:0,product_bg:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_bg.png",product_btn:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_btn.png",search_btn:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/search_btn.png",swiper_list:[{image_cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner1.jpg",image_icon1:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png",image_icon2:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png"},{image_cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner2.jpg",image_icon1:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png",image_icon2:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png"},{image_cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner3.jpg",image_icon1:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png",image_icon2:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png"},{image_cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner4.jpg",image_icon1:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png",image_icon2:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png"},{image_cover:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner5.jpg",image_icon1:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png",image_icon2:"https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png"}]}},onLoad:function(){var o=this;n.hideTabBar(),setTimeout((function(){o.loading=!1}),500)},methods:{onPageScroll:function(n){this.scroll_number=Number(Math.floor(n.scrollTop)),this.scroll_number>200?this.tabbar_bg=!0:this.tabbar_bg=!1},up_scroll:function(){var o=e.createSelectorQuery();o.select(".banner_bg").boundingClientRect(),o.selectViewport().scrollOffset(),o.exec((function(o){n.pageScrollTo({scrollTop:o[0].height-88,duration:300})}))},change_swiper:function(n){this.swiper_current=n.detail.current},open_search:function(){n.navigateTo({url:"/pages/search/search"})},open_product_details:function(){n.navigateTo({url:"/pages/product/product_details"})}}};o.default=c}).call(this,u("543d")["default"],u("bc2e")["default"])},"61c4":function(n,o,u){},a004:function(n,o,u){"use strict";u.r(o);var e=u("5428"),c=u.n(e);for(var a in e)["default"].indexOf(a)<0&&function(n){u.d(o,n,(function(){return e[n]}))}(a);o["default"]=c.a},b6cb:function(n,o,u){"use strict";u.d(o,"b",(function(){return c})),u.d(o,"c",(function(){return a})),u.d(o,"a",(function(){return e}));var e={uLoadingPage:function(){return Promise.all([u.e("common/vendor"),u.e("uni_modules/uview-ui/components/u-loading-page/u-loading-page")]).then(u.bind(null,"2c4a"))},uNavbar:function(){return Promise.all([u.e("common/vendor"),u.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(u.bind(null,"e5f8"))},"u-Image":function(){return Promise.all([u.e("common/vendor"),u.e("uni_modules/uview-ui/components/u--image/u--image")]).then(u.bind(null,"bea8"))},uniSwiperDot:function(){return u.e("uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot").then(u.bind(null,"045e"))}},c=function(){var n=this.$createElement;this._self._c},a=[]},b788:function(n,o,u){"use strict";var e=u("f875"),c=u.n(e);c.a},da43:function(n,o,u){"use strict";var e=u("61c4"),c=u.n(e);c.a},e83f:function(n,o,u){"use strict";(function(n,o){var e=u("4ea4");u("633f");e(u("66fd"));var c=e(u("0d5d"));n.__webpack_require_UNI_MP_PLUGIN__=u,o(c.default)}).call(this,u("bc2e")["default"],u("543d")["createPage"])},f875:function(n,o,u){}},[["e83f","common/runtime","common/vendor"]]]);