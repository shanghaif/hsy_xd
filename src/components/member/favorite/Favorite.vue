<template>
	<div class="container">
		<!-- <div class="common-header-wrap">
			<mt-header class="common-header" title="我的收藏"><mt-button icon="back" slot="left" @click="goBack"></mt-button></mt-header>
		</div> -->
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">我的收藏</span>
			<div class="header-right"></div>
		</div>
		<mt-navbar class="tab-nav" v-model="selected">
			<!-- <mt-tab-item id="1">关注店铺</mt-tab-item> -->
			<mt-tab-item id="1">商品</mt-tab-item>
			<mt-tab-item id="2">菜谱</mt-tab-item>
		</mt-navbar>
		<!-- <favorite-store v-bind:class="[selected == 1 ? 'active' : '', 'tab-containt']"></favorite-store> -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1"><favorite-goods v-bind:class="[selected == 1 ? 'active' : '', 'tab-containt']"></favorite-goods></mt-tab-container-item>
			<mt-tab-container-item id="2"><favorite-menu v-bind:class="[selected == 2 ? 'active' : '', 'tab-containt']"></favorite-menu></mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
import { resetRem, resumeRem } from '@/util/rem';
import FavoriteGoods from './FavoriteGoods';
// import FavoriteStore from './FavoriteStore';
import FavoriteMenu from './FavoriteMenu';
export default {
	components: {
		FavoriteGoods,
		// FavoriteStore,
		FavoriteMenu
	},
	name: 'MemberFavorite',
	data() {
		return {
			selected: this.$route.query.status ? this.$route.query.status : '1'
			// selected: '1'
		};
	},
	created() {
		console.log(this.$route.query.status, 'this.$route.query.status');
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
<style lang="scss" scoped>
.header-wrap {
	padding: 1rem 1.43rem;
	position: relative;
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	img {
		// position: absolute;
		// left: 1.78rem;
		// top: 50%;
		width: 1.74rem;
		height: 1.74rem;
		// transform: translate(0, -50%);
	}
	.header-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 1.39rem;
		font-weight: 400;
		color: rgba(22, 22, 22, 1);
	}
	.header-right {
	}
}
.container {
	background-color: #F4F5F7;
	min-height: 90vh;
}
.container .tab-nav {
	// margin-bottom: 0.5rem;
	padding-left: 1rem;
	.mint-tab-item {
		width: 4rem !important;
		flex: inherit;
		font-size: 1.33rem;
	}
	/deep/.mint-tab-item-label {
		font-size: 1.33rem;
	}
}
.container .tab-containt {
	height: 0;
	overflow: hidden;
}
.container .tab-containt.active {
	height: auto;
}
.mint-tab-item.is-selected {
	position: relative;
	font-weight: 600;
	color: #161616!important;
	&::after {
		content: '';
		position: absolute;
		bottom: 1rem;
		left: 50%;
		width: 30%;
		transform: translate(-50%, 0);
		height: 0.23rem;
		background: linear-gradient(89deg, #e53216 0%, #fc6952 100%);
	}
	border-bottom: none !important;
}
</style>
