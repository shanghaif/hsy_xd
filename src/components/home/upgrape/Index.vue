<template>
	<div class="container upgrape" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
		<div class="topt">
			<div id="top-bg"></div>
			<head-title title="供应链市场" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" color="#fff" bgcolor="transparent"></head-title>
			<div class="banner">
				<index-banner style="margin-top: 0.73rem;" v-if="banners && banners.length > 0" :items="banners"></index-banner>		
			</div>			
		</div>
		<div class="bg-change">
			<div style="background-color: rgba(244,245,247,1);height: 0.86rem;width: 100%;"></div>
			<index-product-list :goods_list="goods_list" title="供应链" ></index-product-list>
		</div>
		
		<div class="common-footer-wrap">
			<mt-tabbar v-model="home_selected" fixed class="common-footer">
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeIndex' }" id="home_index">
					<router-link :to="{ name: 'HomeIndex' }" class="item">
						<!-- <i class='iconfont icon-homepage' /> -->
						<img style="width: 1.76rem;height: 1.9rem;" :src="$route.name == 'HomeIndex' ? iconHomeSe : iconHome" alt="" />
						<span class="text">首页</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeGoodsclass' }" id="home_goodsclass">
					<router-link :to="{ name: 'HomeUpGrapeGoodClass', query:{upgrape:true} }" class="item">
						<img style="width: 1.9rem;height: 1.9rem;" :src="$route.name == 'HomeGoodsclass' ? iconFenleiSe : iconFenlei" alt="" />
						<span class="text">分类</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeMapdh' }" id="home_mapdh">
					<router-link :to="{ name: 'HomeMapdh' }" class="item">
						<img style="width: 1.9rem;height: 1.9rem; " :src="$route.name == 'HomeMapdh' ? iconMapdhSe : iconMapdh" alt="" />
						<!-- <i class="iconfont icon-jiangjia" /> -->
						<span class="text">导航</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeFaxian' }" id="home_cart">
					<router-link :to="{ name: 'HomeStoreclass' }" class="item">
						<img style="width: 1.9rem;height: 1.9rem;" :src="$route.name == 'HomeFaxian' ? iconFaxianSe : iconFaxian" alt="" />
						<span class="text">商家</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'MemberIndex' }" id="member_index">
					<router-link :to="{ name: 'MemberIndex' }" class="item">
						<img style="width: 1.62rem;height: 1.9rem; " :src="$route.name == 'MemberIndex' ? iconMySelect : iconMy" alt="" />
						<!-- <div>{{active ? iconMy : iconMySelect}}</div> -->
						<span class="text">我的</span>
					</router-link>
				</mt-tab-item>
			</mt-tabbar>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Toast, Indicator } from 'mint-ui';
import IndexProductList from './IndexProductList';
import HomeCommonSearch2 from '../common/HomeCommonSearch2';
import HeadTitle from '../../HeadTitle';
import IndexBanner from './IndexBanner';
import { resetRem, resumeRem } from '@/util/rem'
import { getUpGradeGoodsList } from '../../../api/seller'

export default {
	name: 'HomeUpGrape',
	data() {
		return {
			goods_list:[],
			sale: "goods_salenum",
			home_selected:true,
			
			iconHome:  require('../../../assets/image/icon2/tabbar-index.png'),
			iconHomeSe: require('../../../assets/image/icon2/tabbar-index2.png'),
			
			iconFenlei: require('../../../assets/image/icon2/tabbar-fenlei.png'),
			iconFenleiSe: require('../../../assets/image/icon2/tabbar-fenlei2.png'),
			
			iconMapdh:require('../../../assets/image/icon2/tabbar-nav.png'),
			iconMapdhSe: require('../../../assets/image/icon2/tabbar-nav2.png'),
			
			iconFaxian: require('../../../assets/image/icon2/tabbar-faxian.png'),
			iconFaxianSe: require('../../../assets/image/icon2/tabbar-faxian2.png'),
			
			iconMySelect:require('../../../assets/image/icon2/tabbar-my2.png'),
			iconMy:require('../../../assets/image/icon2/tabbar-my.png'),

			
			params: { 
			  page: 0,
			  pagesize: 10
			},
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			goods_list:[],
		};
	},
	components: {
		IndexProductList,
		HomeCommonSearch2,
		IndexBanner,
		HeadTitle
	},
	mounted() {
		resetRem()
	},
	created: function(){
		
	},
	computed: {
		...mapState({
			banners: state => state.home.banners,
			hotProducts: state => state.home.hotProducts,
		})
	},
	beforeDestroy() {
		resumeRem()
	},
	methods: {
		
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getOrderList(false);
			}
    },    
		getOrderList(ifReplace) {
			Indicator.open();
			if (ifReplace) {
				this.params.page = 1;
				this.goods_list = [];
			}
			 getUpGradeGoodsList (this.params)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
						this.loading = false;
					} else {
						this.isMore = false;
						this.loading = true;
					}

					let tOrderGroup = res.result.goods_list;

					if (tOrderGroup) {
						if (ifReplace || !this.goods_list) {
							this.goods_list = tOrderGroup;
						} else {
							this.goods_list = this.goods_list.concat(tOrderGroup);
						}
					}
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		},
	}
};
</script>

<style scoped lang="scss">
.upgrape{
	height: 100vh;
	display: flex;
	overflow: scroll;
	flex-direction: column;
	box-sizing: border-box;
	position: relative;
	// overflow-y: ;
	div{
		box-sizing: border-box;
	}
	.topt{
		flex-shrink:0;
		height: 21rem;
			position: relative;
		.banner{
			height: 15.5rem;
		}
	}
	.bg-change {
		background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(244, 245, 247, 1) 22%, rgba(244, 245, 247, 1) 100%);
		// flex: 1;
		// overflow-y: scroll;
	}
	
	
	.common-footer-wrap {
		height: 2.5rem;
		.common-footer {
			height: 4.76rem;
			line-height: 4.76rem;
			background: #fbfbfb;
			border-top: 1px solid #efefef;
			z-index: 99;
			.item-wrap {
				padding: 0.2rem 0;
				// height: 100%;
				// display: flex;
				// flex-direction: column;
				// align-items: center;
				// justify-content: center;
				.mint-tab-item-label {
					width: 100%;
					font-size: 0.98rem;
				}
				// img {
				// 	width: 1.74rem;
				// 	height: 100%;
				// 	margin-bottom: 0.55rem;
				// 	margin-top: 0.36rem;
				// }
				.item {
					text-decoration:none;
					// padding: 0.86rem 0 0.38rem 0;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: rgba(0, 0, 0, 1);
					img {
						width: 1.74rem;
						height: 1.9rem;
						margin-top: 0.36rem;
						margin-bottom: 0.5rem;
					}
				}
				// text {
				// 	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
				// 	-webkit-user-select: none;
				// 	-moz-user-focus: none;
				// 	-moz-user-select: none;
				// }
			}
			.item-wrap.is-selected {
				background: none;
			}
			.item-wrap.active {
				background: none;
				.item {
					color: #e93b3d;
				}
			}
		}
	}
	
}
.container {
	// overflow-x: hidden;
}
#top-bg {
	position: absolute;
	background: linear-gradient(124deg, rgba(234, 79, 59, 1) 0%, rgba(230, 49, 22, 1) 100%);
	height:12.78rem;
	width: 100%;
	z-index: -1;
	top: 0;
	left: 0;
	border-bottom-left-radius: 1.30rem;
	border-bottom-right-radius: 1.30rem;
}
</style>
