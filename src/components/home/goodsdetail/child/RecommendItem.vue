<!-- recommend.vue -->
<template>
	<div class="ui-recommend-wrapper" v-if="commendList.length > 0">
		<div class="wrapper-swipe">
			<p class="title">
				<span></span>
				<span>店铺推荐</span>
			</p>
			<!-- <div class="image-swipe-wrapper">
				<div v-for="(item, index) in commendList" :key="index" @click="goDetail(item.goods_id)" v-bind:style="getItemStyle">
					<img :src="item.goods_image_url" />
					<span>￥{{ item.goods_price }}</span>
				</div>
			</div> -->
			<div class="product-wrap">
				<div class="product-info" @click="goDetail(item.goods_id)" v-for="(item, index) in commendList">
					<img class="product-icon" v-lazy="item.goods_image_url" />
					<span class="product-title">{{ item.goods_name }}</span>
					<div class="product-bottom">
						<span class="product-price">
							<span class="rmb">￥</span>
							<span>{{ item.goods_price }}</span>
						</span>
						<!-- <span class="product-buy">{{ item.goods_salenum }}人已购买</span> -->
						<img class="detail-more" src="@/assets/image/icon2/icon-more.png" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			list: [],
			indicatorArray: [],
			currentIndex: 0
		};
	},

	created() {},

	computed: {
		...mapState({
			commendList: state => state.goodsdetail.commendList,
			currentProductId: state => state.goodsdetail.currentProductId
		}),
		getWrapperStyle: function() {
			const { width, height } = window.screen;
			let itemWidth = width - 30;
			let itemHeight = (width - 30 - 16) / 3;
			return {
				width: itemWidth + 'px',
				height: itemHeight + 'px'
			};
		},
		getItemStyle: function() {
			const { width, height } = window.screen;
			let itemWidth = (width - 30 - 16) / 3;
			let itemHeight = itemWidth;
			return {
				width: itemWidth + 'px',
				height: itemHeight + 'px'
			};
		}
	},

	methods: {
		/*
				buildList：构建促销展示商品的数据
				@params： res 接口数据返回的促销商品
			*/
		buildList(res) {
			let index = Math.ceil(res.length / 3);
			let newArray = [];
			if (index) {
				for (let i = 0; i <= index - 1; i++) {
					let subArray = [];
					subArray.push(res.slice(i * 3, i * 3 + 3));
					newArray.push(subArray);
				}
			}
			return newArray;
		},

		/*
				buildSwipeIndicators: 根据轮播图的长度计算位于底部的按钮的个数
			*/
		buildSwipeIndicators() {
			let photos = this.list;
			for (let i = 0, len = photos.length - 1; i <= len; i++) {
				photos[i].index = i;
				this.indicatorArray.push(photos[i]);
			}
		},

		/*
				handleChange: 查看大图的时候滑动大图设置位于底部的按钮的选中状态同时隐藏查看大图的头部信息
				@params: index 当前滑动的图片的index
			 */
		handleChange(index) {
			this.currentIndex = index;
		},

		/*
				goRecommend: 跳转到相关商品页面
			 */
		goRecommend() {
			let params = {};
			if (this.$route.params.brand) {
				params.brand = this.$route.params.brand;
			}
			if (this.$route.params.category) {
				params.category = this.$route.params.category;
			}
			if (this.$route.params.shop) {
				params.shop = this.$route.params.shop;
			}
			params.product = this.currentProductId;
			this.$router.push({ name: 'recommend', params: params });
		},

		goDetail(id) {
			let data = Object.assign({}, { id: id });
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: id } });
		}
	}
};
</script>

<style lang="scss" scoped>
.ui-recommend-wrapper {
	background: #ffffff;
	margin-top: 0.95rem;
	margin-bottom: 0.5rem;
	.wrapper-swipe {
		padding: 1.43rem 1.43rem;
		h2 {
			font-size: 0.7rem;
			margin-bottom: 0.5rem;
		}
	}

	.swiper-indicators {
		position: relative;
		margin-top: 1rem;
		bottom: 0;
	}

	.ui-recommend-all {
		height: 2rem;
		background: #ffffff;
		border-top: 1px solid #e8eaed;
		font-size: 0.7rem;
		color: rgba(78, 84, 93, 1);
		width: 100%;
		flex-basis: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		margin-top: 1rem;
	}

	div.image-swipe-wrapper {
		justify-content: space-between;
		align-content: center;
		align-items: center;
		overflow: hidden;
		div {
			float: left;
			position: relative;
			border: 1px solid #efeff4;
			border-radius: 0.1rem;
			img {
				width: 100%;
				height: 100%;
				padding: 0;
				margin: 0;
			}
			span {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				display: inline-block;
				height: 1.2rem;
				line-height: 1.2rem;
				font-size: 0.7rem;
				color: #ffffff;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 0 0 0.1rem 0.1rem;
			}
		}
	}
}
p.title {
	display: flex;
	align-items: center;
	span {
		&:nth-child(1) {
			vertical-align: middle;
			display: inline-block;
			width: 0.38rem;
			height: 1.38rem;
			background: linear-gradient(139deg, #ff9494 0%, #e63116 100%);
			border-radius: 0.19rem;
			margin-right: 0.48rem;
		}
		&:nth-child(2) {
			font-size: 1.33rem;
			font-weight: 600;
			color: #161616;
		}
	}
}
.product-wrap {
	    display: flex;
	    -ms-flex-wrap: wrap;
	    flex-wrap: wrap;
	    margin-right: -2.66%;
		margin-top: 0.77rem;
	.product-info {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #fff;
		margin-bottom: 0.86rem;
		width: 47.34%;
		margin-right: 2.66%;
		height: fit-content;
		max-height: 23.76rem;
		border-radius: 0.69rem;
		// padding: 0.5rem;
		justify-content: flex-end;
		// border-bottom: 1px solid #f5f5f5;
		box-sizing: border-box;
		box-shadow: 0rem 0rem 0.86rem 0rem rgba(0, 0, 0, 0.1);
		.product-icon {
			// align-self: center;
			width: 100%;
			// max-height: 30rem;
			box-sizing: border-box;
			// vertical-align: middle;
		}

		.product-title {
			margin: 0.86rem 1.3rem 0.43rem;
			font-size: 1.13rem;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(22, 22, 22, 1);
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
		}

		.product-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 1.3rem 1.3rem;
			// line-height: 1rem;

			.product-price {
				// color: $primaryColor;
				font-family: DIN-Regular, DIN;
				font-weight: bold;
				color: rgba(229, 50, 22, 1);
				span {
					font-size: 1.65rem;
				}
				.rmb {
					font-size: 0.95rem;
				}
			}
			.detail-more {
				width: 0.86rem;
				height: 0.17rem;
			}
			// .product-buy {
			// 	color: #999999;
			// 	font-size: .65rem;
			// }
		}
	}
}
</style>
