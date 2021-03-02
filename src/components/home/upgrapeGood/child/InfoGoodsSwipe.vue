<!-- GoodsSwipe.vue -->
<template>
	<div class="swipe-wrapper ui-common-swiper" style="height: 27.33rem!important;" v-if="detailInfo">
		<!-- <div class="img-header" >
			<span class="bg-circle img-left" @click="$router.go(-1)"><img src="@/assets/image/icon2/icon-white-back.png" alt="" /></span>
			<div class="img-right">
				<span class="bg-circle img-right1"><img src="@/assets/image/icon2/icon-share-white.png" alt="" /></span>
				<span class="bg-circle img-right2"><img src="@/assets/image/icon2/icon-ellipsis-white.png" alt="" /></span>
			</div>
		</div> -->
		<!-- 轮播图 -->
		<mt-swipe :auto="0" class="ui-common-swiper" style="height: 100%!important;" :prevent="false" :stop-propagation="true" @change="handleChange">
			<mt-swipe-item v-for="(item, index) in detailInfo.photos" v-bind:key="index" v-if="detailInfo.photos && detailInfo.photos.length > 0">
				<img v-bind:src="item" v-on:click="setPopupVisible(index)" />
			</mt-swipe-item>
			<mt-swipe-item v-if="!detailInfo.photos || detailInfo.photos.length <= 0">
				<img src="../../../../assets/image/home/default_image_banner.png" class="product-img" />
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
import PreviewPicture from './PreviewPicture';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			popupVisible: false,
			index: 0
		};
	},

	components: {
		'v-picture': PreviewPicture
	},

	created() {
		this.$on('hide-priview-picture', value => {
			this.popupVisible = value;
			this.setisPreviewPicture(value);
		});
	},

	computed: {
		...mapState({
			detailInfo: state => state.goodsdetail.detailInfo
		})
	},

	methods: {
		...mapMutations({
			setisPreviewPicture: 'setisPreviewPicture',
			setSwiperId: 'setSwiperId'
		}),

		setPopupVisible() {
			this.popupVisible = true;
			this.setisPreviewPicture(true);
		},

		handleChange(index) {
			this.index = index;
			this.setSwiperId(index);
		}
	}
};
</script>

<style lang="scss">
.ui-common-swiper {
	width: 100%;
	height: 27.33rem !important;
	position: relative;
	
	.mint-swipe-items-wrap {
		.mint-swipe-item {
			text-align: center;
			overflow: hidden;
			img {
				height: auto;
				width: 100%;
				transform: translateY(-50%);
				top: 50%;
				position: relative;
			}
		}
	}
	.mint-swipe-indicators {
		div.mint-swipe-indicator {
			background: #efeff4;
			opacity: 1;
			&.is-active {
				background: $primaryColor;
			}
		}
	}
}
.img-header {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	    z-index: 18;
		box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	padding: 0.91rem 1.43rem;
	.img-left {
		
		img {
			width: 1.34rem;
			height: 1.34rem;
		}
	}
	.img-right {
		display: flex;
		.img-right1 {
			img {
				width: 1.39rem;
				height: 1.39rem;
			}
		}
		.img-right2 {
			margin-left: 1.43rem;
			img {
				width: 1.43rem;
				height: 0.29rem;
			}
		}
	}
}
.bg-circle {
	height: 2.39rem;
	width: 2.39rem;
	line-height: 2.39rem;
	text-align: center;
	background: #000000;
	opacity: 0.49;
	border-radius: 50%;
	font-size: 0;
}
</style>
