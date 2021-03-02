<!-- OrderDetailBody.vue -->
<template>
	<div>
		<!-- <div class="common-header-wrap">
			<mt-header title="订单详情" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<div class="order-body" v-if="order_info">
			<div class="image">
				<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
				<span>
					<img v-if="order_info.state_desc=='待发货'" src="@/assets/image/icon2/icon-daifahuo.png" alt="">
					<img v-else-if="order_info.state_desc=='交易完成'" src="@/assets/image/icon2/icon-ok.png" alt="">
					<span>{{ order_info.state_desc }}</span>
				</span>
			</div>

			<div class="address">
				<div>
					<img src="@/assets/image/icon2/icon-address-black.png" alt="" />
					<span>{{ order_info.reciver_name }}</span>
					<span class="mobile">{{ order_info.reciver_phone }}</span>
				</div>
				<p style="-webkit-box-orient: vertical; -webkit-line-clamp: 2;">{{ order_info.reciver_addr }}</p>
			</div>
			<div class="content">
				<div class="content-title">订单信息</div>
				<div class="containers" v-for="item in order_info.goods_list" v-bind:key="item.goods_id">
					<img class="photo" v-bind:src="item.image_240_url" />
					<div class="right-wrapper">
						<label class="title">{{ item.goods_name }}</label>
						<label class="property">{{ item.goods_spec }}</label>
						<div class="desc-wrapper">
							<!-- <label class="price">￥ {{ item.goods_price }}</label>
							<label class="count">x{{ item.goods_num }}</label> -->
							<div>
								<label class="price">
									<span>￥</span>
									<span>{{ item.goods_price }}</span>
								</label>
								<label class="count">&nbsp;&nbsp;x&nbsp;&nbsp;{{ item.goods_num }}</label>
							</div>
						</div>
					</div>
				</div>

				<div class="detail">
					<div class="number">
						<label>订单编号：{{ order_info.order_sn }}</label>
						<p>下单时间：{{ order_info.add_time }}</p>
					</div>
					<div class="pay" v-if="order_info.payment_name">
						<p>支付方式：{{ order_info.payment_name }}</p>
					</div>
				</div>

				<div class="desc section-header section-footer">
					<div class="container">
						<label class="title">商品总额</label>
						<label class="subtitle">
							<span>￥</span>
							<span>{{ order_info.goods_amount }}</span>
						</label>
					</div>
					<div class="container">
						<label class="title">运费</label>
						<label class="subtitle">
							<span>￥</span>
							<span>{{ order_info.shipping_fee }}</span>
						</label>
					</div>
					<div class="container" v-if="order_info.promotion && order_info.promotion.length > 0">
						<label class="title">优惠</label>
						<label class="subtitle" v-for="(p, i) in order_info.promotion" v-bind:key="i">{{ p[1] }}}</label>
					</div>
					<label class="amount">
						<span>实付款 :</span>
						<span>
							<span>￥</span>
							<span>{{ order_info.order_amount }}</span></span>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Toast } from 'mint-ui';
import { getOrderInfo } from '../../../api/sellerOrder';
export default {
	name: 'SellerOrderDetail',
	data() {
		return {
			order_info: {}
		};
	},

	created: function() {
		if (this.$route.query.order_id) {
			getOrderInfo(this.$route.query.order_id)
				.then(res => {
					this.order_info = res.result.order_info;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
// .order-body {
// 	overflow: auto;
// 	height: 100%;
// 	position: absolute;
// 	width: 100%;
// 	.desc {
// 		.container {
// 			display: flex;
// 			flex-direction: row;
// 			justify-content: flex-start;
// 			align-items: center;
// 			background-color: #fff;
// 		}
// 		.title {
// 			width: 5rem;
// 			font-size: 0.7rem;
// 			color: #333;
// 			margin-left: 0.6rem;
// 		}
// 		.subtitle {
// 			flex: 1;
// 			margin-left: 1rem;
// 			margin-right: 0.6rem;
// 			color: $primaryColor;
// 			font-size: 0.7rem;
// 			text-align: right;
// 		}
// 	}
// }
.order-body {
	font-family: not specified;
	overflow: auto;
	height: 100%;
	position: absolute;
	width: 100%;
	background-color: rgba(244, 245, 247, 1);
	padding-bottom: 4rem;
	.desc {
		.container {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			background-color: #fff;
			margin-bottom: 0.95rem;
			span {
				color: #202020;
				&:nth-child(1) {
					font-size: 1.24rem;
				}
				&:nth-child(2) {
					font-weight: bold;
					font-size: 1.43rem;
				}
			}
		}
		.title {
			// width: 5rem;
			// font-size: 0.7rem;
			// color: #333;
			// margin-left: 0.6rem;
			flex-shrink: 0;
			font-size: 1.24rem;
			font-weight: 600;
			color: #161616;
		}
		.subtitle {
			flex: 1;
			margin-left: 1rem;
			margin-right: 0.6rem;
			color: rgba(32, 32, 32, 1);
			font-size: 0.7rem;
			text-align: right;
			span {
				color: #202020;
				&:nth-child(1) {
					font-size: 1.24rem;
					font-weight: 400;
				}
				&:nth-child(2) {
					font-size: 1.43rem;
					font-weight: bold;
				}
			}
		}
	}
}
.image {
	// background: #e93b3d;
	background: url('../../../assets/image/icon2/icon-dingdan2-bg.png') center center/100% 100% no-repeat;
	height: 15.67rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	>img {
		align-self: flex-start;
		height: 1.9rem;
		width: 1.9rem;
		padding: 1rem 1.43rem;
	}
	>span {
		margin-top: 0.81rem;
		font-size: 1.71rem;
		font-weight: 400;
		color: #ffffff;
		display: flex;
		align-items: center;
		>img {
			width: 1.9rem;
			margin-right: 0.48rem;
		}
		// padding-left: 0.5rem;
	}
	.endTime {
		// font-size: 0.58rem;
		font-size: 1.34rem;
		color: #fff;
		margin-top: 1.2rem;
	}
}
.receipt {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: auto;
	padding: 0.65rem;
	background-color: #fff;
	margin-bottom: 0.4rem;
	label {
		display: flex;
		align-items: center;
	}
	img {
		height: 0.8rem;
		margin: 0 0.75rem 0 0.5rem;
	}
	.arrow {
		width: 0.25rem;
		height: 0.5rem;
	}
	span {
		font-size: 0.7rem;
		color: #333;
	}
}
.content {
	// padding: 1.9rem 1.48rem 1.05rem;
	padding: 1.9rem 0 1.05rem 1.48rem;
	margin: 0 1.43rem;
	background-color: #fff;

	border-radius: 0.76rem;
	.content-title {
		padding-left: 0.72rem;
		position: relative;
		font-size: 1.33rem;
		font-weight: 600;
		color: #161616;
		&::after {
			position: absolute;
			content: '';
			left: 0;
			top: 50%;
			height: 1.14rem;
			width: 0.24rem;
			background: linear-gradient(90deg, #e53216 0%, #fc6952 100%);
			border-radius: 0.12rem;
			transform: translate(0, -50%);
		}
	}
}
.containers {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: stretch;
	border-bottom: 1px solid rgba(239, 239, 239, 1);
	// padding: 0.95rem 0 1.48rem;
	padding: 0.95rem 1.48rem 1.48rem 0;
	.photo {
		width: 5.51rem;
		height: 5.51rem;
		// margin: 0.75rem 0.5rem 0.75rem 0.75rem;
		// border: 1px solid #e8eaed;
		flex-basis: 5.51rem;
		flex-shrink: 0;
	}
}
.onClick {
	height: 2.2rem;
	line-height: 2.2rem;
	text-align: center;
	background-color: #fff;
	p {
		font-size: 1.33rem;
		color: #333;
	}
}
.right-wrapper {
	display: flex;
	flex-direction: column;
	margin-left: 0.95rem;
	justify-content: space-between;
	// justify-content: flex-start;
	// align-items: stretch;
	// padding: 0 0.75rem 0 0;
	width: 100%;
	overflow: hidden;
	.title {
		// margin-top: 0.75rem;
		// color: #333;
		// font-size: 0.7rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 1.14rem;
		font-weight: 400;
		color: #161616;
	}
	.property {
		font-size: 1.14rem;
		color: #7c7f88;
		padding-top: 0.5rem;
	}
}

.count {
	margin-top: 0.2rem;
	color: #7c7f88;
	font-size: 1.14rem;
	margin-right: 0.5rem;
}
.desc-wrapper {
	// height: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	> div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	// padding-top: 1rem;
}
.propertyOrder {
	padding-top: 1.7rem;
}
.price {
	font-weight: 400;
	color: #e53216;
	// color: $primaryColor;
	span {
		&:nth-child(1) {
			font-size: 1.24rem;
		}
		&:nth-child(2) {
			font-size: 1.43rem;
		}
	}
	font-size: 0.8rem;
	margin-left: 0;
}
// .count {
// 	color: #7c7f88;
// 	font-size: 0.8rem;
// 	margin-left: 0.5rem;
// }
.address {
	// height: 17.38rem;
	padding: 1.9rem 1.43rem 1.43rem;
	background-color: #fff;
	margin: -4rem 1.43rem 0.95rem;
	border-radius: 0.76rem;
	div {
		// padding: 0.5rem 0.5rem 0;
		display: flex;
		align-items: center;
		img {
			width: 1.29rem;
			height: 100%;
			margin-right: 0.48rem;
		}
		span {
			font-size: 1.24rem;
			font-weight: 600;
			color: #161616;
			&.mobile {
				padding-left: 1.43rem;
			}
		}
	}

	p {
		font-size: 1.14rem;
		font-weight: 400;
		color: #6f6f6f;
		margin: 0.48rem 2rem 0 1.8rem;
		// font-size: 0.7rem;
		// color: #7c7f88;

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
}

.contact {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 2.3rem;
	background-color: #fff;
	margin-top: 0.4rem;
	border-bottom: 1px solid #e8eaed;
	padding: 0 0.65rem;
	span {
		font-size: 0.6rem;
		color: #333;
		padding-right: 0.3rem;
	}
	img {
		width: 0.6rem;
		height: 0.65rem;
	}
}

.detail {
	padding: 1.38rem 0;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	// margin: 0.4rem 0;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(239, 239, 239, 1);
	font-size: 1.05rem;
	font-weight: 400;
	color: #6f6f6f;
	.number {
		// padding: 0.7rem 0.8rem;
		// border-bottom: 1px solid #e8eaed;
		p {
			margin-top: 0.48rem;
			// font-size: 0.7rem;
		}
		// button {
		// 	color: #7c7f88;
		// 	height: 1rem;
		// 	background-color: #fff;
		// 	border: 1px solid #7c7f88;
		// 	width: 2.7rem;
		// 	height: 1rem;
		// 	border-radius: 0.1rem;
		// 	font-size: 0.7rem;
		// }
	}
	.pay {
		margin-top: 0.48rem;
		// border-bottom: 1px solid #e8eaed;
		// padding: 0.7rem 0.8rem;
	}
	.givetime {
		padding: 0.7rem 0.8rem;
		font-size: 0.7rem;
	}
	input {
		background-color: #fff;
		border: 1px solid #7c7f88;
	}
}
.desc {
	padding: 1.48rem 1.43rem 1.48rem 0;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	// padding-top: 0.6rem;
	box-sizing: border-box;
	margin-bottom: 4rem;
	.desc-item {
		flex: 1;
		margin-top: 0.5rem;
	}
	.amount {
		display: flex;
		justify-content: flex-end;
		font-size: 1.14rem;
		font-weight: 600;
		color: #161616;
		padding-right: 0.75rem;
		border-top: 1px solid #e8eaed;
		padding-top: 0.95rem;
		height: 2.2rem;
		line-height: 2.2rem;
		span {
			font-size: 1.14rem;
			font-weight: 600;
			color: #161616;
			span {
				color: #e63116;
				&:nth-child(1) {
					font-size: 1.24rem;
					font-weight: 400;
				}
				&:nth-child(2) {
					font-size: 1.71rem;
					font-weight: bold;
				}
			}
		}
	}
}
.btn {
	position: fixed;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 2.7rem;
	display: flex;
	justify-content: flex-end;
	background-color: #fff;
	align-items: center;
	border-top: 1px solid #e8eaed;
	button {
		width: 4.1rem;
		height: 1.8rem;
		font-size: 0.7rem;
		margin-right: 0.4rem;
		background-color: #fff;
		border: 1px solid #ccc;
	}
	.buttonbottom {
		color: $primaryColor;
		border: 1px solid #e93b3d;
	}
	.mint-popup {
		width: 100%;
		height: 12rem;
	}
	.cancels {
		height: 100%;
		.cancelInfo {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			border-bottom: 1px solid #f0f0f0;
			span {
				color: #000;
				font-size: 0.7rem;
			}
			.cancel {
				padding: 0.5rem 0.75rem;
			}
			.success {
				padding: 0.5rem 0.75rem;
			}
		}
		.reason {
			margin-top: 0.5rem;
			p {
				height: 0.8rem;
				line-height: 0.8rem;
				text-align: center;
				padding: 0.5rem;
				&:hover {
					color: red;
				}
			}
		}
	}
}
.ship {
	margin-bottom: 0;
}
</style>

<!-- 字体图标样式覆盖 -->
<style>
.mint-toast-icon {
	font-size: 1.9rem;
}
button {
	padding: 0;
}
</style>
