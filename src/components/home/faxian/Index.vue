<template>
	<div class="container">
		<!-- <div id="stadus-bar"></div> -->
		<!-- <home-common-search :from="'home'"></home-common-search> -->
		<div class="faxian-bg">
			<div class="header-top">
				<span>发现</span>
				<img @click="onSearch" src="../../../assets/image/icon2/icon-white-search.png" alt="">
			</div>
			<index-menu></index-menu>
		</div>
		<article-list ></article-list>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Toast } from 'mint-ui';
import HomeCommonSearch from '../common/HomeCommonSearch';
import IndexMenu from './IndexMenu';
import articleList from './Articlelist';
import { resetRem, resumeRem } from '@/util/rem';
export default {
	name: 'HomeFaxian',
	data() {
		return {};
	},
	components: {
		HomeCommonSearch,
		articleList,
		IndexMenu
	},
	mounted() {
		resetRem()
		// let html = document.documentElement;
		// let font = html.style.fontSize;
		// let arr = ''
		// arr = parseInt(font.split('px')) 
		// // 手机端专用
		// document.getElementById("top-bg").style.height = (arr*12.78 + plus.navigator.getStatusbarHeight())+'px';
	},
	// created: function() {
		
	// },
	beforeDestroy() {
		resumeRem()
	},
	computed: {},
	methods: {
		onSearch () {
		  this.$router.push({ name: 'HomeSearch', params: { isFromHome: true } })
		}
	}
};
</script>

<style lang="scss" scoped>
	.faxian-bg {
		height: 21.39rem;
		background: url('../../../assets/image/icon2/faxian-bg.png') center center/100% 100% no-repeat;
		padding: 0 0.86rem;
		.header-top {
			padding: 0.95rem 0;
			font-size:1.39rem;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			text-align: center;
			position: relative;
			img {
				position: absolute;
				right: 0.87rem;
				top: 50%;
				width: 1.56rem;
				height: 1.56rem;
				transform: translate(0,-50%);
			}
		}
	}
	
	
</style>
