var wcSwiper =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(8)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(4),
  /* template */
  __webpack_require__(10),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(7)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(9),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'wcSlide',
	methods: {
		clickHandler: function clickHandler() {
			this.$emit('click');
		}
	}
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function toArray(arraylike) {
	return Array.prototype.slice.call(arraylike);
}
/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'wcSwiper',
	props: {
		/*一次滑动的默认时间*/
		duration: {
			default: 200
		},
		/*两次滑动的间隔时间*/
		interval: {
			default: 200
		},
		/*是否自动播放*/
		autoplay: {
			default: true
		},
		/*用户滑动多少距离, 翻页*/
		therehold: {
			default: 110
		},
		defaultSlide: {
			default: 0
		},
		pagination: {
			default: true
		},
		/* 有时候全屏滚动, 的确想要禁用垂直方向的滚动的时候 */
		vLock: {
			default: false
		},
	},
	data: function data() {
		return {
			FatherStartPos:{},  // 判断 左滑右滑

			XcanMove:true,
			startPos:{},  // 判断 左滑右滑
			swiper: null,
			swiperWidth: 0,
			slides: null,
			slidesNumber: 0,
			reallySlidesNumber: 0,
			currentSlide: 0,
			timer: null,
			userDuration: 200,
			pos: {
				startX: 0,
				moveX: 0,
				endX: 0,
				local: 0,
				distance: 0
			},
			moving: false,
			unlock: false,
			activeId: '',
			mousedown: false,
			box: '',
			isOnly: false
		};
	},
	mounted: function mounted() {
		var _this = this;

		this.box = 'wc-swiper-box-' + Math.random().toFixed(2) * 1000;
		setTimeout(function () {
			/*初始化的时候, 拿到所有的 DOM 元素以及相关属性*/
			_this.initElement();

			if (_this.isOnly) {
				return;
			}
			/*克隆两个节点, 用来实现 loop 效果*/
			_this.cloneSlide();
			/*克隆结束之后, 需要设置默认显示的slide*/
			_this.setDefaultSlide();
			/*
   	## start
   	设置默认slide之后, 就需要开始设置定时器, 自动轮播
   */
			if (_this.autoplay) {
				_this.play();
			}
		}, 100);
	},

	methods: {
		
    getAngle(angx, angy) {
			return Math.atan2(angy, angx) * 180 / Math.PI;
		},
		getDirection(startx, starty, endx, endy) {
				var angx = endx - startx;
				var angy = endy - starty;
				var result = 0; //默认标记没有滑动
				//如果滑动距离太短
				if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
						return result;
				}
				var angle = this.getAngle(angx, angy);
				if (angle >= -135 && angle <= -45) {
						result = 1; //向上
				} else if (angle > 45 && angle < 135) {
						result = 2; //向下
				} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
						result = 3; //向左
				} else if (angle >= -45 && angle <= 45) {
						result = 4; //向右
				}
				return result;
		},
		/*阻止容器的上下滚动, 并且只有在水平方向上面滚动超过 10px 才可以阻止 */
		fn: function fn(e) {
			if (this.vLock || Math.abs(this.pos.startX - this.pos.moveX) > 10) {
				console.log('父元素');
				e.preventDefault();
			}
		},

		/*滑动到指定的页面*/
		slideTo: function slideTo(index) {
			if (!this.moving) {
				var currentSlide = Math.round(Math.abs(this.left()) / this.swiperWidth);
				/* 如果索引值不合法 或者和目前的值相等 */
				if (index > this.slidesNumber - 2 - 1 || index < 0 || currentSlide == index + 1) {
					return;
				}
				this.moving = true;
				clearTimeout(this.timer);
				/*
    	说明要往右边滑动
    	注意这里不管需要滑动多少个, duration 都是 300, 这个如果需要, 可以
    	自己根据起点/终点计算出一个合适的值. 
    */
				this.transitionDuration(300);

				this.translateX(-this.swiperWidth * (index + 1));
			}
		},
		next: function next() {
			if (!this.moving) {
				clearTimeout(this.timer);
				this.moving = true;
				this.transitionDuration(this.userDuration);
				this.translateX(this.left() - this.swiperWidth);
			}
		},
		previous: function previous() {
			if (!this.moving) {
				clearTimeout(this.timer);
				this.moving = true;
				this.transitionDuration(this.userDuration);
				this.translateX(this.left() + this.swiperWidth);
			}
		},
		initElement: function initElement() {
			/* 因为传递过来的是个字符串, 所以要手动加点 */
			this.swiper = document.querySelector('.' + this.box);
			this.swiperWidth = this.swiper.clientWidth;
			this.slides = toArray(this.swiper.children);
			this.slidesNumber = this.slides.length;
			/*实际的 slide 个数, 因为 slidesNumber 会在后面重新赋值*/
			this.reallySlidesNumber = this.slides.length;

			/* 如果就仅仅只有一个 slide, 那么不克隆, 不绑定, 就纯展示就可以了 */

			if (this.reallySlidesNumber === 1) {
				this.isOnly = true;
			}
		},
		cloneSlide: function cloneSlide() {
			var head = this.slides[0].cloneNode(this.slides[0], true);
			var tail = this.slides[this.slidesNumber - 1].cloneNode(this.slides[this.slidesNumber - 1], true);
			this.swiper.appendChild(head);
			this.swiper.insertBefore(tail, this.slides[0]);
			/*克隆节点之后, 需要重置一些属性*/
			this.slides = toArray(this.swiper.children);
			this.slidesNumber = this.slides.length;
		},

		/* 根据用户给定的 defaultSlide 设置 init slide 的值 */
		setDefaultSlide: function setDefaultSlide() {

			/* 
   		一切用户给定的值, 都是从 0 - x 开始, 比如用户数据里面有 6个数据
   	那么给定的就是 0 - 5
   	但是我们内部运算的时候, 实际上我们的索引能到 0 - 7
   	0 是实际的 5 的拷贝, 7 实际上是实际的0的拷贝
   	
   	所以当用户给定的 defaultSlide =0, 我们实际上是要让展示内部索引为 1 的元素
   	*/

			/* 如果用户设置了一个非法值, 直接抛出异常*/
			if (this.defaultSlide < 0 || this.defaultSlide > this.slidesNumber - 2 - 1) {
				throw new Error('[wc-swiper:Error]: You have set a wrong defaultSlide value with defaultSlide = ' + this.defaultSlide);
			}
			this.translateX(-this.swiperWidth * (this.defaultSlide + 1));
			//
			// this.currentSlide = this.defaultSlide;
		},

		/*
  	## start
  */
		play: function play() {
			var _this2 = this;

			this.timer = setTimeout(function () {
				clearTimeout(_this2.timer);
				_this2.moving = true;
				_this2.unlock = false;
				_this2.transitionDuration(_this2.duration);
				_this2.translateX(-(_this2.swiperWidth + Math.abs(_this2.left())));
			}, this.interval);
		},
		transitionend: function transitionend() {
			this.transitionDuration(0);

			/*
   	一次滑动结束之后, 通过计算, 实际上我们可以拿到当前处于内部索引的第几个 slide
   	拿到这个 currentSlide 我们就知道当前是不是滚动到最后一个了
   */
			var currentSlide = Math.round(Math.abs(this.left()) / this.swiperWidth);

			this.currentSlide = currentSlide - 1;
			/* 如果滚动到最后一个, 那么就要瞬间跳转一下, 到外部看起来的第一个, 内部的*/
			if (currentSlide == this.slidesNumber - 1) {

				this.translateX(-this.swiperWidth);
				this.currentSlide = 0;
			}
			if (currentSlide == 0) {
				this.translateX(-this.swiperWidth * (this.slidesNumber - 2));
				this.currentSlide = this.slidesNumber - 3;
			}

			this.$emit('transitionend', this.currentSlide);
			/*
   	防止极限操作, 用户在滑动结束之后事件还没发送出去又滑动导致计算
   	结果错误, 所以等事件发出去之后再解开 
   */
			this.moving = false;
			/*
   	##start
   */
			if (this.autoplay) {
				this.play();
			}
		},

		ys: function s(e) {
      let touchS = e.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
  　　this.FatherStartPos = {
          x:touchS.pageX,
          y:touchS.pageY,
          time: new Date()
      }; //取第一个touch的坐标值
		},

		/*toushmove handler*/
		ym: function m(e) {
		},
		
		/*toushend handler*/
		ye: function e(_e) {
			/***************************** */	
      let touchE = _e.changedTouches[0];
      var endPos = {
        x: touchE.pageX,
        y: touchE.pageY,
        timeStemp: new Date()
      };
      let direction = this.getDirection(this.FatherStartPos.x, this.FatherStartPos.y, endPos.x, endPos.y);
      if( direction != 1 && direction != 2 ){
				this.moving = false;
			}
			// setTimeout(()=>{
				this.moving = false;
			// },21)
		},

		/*toushstart handler*/
		s: function s(e) {
			if (this.isOnly) {
				return;
			}
			if ( e.path && e.path[2].className == 'mint-swipe-items-wrap' ){
				return false;
			};
			if ( e.path && e.path[0].className == 'main-banner3' ){
				return false;
			};
			if ( e.path && e.path[1].className == 'main-banner3' ){
				return false;
			};
			if ( e.path && e.path[2].className == 'main-banner3' ){
				return false;
			};
			if ( e.path && e.path[4].className == 'main-banner3' ){
				return false;
			};
			if(e.targetTouches){
      	let touchS = e.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
		　　this.startPos = {
						x:touchS.pageX,
						y:touchS.pageY,
						time: new Date()
				}; //取第一个touch的坐标值
				this.XcanMove = true;
			}
			if (e.type === 'mousedown' && !this.moving) {
				this.mousedown = true;
				this.pos.startX = e.pageX;
				this.pos.local = this.left();
				clearTimeout(this.timer);
				this.transitionDuration(0);
			} else {
				this.activeId = toArray(e.changedTouches)[0].identifier;
				if (!this.moving) {
					var active = e.touches.length - 1;
					clearTimeout(this.timer);
					this.transitionDuration(0);
					this.unlock = true;
					this.pos.startX = e.touches[active].clientX;
					/* 一次 touch 的 起始local 点, 是固定的 */
					this.pos.local = this.left();
				}
			}
		},

		/*toushmove handler*/
		m: function m(e) {
			/***************************** */
			if( e.changedTouches ){
				let touchE = e.changedTouches[0];
				this.endPos = {
					x: touchE.pageX,
					y: touchE.pageY,
					timeStemp: new Date()
				};
				let direction = this.getDirection(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y);
				if( direction == 0 || direction == 1 || direction == 2 ){
					this.XcanMove = false;
				}
			}
			/*************************************************** */
			if (this.isOnly) {
				return;
			}

			if (e.type === 'mousemove' && this.mousedown && !this.moving) {
				this.pos.moveX = e.pageX;
				this.pos.distance = this.pos.moveX - this.pos.startX;
				this.translateX(this.pos.local + this.pos.distance);
			} else {
				if (!this.moving && this.unlock) {
					var active = e.touches.length - 1;
					this.pos.moveX = e.touches[active].clientX;
					this.pos.distance = this.pos.moveX - this.pos.startX;
					this.translateX(this.pos.local + this.pos.distance);
				}
			}
		},

		/*toushend handler*/
		e: function e(_e) {
			this.XcanMove = true;
			if (this.isOnly) {
				return;
			}
			if ( _e.path && _e.path[2].className == 'mint-swipe-items-wrap' ){
				return false;
			};
			if ( _e.path && _e.path[3].className == 'bottom-ul' ){
				return false;
			};

			if (_e.type === 'mouseup' && this.mousedown && !this.moving) {
				this.mousedown = false;
				this.pos.endX = _e.pageX;
				this.pos.distance = this.pos.endX - this.pos.startX;
				this.recover();
			} else {
				var curId = toArray(_e.changedTouches)[0].identifier;
				if (!this.moving && this.unlock && curId == this.activeId) {
					this.unlock = false;
					this.pos.endX = _e.changedTouches[0].clientX;
					this.pos.distance = this.pos.endX - this.pos.startX;
					this.recover();
				}
			}
		},

		/*响应用户滚动行为*/
		recover: function recover() {
			this.transitionDuration(this.userDuration);
			var distance = Math.abs(this.left()) % this.swiperWidth;
			var point = [];
			var direction = '';
			/*
   	主要是为了拿到当前状态下面, swiper 距离正常状态的, 左右移动的距离分别是多少. 
   */
			if (this.left() > 0) {
				point = [distance, this.swiperWidth - distance];
			} else {
				point = [this.swiperWidth - distance, distance];
			}
			if (this.pos.distance > 0) {
				direction = 'to-right';
			} else if (this.pos.distance < 0) {
				direction = 'to-left';
			} else {
				direction = 'none';
			}
			if (direction == 'none') {
				if (this.autoplay) {
					this.play();
				}
			}
			if (direction === 'to-right') {
				this.moving = true;
				/*说明需要向右边移动*/
				if (point[0] > this.therehold) {
					this.translateX(this.left() + point[1]);
					var next = (this.left() + point[1]) / this.swiperWidth;
					if (Math.abs(next) === 0) {
						this.unlock = false;
					}
				} else {
					this.translateX(this.left() - point[0]);
				}
			}
			if (direction === 'to-left') {
				this.moving = true;
				if (point[1] > this.therehold) {
					this.translateX(this.left() - point[0]);
					var _next = (this.left() - point[0]) / this.swiperWidth;
					if (Math.abs(_next) === this.slidesNumber - 1) {
						this.unlock = false;
					}
				} else {
					this.translateX(this.left() + point[1]);
				}
			}
		},
		translateX: function translateX(value) {
			if(this.XcanMove){
				this.swiper.style.transform = 'translate3d(' + value + 'px, 0, 0)';
			}
		},
		transitionDuration: function transitionDuration(ms) {
			this.swiper.style.transitionDuration = ms + 'ms';
		},
		left: function left() {
			return this.swiper.getBoundingClientRect().left;
		}
	}
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wcSwiper__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wcSwiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__wcSwiper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wcSlide__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wcSlide___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__wcSlide__);




/* harmony default export */ __webpack_exports__["default"] = ({
	install: function install(Vue) {
		Vue.component('wcSwiper', Vue.extend(__WEBPACK_IMPORTED_MODULE_1__wcSwiper___default.a));
		Vue.component('wcSlide', Vue.extend(__WEBPACK_IMPORTED_MODULE_2__wcSlide___default.a));
	}
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wc-swiper-container",
    on: {
      // "touchmove": _vm.fn,
      "touchstart": _vm.ys,
      "touchmove": _vm.ym,
      "touchend": _vm.ye,
    }
  }, [_c('div', {
    staticClass: "wc-default-swiper-box",
    class: _vm.box,
    on: {
      "transitionend": _vm.transitionend,
      "touchstart": _vm.s,
      "touchmove": _vm.m,
      "touchend": _vm.e,
      "mousedown": _vm.s,
      "mousemove": _vm.m,
      "mouseup": _vm.e
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _vm._t("pagination", [(_vm.pagination) ? _c('div', {
    staticClass: "wc-pagination"
  }, _vm._l((_vm.reallySlidesNumber), function(value, key) {
    return _c('div', {
      key: key,
      staticClass: "wc-dot",
      class: {
        'wc-dot-active': _vm.currentSlide == key
      }
    })
  })) : _vm._e()]), _vm._v(" "), _vm._t("arrowLeft"), _vm._v(" "), _vm._t("arrowRight"), _vm._v(" "), _vm._t("g")], 2)
},staticRenderFns: []}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wc-slide",
    on: {
      "click": _vm.clickHandler
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ })
/******/ ]);

export default wcSwiper;
