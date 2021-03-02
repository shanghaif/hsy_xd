<template>
	<!-- <div class="column"> -->
		<div class="product-info" @click="productClick">
			<div class="product-icon">
				<img v-lazy="item.goods_image_url" />
			</div>
			<span class="product-title">{{ item.goods_name }}</span>
			<div class="product-bottom">
				<span class="product-price">
					<span class="rmb">￥</span>
					<span>{{ this.utils.currencyPrice(item.goods_price*item.goods_g_price) }}</span>
				</span>
				<!-- <span class="product-buy">{{ item.goods_salenum }}人已购买</span> -->
				<img class="detail-more" src="../../../assets/image/icon2/icon-more.png" />
			</div>
		</div>
	<!-- </div> -->
</template>

<script>
export default {
	name: 'IndexProductBody',
	data() {
		return {
			itemWidth: 0,
			itemHeight: 0,
			showRightBorder: this.index % 2 == 0
		};
	},
	props: ['item', 'index'],
	computed: {},
	methods: {
		productClick: function() {
			this.$router.push({ name: 'HomeUpGrapeGood', query: { goods_id: this.item.goods_id, upgrape:true } });
		}
	}
};
</script>

<style lang="scss" scoped>
.border {
	border-right: 1px solid #f5f5f5;
}
// .product-info {
// 	display: flex;
// 	flex-direction: column;
// 	overflow: hidden;
// 	padding: 0.5rem;
// 	justify-content: flex-end;
// 	border-bottom: 1px solid #f5f5f5;
// 	width: 50%;
// 	box-sizing: border-box;
// 	.product-icon {
// 		align-self: center;
// 		width: 100%;
// 		box-sizing: border-box;
// 	}
// 	.product-title {
// 		color: #333;
// 		font-size: 0.6rem;
// 		margin-top: 1rem;
// 		overflow: hidden;
// 		display: -webkit-box;
// 		-webkit-box-orient: vertical;
// 		-webkit-line-clamp: 1;
// 	}
// 	.product-bottom {
// 		display: flex;
// 		justify-content: space-between;
// 		margin-top: 0.4rem;
// 		line-height: 1rem;
// 		.product-price {
// 			color: $primaryColor;
// 			font-size: 0.7rem;
// 		}
// 		.product-buy {
// 			color: #999999;
// 			font-size: 0.65rem;
// 		}
// 	}
// }
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

	.product-icon {
		// align-self: center;
		width: 100%;
		// max-height: 30rem;
		box-sizing: border-box;
		height: 47.34vw;
		// vertical-align: middle;
		position: relative;
		overflow: hidden;
		img{
			width: 100%;
			height: 47.34vw;
			// position: absolute;
			// top: 50%;
			// left: 50%;
			// transform: translate(-50%,-50%);
		}
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
		
		// overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
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
// .column {
// 	flex-direction: column;
// 	width: 47.34%;
// 	margin-right: 2.66%;
// }
</style>
