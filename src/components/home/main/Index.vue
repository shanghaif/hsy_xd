<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-15 17:18:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-23 17:30:49
-->
<template>
	<div class="home-index">
		<!-- 上面头部 -->
		<head-main></head-main>

		<!-- 轮播滚动 -->
		<div ref="indexCont" class="new-swiper">
			<!-- // 异步获取 slides 的时候, 需要在 wc-swiper 上面添加 v-if 判断		-->
			<div ref="scrollCont" class="top-btn">
				<ul>
					<li ref="scrollchild" v-for="(slide, index) in slides" :key="index"
						:class='{active:index==currentSlide}'
						@click="changeIndex(index)"
						>{{slide.gc_name}}</li>
				</ul>
			</div>
			
			<wc-swiper ref="swiper" class="swiper" therehold='10' :autoplay="false" @transitionend="transitionend" v-if="slides.length">
				<wc-slide id="IndexScroll" class="wc-slide">
					<!-- 红色背景 -->
					<div class="bg-red">
						<div class="bg-swiper">
							<div></div>
							<div></div>
						</div>

						<!-- 轮播广告 -->
						<swiper v-if="banners && banners.length > 0" :items="banners"></swiper>

						<!-- 分类  -->
						<index-menu></index-menu>

						<!-- 三个模块活动 -->
						<index-exercise></index-exercise>
						
						<!-- 活动2 -->
						<!-- <double-ads></double-ads> -->
						
						<!-- 精选好物 -->
						<one-ads @getScrollTop="getScrollTop"></one-ads>
					</div>
					<!-- 商品列表 -->
					<index-product-list 
						v-if="comGoodsProduct" 
						:items="comGoodsProduct"
						@getScrollTop="getScrollTop"
						></index-product-list>

				</wc-slide>
				<wc-slide 
					ref="ClassScroll"
					v-for="(slide, index) in slides.slice(1)" :key="index">
					<!-- 商品分类 -->
					<goods-class
					:ref="`goodsClass${index}`"
					@getScrollTop="getScrollTop" :currentSlide="currentSlide" :nowIndex="index+1" :slide="slide"></goods-class>

				</wc-slide>
			</wc-swiper>
		</div>


		<!-- 底部 -->
		<foot-main></foot-main>
	</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import Swiper from './Swiper';

import HeadMain from './HeadMain';           // 头部
import IndexMenu from './IndexMenu';         // 分类
import IndexExercise  from './IndexExercise';// 模块活动
import DoubleAds from './DoubleAds';         // 双模块
import OneAds from './OneAds';               // 单模块
import IndexProductList from './IndexProductList';  // 商品列表
import FootMain from './FootMain';           // 底部


import GoodsClass from './GoodsClass';  // 商品列表


import { resetRem, resumeRem } from '@/util/rem'


import { Toast, Indicator } from "mint-ui";

export default {
	data(){
		return{
			// 首页 三大商品
			comGoodsProduct:[],

      slides : [ 
				// { gc_name: '推荐' },
				// { 
				// 	gc_name: '水果',	
				// 	child : [ 
				// 		{
				// 			gc_name:"苹果",
				// 			gc_id:1201,
				// 		},
				// 		{
				// 			gc_name:"香蕉",
				// 			gc_id:1202,
				// 		},
				// 		{
				// 			gc_name:"橙子",
				// 			gc_id:1204,
				// 		},
				// 	],				
				// 	goodsClassData:[
				// 		{ 
				// 			goods_price:12, goods_name:"水果水果",
				// 			goods_img_480:'http://shop.hsy.com/uploads/home/store/goods/37/37_2020122215025656235_480.jpg'
				// 		},
				// 		{ 
				// 			goods_price:12, goods_name:"水果水果",
				// 			goods_img_480:'http://shop.hsy.com/uploads/home/store/goods/37/37_2020122215025656235_480.jpg'
				// 		},
				// 		{ 
				// 			goods_price:12, goods_name:"水果水果",
				// 			goods_img_480:'http://shop.hsy.com/uploads/home/store/goods/37/37_2020122215025656235_480.jpg'
				// 		},
				// 		{ 
				// 			goods_price:12, goods_name:"水果水果",
				// 			goods_img_480:'http://shop.hsy.com/uploads/home/store/goods/37/37_2020122215025656235_480.jpg'
				// 		},
				// 	],		
				// },
			],
			currentSlide : 0,  // 当前下标

			loading: false,   // 是否加载更多
			isMore : true,    // 是否有更多


			IndexScrollLeft:0,  // 主页 的 水平滚动条
			IndexScrollTop:0,  // 主页 的 垂直滚动条
			ClassScrollTop:0,  // 附页 的 垂直滚动条

		}
	},
	components:{
		"head-main"         : HeadMain,           // 头部
		'swiper'            : Swiper,             // 轮播广告
		'index-menu'        : IndexMenu,          // 分类
		'index-exercise'    : IndexExercise,      // 模块活动
		'double-ads'        : DoubleAds,          // 双模块
		'one-ads'           : OneAds,             // 单模块
		"index-product-list": IndexProductList,   // 商品
		'foot-main'         : FootMain,           // 底部

		'goods-class': GoodsClass,   // 商品分类
	},

	computed:{
		...mapState({
			// 轮播图
			banners: state => state.home.banners,  // 轮播广告
			
			// 商品列表
			goodProducts: state => state.home.goodProducts,
			hotProducts: state => state.home.hotProducts,
			recentlyProducts: state => state.home.recentlyProducts,

			goodClassData: state => state.goodsclass.goodClassData,  // 商品分类
		}),

		// 滚动模块
    swiper(){
      return this.$refs.swiper;
		},

		// 顶部 水平滚动条 需要滑动的 距离
		leftWidth(){
			var px = document.documentElement.style.fontSize.slice(0,2);  // 获取单位	
			var leftWidth = 0;    //  初始化偏移量为0
			for( var i = 0; i<this.currentSlide-1; i++ ){
				var item = this.$refs.scrollchild[i];
				leftWidth += (item.offsetWidth+ (px*0.6));
			}
			return leftWidth;
		}
	},

	watch:{
		// 切换 分类 后 垂直滚动 距离 为0
		currentSlide(){
			( this.currentSlide > 0 ) && (
				this.$refs.ClassScroll[this.currentSlide-1].$el.children[0].scrollTop = 0,
				document.getElementById('IndexScroll').scrollTop = 0
			);
		}
	},
	
	// 初始化 加载
  beforeRouteEnter (to, from, next) {
    next(vm => {
			// 不是从 详情页 返回
			( from.name != 'HomeGoodsdetail' && from.name != 'HomeCategorySearch' )?(
        // 从新加载 数据
        vm.firstloading()
			):(
        // 旧版本 缓存数据 滚动条
        vm.$nextTick(()=>{
					// 主页 水平 滚动记录
					vm.$refs.scrollCont.scrollLeft = vm.IndexScrollLeft;
					( vm.currentSlide == 0 )?(
						document.getElementById('IndexScroll').scrollTop = vm.IndexScrollTop
					) : (	
						vm.$refs.ClassScroll[vm.currentSlide-1].$el.children[0].scrollTop = vm.ClassScrollTop
					);
				})
			);
			// 进行 单位换算
			(()=>{
				let sw = document.documentElement.clientWidth;
				let html = document.documentElement;    
				html.style.fontSize = (sw/7.5) + 'px';
				window.onresize = () => {
					let sw = document.documentElement.clientWidth;
					let html = document.documentElement;
					html.style.fontSize = (sw/7.5) + 'px';
				};
			})();	
		})
	},

	// 旧版本 初始化加载
	created(){
		this.firstloading()
	},
	
	// 旧版本 单位换算
	mounted(){
		(()=>{
			let sw = document.documentElement.clientWidth;
			let html = document.documentElement;    
			html.style.fontSize = (sw/7.5) + 'px';
			window.onresize = () => {
				let sw = document.documentElement.clientWidth;
				let html = document.documentElement;
				html.style.fontSize = (sw/7.5) + 'px';
			};
		})();
	},

	
	deactivated() {
	},
	
	// 更改 切换 操纵滚动 偏移
	updated(){
		this.$refs.scrollCont.scrollLeft = this.leftWidth;
	},

	methods:{
		// 首次 加载
		firstloading(){
			// 分类
			this.fetchGoodsclassListNew().then(
				response => {
					Indicator.close();
					// console.log(this.goodClassData);
					var arr = [	{ gc_name: '推荐' } ];
					this.slides = arr.concat( this.goodClassData );
					// console.log( this.slides );
					
					this.$nextTick(()=>{
						setTimeout(()=>{
							this.$refs.ClassScroll.forEach((obj,index)=>{
								obj.$children[0].clearGoodsClass();
							});
							(this.currentSlide >0 ) && (
								this.$refs.ClassScroll[this.currentSlide-1].$children[0].getNewData()
							);
						},100);
					})
				},
				error => {
					Toast(error.message);
					Indicator.close();
				}
			);
			
			this.fetchHomeAd({}).then(
				response => {},
				error => {
					Toast(error.message);
				}
			);
			this.fetchHomeArticle({}).then(
				response => {},
				error => {
					Toast(error.message);
				}
			);
			this.fetchHomeProduct({}).then(
				response => {	
					// var arr = this.hotProducts.concat(this.goodProducts);
					var arr = this.hotProducts;
					arr = arr.concat(this.recentlyProducts);
					this.comGoodsProduct = arr;
				},
				error => {
					Toast(error.message);
				}
			);
			this.fetchConfig({}).then(
				response => {},
				error => {
					Toast(error.message);
				}
			);
			// this.fetchHomeInform(this.params).then(
			// 	response => {},
			// 	error => {
			// 		Toast(error.message);
			// 	}
			// );
		},

		// 点击 跳转到 商品详情 保存 滚动记录
		getScrollTop(){
			// 主页 水平 滚动记录
			this.IndexScrollLeft = this.$refs.scrollCont.scrollLeft;
			// 如果 在 主页
			( this.currentSlide == 0 )?(
				// 记录主页的 垂直滚动记录
				this.IndexScrollTop = document.getElementById('IndexScroll').scrollTop
			) : (
				// 否则 记录分类子元素的 滚动记录
				this.ClassScrollTop = this.$refs.ClassScroll[this.currentSlide-1].$el.children[0].scrollTop
			);
		},

		...mapActions({
			fetchHomeAd: 'fetchHomeAd',
			fetchHomeArticle: 'fetchHomeArticle',
			fetchHomeProduct: 'fetchHomeProduct',
			fetchHomeInform: 'fetchHomeInform',
			fetchConfig: 'fetchConfig',

			
			fetchGoodsclassListNew: "fetchGoodsclassListNew",  // 获取 分类
		}),
		
		// 点击 顶部 分类按钮
    changeIndex(i){
			this.swiper.slideTo(i);
			( i > 0 ) && (
				this.$refs.ClassScroll[i-1].$el.children[0].scrollTop = 0,
				document.getElementById('IndexScroll').scrollTop = 0
			)
		},
		
		// 滑动 模块 后触发
    transitionend(currentSlide){
      this.currentSlide = currentSlide;
		},

		
		// 懒加载  未使用
		getMore(){
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.getValue(true);
			}
		},
		// 懒加载 获取 数据  未使用
		getValue(){
			console.log('触发');
		},
		
		
		
	},
}
</script>

<style scoped lang="scss">
.home-index{
	background: #fff;
	div,ul,li,p,span,input,img{
		box-sizing: border-box;
	}
	@mixin flex{		
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	@mixin flex-satrt{
		display: flex;
		justify-content: flex-start;
	}
	$bor: 0px;

	height: 100vh;
	display: flex;
	flex-direction: column;

	$bgColor: #E63116;
	$bgRed:#F8F8F8;
	$fontColor: #fff;
	color: $fontColor;
	

	// 轮播图
	.new-swiper{
		flex: 1;
		overflow: scroll;
		padding: 1.46rem 0 1.1rem 0;
		// 按钮切换
		.top-btn{
			position: fixed;
			top: 0.86rem;
			background: $bgColor;
			color: $fontColor;
			z-index: 1;
			height: 0.6rem;
			height: 0.8rem;
			width: 100vw;
			overflow-x: scroll;
			ul{
				@include flex-satrt();
				width: fit-content;
				padding: 0 0.3rem;
				padding-bottom: 0.1rem;
				padding-top: 0.18rem;
				li{
					height: .28rem;
					font-size: .28rem;
					font-weight: 500;
					line-height: .30rem;
					width: max-content;
					&:not(:last-child){
						margin-right: 0.6rem;
					}
				}
				.active{
					font-size: .3rem;
					font-weight: bold;
					color: $fontSize;
					position: relative;
					&::before{
						content: '';
						width: .40rem;
						height: .05rem;
						background: $fontColor;
						border-radius: .03rem;
						position: absolute;
						bottom: -0.1rem;
						bottom: -0.2rem;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
		}

		.swiper {
			width: 100%;
			height: 100%;
			// overflow: scroll;
			overflow: hidden;
			margin:  0 auto;
			// border: $bor solid pink;
			// background: #F4F4F4;
			background: linear-gradient(#fff 0%, #f4f4f4 100%);

			&/deep/.wc-slide{
				height: 100%;
				overflow: scroll;
			}
			&/deep/.wc-pagination{
				display: none;
			}
			.bg-red{
				position: relative;
				background: $bgRed;
				padding-bottom: 0.001rem;
				padding-top: 0.2rem;
				margin-bottom: 0.2rem;

				.bg-swiper{
					// position: absolute;
					// height: 2rem;
					position: relative;
					width: 100%;
					div{
						position: absolute;
						width: 100%;
						top: 0;
						left: 0;
						background: #E63116;
						height: 1.2rem;

						&:last-child{
							top: 1.2rem;
							height:  .6rem;
							border-bottom-right-radius: 50%;
							border-bottom-left-radius: 50%;
						}
					}
				}
			}
		}
	}

	// 底部	
  .foot{
		flex: 0;
    height: 1.1rem;
    background: #fbfbfb;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    ul{
      height: 100%;
      display: flex;
      justify-content: space-between;
      li{
      height: 100%;
        width:20%;
        .item{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          i{
            margin-top: .198rem;
            font-size: 0.52rem;
          }
          span{
            font-size: 0.20rem;
            color: #666;
            position: absolute;
            bottom: 0.08rem;
          }
        }
      }
    }
  }
}

</style>