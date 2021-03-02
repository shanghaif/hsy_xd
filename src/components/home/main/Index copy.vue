<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-15 17:18:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-28 10:51:57
-->
<template>
	<div class="home-index">
		<!-- 上面头部 -->
		<div class="head-search">
			<!-- <span class="icon iconfont">&#xe6d3;</span> -->
			<img src="@/assets/image/icon2/icon-address-black.png" alt="">
			<input type="text" placeholder="新鲜蔬菜水果" readonly="true">
			<!-- <span class="icon iconfont">&#xe680;</span> -->
			<img src="@/assets/image/icon2/icon-ellipsis-black.png" alt="">
		</div>

		<!-- 轮播滚动 -->
		<div ref="indexCont" class="new-swiper">
			<!-- // 异步获取 slides 的时候, 需要在 wc-swiper 上面添加 v-if 判断		-->
			<div ref="scrollCont" class="top-btn">
				<ul>
					<li ref="scrollchild" v-for="(slide, index) in slides" :key="index"
						:class='{active:index==currentSlide}'
						@click="changeIndex(index)"
						>{{slide}}</li>
				</ul>
			</div>
			<wc-swiper ref="swiper" class="swiper" vLock="true" :autoplay="false" @transitionend="transitionend" v-if="slides.length">
				<!-- 
					index.js code 503
					if ( e.path[2].className == 'mint-swipe-items-wrap' ){
						return false;
					};
			  -->
				<wc-slide class="wc-slide">
					<!-- 轮播广告 -->
					<swiper v-if="banners && banners.length > 0" :items="banners"></swiper>
					<!-- 分类  -->
					<ul class="food-class">
						<li v-for="(v,i) in 10" :key="i">
							<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
							<span>蔬菜水果</span>
						</li>
					</ul>
					<!-- 三个模块活动 -->
					<div class="exercise">
						<div></div>
						<ul>
							<li>
								<div class="top-img">
									<img src="@/assets/image/icon2/miaosha.png" alt="">
									<span>1:09:45</span>
								</div>
								<p>精选好物</p>
								<div class="bottom-img">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
								</div>
							</li>
							<li>								
								<div class="top-img">
									<img src="@/assets/image/icon2/duomaihui.png" alt="">
									<span>1:09:45</span>
								</div>
								<p>精选好物</p>
								<div class="bottom-img">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
								</div>
							</li>
						</ul>
					</div>
					<!-- 零食热卖 -->
					<div class="banner">
						零食热卖
					</div>
					<!-- 活动2 -->
					<div class="banner2">
						<ul>
							<li>
								<div class="top-img">
									<img src="@/assets/image/icon2/miaosha.png" alt="">
									<span>1:09:45</span>
								</div>
								<p>精选好物</p>
								<div class="bottom-img">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
								</div>
							</li>
							<li>								
								<div class="top-img">
									<img src="@/assets/image/icon2/duomaihui.png" alt="">
									<span>1:09:45</span>
								</div>
								<p>多买多优惠</p>
								<div class="bottom-img">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
									<img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
								</div>
							</li>
						</ul>
					</div>
					<!-- 零食热卖 -->
					<div class="banner3">
						<div>
							<span>精选好物</span>
							<span>精选好物</span>
						</div>
						<div>
							<img v-for="i in 6" :key="i" src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
						</div>
					</div>
					<!-- 商品 -->
					<div class="content">
						<div class="list" v-for="(value,index) in goodProducts" :key='index'>
							<!-- <img mode="widthFix" src="static/1.png"></img> -->
							<img :src="value.goods_img_480" alt="">
							<div class="con">{{value.goods_name}}</div>
							<div class="bot">
								<p>
									<span>￥</span>
									<span>{{value.goods_price}}}</span>
								</p>
								<span class="icon iconfont">&#xe6ae;</span>
							</div>
						</div>
					</div>

				</wc-slide>
				<wc-slide v-for="(slide, index) in slides.slice(1)" :key="index">
					pdsfiojsdiofhgiosdjiogjiosdj
				</wc-slide>
			</wc-swiper>
		</div>


		<!-- 底部 -->
		
  <div class="foot">
			<ul>
				<li :class="{ active: $route.name == 'KeepIndex' }">
					<router-link :to="{ name: 'HomeIndex' }" class="item">
						<i :style="{color:$route.name == 'HomeIndex'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe682;</i>
						<span class="text">首页</span>
					</router-link>
				</li>
				<li :class="{ active: $route.name == 'KeepStoreclass' }">
					<router-link :to="{ name: 'KeepStoreclass' }" class="item">
						<i :style="{color:$route.name == 'KeepStoreclass'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe62d;</i>
						<span class="text">商家</span>
					</router-link>
				</li>
				<li :class="{ active: $route.name == 'KeepGoodsclass' }">
					<router-link :to="{ name: 'KeepGoodsclass' }" class="item">
						<i :style="{color:$route.name == 'KeepGoodsclass'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe6e7;</i>
						<span class="text">商品</span>
					</router-link>
				</li>
				<li :class="{ active: $route.name == 'KeepMapdh' }">
					<router-link :to="{ name: 'KeepMapdh' }" class="item">
						<i :style="{color:$route.name == 'KeepMapdh'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe657;</i>
						<span class="text">网格</span>
					</router-link>
				</li>
				<li :class="{ active: $route.name == 'KeepTransparent' }">
					<router-link :to="{ name: 'KeepTransparent' }" class="item">
						<i :style="{color:$route.name == 'KeepTransparent'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe68f;</i>
						<span class="text">透明</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Swiper from './Swiper';
export default {
	data(){
		return{
      slides : [ '推荐','水果','水产','蔬菜','酒水','乳品','你好','哦哦' ],
			currentSlide : 0,  // 当前下标
		}
	},
	components:{
		'swiper':Swiper,
	},

	computed:{
		...mapState({
			banners: state => state.home.banners,
			goodProducts: state => state.home.goodProducts,
		}),

    swiper(){
      return this.$refs.swiper;
    },
	},
	
	
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
	
	updated(){
		var child = this.$refs.scrollchild[0].clientWidth;  // 单个宽度
		var px = document.documentElement.style.fontSize.slice(0,2);  // 单位
		var wid = child + px*(0.6);  // 单位距离
		this.$refs.scrollCont.scrollLeft = (this.currentSlide-3)*wid+ child + px*0.3;
	},

	methods:{
		// 点击 顶部 按钮
    changeIndex(i){
			this.swiper.slideTo(i);
			console.log(this.$refs.indexCont.scrollTop);
		},
		// 滑动 模块 后触发
    transitionend(currentSlide){
      this.currentSlide = currentSlide;
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
	
	// 头部
	.head-search{
		flex: 0;
		position: fixed;
		top: 0;
		padding: 0 0.3rem;
		background: #fff;
		z-index: 1;
		width: 100vw;
		height: .86rem;
		// border:1px solid red;
		margin: 0 auto;
		@include flex();
		align-items: center;
		>input{
			width: 5.62rem;
			height: .60rem;
			background-color: #F0F0F0;
			border-radius: .30rem;
			padding-left: 0.85rem;			
			font-size: .3rem;
			font-weight: 400;
			color: #808089;

			
			background-image: url(../../../assets/image/icon2/search.png);
			background-repeat: no-repeat;
			background-position: .3rem center;
			background-size: .34rem;
		}
		img{
			height: 0.41rem;
			width: 0.33rem;
			&:last-child{
				width: 0.39rem;
    		height: 0.08rem;
			}
		}
	}

	// 轮播图
	.new-swiper{
		flex: 1;
		overflow: scroll;
		padding: 1.66rem 0 1.1rem 0;
		// 按钮切换
		.top-btn{
			position: fixed;
			top: 0.86rem;
			background: #fff;
			z-index: 1;
			height: 0.8rem;
			width: 100vw;
			overflow-x: scroll;
			ul{
				@include flex-satrt();
				width: fit-content;
				padding: 0 0.3rem;
				padding-bottom: 0.3rem;
				padding-top: 0.18rem;
				li{
					height: .28rem;
					font-size: .28rem;
					font-weight: 500;
					color: #333333;
					line-height: .30rem;
					width: max-content;
					&:not(:last-child){
						margin-right: 0.6rem;
					}
				}
				.active{
					font-size: .30rem;
					font-weight: bold;
					color: #D83A15;
					position: relative;
					&::before{
						content: '';
						width: .40rem;
						height: .05rem;
						background: #D83A15;
						border-radius: .03rem;
						position: absolute;
						bottom: -0.1rem;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
		}

		.swiper {
			width: 100vw;
			height: 100%;
			overflow: scroll;
			margin:  0 auto;
			// margin-top: 1.66rem;
			// padding-bottom: 1.1rem;
			border: $bor solid pink;
			background: #F4F4F4;
			background: linear-gradient(180deg, #fff 0%, #f4f4f4 100%);
			&/deep/.wc-slide{
				height: 100%;
				overflow: scroll;
			}
			&/deep/.wc-pagination{
				display: none;
			}

			// 分类	
			.food-class{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 6.90rem;
				margin: 0 auto;
				padding-bottom: 0.24rem;
				border: $bor solid slategrey;
				li{
					width: 1.35rem;
					margin-top: 0.35rem;

					font-size: .24rem;
					font-weight: 500;
					color: #333333;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					img{
						width: .66rem;
						height: .55rem;
						margin-bottom: 0.24rem;
					}
				}
			}

			// 活动
			.exercise{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 6.9rem;
				margin: 0 auto;
				height: 4.8rem;
				border: $bor solid royalblue;
				>div{
					background: wheat;
					width: 3.30rem;
					height: 4.80rem;
					border-radius: .10rem;
					border: $bor solid rosybrown;
				}
				>ul{
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex-wrap: wrap;
					>li{
						width: 3.30rem;
						height: 2.25rem;
						background: #FFFFFF;
						box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
						border-radius: .10rem;
						padding: 0.3rem;
						img{
							width: 0.83rem;
							height: 0.33rem;
						}
						&:first-child{
							img{
								width: 1.32rem;
								height: 0.31rem;
							}
						}
						.top-img{
							display: flex;
							justify-content: space-between;
							flex-wrap: wrap;
							align-items: flex-start;
							font-size: .22rem;
							font-weight: 500;
							color: #666666;
							span{
								transform: translateY(-.05rem);
							}
						}
						>p{
							font-size: .24rem;
							font-weight: 500;
							color: #D83A15;
							margin: 0.2rem 0;
						}
						.bottom-img{
							height: .70rem;
							display: flex;
							justify-content: space-between;
							flex-wrap: wrap;
							img{
								width: .70rem;
								height: .70rem;
								border-radius: .10rem;
							}
						}
					}
				}
			}

			// 零食热卖
			.banner{
				width: 6.90rem;
				height: 1.48rem;
				border-radius: .10rem;
				border: $bor solid wheat;
				margin: 0.3rem auto;
				background: wheat;
			}
			
			// 零食热卖
			.banner2{
				width: 6.90rem;
				height: 2.25rem;
				margin: 0 auto;
				border-radius: .10rem;
				border: $bor solid wheat;
				
				>ul{
					height: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					>li{
						width: 3.3rem;
						height: 2.25rem;
						background: #FFFFFF;
						box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
						border-radius: .10rem;
						padding: 0.3rem;
						img{
							width: 0.83rem;
							height: 0.33rem;
						}
						&:first-child{
							img{
								width: 1.32rem;
								height: 0.31rem;
							}
						}
						.top-img{
							display: flex;
							justify-content: space-between;
							flex-wrap: wrap;
							align-items: flex-start;
							font-size: .22rem;
							font-weight: 500;
							color: #666666;
							span{
								transform: translateY(-.05rem);
							}
						}
						>p{
							font-size: .24rem;
							font-weight: 500;
							color: #D83A15;
							margin: 0.2rem 0;
						}
						.bottom-img{
							height: .70rem;
							display: flex;
							justify-content: space-between;
							flex-wrap: wrap;
							img{
								width: .70rem;
								height: .70rem;
								border-radius: .10rem;
							}
						}
					}
				}
			}

			// 精选好物
			.banner3{
				padding: 0.3rem;
				width: 6.90rem;
				height: 2.02rem;
				margin: 0.3rem auto;
				margin-bottom: 0;
				background: #FFFFFF;
				box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
				border-radius: .10rem;
				>div{
					height: 0.32rem;
					display: flex;
					align-items: center;
					span{
						font-size: .34rem;
						font-weight: bold;
						color: #333333;
						&:last-child{
							font-size: 0.24rem;
							font-weight: 500;
							color: #D83A15;
							margin-left: 0.28rem;
						}
					}
					&:last-child{
						height: 0.8rem;
						margin-top: 0.3rem;
						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;
						img{
							width: .80rem;
							height: .80rem;
							border-radius: .10rem;
							overflow: hidden;
						}
					}
				}

			}

			// 商品
			.content{
				width: 6.9rem;
				padding: .30rem;
				box-sizing: border-box;
				column-count: 2;
				.list {
					break-inside: avoid;
					width: 3.30rem;
					border: $bor solid red;
					overflow: hidden;

					width: 3.30rem;
					// height: 5.22rem;
					background: #FFFFFF;
					box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
					border-radius: .10rem;
					margin-bottom: 0.3rem;
					padding-bottom: 0.2rem;

					img{
						width: 100%;
						border: 0.1rem;
					}
					.con{
						width: 2.67rem;
						margin: 0.2rem auto;
						font-size: .30rem;
						font-weight: 500;
						color: #333333;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-moz-line-clamp: 2;
						-webkit-box-orient: vertical;
						box-orient: vertical;
						overflow: hidden;
					}
					.bot{
						width: 2.67rem;
						height: 0.32rem;
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;
						p{
							display: flex;
							align-items: flex-end;
							font-size: 0.24rem;
						}
						span{
							font-size: .26rem;
							font-weight: 500;
							color: #D00303;
						}
						.icon{
							font-size: 0.36rem;
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