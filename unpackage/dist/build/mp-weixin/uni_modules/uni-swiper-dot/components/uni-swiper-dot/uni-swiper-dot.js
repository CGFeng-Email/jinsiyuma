(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot"],{"045e":function(t,e,i){"use strict";i.r(e);var n=i("6e36"),o=i("7683");for(var s in o)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(s);i("7d23");var d=i("f0c5"),r=Object(d["a"])(o["default"],n["b"],n["c"],!1,null,"71539c7b",null,!1,n["a"],void 0);e["default"]=r.exports},3069:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniSwiperDot",emits:["clickItem"],props:{info:{type:Array,default:function(){return[]}},current:{type:Number,default:0},dotsStyles:{type:Object,default:function(){return{}}},mode:{type:String,default:"default"},field:{type:String,default:""}},data:function(){return{dots:{width:6,height:6,bottom:10,color:"#fff",backgroundColor:"rgba(0, 0, 0, .3)",border:"1px rgba(0, 0, 0, .3) solid",selectedBackgroundColor:"#333",selectedBorder:"1px rgba(0, 0, 0, .9) solid"}}},watch:{dotsStyles:function(t){this.dots=Object.assign(this.dots,this.dotsStyles)},mode:function(t){"indexes"===t?(this.dots.width=14,this.dots.height=14):(this.dots.width=6,this.dots.height=6)}},created:function(){"indexes"===this.mode&&(this.dots.width=12,this.dots.height=12),this.dots=Object.assign(this.dots,this.dotsStyles)},methods:{clickItem:function(t){this.$emit("clickItem",t)}}};e.default=n},"6e36":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){}));var n=function(){var t=this.$createElement,e=(this._self._c,"nav"===this.mode?this.info.length:null);this.$mp.data=Object.assign({},{$root:{g0:e}})},o=[]},7683:function(t,e,i){"use strict";i.r(e);var n=i("3069"),o=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=o.a},"7d23":function(t,e,i){"use strict";var n=i("e733"),o=i.n(n);o.a},e733:function(t,e,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot-create-component',
    {
        'uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("045e"))
        })
    },
    [['uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot-create-component']]
]);