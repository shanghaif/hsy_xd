<template>
	<div class="container">
		<div id="top-bg"></div>
		<div id="stadus-bar"></div>
		<home-common-search2 :from="'home'"></home-common-search2>
		<index-banner style="margin-top: 0.73rem;" v-if="banners && banners.length > 0" :items="banners"></index-banner>
		<div class="bg-change">
			<index-menu :items="navs"></index-menu>
			<div style="background-color: rgba(244,245,247,1);height: 0.86rem;width: 100%;"></div>
			<index-article style="padding: 0 0.9rem;margin: 1.36rem 0;" :items="articles"></index-article>
			<!-- <index-floor-ads v-if="floorAds" :ad="floorAds[0]"></index-floor-ads> -->
			<!-- <index-three-ads :items="promotionAds"></index-three-ads> -->
			<index-inform ></index-inform>
			<index-product-list :items="goodProducts" title="热门推荐" :type="popular" v-if="goodProducts && goodProducts.length > 0"></index-product-list>
			<index-product-list :items="hotProducts" title="销量排行" :type="sale" v-if="hotProducts && hotProducts.length > 0"></index-product-list>
			<!-- <index-floor-ads v-if="floorAds" :ad="floorAds[1]"></index-floor-ads> -->
			<index-product-list :items="recentlyProducts" title="新品上架" :type="recently" v-if="recentlyProducts && recentlyProducts.length > 0"></index-product-list>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Toast } from 'mint-ui';
import IndexProductList from './IndexProductList';
import IndexInform from './IndexInform';
import HomeCommonSearch2 from '../common/HomeCommonSearch2';
import IndexBanner from './IndexBanner';
import IndexMenu from './IndexMenu';
import IndexFloorAds from './IndexFloorAds';
import IndexThreeAds from './IndexThreeAds';
import IndexArticle from './IndexArticle';
import { resetRem, resumeRem } from '@/util/rem'
export default {
	name: 'HomeIndex',
	data() {
		return {
			isshowBacktop: true,
			popular: '',
			sale: 'goods_salenum',
			recently: 'goods_addtime',
			params: {
				pagesize: 2,
			}
		};
	},
	components: {
		IndexProductList,
		HomeCommonSearch2,
		IndexBanner,
		IndexMenu,
		IndexFloorAds,
		IndexThreeAds,
		IndexArticle,
		IndexInform
	},
	mounted() {
		resetRem()
		// let html = document.documentElement;
		// let font = html.style.fontSize;
		// let arr = ''
		// arr = parseInt(font.split('px')) 
		// console.log(arr,'arr')
		// console.log(font,'font')
		// console.log(arr*12.78+'px','calc(font*12.78rem)')
		// 手机端专用
		// document.getElementById("top-bg").style.height = (arr*12.78 + plus.navigator.getStatusbarHeight())+'px' ;
		// document.getElementById('stadus-bar').style.height = plus.navigator.getStatusbarHeight()+'px'
		// console.log( plus.navigator.getStatusbarHeight(),' plus.navigator.getStatusbarHeight()')
	},
	created: function() {
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
			response => {},
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
	computed: {
		...mapState({
			config: state => state.config.config,
			banners: state => state.home.banners,
			navs: state => state.home.navs,
			floorAds: state => state.home.floorAds,
			inform: state => state.home.inform,
			promotionAds: state => state.home.promotionAds,
			articles: state => state.home.articles,
			hotProducts: state => state.home.hotProducts,
			recentlyProducts: state => state.home.recentlyProducts,
			goodProducts: state => state.home.goodProducts
		})
	},
	beforeDestroy() {
		resumeRem()
	},
	methods: {
		...mapActions({
			fetchHomeAd: 'fetchHomeAd',
			fetchHomeArticle: 'fetchHomeArticle',
			fetchHomeProduct: 'fetchHomeProduct',
			fetchHomeInform: 'fetchHomeInform',
			fetchConfig: 'fetchConfig'
		})
	}
};
</script>

<style scoped lang="scss">
	 .container {
		 padding-bottom:2rem ;
	// padding: 0 0.91rem;
	overflow-x: hidden;
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
.bg-change {
	// padding: 0 0.91rem;
	// padding-top: 1.36rem;
	// margin-top: 0.91rem;
	// background:linear-gradient(180deg,rgba(244,245,247,1) 22%,rgba(244,245,247,1) 100%);
	background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(244, 245, 247, 1) 22%, rgba(244, 245, 247, 1) 100%);
	position: relative;
	// &::after {
	// 	content: '';
	// 	position: absolute;
	// 	background-color: rgba(244, 245, 247, 1);
	// 	top: -0.91rem;
	// 	left: -0.91rem;
	// 	height: 0.91rem;
	// 	width: 107%;
	// }
}
</style>
